import initDB from '../../../helpers/initDB'
import Product from '../../../models/Product'

initDB()

export default async (req, res) =>
{
  switch (req.method) {
    case "GET":
      await getProduct(req, res)
      break;
    case "PUT":
      await updateProduct(req, res)
      break;
    case "DELETE":
      await deleteProduct(req, res)
      break;
  }

}


const getProduct = async (req, res) =>
{
  const { pid } = req.query
  try {
    const product = await Product.findOne({ _id: pid })
    if (!product) {
      return res.status(200).json({
        message: "Product not found",
        status: false,
        data: {}
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Product Found',
      data: product
    })
  } catch (error) {
    return res.status(200).json({
      message: "Something Wrong",
      status: false,
      data: error
    })
  }
}

const deleteProduct = async (req, res) =>
{
  const { pid } = req.query
  await Product.findByIdAndDelete({ _id: pid })
  res.status(200).json({})
}

const updateProduct = async (req, res) =>
{
  try {
    const result = await auth(req, res)
    if (result.data.role !== 'root') {
      return res.status(200).json({
        message: "You are not authorized to update product",
        status: false,
        data: {}
      })
    }

    const { id } = req.query
    const { title, price, inStock, description, content, category, images, image } = req.body

    if (!title || !price || !inStock || !description || !content || category === 'all'
      || images.length === 0 || !image) {
      return res.status(200).json({
        message: "Please fill all fields",
        status: false,
        data: {}
      })
    }
    const newProd = await Product.findOneAndUpdate({ _id: id }, {
      title: title.toLowerCase(), price, inStock, description, content, category, image: image[0].url
    }, { new: true })

    return res.status(200).json({
      message: "Product Updated",
      status: true,
      data: newProd
    })

  } catch (err) {
    return res.status(200).json({
      status: false,
      message: err.message || "Something Wrong",
      data: {}
    })
  }
}