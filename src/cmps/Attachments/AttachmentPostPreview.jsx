import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function AttachmentPostPreview({ post, onDeleteAttachment }) {
    return (
        <div className='post-preview' >
            <DeleteForeverIcon onClick={() => onDeleteAttachment(post)} />
            <span>
                {post.title}
            </span>
            {post.img && <img src={post.img} alt="" />}
        </div>
    )
}
