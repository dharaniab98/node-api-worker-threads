const router = require("express").Router();
const uploadFile = require("./../middleware/fileUpload")
const {upload, policyInfo, agregatedPolicyUser} = require("./../controller/data.controller")

router.post("/upload",uploadFile.single("file"),upload);
router.get("/policyinfo/:user", policyInfo)
router.get("/userpolicies",agregatedPolicyUser)

module.exports = router;