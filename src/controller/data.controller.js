const {Worker } = require("worker_threads");
const path = require("path");
const {dbConnection} = require("./../database/connection");

module.exports.upload = (req, res) => {
    try{
        let workerPath  = path.resolve(__basedir, "src/utilities/worker.js");
        let filePath = path.resolve(__basedir, "resources/")
        console.log(filePath);
        let workerData = { data: { fileName: req.file.originalname, filePath: filePath }}
        const worker = new Worker(workerPath, {workerData});
        worker.on('message', (message) => {
            console.log(message);
        });
        worker.on("error", (err) => {
            console.log(err);
            console.log("error occured while connecting");
        })
        worker.on('exit', (code) => {
                if (code !== 0)
                    console.log(`Worker stopped with exit code ${code}`);
        });

        res.send({message:"success"});
   }catch(err){
        res.send({message:"Failed to upload data"});
   }  
}

module.exports.policyInfo =async (req, res) => {
    try{
        let user_name = req.params.user;
        console.log(user_name)
        const db = await dbConnection();
        const users = await db.collection('users');
        const policy_info = await db.collection("policy_info");
        let result = await users.find({first_name:{"$regex": user_name }}).toArray();
        let ids = []
        for(let i=0; i< result.length; i++){
           ids.push(result[i]._id)
        }
        let policies = await policy_info.find({user_id :{"$in":[...ids] }}).toArray();
        res.send({status:"success", data:policies})
    }catch(err){
        res.send({message:"fail to get data"})
    }
}


module.exports.agregatedPolicyUser =async  (req, res) => {
    try{
        const db = await dbConnection();
        const users = await db.collection('users');
        const policy_info = await db.collection("policy_info");
        let aggregaredResults = await users.aggregate([
            {$group : {_id:{_id:"$_id",first_name:"$first_name"}}},
            {$lookup: {from: "policy_info", localField: "_id._id", foreignField: "user_id", as: "policies"}},
        ]).toArray()
        res.send({status:"success", data:aggregaredResults});
    }catch(err){
        res.send({message:"fail to get data"})
    } 
}