import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1658488363/user_icon_png_1449226_jbw7dr.png",
        required: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", 'female']
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", 'admin', 'root']
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true
})


export default models.User || model('User', userSchema)