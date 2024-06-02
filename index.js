const express = require('express');
require('dotenv').config();
const cors = require("cors");

const path = require("path");

const dbConnect = require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());
dbConnect();

const PORT = process.env.PORT || 8080;

const AuthRoutes = require('./routes/Auth');

app.use("/api/v1/auth", AuthRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
    