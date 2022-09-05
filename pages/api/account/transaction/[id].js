import initDb from '../../../../helpers/initDB'
import auth from '../../../../helpers/auth'
import OnlinePay from '../../../../models/OnlinePay'
import { errorResponse, successResponse } from '../../../../helpers/response';
initDb()

export default async (req, res) => {
    switch (req.method) {
        case 'PATCH':
            await deliveredOrder(req, res)
            break;
    }
}
const deliveredOrder = async (req, res) => {
    try {
        const result = await auth(req, res)

        if (result?.data?.role !== 'root') {
            return res.status(200).json({
                message: 'You are not authorized to perform this action.',
                status: false,
                data: {}
            })
        }

        const { id } = req.query

        await OnlinePay.findOneAndUpdate({ _id: id }, {
            isDelivered: true,
            deliveryDate: new Date().toISOString(),
        }, { new: true })

        successResponse(res, true, 'Delivery Status Updated', {})

    } catch (err) {
        errorResponse(res, false, err.message || 'Something went wrong', {})
    }
}
