const { parentPort, workerData:{data} } = require("worker_threads");
const { resolve } = require('path');
const {dbConnection} = require("./../database/connection");
const fs = require("fs");
const {v4 : uuidv4} = require('uuid')
const csv = require("csvtojson");
(async () => {
    try{
    const dataPath = resolve(data.filePath, data.fileName);     
    const jsonArray = await csv().fromFile(dataPath);
    const db = await dbConnection();
    const agents = await db.collection('agents');
    const users = await db.collection('users');
    const users_account = await db.collection('users_account');
    const policy_category = await db.collection('policy_category');
    const policy_carrier = await db.collection('policy_carrier');
    const policy_info = await db.collection('policy_info');
    for(let i=0; i< jsonArray.length; i++){
        let ele = jsonArray[i];
        let agentres = await agents.findOne({name:ele.agent})
         
        if(agentres === null){
            await agents.insertOne({name: ele.agent});
        }
        let user_id = uuidv4();
        await users.insertOne({_id : user_id, first_name: ele.firstname, dob:ele.dob, address:ele.address, phone:ele.phone, state:ele.state, zip:ele.zip, email:ele.email, gender:ele.gender, user_type: ele.userType})
        await users_account.insertOne({acount_name: ele.account_name, user_id:user_id});
        let company_id = uuidv4()
        let obj = await policy_carrier.findOne({name:ele.company_name})
        if(obj !== null){
             company_id = obj._id;    
        }else{
             await policy_carrier.insertOne({_id: company_id, name:ele.company_name});
        }
        let pcr = await policy_category.findOne({category:ele.category_name})
        if(!pcr ){
            await policy_category.insertOne({category: ele.category_name});
        }
        let policy_id = uuidv4();
        await policy_info.insertOne({_id:policy_id,number:ele.policy_number,category:ele.category_name, start_date:ele.policy_start_date,end_date:ele.policy_end_date,company_id:company_id, user_id:user_id});
    }
    parentPort.postMessage("Importing Data is done");
    
    }catch(err){
        console.log(err);
    }
})()
