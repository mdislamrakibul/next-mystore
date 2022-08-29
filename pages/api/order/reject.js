import { v4 as uuidv4 } from 'uuid';
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
initDB()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await rejectOrder(req, res);
            break
    }
}


const rejectOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result?.data?.role !== 'root') {
            return res.status(200).json({
                message: 'You are not authorized to perform this action.',
                status: false,
                data: {}
            })
        }
        const order = req.body
        if (order.delivered || order.paid) {
            return res.status(200).json({
                message: 'You cannot reject this order.',
                status: true,
                data: {}
            })
        }

        const rejOrder = await Order.findOneAndUpdate({ _id: order._id }, {
            rejectedIs: true,
            rejectedBy: result.data._id,
            rejectedTime: new Date().toISOString(),
        })
        if (!rejOrder) {
            return res.status(200).json({
                message: 'Order Rejected Error',
                status: false,
                data: {}
            })
        }
        return res.status(200).json({
            message: 'Order Rejected',
            status: true,
            data: {}
        })
    } catch (e) {
        return res.status(200).json({
            message: err?.message || 'Something went wrong',
            status: false,
            data: err
        })
    }
}