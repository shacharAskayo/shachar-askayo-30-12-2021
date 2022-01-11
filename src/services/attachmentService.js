import storageService from "./storageService"
import utilsService from "./utilsService"

export default {
    loadAttachment,
    addAttachmentPost,
    deleteAttachmentPost
}

function loadAttachment(locationKey) {
    var storgedAttachments = storageService.query('attachments')

    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.locationKey === locationKey)
        if (currAttachment) return currAttachment
        else return { id: utilsService.makeId(), locationKey, posts: [] }
    } else { return { id: utilsService.makeId(), locationKey, posts: [] } }

}

function addAttachmentPost(fullWeather, newPost) {

    const fullWeatherCopy = JSON.parse(JSON.stringify(fullWeather))
    fullWeatherCopy.attachment.posts.unshift({ ...newPost })

    var storgedAttachments = storageService.query('attachments')


    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.id === fullWeather.attachment.id)
        if (currAttachment) {
            const updatedAttachments = storgedAttachments.map(attachment => attachment.id === currAttachment.id ? fullWeatherCopy.attachment : attachment)
            storageService.save('attachments', updatedAttachments)
        }
        else {
            storgedAttachments.unshift(fullWeatherCopy.attachment)
            storageService.save('attachments', storgedAttachments)
        }
    }
    else { storageService.save('attachments', [fullWeatherCopy.attachment]) }
    return fullWeatherCopy

}

function deleteAttachmentPost(fullWeather, currPost) {

    const fullWeatherCopy = JSON.parse(JSON.stringify(fullWeather))
    const { attachment } = fullWeatherCopy
    const idx = attachment.posts.findIndex(post => post.id === currPost.id)
    attachment.posts.splice(idx, 1)
    var storgedAttachments = storageService.query('attachments')
    const updatedAttachments = storgedAttachments.map(attach => attach.id === attachment.id ? attachment : attach)
    storageService.save('attachments',updatedAttachments)
    fullWeatherCopy.attachment = attachment
    return fullWeatherCopy

}
