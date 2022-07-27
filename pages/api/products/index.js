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
        const products = await Product.find()
        res.status(200).json({
            status: true,
            data: products,
            message: "success",
            total: products.length
        })
    } catch (err) {
        console.log({
            status: false,
            data: err,
            message: "error",
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