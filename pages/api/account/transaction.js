import initDb from '../../../helpers/initDB'
import auth from '../../../helpers/auth'
import OnlinePay from '../../../models/OnlinePay'
import { errorResponse, successResponse } from '../../../helpers/response';
initDb()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getOnlinePayment(req, res);
            break

    }
}

const getOnlinePayment = async (req, res) => {

    try {
        const authResp = await auth(req, res)
        let onlinePays;
        if (authResp.data.role === 'user') {
            onlinePays = await OnlinePay.find({ user: authResp.data._id }).populate("user", "-password")
        } else {
            onlinePays = await OnlinePay.find().populate("user", "-password")
        }

        if (!onlinePays) {
            return res.status(200).json(
                {
                    message: 'online Pay List not Found',
                    status: false,
                    data: [],
                    total: []
                }
            )
        }
        return res.status(200).json(
            {
                message: 'online Pay List Found',
                status: true,
                data: onlinePays,
                total: onlinePays.length
            }
        )


    } catch (err) {
        return res.status(401).json({
            status: true,
            message: "error processing OnlinePay",
            data: {}
        })
    }


}

