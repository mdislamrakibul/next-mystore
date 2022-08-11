
import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import Category from '../../../models/Category';
import Product from '../../../models/Product';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case "PUT":
            await updateCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const updateCategory = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        if (result.data.role !== 'root')
            return res.status(200).json({
                status: false,
                message: "Authentication is not valid.",
                data: {}
            })

        const { id } = req.query
        const { name } = req.body

        const newCategory = await Category.findOneAndUpdate({ _id: id }, { name: name }, { new: true })
        return res.status(200).json({
            status: true,
            message: "Success! Update a new category",
            data: {
                ...newCategory._doc,
                name
            }
        })
    } catch (err) {
        return res.status(200).json({
            status: false,
            message: err.message || "Something went wrong.",
            data: {}
        })
    }
}

const deleteCategory = async (req, res) =>
{
    try {
        const result = await auth(req, res)
        if (result.data.role !== 'root')
            return res.status(200).json({
                status: false,
                message: "Authentication is not valid.",
                data: {}
            })

        const { id } = req.query

        const products = await Product.findOne({ category: id })

        if (products) return res.status(200).json({
            status: false,
            message: "Please delete all products of this category first",
            data: {}
        })

        await Category.findByIdAndDelete(id)

        return res.status(200).json({
            status: true,
            message: "Success! Deleted a category",
            data: {}
        })
    } catch (err) {
        return res.status(200).json({
            status: false,
            message: err.message || "Something went wrong.",
            data: {}
        })
    }
}