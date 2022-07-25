/* eslint-disable import/no-anonymous-default-export */

import jwt from 'jsonwebtoken';
import initDB from '../../../helpers/initDB';
import CartM from '../../../models/CartM';

initDB()
export default async (req, res) =>
{
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(200).json({
            message: "Unauthorized",
            status: false,
            data: {}
        })
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const cart = await CartM.findOne({ user: userId })

        if (cart === null) {
            return res.status(200).json({
                message: "No Cart Found",
                status: false,
                data: {}
            })
        }
        const { __v, ...info } = cart?._doc
        return res.status(200).json({
            message: "Cart Found",
            status: true,
            data: { ...info }
        })
    } catch (error) {
        return res.status(200).json({
            message: "Something went wrong",
            status: false,
            data: error
        })
    }
}

