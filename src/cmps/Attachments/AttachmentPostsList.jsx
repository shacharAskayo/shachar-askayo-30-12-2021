import AttachmentPostPreview from './AttachmentPostPreview';

export default function AttachmentPostsList({ posts, onDeleteAttachment }) {
    return (
        <div className="posts-container flex ">
            {posts.map(post =>
                <AttachmentPostPreview key={post.id} post={post} onDeleteAttachment={onDeleteAttachment} />
            )}
        </div>
    )
}
