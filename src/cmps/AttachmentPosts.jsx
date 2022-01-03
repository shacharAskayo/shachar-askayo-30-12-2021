import React, { useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import weatherService from '../services/weatherService'
import { addAttachmentPost, deleteAttachmentPost } from '../store/actions/weatherActions'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { Skeleton } from '@mui/material';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function AttachmentPosts({ dispatch, fullWeather }) {

    const [txt, setTxt] = useState('')
    const [currImg, setCurrImg] = useState('')


    const onPost = (ev) => {
        if (txt.length > 0 || currImg.length > 0) {
            ev.preventDefault()
            dispatch(addAttachmentPost(fullWeather, { title: txt, img: currImg, id: Math.random(14923238346) }))
            setTxt('')
            setCurrImg('')
        }
    }

    const handleImgUploade = async (ev) => {
        const img = ev.target.files[0]
        setCurrImg('loading')
        const uploadedImg = await cloudinaryService.uploadImg(img)
        setCurrImg(uploadedImg?.secure_url)
    }

    const handleInput = ({ target }) => {
        const { value } = target
        if (value.length <= 30) setTxt(value)
    }
    return (
        <div className='attachments-container flex col'>
            <span className='container-title'> Attachments</span>
            <div className="inputs-container flex">
                <form onSubmit={onPost}>
                    <div className="input-and-counter flex ">
                        <input type="text" placeholder='Add title' value={txt} onChange={handleInput} />
                        <span>{txt.length} / 30 letters</span>
                    </div>
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
                {currImg === 'loading' ?
                    < Skeleton animation="wave" width={100} height={100} /> :
                    currImg && <img src={currImg} alt="" />
                }
            </div>

            <div className="posts-container flex justify-sb">

                {fullWeather.attachment.posts.map(post => {
                    return (
                        <div className='post-preview' key={post.id}>
                            <DeleteForeverIcon onClick={() => dispatch(deleteAttachmentPost(fullWeather, post))} />
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
