import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';

initDB()
export default async (req, res) =>
{
    switch (req.method) {
        case "POST":
            await bulkDeleteProduct(req, res)
            break
    }
}


const bulkDeleteProduct = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        if (result.data.role !== 'root') {
            return res.status(200).json({
                status: false,
                message: "You are not authorized to perform this action",
                data: {}
            })
        }
        req.body.length > 1 && req.body.forEach(x =>
        {
            console.log(x._id);
            console.log(x.isActive);
            // const updated = await Product.findOneAndUpdate({ _id: x._id }, {
            //     isActive: false
            // })
            // if (!updated) {
            //     return res.status(200).json({
            //         status: false,
            //         message: "Product not found",
            //         data: {}
            //     })
            // }

        })
        return res.status(200).json(
            {
                status: true,
                message: "Product Status Updated",
                data: {}
            })


    } catch (error) {
        return res.status(200).json(
            {
                status: false,
                message: error.message || "Something Wrong",
                data: {}
            })
    }
}