const express= require("express");

const authRouter= express.router();

authRouter.post("/login",login)