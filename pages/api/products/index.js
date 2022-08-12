import initDB from '../../../helpers/initDB';
import Product from '../../../models/Product';

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



const getallProducts = async (req, res) =>
{
    try {
        console.log("GET PRODUCTS");
        const products = await Product.find()
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
    console.log(req.body);

    // try {
    //     const result = await auth(req, res)
    //     if (result.data.role !== 'root') {
    //         return res.status(200).json({
    //             status: false,
    //             message: "You are not authorized to perform this action",
    //             data: {}
    //         })
    //     }

    //     const { title, price, inStock, description, content, category, images, image } = req.body

    //     if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0 || !image) {
    //         {
    //             return res.status(200).json({
    //                 status: false,
    //                 message: "Please fill all the fields",
    //                 data: {}
    //             })

    //         }
    //     }
    //     const newProduct = new Product({
    //         title: title.toLowerCase(), price, inStock, description, content, category, images, image
    //     })

    //     await newProduct.save()

    //     return res.status(200).json({
    //         status: true,
    //         message: "Product Saved",
    //         data: newProduct
    //     })

    // } catch (err) {
    //     return res.status(200).json(
    //         {
    //             status: false,
    //             message: err.message || "Something Wrong",
    //             data: {}
    //         })
    // }
}