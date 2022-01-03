import Axios from 'axios'
import attachmentService from './attachmentService'
import utilsService from './utilsService'

var axios = Axios.create({
    withCredentials: false
})

const API_KEY = 'OQ7UXb4DY0wHjgeqgmZAAUiG3YzRWlSh'

export default {
    getLocationByCords,
    loadFullWeather,
    loadFavoirteLocations,
    toggleFavorite,
    getAutoCompleteResults,
}


async function getLocationByCords(lat, lon) {

    try {
        const currLocation = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        if (currLocation?.data) {
            const { Key, LocalizedName, Country } = currLocation.data
            return {
                locationKey: Key,
                cityName: LocalizedName,
                countryName: Country.LocalizedName
            }
        }
    } catch (err) { console.log('Error in getLocationByCords in weatherService ., Error:', err); }

}

async function loadFullWeather(locationKey, cityName, countryName) {

    const currWeather = await _getCurrWeather(locationKey)
    const fiveDaysWeather = await _getFiveDayWeather(locationKey)

    if (currWeather && fiveDaysWeather) {
        const fullWeatherObj = {
            createdAt: Date.now(),
            locationKey,
            cityName,
            countryName,
            attachment: attachmentService.loadAttachment(cityName, countryName),
            ...utilsService.getFullWeatherStracturedData(currWeather, fiveDaysWeather)
        }
        localStorage.setItem('fullWeather', JSON.stringify(fullWeatherObj))
        return { fullWeather: fullWeatherObj, errMsg: null }
    }
    else {
        var storedFullWeather = JSON.parse(localStorage.getItem('fullWeather'))
        if (storedFullWeather) return { fullWeather: storedFullWeather, errMsg: `Couldn't load updated weather, showing last weather saved ` }
        else return { fullWeather: null, errMsg: `Couldn't load updated or saved weather ` }
    }
}

function loadFavoirteLocations() {

    var storedFavoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'))
    if (storedFavoriteLocations && storedFavoriteLocations?.length > 0) return storedFavoriteLocations
    else return []

}

async function getAutoCompleteResults(txt) {

    const storgedAutoComplete = JSON.parse(localStorage.getItem('locations')) || []
    const storgedMatches = storgedAutoComplete?.filter(location => location.LocalizedName.toLowerCase().startsWith(txt.toLowerCase()))
    if (storgedMatches && storgedMatches.length > 0) return storgedMatches
    else {
        try {
            const autoCompleteResults = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${txt}`)
            if (autoCompleteResults.data?.length > 0) {
                if (storgedAutoComplete.length > 0) {
                    autoCompleteResults.data.map(location => storgedAutoComplete.every(loc => loc.LocalizedName !== location.LocalizedName) ? storgedAutoComplete.push(location) : null)
                    localStorage.setItem('locations', JSON.stringify(storgedAutoComplete))
                } else {
                    localStorage.setItem('locations', JSON.stringify(autoCompleteResults.data))
                }
                return JSON.parse(JSON.stringify(autoCompleteResults.data))
            }
        } catch (err) { console.log('Error in getAutoCompleteResults in weatherService ., Error:', err); }
    }

}

function toggleFavorite(favoriteObj) {

    const storedFavoriteLocations = loadFavoirteLocations()
    if (storedFavoriteLocations.some(location => location.cityName === favoriteObj.cityName && location.countryName === favoriteObj.countryName)) {
        const idx = storedFavoriteLocations.findIndex(location => location.cityName === favoriteObj.cityName && location.countryName === favoriteObj.countryName)
        storedFavoriteLocations.splice(idx, 1)
    }
    else {
        storedFavoriteLocations.push(favoriteObj)
    }
    localStorage.setItem('favoriteLocations', JSON.stringify(storedFavoriteLocations))
    return storedFavoriteLocations

}

async function _getCurrWeather(locationKey) {

    try {
        const currWeather = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`)
        if (currWeather.data) return currWeather.data[0]
    } catch (err) { console.log('Error in _getCurrWeather in weatherService ., Error:', err); }

}

async function _getFiveDayWeather(locationKey) {

    try {
        const fiveDaysWeather = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
        if (fiveDaysWeather.data) return fiveDaysWeather.data
    } catch (err) { console.log('Error in _getFiveDayWeather in weatherService ., Error:', err); }

}



