import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case 'POST':
            await createOrder(req, res);
            break
    }
}

const createOrder = async (req, res) =>
{
    try {
        const authResp = await auth(req, res)
        console.log("🚀 ~ file: index.js ~ line 20 ~ authResp", authResp)
        // const { firstName, lastName, email, phone, address, total, cart,
        //     promoCodeRedeem, amountRedeem, method } = req.body

        // const order = new Order({
        //     user: authResp.data._id,
        //     firstName,
        //     lastName,
        //     email,
        //     phone,
        //     address,
        //     total,
        //     cart,
        //     promoCodeRedeem,
        //     amountRedeem,
        //     paymentId: uuidv4(),
        //     method
        // })

        // cart.filter(item =>
        // {
        //     return sold(item._id, item.quantity, item.inStock, item.sold)
        // })

        // await order.save()

        // return res.status(200).json({
        //     msg: 'Order Placed! We will contact you to confirm the order.',
        //     newOrder
        // })

    } catch (err) {
        return res.status(200).json({
            message: err?.message || 'Something went wrong',
            status: false,
            data: err
        })
    }
}

const sold = async (id, quantity, oldInStock, oldSold) =>
{
    await Products.findOneAndUpdate({ _id: id }, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}