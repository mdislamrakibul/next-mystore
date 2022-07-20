/* eslint-disable import/no-anonymous-default-export */

import initDB from '../../../helpers/initDB';
import Product from "../../../models/Product";

export default async (req, res) =>
{
    switch (req.method) {
        case 'GET':
            await getProducts(req, res)
            break;
        case 'POST':
            await addProduct(req, res)
            break;
    }
}


const getProducts = async (req, res) =>
{
    await initDB();
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

const addProduct = async (req, res) =>
{
    await initDB();
    const { name, price, description, image } = req.body
    try {
        if (!name || !price || !description || !image) {
            return res.status(200).json(
                {
                    status: false,
                    data: {},
                    message: "Fill all fields",
                    total: 0
                }
            )
        }
        const product = await new Product({
            name,
            price,
            description,
            image
        }).save()
        res.status(200).json({
            status: true,
            data: product,
            message: "success",
            total: 1
        })
    } catch (err) {
        res.status(false).json({
            status: false,
            data: err,
            message: "internal server error",
            total: 0
        })
    }
}