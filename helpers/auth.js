import jwt from 'jsonwebtoken';
import Users from '../models/User';


const auth = async (req, res) =>
{
    const token = req.headers.authorization.split(' ')[1];
    // console.log("🚀 ~ file: auth.js ~ line 8 ~ token", token)
    if (!token) {
        return res.status(200).json({
            status: false,
            message: 'Invalid Authentication.',
            data: {}
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("🚀 ~ file: auth.js ~ line 18 ~ decoded", decoded)

    if (!decoded) {
        return res.status(200).json({
            status: false,
            message: 'Invalid Authentication.',
            data: {}
        })
    }

    if (!decoded.isActive) {
        return res.status(200).json({
            status: false,
            message: 'Inactive User.',
            data: {}
        })
    }

    const user = await Users.findOne({ _id: decoded.userId })
    // console.log("🚀 ~ file: auth.js ~ line 37 ~ user", user)

    if (!user) {
        return res.status(200).json({
            message: "User Not Found",
            status: false,
            data: {}
        })
    }
    return {
        message: "User Found",
        status: true,
        data: {
            _id: user._id,
            role: user.role,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
        }
    }
}


export default auth