import { useState } from 'react'
import { cloudinaryService } from '../../services/cloudinaryService'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { Skeleton } from '@mui/material';

export default function AttachmentAdd({ onAddAttachmentPost }) {

    const [newPost, setNewPost] = useState({ title: '', img: '' })

    const onPost = (ev) => {
        ev.preventDefault()
        if (newPost.title.length > 0 || newPost.img.length > 0) {
            onAddAttachmentPost({ ...newPost, id: Math.random(14923238346) })
            setNewPost({ title: '', img: '' })
        }
    }

    const handleImgUpload = async (ev) => {
        const img = ev.target.files[0]
        setNewPost({ ...newPost, img: 'loading' })
        const uploadedImg = await cloudinaryService.uploadImg(img)
        setNewPost({ ...newPost, img: uploadedImg?.secure_url })
    }

    const handleInput = ({ target }) => {
        const { value } = target
        if (value.length <= 30) setNewPost({ ...newPost, title: value })
    }

    return (
        <div className="inputs-container flex">
            <form onSubmit={onPost}>
                <div className="input-and-counter flex ">
                    <input type="text" placeholder='Add title' value={newPost.title} onChange={handleInput} />
                    <span>{newPost.title.length} / 30 letters</span>
                </div>
                <label htmlFor="file-input">
                    <div className="add-img-container flex alig-c">
                        <span>
                            Add image
                        </span>
                        <PhotoLibraryIcon />
                    </div>
                </label>
                <input hidden type="file" id='file-input' onChange={handleImgUpload} />
                <button >post</button>
            </form>
            {newPost.img === 'loading' ?
                < Skeleton animation="wave" width={100} height={100} /> :
                newPost.img && <img src={newPost.img} alt="" />
            }
        </div>
    )
}
