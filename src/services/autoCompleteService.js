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
    const storgedMatchs = storageService.query('locations',txt)
    if (storgedMatchs && storgedMatchs.length > 0) return storgedMatchs
    else {
        try {
            const autoCompleteResults = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${txt}`)
            if (autoCompleteResults.data?.length > 0) {
                storageService.addAutoCompleteLocations('locations',autoCompleteResults.data)
                return JSON.parse(JSON.stringify(autoCompleteResults.data))
            }
        } catch (err) { console.log('Error in getAutoCompleteResults in autoCompleteService ., Error:', err); }
    }
}
