import Authenticated from '../../helpers/Authenticated';
import User from '../../models/User';


export default async (req, res) =>
{
    switch (req.method) {
        case "GET":

            await fetchUsers(req, res)
            break
        case "PUT":
            if (req.headers.isactive) {
                await changeActivity(req, res)
                break
            }
            await ChangeRole(req, res)
            break

    }
}


const fetchUsers = Authenticated(async (req, res) =>
{
    // const users = await User.find({ _id: { $ne: req.userId } }).select("-password")
    const users = await User.find().select("-password")
    if (!users) {
        return res.status(200).json({
            message: "No users found",
            status: false,
            data: users
        })
    }
    return res.status(200).json({
        message: "Users found",
        status: true,
        data: users
    })
})

const ChangeRole = Authenticated(async (req, res) =>
{
    const { _id, role } = req.body
    const newRole = role == "user" ? "admin" : "user"
    const users = await User.findOneAndUpdate(
        {
            $and: [
                { isActive: true },
                { _id: _id }
            ]
        },
        { role: newRole },
        { new: true }
    ).select("-password")

    if (!users) {
        return res.status(200).json({
            message: "User needs to be active to change role",
            status: false,
            data: users
        })
    }
    return res.status(200).json({
        message: "Role has been changed",
        status: true,
        data: users
    })
})


const changeActivity = Authenticated(async (req, res) =>
{
    const { _id, isActive } = req.body
    const newAct = isActive ? false : true
    const users = await User.findOneAndUpdate(
        {
            $and: [
                { _id: _id }
            ]
        },
        { isActive: newAct },
        { new: true }
    ).select("-password")

    if (!users) {
        return res.status(200).json({
            message: "Not Updated",
            status: false,
            data: users
        })
    }
    return res.status(200).json({
        message: "Updated Successfully",
        status: true,
        data: users
    })
})