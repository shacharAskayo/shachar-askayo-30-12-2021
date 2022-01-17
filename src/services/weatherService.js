import Axios from 'axios'
import attachmentService from './attachmentService'
import storageService from './storageService'
import utilsService from './utilsService'

const axios = Axios.create({
    withCredentials: false
})

const apiKey = 'OQ7UXb4DY0wHjgeqgmZAAUiG3YzRWlSh'
const apiUrl = 'https://dataservice.accuweather.com/'

export default {
    getLocationByCords,
    loadFullWeather,
    loadFavoirteLocations,
    toggleFavorite,
    getAutoCompleteResults,
}

async function getLocationByCords(lat, lon) {

    try {
        const currLocation = await axios.get(`${apiUrl}locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`)
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
            attachment: attachmentService.loadAttachment(locationKey),
            ...utilsService.getFullWeatherStracturedData(currWeather, fiveDaysWeather)
        }
        storageService.save('fullWeather', fullWeatherObj)
        return { fullWeather: fullWeatherObj, errMsg: null }
    }
    else {
        const storedFullWeather = storageService.query('fullWeather')
        if (storedFullWeather) return { fullWeather: storedFullWeather, errMsg: `Couldn't load updated weather, showing last weather saved ` }
        else return { fullWeather: null, errMsg: `Couldn't load updated or saved weather ` }
    }
}

function loadFavoirteLocations() {

    const storedFavoriteLocations = storageService.query('favoriteLocations')
    if (storedFavoriteLocations && storedFavoriteLocations?.length > 0) return storedFavoriteLocations
    else return []

}

async function getAutoCompleteResults(txt) {

    const storgedAutoComplete = storageService.query('locations')
    const storgedMatches = storgedAutoComplete?.filter(location => location.LocalizedName.toLowerCase().startsWith(txt.toLowerCase()))
    if (storgedMatches && storgedMatches.length > 0) return storgedMatches
    else {
        try {
            const autoCompleteResults = await axios.get(`${apiUrl}locations/v1/cities/autocomplete?apikey=${apiKey}&q=${txt}`)
            if (autoCompleteResults.data?.length > 0) {
                if (storgedAutoComplete.length > 0) {
                    autoCompleteResults.data.map(autoCompleteLoc => storgedAutoComplete.every(storgedAutoCompleteLoc => storgedAutoCompleteLoc.Key !== autoCompleteLoc.Key) ? storgedAutoComplete.push(autoCompleteLoc) : null)
                    storageService.save('locations', storgedAutoComplete)
                } else {
                    storageService.save('locations', autoCompleteResults.data)
                }
                return [...autoCompleteResults.data]
            }
        } catch (err) { console.log('Error in getAutoCompleteResults in weatherService ., Error:', err); }
    }

}

function toggleFavorite(favoriteObj) {

    const favoriteObjCopy = { ...favoriteObj }
    const storedFavoriteLocations = loadFavoirteLocations()
    if (storedFavoriteLocations.every(location => location.locationKey !== favoriteObjCopy.locationKey)) {
        storedFavoriteLocations.push(favoriteObjCopy)
    }
    else {
        const idx = storedFavoriteLocations.findIndex(location => location.locationKey === favoriteObjCopy.locationKey)
        storedFavoriteLocations.splice(idx, 1)
    }
    storageService.save('favoriteLocations', storedFavoriteLocations)
    return storedFavoriteLocations

}

async function _getCurrWeather(locationKey) {

    try {
        const currWeather = await axios.get(`${apiUrl}currentconditions/v1/${locationKey}?apikey=${apiKey}`)
        if (currWeather.data) return currWeather.data[0]
    } catch (err) { console.log('Error in _getCurrWeather in weatherService ., Error:', err); }

}

async function _getFiveDayWeather(locationKey) {

    try {
        const fiveDaysWeather = await axios.get(`${apiUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`)
        if (fiveDaysWeather.data) return fiveDaysWeather.data
    } catch (err) { console.log('Error in _getFiveDayWeather in weatherService ., Error:', err); }

}



