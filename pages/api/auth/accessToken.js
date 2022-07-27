import jwt from 'jsonwebtoken'
import Users from '../../../models/userModel'
import connectDB from '../../../utils/connectDB'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) =>
{
    try {
        const rf_token = req.cookies.refreshToken;
        if (!rf_token) return res.status(200).json({
            status: false,
            message: "please login first",
            data: {},
        })

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(200).json({
            status: false,
            message: "Token Expired",
            data: {},
        })

        const user = await Users.findById(result.userId)
        if (!user) return res.status(200).json({
            status: false,
            message: "user not exists",
            data: {},
        })

        const accessToken = createAccessToken({ id: user._id })
        const { __v, ...info } = user._doc
        res.json({
            token: accessToken,
            user: {
                ...info
            }
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}