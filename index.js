const express = require("express");
const app = express();
app.use(express.json())
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

global.__basedir = __dirname;
app.use("/api", require("./src/routes/routes"))


app.listen(4000, () => {
    console.log("server running on port 4000")
})