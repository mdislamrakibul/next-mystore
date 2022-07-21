/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcryptjs';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';

initDB()

export default async (req, res) =>
{
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            return res.status(200).json({
                status: false,
                message: 'Please provide all required fields',
                data: {},
                total: 0
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(200).json({
                status: false,
                data: {},
                total: 0,
                message: "user already exists with that email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        }).save()

        // await new Cart({ user: newUser._id }).save()

        res.status(200).json({
            status: true,
            data: {},
            total: 0,
            message: "Successfully Joined"
        })
    } catch (err) {
        res.status(200).json({
            status: false,
            data: err,
            total: 0,
            message: "Joined Error"
        })
    }
}