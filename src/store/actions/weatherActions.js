import { userService } from '../../services/userService.js'
import weatherService from '../../services/weatherService.js'

export function loadWeather(locationKey, cityName, countryName) {
    return async dispatch => {
        try {
            const {fullWeather,errMsg} = await weatherService.getFullWeather(locationKey, cityName, countryName)
            dispatch({ type: 'LOAD_FULL_WEATHER', fullWeather })
            return errMsg
        } catch (err) {
            console.log(err)
        }
    }
}

export function loadEmptyWeather() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOAD_EMPTY_WEATHER' })
        } catch (err) {
            console.log(err)
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
            console.log(err)
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
            console.log(err)
        }
    }
}

export function toggleUnit() {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE_UNIT'})
        } catch (err) {
            console.log(err)
        }
    }
}

export function toggleDarkMode() {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE_DARK_MODE'})
        } catch (err) {
            console.log(err)
        }
    }
}

