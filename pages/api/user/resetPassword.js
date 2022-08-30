
import bcrypt from 'bcryptjs';
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}


const resetPassword = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { newPassword, username } = req.body
        const passwordHash = await bcrypt.hash(newPassword, 12)

        const updatedUser = await User.findOneAndUpdate({ _id: result.data._id },
            {
                password: passwordHash,
                username: username
            }, { new: true, useFindAndModify: false }
        )
        const { __v, password, ...info } = updatedUser._doc
        return res.status(200).json({
            message: "Password Successfully Updated!",
            status: true,
            data: { ...info }
        })

    } catch (err) {
        return res.status(200).json({
            message: err.message,
            status: false,
            data: {}
        })
    }
}