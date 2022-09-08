import initDB from '../../../../helpers/initDB';
import { errorResponse, successResponse } from '../../../../helpers/response';
import Order from '../../../../models/Order'
import OnlinePay from '../../../../models/OnlinePay'
initDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await getUserDetails(req, res)
            break;
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { id } = req.query

        const orderCount = await Order.find({ user: id }).count()
        const successfulOrderCount = await Order.find({ user: id, delivered: true, paid: true, rejectedIs: false }).count()
        const pendingOrderCount = await Order.find({ user: id, delivered: false, paid: true, rejectedIs: false }).count()
        const inProgressOrderCount = await Order.find({ user: id, delivered: false, paid: false, rejectedIs: false }).count()
        const rejectedOrderCount = await Order.find({ user: id, rejectedIs: true }).count()



        const onlinePayCount = await OnlinePay.find({ user: id }).count()
        const successPayCount = await OnlinePay.find({ user: id, isDelivered: true }).count()
        const pendingPayCount = await OnlinePay.find({ user: id, isDelivered: false }).count()

        const orderAmount = await Order.find({ user: id }, { delivered: 1, paid: 1, rejectedIs: 1, total: 1 })
        const totalOrderAmount = orderAmount.filter(({ delivered }) => delivered === true).reduce((sum, record) => sum + record.total, 0)
        const pendingPayment = orderAmount.filter(x => (x.delivered === false && x.paid === true && x.rejectedIs === false))
            .reduce((sum, record) => sum + record.total, 0)
        const progressPayment = orderAmount.filter(x => (x.delivered === false && x.paid === false && x.rejectedIs === false))
            .reduce((sum, record) => sum + record.total, 0)
        const rejectedPayment = orderAmount.filter(x => x.rejectedIs === true).reduce((sum, record) => sum + record.total, 0)


        const onlineAmount = await OnlinePay.find({ user: id }, { isDelivered: 1, totalPrice: 1 })
        const totalOnlineAmount = onlineAmount.filter(({ isDelivered }) => isDelivered === true)
            .reduce((sum, record) => sum + record.totalPrice, 0)
        const pendingOnlineAmount = onlineAmount.filter(({ isDelivered }) => isDelivered === false)
            .reduce((sum, record) => sum + record.totalPrice, 0)


        const data = {
            orderTotal: orderCount || 0,
            orderDelivery: successfulOrderCount || 0,
            orderPending: pendingOrderCount || 0,
            orderInProgress: inProgressOrderCount || 0,
            orderRejected: rejectedOrderCount || 0,
            onlinePayCount: onlinePayCount,
            successOnlinePay: successPayCount || 0,
            pendingOnlinePay: pendingPayCount || 0,
            totalIncome: (totalOrderAmount + totalOnlineAmount) || 0,
            cod: totalOrderAmount || 0,
            onlinePay: totalOnlineAmount || 0,
            pendingPayment: (pendingPayment + pendingOnlineAmount) || 0,
            progressPayment: progressPayment || 0,
            rejectedPayment: rejectedPayment || 0,
        }
        successResponse(res, true, 'Data Found', data)

    } catch (error) {
        errorResponse(res, false, error.message || "Something went wrong", {})
    }
}