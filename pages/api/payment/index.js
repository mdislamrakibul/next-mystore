import Stripe from 'stripe'
import { v4 as uuidV4 } from 'uuid'
import initDb from '../../../helpers/initDB'
import auth from '../../../helpers/auth'
import OnlinePay from '../../../models/OnlinePay'
initDb()

const stripe = Stripe(process.env.STRIPE_SECRET)
export default async (req, res) => {
    const { paymentInfo, cart } = req.body
    const result = await auth(req, res)
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
                source: paymentInfo.id,
                name: paymentInfo.card.name,
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
        await new OnlinePay({
            user: result.data._id,
            email: paymentInfo.email,
            cart: cart,
            name: paymentInfo.card.name,
            address_city: paymentInfo.card.address_city,
            address_country: paymentInfo.card.address_country,
            address_line1: paymentInfo.card.address_line1,
            address_zip: paymentInfo.card.address_zip,
            totalPrice: price,
            brand: paymentInfo.card.brand,
            country: paymentInfo.card.country,
            exp_month: paymentInfo.card.exp_month,
            exp_year: paymentInfo.card.exp_year,
            funding: paymentInfo.card.funding,
            card_id: paymentInfo.card.id,
            last4: paymentInfo.card.last4,
            client_ip: paymentInfo.client_ip,
            token_id: paymentInfo.id,
            type: paymentInfo.type,
            livemode: paymentInfo.livemode
        }).save()

        res.status(200).json({ message: "payment was successful" })

    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: "error processing payment" })
    }


}