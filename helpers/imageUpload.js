export const imageUpload = async (images) =>
{
    let imgArr = []
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", 'next_mystore')
        formData.append("cloud_name", 'x-gwkjs-8zn7m-3')
        const res = await fetch('https://api.cloudinary.com/v1_1/x-gwkjs-8zn7m-3/image/upload', {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({
            public_id: data.public_id,
            url: data.secure_url
        })
    }
    return imgArr;
}