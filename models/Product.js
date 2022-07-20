
import { model, models, Schema } from "mongoose";
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
    { timestamps: true });


const Product = models.Product || model('Product', ProductSchema);
export default Product;