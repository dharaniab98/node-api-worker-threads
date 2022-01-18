const router = require("express").Router();
const uploadFile = require("./../middleware/fileUpload")
const {upload, policyInfo, agregatedPolicyUser} = require("./../controller/data.controller")
// const multer  = require('multer')
// const upload = multer({ dest: ' })
 router.post("/upload",uploadFile.single("file"),upload);
 // (req, res) => { console.log("file uploaded")
//   console.log(req.file)
//    res.send("file uploading");
//    res.end()
// } )

//router.get("/policy",)

router.get("/policyinfo/:user", policyInfo)
router.get("/userpolicies",agregatedPolicyUser)

module.exports = router;