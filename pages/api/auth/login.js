/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';
initDB()

export default async (req, res) =>
{
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(200).json({
                status: false,
                message: "please fill all the fields",
                data: {},
                total: 0
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({
                status: false,
                message: "user not found",
                data: {},
                total: 0
            })
        }
        const doMatch = await bcrypt.compare(password, user.password)
        if (doMatch) {
            const token = jwt.sign({ userId: user._id, role: user.role, userName: user.username }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })
            const { _id, username, role, email, image } = user
            res.status(200).json({
                status: true,
                message: "user found",
                data: {
                    token,
                    user: {
                        _id,
                        username,
                        role,
                        email,
                        image
                    }
                },
                total: 1
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "email or password don't match",
                data: {},
                total: 0
            })
        }
    } catch (err) {
        return res.status(200).json({
            status: false,
            message: "Something went wrong",
            data: err,
            total: 0
        })
    }
}