import utilsService from "./utilsService"

export default{
    loadAttachment,
    addAttachmentPost
}

function loadAttachment(cityName, countryName) {
    var storgedAttachments = JSON.parse(localStorage.getItem('attachments'))
    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.cityName === cityName && attachment.countryName === countryName)
        if (currAttachment) return currAttachment
        else return { id: utilsService.makeId(), cityName, countryName, posts: [] }
    } else {
        return { id: utilsService.makeId(), cityName, countryName, posts: [] }
    }
}

function addAttachmentPost(fullWeather, newPost) {
    const fullWeatherCopy = JSON.parse(JSON.stringify(fullWeather))
    fullWeatherCopy.attachment.posts.push({ ...newPost })
    var storgedAttachments = JSON.parse(localStorage.getItem('attachments'))
    if (storgedAttachments && storgedAttachments.length > 0) {
        const currAttachment = storgedAttachments.find(attachment => attachment.id === fullWeather.attachment.id)
        if (currAttachment) {
            currAttachment.posts.push({ ...newPost })
            const updatedAttachments = storgedAttachments.map(attachment => attachment.id === currAttachment.id ? currAttachment : attachment)
            localStorage.setItem('attachments', JSON.stringify(updatedAttachments))
        }
        else {
            storgedAttachments.push(fullWeatherCopy.attachment)
            localStorage.setItem('attachments', JSON.stringify(storgedAttachments))
        }
    }
    else {
        localStorage.setItem('attachments', JSON.stringify([fullWeatherCopy.attachment]))
    }
    return fullWeatherCopy
}
