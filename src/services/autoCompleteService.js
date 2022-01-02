import { storageService } from "./asyncStorageService";
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: false
})

const API_KEY = 'OQ7UXb4DY0wHjgeqgmZAAUiG3YzRWlSh'

export default {
    getAutoCompleteResults
}

async function getAutoCompleteResults(txt) {
    const storgedAutoComplete = JSON.parse(localStorage.getItem('locations'))
    const storgedMatches = storgedAutoComplete.filter(location => location.LocalizedName.toLowerCase().startsWith(txt.toLowerCase()))
    if (storgedMatches && storgedMatches.length > 0) return storgedMatches
    else {
        try {
            const autoCompleteResults = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${txt}`)
            if (autoCompleteResults.data?.length > 0) {
                if (storgedAutoComplete.length > 0) {
                    autoCompleteResults.map(location => storgedAutoComplete.every(loc => loc.LocalizedName !== location.LocalizedName) ? storgedAutoComplete.push(location) : null)
                    localStorage.setItem('locations', JSON.stringify(storgedAutoComplete))
                } else {
                    localStorage.setItem('locations', JSON.stringify(autoCompleteResults))
                }
                return JSON.parse(JSON.stringify(autoCompleteResults.data))
            }
        } catch (err) { console.log('Error in getAutoCompleteResults in autoCompleteService ., Error:', err); }
    }
}

