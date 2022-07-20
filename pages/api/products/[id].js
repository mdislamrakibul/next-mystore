/* eslint-disable import/no-anonymous-default-export */

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
    const { id } = req.query
    const product = await Product.findOne({ _id: id })
    res.status(200).json({
        status: true,
        data: product,
        message: "success",
        total: 1
    })
}

const deleteProduct = async (req, res) =>
{
    const { id } = req.query
    await Product.findByIdAndDelete({ _id: id })
    res.status(200).json({
        status: true,
        data: {},
        message: "success",
        total: 1
    })
}