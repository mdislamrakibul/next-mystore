
import bcrypt from 'bcryptjs';
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}


const resetPassword = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        const { password, username } = req.body
        const passwordHash = await bcrypt.hash(password, 12)

        await User.findOneAndUpdate({ _id: result.data._id },
            {
                password: passwordHash,
                username: username
            }, { new: true }
        )

        res.json({
            message: "Password Successfully Updated!",
            status: true,
            data: {}
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: {}
        })
    }
}