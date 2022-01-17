import AttachmentAdd from './AttachmentAdd';
import { addAttachmentPost, deleteAttachmentPost } from '../../store/actions/weatherActions';
import AttachmentPostsList from './AttachmentPostsList';
import { memo } from 'react';

export default memo(function Attachments({ dispatch, fullWeather }) {

    const onAddAttachmentPost = (post) => dispatch(addAttachmentPost(fullWeather, post))
    const onDeleteAttachment = (post) => dispatch(deleteAttachmentPost(fullWeather, post))

    return (
        <div className='attachments-container flex col'>
            <span className='container-title'> Attachments</span>
            <AttachmentAdd onAddAttachmentPost={onAddAttachmentPost} />
            <AttachmentPostsList posts={fullWeather.attachment.posts} onDeleteAttachment={onDeleteAttachment} />
        </div>
    )
})
