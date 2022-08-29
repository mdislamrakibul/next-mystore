import mongoose, { Date } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({

    user: { type: ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },

    cart: { type: Array, required: true },
    promoCodeRedeem: { type: Boolean, required: true },
    amountRedeem: { type: Number, required: true },
    paymentId: { type: String, required: true },
    method: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
    dateOfPayment: Date,
    rejectedIs: { type: Boolean, default: false },
    rejectedBy: { type: ObjectId, ref: 'User', },
    rejectedTime: { type: Date }
}, {
    timestamps: true
})


export default mongoose.models.Order || mongoose.model("Order", orderSchema)