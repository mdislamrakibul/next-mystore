import { model, models, Schema } from 'mongoose'

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    }, {
    timestamps: true
}
)

export default models.Category || model('Category', CategorySchema)