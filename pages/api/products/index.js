import Product from '../../../models/Product'

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
        console.log("GET");
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

    const { name, price, description, mediaUrl } = req.body
    try {
        if (!name || !price || !description || !mediaUrl) {
            return res.status(422).json({ error: "Please add all the fields" })
        }
        const product = await new Product({
            name,
            price,
            description,
            mediaUrl
        }).save()
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: "internal server error" })
        console.log(err)
    }
}