import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
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
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", 'admin', 'root']
    }
}, {
    timestamps: true
})


const User = models.User || model('User', userSchema);
export default User;