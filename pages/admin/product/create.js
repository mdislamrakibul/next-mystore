import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useState } from 'react';
import Loading from '../../../components/Loading';
import { postData } from '../../../helpers/dataOps';
import { imageUpload } from '../../../helpers/imageUpload';
import { errorMsg } from '../../../helpers/Toastify';
import { DataContext } from '../../../store/GlobalState';
import { putData } from './../../../helpers/dataOps';
import { successMsg } from './../../../helpers/Toastify';

const ProductCreate = () =>
{
    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: ''
    }
    const { state, dispatch } = useContext(DataContext)
    const { categories } = state

    const [product, setProduct] = useState(initialState)
    const { title, price, inStock, description, content, category } = product
    const [images, setImages] = useState([])
    const [image, setImage] = useState([])

    const router = useRouter()
    const { id } = router.query
    const [onEdit, setOnEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const { token } = parseCookies()
    const handleChangeInput = e =>
    {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleMultipleUploadInput = e =>
    {
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if (files.length === 0) {
            errorMsg('Please select at least one image')
            return
        }

        files.forEach(file =>
        {
            if (file.size > 1024 * 1024)
                return err = 'The largest image size is 1mb'

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return err = 'Image format is incorrect.'

            num += 1;
            if (num <= 5) newImages.push(file)
            return newImages;
        })

        if (err) {
            errorMsg(err)
            return
        }

        const imgCount = images.length
        if (imgCount + newImages.length > 5) {
            errorMsg('You can only upload 5 images')
            return
        }
        setImages([...images, ...newImages])
    }
    const deleteMultipleImage = index =>
    {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const handleSingleUploadInput = e =>
    {
        const file = e.target.files[0]
        if (!file) {
            errorMsg("Please select an image")
            return
        }

        if (file.size > 1024 * 1024) //1mb
        {
            errorMsg("Image size should be less than 1mb")
            return
        }

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            errorMsg("Image should be jpeg or png")
            return
        }
        setImage([file])
    }
    const deleteSingleImage = index =>
    {
        setImage([])
    }


    const handleSubmit = async (e) =>
    {
        console.log('images = ' + images);
        console.log('image = ' + image);
        e.preventDefault()
        if (user.role !== 'root') {
            errorMsg('You are not authorized to perform this action')
            return
        }

        if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0 || !image) {

            errorMsg('Please fill all the fields')
            return
        }

        setIsLoading(true)


        let media = []
        const imagesNewURL = images.filter(img => !img.url)
        const imagesOldURL = images.filter(img => img.url)


        const imageNewURL = image.filter(img => !img.url)
        const imageOldURL = image.filter(img => img.url)
        let mediaImages = [];
        let mediaImage = [];
        if (imagesNewURL.length > 0) { mediaImages = await imageUpload(imagesNewURL) }
        if (imageNewURL.length > 0) { mediaImage = await imageUpload(imageNewURL) }

        let res;
        if (onEdit) {
            res = await putData(`products/${id}`, {
                ...product,
                images: [...imagesOldURL, ...mediaImages],
                images: [...imageOldURL, ...mediaImage],
            }, token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        } else {
            res = await postData('products', {
                ...product,
                images: [...imagesOldURL, ...mediaImages],
                image: [...imageOldURL, ...mediaImage],
            }, token)
            if (!res.status) {
                errorMsg(res.message)
                return
            }
            // if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        setIsLoading(false)
        successMsg(res.message)
        setProduct(initialState)
        setImages([])
        setImage([])
    }
    return (

        <div>
            {isLoading && <Loading />}
            <Head>
                <title>Product</title>
            </Head>
            <div className='row'>
                <div>
                    <h5>Information Section</h5>
                </div>
                <hr />
                <div className='col-md-6 my-4'>

                    <div className="mb-3 row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" name="title" id="title"
                                value={title} className="form-control" onChange={handleChangeInput}
                                placeholder="Product Title" />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                            <input type="number" name="price" id="price"
                                value={price} className="form-control" onChange={handleChangeInput}
                                placeholder="Product Price" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea name="description" id="description" cols="30" rows="5"
                                placeholder="Description" onChange={handleChangeInput}
                                className="form-control" value={description} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 my-4'>
                    <div className="mb-3 row">
                        <label htmlFor="inStock" className="col-sm-2 col-form-label">In Stock</label>
                        <div className="col-sm-10">
                            <input type="number" name="inStock" id="inStock" value={inStock}
                                placeholder="In Stock" className="form-control"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            <select className="form-select" name="category" id="category" value={category}
                                onChange={handleChangeInput} >
                                <option value="all">All Products</option>
                                {
                                    categories.map(item => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>


                    <div className="mb-3 row">
                        <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
                        <div className="col-sm-10">
                            <textarea name="content" id="content" cols="30" rows="5"
                                placeholder="Content" onChange={handleChangeInput}
                                className="form-control" value={content} />
                        </div>
                    </div>

                </div>
            </div>
            <div className='row'>
                <div>
                    <h5>Media Section</h5>
                </div>
                <hr />
                <div className="col-md-6 my-4">
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">Sample Image [ not more than 5 ]</label>
                        <input className="form-control" type="file" id="images"
                            onChange={handleMultipleUploadInput}
                            multiple
                            accept="image/*" />
                    </div>

                    <div className="row img-up mx-0">
                        {
                            images.length > 0 && images.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                        alt="" className="img-thumbnail rounded" />

                                    <span onClick={() => deleteMultipleImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-6 my-4">
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Product Image</label>
                        <input className="form-control" type="file" id="image"
                            onChange={handleSingleUploadInput}
                            multiple
                            accept="image/*" />
                    </div>

                    <div className="row img-up mx-0">
                        {
                            image.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                        alt="" className="img-thumbnail rounded" />

                                    <span onClick={() => deleteSingleImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className='row'>
                <div className="">
                    <button type="submit" className="btn btn-info btn-sm my-2 px-4" onClick={(e) => handleSubmit(e)}>
                        <i className="fas fa-plus-circle"></i>&nbsp;{onEdit ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProductCreate