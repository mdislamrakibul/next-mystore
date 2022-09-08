import jwt from 'jsonwebtoken'

function Authenticated(icomponent) {
    return (req, res) => {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(200).json({
                message: "You are not authenticated",
                status: false
            })
        }
        try {
            const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
            req.userId = userId
            return icomponent(req, res)
        } catch (err) {
            return res.status(200).json({
                message: "You are not authenticated",
                status: false
            })
        }

    }
}


export default Authenticated