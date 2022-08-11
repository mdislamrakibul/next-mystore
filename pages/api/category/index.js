import auth from '../../../helpers/auth';
import initDB from '../../../helpers/initDB';
import Category from '../../../models/Category';

initDB()

export default async (req, res) =>
{
    switch (req.method) {
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const createCategory = async (req, res) =>
{
    try {
        const result = await auth(req, res)

        if (result.data.role !== 'root')
            return res.status(200).json({
                status: false,
                message: 'You are not authorized to perform this action.',
                data: {}
            })

        const { name } = req.body

        if (!name) return res.status(200).json({
            status: false,
            message: 'Please provide a name.',
            data: {}
        })

        const newCategory = new Category({ name })

        await newCategory.save()
        return res.status(200).json({
            status: true,
            message: 'Success! Created a new category.',
            data: newCategory
        })

    } catch (err) {
        return res.status(200).json({
            status: false,
            message: err.message || 'Something went wrong.',
            data: {}
        })
    }
}

const getCategories = async (req, res) =>
{
    try {
        const categories = await Category.find()


        if (!categories.length) {
            return res.status(200).json({
                status: false,
                message: 'No categories found.',
                data: {}
            })
        }
        return res.status(200).json({
            status: true,
            message: 'Categories found.',
            data: categories
        })

    } catch (err) {
        return res.status(200).json({
            status: false,
            message: err.message || 'Something went wrong.',
            data: {}
        })
    }
}