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