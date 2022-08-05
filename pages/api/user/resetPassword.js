
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
        console.log("🚀 ~ file: resetPassword.js ~ line 23 ~ result", result)
        const { password, username } = req.body
        const passwordHash = await bcrypt.hash(password, 12)

        await User.findOneAndUpdate({ _id: result.data._id }, { password: passwordHash, username: username })

        res.json({ msg: "Update Success!" })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}