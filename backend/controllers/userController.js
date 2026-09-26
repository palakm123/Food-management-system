
const User = require("../models/User");
const USER_STATUS = require("../helpers/enum");
const { hashPassword } = require("../helpers/bcrypt")

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(USER_STATUS.CREATED).json({
            message: "User SignUp successfully",
            data: userResponse
        })


    } catch (error) {
        res.status(USER_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })

    }
}

module.exports = { createUser }