import Stripe from 'stripe'
import { v4 as uuidV4 } from 'uuid'
import Cart from '../../../models/Cart'
import jwt from 'jsonwebtoken'
import Order from '../../../models/Order'
import initDb from '../../../helpers/initDB'
initDb()

const stripe = Stripe(process.env.STRIPE_SECRET)
export default async (req, res) => {
    const { paymentInfo, cart } = req.body
    console.log('🚀 ~ file: index.js ~ line 12 ~ cart', cart);
    console.log('🚀 ~ file: index.js ~ line 12 ~ paymentInfo', paymentInfo);
    // const { authorization } = req.headers
    // if (!authorization) {
    //     return res.status(200).json({
    //         statue: false,
    //         message: "you must logged in"
    //     })
    // }

    try {
        let price = 0
        cart.forEach(item => {
            price = price + item.quantity * item.price
        })
        const prevCustomer = await stripe.customers.list({
            email: paymentInfo.email
        })
        const isExistingCustomer = prevCustomer.data.length > 0
        let newCustomer
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentInfo.email,
                source: paymentInfo.id
            })
        }

        await stripe.charges.create(
            {
                currency: "USD",
                amount: price * 100,
                receipt_email: paymentInfo.email,
                customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description: `you purchased a product | ${paymentInfo.email}`
            }, {
            idempotencyKey: uuidV4()
        }
        )
        await new Order({
            // user: userId,
            email: paymentInfo.email,
            total: price,
            products: cart
        }).save()
        // await Cart.findOneAndUpdate(
        //     { _id: cart._id },
        //     { $set: { products: [] } }
        // )
        res.status(200).json({ message: "payment was successful" })






    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: "error processing payment" })
    }


}