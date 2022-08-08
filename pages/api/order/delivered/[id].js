import auth from '../../../../helpers/auth';
import initDB from '../../../../helpers/initDB';
import Order from '../../../../models/Order';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case "PATCH":
            await deliveredOrder(req, res)
            break;
    }
}

const deliveredOrder = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        // console.log("🚀 ~ file: [id].js ~ line 20 ~ result", result)
        if (result.data.role === user)
            return res.status(200).json({
                message: 'You are not authorized to perform this action.',
                status: false,
                data: {}
            })
        const { id } = req.query
        console.log("🚀 ~ file: [id].js ~ line 28 ~ id", id)


        const order = await Order.findOne({ _id: id })
        console.log("🚀 ~ file: [id].js ~ line 30 ~ order", order)

        if (order.paid) {
            await Order.findOneAndUpdate({ _id: id }, { delivered: true }, { new: true })

            return res.status(200).json({
                message: 'Delivery Status Updated',
                status: true,
                data: {
                    paid: true,
                    dateOfPayment: order.dateOfPayment,
                    method: order.method,
                    delivered: true
                }
            })
        } else {
            await Order.findOneAndUpdate({ _id: id }, {
                paid: true,
                dateOfPayment: new Date().toISOString(),
                method: 'cod',
                delivered: true
            }, { new: true })

            return res.status(200).json({
                message: 'Delivery Status Updated',
                status: true,
                data: {
                    paid: true,
                    dateOfPayment: new Date().toISOString(),
                    method: 'Receive Cash',
                    delivered: true
                }
            })
        }

    } catch (err) {
        return res.status(200).json({
            message: err.message || 'Something went wrong',
            status: false,
            data: {}
        })
    }
}