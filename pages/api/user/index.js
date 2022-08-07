
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case "PATCH":
            await uploadInfo(req, res)
            break;
    }
}

const uploadInfo = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        const { avatar } = req.body

        const newUser = await User.findOneAndUpdate({ _id: result.data._id },
            { image: avatar }, { new: true }
        )

        res.json({
            message: "Image Successfully Updated!",
            status: true,
            data: {
                username: newUser.username,
                image: newUser.image,
                email: newUser.email,
                role: newUser.role,
                isActive: newUser.isActive,
                _id: newUser._id,
                createAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (err) {
        return res.status(200).json({
            message: "Image Update Failed!",
            status: false,
            error: err.message,
            data: {}
        })
    }
}