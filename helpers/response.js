export const successResponse = (res, status, message, data) => {
    return res.status(200).json(
        {
            status: status,
            message: message,
            data: data
        }
    )
}
export const errorResponse = (res, status, message, data) => {
    return res.status(200).json(
        {
            status: status,
            message: message,
            data: data
        }
    )
}