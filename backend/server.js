const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const authRouter = require("./routers/authRouter")
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", authRouter)
connectDb()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})