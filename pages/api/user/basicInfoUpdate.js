
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import User from '../../../models/User';

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await saveBasicInfo(req, res)
            break;
        case "GET":
            await getBasicInfo(req, res)
            break;
    }
}


const saveBasicInfo = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { firstname, lastname, phone, dob, address, gender } = req.body
        const updatedInfo = await User.findOneAndUpdate({ _id: result.data._id },
            {
                $set: req.body,
            },
            { new: true, useFindAndModify: false }
        )
        if (!updatedInfo) {
            return res.status(200).json({
                message: "BasicInfo not updated!",
                status: false,
                data: {}
            })
        }
        return res.status(200).json({
            message: "BasicInfo Successfully Updated!",
            status: true,
            data: {
                firstname: updatedInfo.firstname,
                lastname: updatedInfo.lastname,
                phone: updatedInfo.phone,
                dob: updatedInfo.dob,
                address: updatedInfo.address,
                gender: updatedInfo.gender
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Something went wrong',
            status: false,
            data: {}
        })
    }
}


const getBasicInfo = async (req, res) => {
    try {
        const result = await auth(req, res)

        const user = await User.findOne({ _id: result.data._id })

        return res.status(200).json({
            message: "BasicInfo found!",
            status: true,
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                dob: user.dob,
                address: user.address,
                gender: user.gender
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Something went wrong',
            status: false,
            data: {}
        })
    }
}