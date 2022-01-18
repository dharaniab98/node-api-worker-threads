const express = require("express");
const {dbConnection} = require("./src/database/connection")
const app = express();

// const db = dbConnection()
app.use(express.json())
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

global.__basedir = __dirname;
console.log(__basedir);
app.use("/api", require("./src/routes/routes"))


app.listen(4000, () => {
    console.log("server running on port 4000")
})