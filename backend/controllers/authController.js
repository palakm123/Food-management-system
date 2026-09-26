const User = require("../models/User");
const USER_STATUS = require("../helpers/enum");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(USER_STATUS.NOT_FOUND).json({
                message: "user not found"
            })
        }

        const isMatch = await User.comparePassword(password, user.password)

        if (!isMatch) {
            return res.status(USER_STATUS.UNAUTHORIZED).json({
                message: "invalid password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d"
            }
        )

        res.status(USER_STATUS.OK).json({
            message: "User Login Successfully",
            token: token,
            data: user
        })


    } catch (error) {
        return res.status(USER_STATUS.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })

    }
}
module.exports = {login};

