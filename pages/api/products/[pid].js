import initDB from '../../../helpers/initDB'
import Product from '../../../models/Product'

initDB()

export default async (req, res) =>
{
  switch (req.method) {
    case "GET":
      await getProduct(req, res)
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