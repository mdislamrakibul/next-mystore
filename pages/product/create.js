/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import baseUrl from '../../helpers/baseUrl'
const Create = () =>
{
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const clearImage = (e) =>
    {
        e.preventDefault()
        setImage('')
        console.log(image);
    }
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const url = await imageUpload(image)
        try {
            const resp = await fetch(`${baseUrl}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                    image: url
                })
            })

            const res = await resp.json()
            console.log("🚀 ~ file: create.js ~ line 29 ~ res", res)
            if (!res.status) {
                M.toast({ html: res.message, classes: "red" })
            } else {
                M.toast({ html: res.message, classes: "green" })
                setName('')
                setDescription('')
                setPrice('')
                setImage('')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const imageUpload = async (image) =>
    {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', "next_mystore")
        data.append('cloud_name', "x-gwkjs-8zn7m-3")
        const res = await fetch("	https://api.cloudinary.com/v1_1/x-gwkjs-8zn7m-3/image/upload", {
            method: "POST",
            body: data
        })
        const res2 = await res.json()
        return res2.url
    }
    return (
        <div>
            <form className='container'>
                <div className="row">
                    <div className="input-field col s6">
                        <input placeholder="Name" type="text" className="validate" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <label>Name</label>
                    </div>

                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input placeholder="Price" type="text" className="validate" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        <label>Price</label>
                    </div>

                </div>
                <div className="row">
                    <div className="file-field input-field col s6">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" accept='image/*' name="image" onChange={(e) => { setImage(e.target.files[0]) }} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <br />
                    <div className='col s6'>
                        {image ? <div>
                            <button className="btn-floating btn-large waves-effect waves-light red"
                                onClick={(e) => { clearImage(e) }}>
                                <i className="material-icons">close</i>
                            </button>
                        </div> : null}

                        <img className='responsive-image' alt="" src={image ? URL.createObjectURL(image) : ""} style={{ width: '150px' }} />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <textarea name="description" className="materialize-textarea" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>

                </div>
                <div className='row'>
                    <button className="btn waves-effect waves-light" onClick={(e) => handleSubmit(e)}>
                        <i className="material-icons left">save</i>Save
                    </button>
                </div>
            </form>
        </div >
    )
}

export default Create