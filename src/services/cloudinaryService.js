export const cloudinaryService = {
    
  async  uploadImg(file) {
    const CLOUD_NAME = "askayo"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'pbjiwgrz');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data

    } catch (err) {
        console.log(err);
    }
}
}