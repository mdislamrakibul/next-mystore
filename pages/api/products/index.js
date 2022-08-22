import initDB from '../../../helpers/initDB';
import Product from '../../../models/Product';
import auth from './../../../helpers/auth';

initDB()
export default async (req, res) =>
{

    switch (req.method) {
        case "GET":
            await getallProducts(req, res)
            break
        case "POST":
            await saveProduct(req, res)
            break
    }
}

class APIfeatures
{
    constructor(query, queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }
    filtering()
    {
        const queryObj = { ...this.queryString }

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete (queryObj[el]))

        if (queryObj.category !== 'all')
            this.query.find({ category: queryObj.category })
        if (queryObj.title !== 'all')
            this.query.find({ title: { $regex: queryObj.title } })

        this.query.find()
        return this;
    }

    sorting()
    {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating()
    {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getallProducts = async (req, res) =>
{
    try {
        const features = new APIfeatures(Product.find({ isActive: true }), req.query)
            .filtering().sorting().paginating()

        const products = await features.query

        if (products.length > 0) {
            return res.status(200).json({
                status: true,
                data: products,
                message: "Product List Found",
                total: products.length
            })
        }
        return res.status(200).json({
            status: true,
            data: products,
            message: "Product List Not Found",
            total: products.length
        })
    } catch (err) {
        return res.status(200).json({
            status: false,
            data: err,
            message: "Something Wrong",
            total: 0
        })
    }

}


const saveProduct = async (req, res) =>
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

        const { title, price, inStock, description, content, category, images, image } = req.body

        if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0 || !image) {
            {
                return res.status(200).json({
                    status: false,
                    message: "Please fill all the fields",
                    data: {}
                })

            }
        }
        const newProduct = new Product({
            title: title.toLowerCase(),
            price,
            inStock,
            description,
            content,
            category,
            images,
            image: image[0].url
        })

        await newProduct.save()

        return res.status(200).json({
            status: true,
            message: "Product Saved",
            data: newProduct
        })

    } catch (err) {
        return res.status(200).json(
            {
                status: false,
                message: err.message || "Something Wrong",
                data: {}
            })
    }
}