import React, { useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import weatherService from '../services/weatherService'
import { addAttachmentPost } from '../store/actions/weatherActions'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';


export default function AttachmentPosts({ dispatch, fullWeather }) {

    const [txt, setTxt] = useState('')
    const [img, setImg] = useState('')


    const onPost = (ev) => {
        ev.preventDefault()
        dispatch(addAttachmentPost(fullWeather, { title: txt, img, id: Math.random(14923238346) }))
        setTxt('')
    }

    const handleImgUploade = async (ev) => {
        const img = ev.target.files[0]
        const uploadedImg = await cloudinaryService.uploadImg(img)
        setImg(uploadedImg.secure_url)
    }
    return (
        <div className='attachments-container flex col'>

            <div className="inputs-container">
                <form onSubmit={onPost}>
                    <input type="text" placeholder='Add title' value={txt} onChange={({ target }) => setTxt(target.value)} />
                    <label htmlFor="file-input">

                    <div className="add-img-container flex alig-c">
                        <span>
                            Add image
                        </span>
                        <PhotoLibraryIcon />
                    </div>
                    </label>
                    <input hidden type="file" id='file-input' onChange={handleImgUploade} />
                    <button >post</button>
                </form>
            </div>


            <div className="posts-container flex justify-sb">

                {fullWeather.attachment.posts.map(post => {
                    return (
                        <div className='post-preview' key={post.id}>
                            <span>
                                {post.title}
                            </span>
                            {post.img && <img src={post.img} alt="" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
