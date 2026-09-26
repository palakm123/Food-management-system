
const express = require("express");
const { createUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signUp", createUser);

module.exports = userRouter;