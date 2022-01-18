const multer = require("multer");

const csvCheck = (req, file, cb) => {
    console.log(file.originalname)
    if(file.mimetype.includes("csv")){
        cb(null, true);
    }else{
        cb("Please upload only csv files", false);
    }
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./resources/")
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

let uploadFile = multer({storage: storage, fileFilter : csvCheck})
module.exports = uploadFile;