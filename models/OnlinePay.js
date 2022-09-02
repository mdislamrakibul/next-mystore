import mongoose, { Date } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const onlinePaySchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User" },
    name: { type: String },
    client_ip: { type: String },
    email: { type: String },
    address_city: { type: String },
    address_country: { type: String },
    address_line1: { type: String },
    address_zip: { type: String },
    totalPrice: { type: Number },
    brand: { type: String },
    country: { type: String },
    exp_month: { type: Number },
    exp_year: { type: Number },
    funding: { type: String },
    card_id: { type: String },
    last4: { type: String },
    client_ip: { type: String },
    token_id: { type: String },
    type: { type: String },
    cart: { type: Array },
    livemode: { type: Boolean },

}, {
    timestamps: true
})


export default mongoose.models.OnlinePay || mongoose.model("OnlinePay", onlinePaySchema)