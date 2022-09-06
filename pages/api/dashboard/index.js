import initDB from '../../../helpers/initDB';
import auth from '../../../helpers/auth';
import Order from '../../../models/Order'
import { successResponse } from '../../../helpers/response';
import User from '../../../models/User';
import Product from '../../../models/Product';
import Category from '../../../models/Category';
import OnlinePay from '../../../models/OnlinePay';
initDB()
export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getData(req, res);
            break
    }
}

const getData = async (req, res) => {
    const result = await auth(req, res)

    const orderCount = result.data.role === 'user' ? await Order.find({ user: result.data._id }).count() : await Order.find().count()
    const successfulOrderCount = result.data.role === 'user' ?
        await Order.find({ user: result.data._id, delivered: true, paid: true, rejectedIs: false }).count() :
        await Order.find().count({ delivered: true, paid: true, rejectedIs: false })
    const pendingOrderCount = result.data.role === 'user' ?
        await Order.find({ user: result.data._id, delivered: false, paid: true, rejectedIs: false }).count() :
        await Order.find().count({ delivered: false, paid: true, rejectedIs: false })
    const inProgressOrderCount = result.data.role === 'user' ?
        await Order.find({ user: result.data._id, delivered: false, paid: false, rejectedIs: false }).count() :
        await Order.find().count({ delivered: false, paid: false, rejectedIs: false })
    const rejectedOrderCount = result.data.role === 'user' ?
        await Order.find({ user: result.data._id, rejectedIs: true }).count() :
        await Order.find().count({ rejectedIs: true })

    const userCount = await User.find().count()
    const productCount = await Product.find().count()
    const categoryCount = await Category.find().count()

    const onlinePayCount = result.data.role === 'user' ? await OnlinePay.find({ user: result.data._id }).count() : await OnlinePay.find().count()
    const successPayCount = result.data.role === 'user' ? await OnlinePay.find({ user: result.data._id, isDelivered: true }).count() : await OnlinePay.find({ isDelivered: true }).count()
    const pendingPayCount = result.data.role === 'user' ? await OnlinePay.find({ user: result.data._id, isDelivered: false }).count() : await OnlinePay.find({ isDelivered: false }).count()

    const orderAmount = result.data.role === 'user' ? await Order.find({ user: result.data._id }, { delivered: 1, paid: 1, rejectedIs: 1, total: 1 }) : await Order.find({}, { delivered: 1, paid: 1, rejectedIs: 1, total: 1 })
    const totalOrderAmount = orderAmount.filter(({ delivered }) => delivered === true)
        .reduce((sum, record) => sum + record.total, 0)
    const pendingPayment = orderAmount.filter(x => (x.delivered === false && x.paid === true && x.rejectedIs === false))
        .reduce((sum, record) => sum + record.total, 0)
    const progressPayment = orderAmount.filter(x => (x.delivered === false && x.paid === false && x.rejectedIs === false))
        .reduce((sum, record) => sum + record.total, 0)
    const rejectedPayment = orderAmount.filter(x => x.rejectedIs === true)
        .reduce((sum, record) => sum + record.total, 0)


    const onlineAmount = result.data.role === 'user' ? await OnlinePay.find({ user: result.data._id }, { isDelivered: 1, totalPrice: 1 }) : await OnlinePay.find({}, { isDelivered: 1, totalPrice: 1 })
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
        user: userCount || 0,
        product: productCount || 0,
        category: categoryCount || 0,
        onlinePay: onlinePayCount,
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
}