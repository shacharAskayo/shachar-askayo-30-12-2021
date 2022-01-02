import Axios from 'axios'
import attachmentService from './attachmentService'
import utilsService from './utilsService'

var axios = Axios.create({
    withCredentials: false
})

const API_KEY = 'OQ7UXb4DY0wHjgeqgmZAAUiG3YzRWlSh'

export default {
    getLocationByCords,
    getFullWeather,
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
    } catch (err) { console.log(err) }
}


async function getFullWeather(locationKey, cityName, countryName) {

    // var storedFullWeather = JSON.parse(localStorage.getItem('fullWeather'))
    // if (!storedFullWeather) {

    const currWeather = await _getCurrWeather(locationKey)
    const fiveDaysWeather = await _getFiveDayWeather(locationKey)
    if (currWeather && fiveDaysWeather) {
        const { WeatherText, Temperature, WeatherIcon, LocalObservationDateTime } = currWeather
        const { Headline, DailyForecasts } = fiveDaysWeather
        const localTime = LocalObservationDateTime.substring(0, LocalObservationDateTime.length - 6)
        const currTime = new Date(localTime)
        const fullWeatherObj = {
            createdAt: Date.now(),
            locationKey,
            cityName,
            countryName,
            attachment: attachmentService.loadAttachment(cityName, countryName),
            backgroundImg: utilsService.getImgByWeatherState(currTime, Temperature.Metric.Value),
            currWeather: {
                time: currTime,
                weatherText: WeatherText,
                temperature: {
                    c: Temperature.Metric.Value,
                    f: Temperature.Imperial.Value
                },
                imgUrl: `https://developer.accuweather.com/sites/default/files/${WeatherIcon < 10 ? '0' : ''}${WeatherIcon}-s.png`
            },
            fiveDaysWeather: {
                headline: {
                    txt: Headline.Text,
                    severity: Headline.Severity
                },
                forcast: DailyForecasts.map(currDay => {

                    const { Temperature, Day, Night } = currDay
                    return {
                        time: new Date(currDay.Date),
                        dayTime: {
                            temperature: {
                                c: ((Temperature.Maximum.Value - 32) * 5 / 9).toFixed(),
                                f: Temperature.Maximum.Value,
                            },
                            imgUrl: `https://developer.accuweather.com/sites/default/files/${Day.Icon < 10 ? '0' : ''}${Day.Icon}-s.png`,
                            IconPhrase: Day.IconPhrase
                        },
                        nightTime: {
                            temperature: {
                                c: ((Temperature.Minimum.Value - 32) * 5 / 9).toFixed(),
                                f: Temperature.Minimum.Value,
                            },
                            imgUrl: `https://developer.accuweather.com/sites/default/files/${Night.Icon < 10 ? '0' : ''}${Night.Icon}-s.png`,
                            IconPhrase: Day.IconPhrase
                        },

                    }
                })
            }
        }
        localStorage.setItem('fullWeather', JSON.stringify(fullWeatherObj))
        return { fullWeather: fullWeatherObj, errMsg: null }
    }
    else {
        var storedFullWeather = JSON.parse(localStorage.getItem('fullWeather'))
        if (storedFullWeather) return { fullWeather: storedFullWeather, errMsg: `Could'nt load updated weather, showing last weather saved ` }
        // else return utilsService.getFakeWeather
    }
    // }
    // else {
    //     return  {fullWeather:storedFullWeather, errMsg: null }
    // }
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
        } catch (err) { console.log('Error in getAutoCompleteResults in autoCompleteService ., Error:', err); }
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



