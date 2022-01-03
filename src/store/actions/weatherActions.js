import attachmentService from '../../services/attachmentService.js'
import weatherService from '../../services/weatherService.js'

export function loadWeather(locationKey, cityName, countryName) {
    return async dispatch => {
        try {
            const { fullWeather, errMsg } = await weatherService.loadFullWeather(locationKey, cityName, countryName)
            dispatch({ type: 'LOAD_FULL_WEATHER', fullWeather })
            return errMsg
        } catch (err) {
            console.log('Error in weatherAction in loadWeather function', err)
        }
    }
}

export function loadEmptyWeather() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOAD_EMPTY_WEATHER' })
        } catch (err) {
            console.log('Error in weatherAction in loadEmptyWeather function', err)
        }
    }
}

export function loadFavoirteLocations() {
    return async dispatch => {
        try {
            const favoriteLocations = weatherService.loadFavoirteLocations()
            dispatch({ type: 'LOAD_FAVORITE_LOCATIONS', favoriteLocations })
            return favoriteLocations
        } catch (err) {
            console.log('Error in weatherAction in loadFavoirteLocations function', err)
        }
    }
}

export function toggleFavorite(fullWeatherObj) {
    const fullWeatherObjCopy = JSON.parse(JSON.stringify(fullWeatherObj))
    return async dispatch => {
        try {
            const favoriteLocations = weatherService.toggleFavorite(fullWeatherObjCopy)
            dispatch({ type: 'TOGGLE_FAVORITE_LOCATIONS', favoriteLocations })
            return favoriteLocations
        } catch (err) {
            console.log('Error in weatherAction in toggleFavorite function', err)
        }
    }
}

export function addAttachmentPost(fullWeatherObj,post) {
    return async dispatch => {
        try {
            const updatedFullWeather = attachmentService.addAttachmentPost(fullWeatherObj,post)
            dispatch({ type: 'UPDATE_FULL_WEATHER', updatedFullWeather })
        } catch (err) {
            console.log('Error in weatherAction in addAttachmentPost function', err)
        }
    }
}

export function deleteAttachmentPost(fullWeatherObj,post) {
    return async dispatch => {
        try {
            const updatedFullWeather = attachmentService.deleteAttachmentPost(fullWeatherObj,post)
            dispatch({ type: 'UPDATE_FULL_WEATHER', updatedFullWeather })
        } catch (err) {
            console.log('Error in weatherAction in deleteAttachmentPost function', err)
        }
    }
}

export function toggleUnit() {
    return dispatch => dispatch({ type: 'TOGGLE_UNIT' })
}

export function toggleDarkMode() {
    return dispatch => dispatch({ type: 'TOGGLE_DARK_MODE' })
}

