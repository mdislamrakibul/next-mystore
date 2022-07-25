import { model, models, Schema } from 'mongoose';

const CartSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    products: [
        {
            quantity: { type: Number, default: 1 },
            product: { type: Schema.ObjectId, ref: "Product" }
        }
    ]
})

export default models.Cart || model("Cart", CartSchema)