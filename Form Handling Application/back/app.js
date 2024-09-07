const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/db");
const cors = require("cors");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT","PATCH"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
        credentials: true,
    })
);

app.use(express.json());
app.use(require("./routes/route"));



app.get("/", function (req, res) {
    res.send("hello gaurav");
});

app.listen(8000, () => {
    console.log("Server Running Successfully on port 8000");
});
