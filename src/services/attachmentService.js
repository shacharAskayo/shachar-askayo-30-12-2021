import utilsService from "./utilsService"

export default {
    loadAttachment,
    addAttachmentPost,
    deleteAttachmentPost
}

function loadAttachment(cityName, countryName) {

    var storgedAttachments = JSON.parse(localStorage.getItem('attachments'))
    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.cityName === cityName && attachment.countryName === countryName)
        if (currAttachment) return currAttachment
        else return { id: utilsService.makeId(), cityName, countryName, posts: [] }
    } else { return { id: utilsService.makeId(), cityName, countryName, posts: [] } }

}

function addAttachmentPost(fullWeather, newPost) {

    const fullWeatherCopy = JSON.parse(JSON.stringify(fullWeather))
    fullWeatherCopy.attachment.posts.unshift({ ...newPost })
    var storgedAttachments = JSON.parse(localStorage.getItem('attachments'))
    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.id === fullWeather.attachment.id)
        if (currAttachment) {
            currAttachment.posts.unshift({ ...newPost })
            const updatedAttachments = storgedAttachments.map(attachment => attachment.id === currAttachment.id ? currAttachment : attachment)
            localStorage.setItem('attachments', JSON.stringify(updatedAttachments))
        }
        else {
            storgedAttachments.unshift(fullWeatherCopy.attachment)
            localStorage.setItem('attachments', JSON.stringify(storgedAttachments))
        }
    }
    else { localStorage.setItem('attachments', JSON.stringify([fullWeatherCopy.attachment])) }
    return fullWeatherCopy

}

function deleteAttachmentPost(fullWeather, currPost) {

    const fullWeatherCopy = JSON.parse(JSON.stringify(fullWeather))
    const { attachment } = fullWeatherCopy
    const idx = attachment.posts.findIndex(post => post.id === currPost.id)
    attachment.posts.splice(idx, 1)
    var storgedAttachments = JSON.parse(localStorage.getItem('attachments'))
    const updatedAttachments = storgedAttachments.map(attach => attach.id === attachment.id ? attachment : attach)
    localStorage.setItem('attachments', JSON.stringify(updatedAttachments))
    fullWeatherCopy.attachment = attachment
    return fullWeatherCopy

}
