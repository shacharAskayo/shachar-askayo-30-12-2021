import Axios from 'axios'
import utilsService from './utilsService'


var axios = Axios.create({
    withCredentials: false
})

const API_KEY = 'OQ7UXb4DY0wHjgeqgmZAAUiG3YzRWlSh'

export default {
    getFullWeather,
    loadFavoirteLocations,
    toggleFavorite
}



async function getFullWeather(locationKey, cityName, countryName) {

    var storedFullWeather = JSON.parse(localStorage.getItem('fullWeather'))
    if (!storedFullWeather) {

    // const currWeather = await _getCurrWeather(locationKey)
    // const fiveDaysWeather = await _getFiveDayWeather(locationKey)
    // if (currWeather && fiveDaysWeather) {
    //     const { WeatherText, Temperature, WeatherIcon, LocalObservationDateTime } = currWeather
    //     const { Headline, DailyForecasts } = fiveDaysWeather
    //     const localTime = LocalObservationDateTime.substring(0, LocalObservationDateTime.length - 6)
    //     const currTime = new Date(localTime)
    //     const fullWeatherObj = {
    //         refreshtime: Date.now() + (1000 * 60 * 60 * 3),
    //         locationKey,
    //         cityName,
    //         countryName,
    //         backgroundImg: utilsService.getImgByWeatherState(currTime, Temperature.Metric.Value),
    //         currWeather: {
    //             time: currTime,
    //             weatherText: WeatherText,
    //             temperature: {
    //                 c: Temperature.Metric.Value,
    //                 f: Temperature.Imperial.Value
    //             },
    //             imgUrl: `https://developer.accuweather.com/sites/default/files/${WeatherIcon < 10 ? '0' : ''}${WeatherIcon}-s.png`
    //         },
    //         fiveDaysWeather: {
    //             headline: {
    //                 txt: Headline.Text,
    //                 severity: Headline.Severity
    //             },
    //             forcast: DailyForecasts.map(currDay => {

    //                 const { Temperature, Day, Night } = currDay
    //                 return {
    //                     time: new Date(currDay.Date),
    //                     dayTime: {
    //                         temperature: {
    //                             c: ((Temperature.Maximum.Value - 32) * 5 / 9).toFixed(),
    //                             f: Temperature.Maximum.Value,
    //                         },
    //                         imgUrl: `https://developer.accuweather.com/sites/default/files/${Day.Icon < 10 ? '0' : ''}${Day.Icon}-s.png`,
    //                         IconPhrase: Day.IconPhrase
    //                     },
    //                     nightTime: {
    //                         temperature: {
    //                             c: ((Temperature.Minimum.Value - 32) * 5 / 9).toFixed(),
    //                             f: Temperature.Minimum.Value,
    //                         },
    //                         imgUrl: `https://developer.accuweather.com/sites/default/files/${Night.Icon < 10 ? '0' : ''}${Night.Icon}-s.png`,
    //                         IconPhrase: Day.IconPhrase
    //                     },

    //                 }
    //             })
    //         }
    //     }
    //     localStorage.setItem('fullWeather', JSON.stringify(fullWeatherObj))
    //     return fullWeatherObj
    // }
    }
    else {
        return storedFullWeather
    }
}


function loadFavoirteLocations() {
    var storedFavoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'))
    if (storedFavoriteLocations && storedFavoriteLocations?.length > 0) return storedFavoriteLocations
    else return []
}

function toggleFavorite(favoriteObj) {
    const storedFavoriteLocations = loadFavoirteLocations()
    if (storedFavoriteLocations.every(location => location.cityName !== favoriteObj.cityName)) {
        storedFavoriteLocations.push(favoriteObj)
    }
    else {
        const idx = storedFavoriteLocations.findIndex(location => location.cityName === favoriteObj.cityName)
        storedFavoriteLocations.splice(idx, 1)
    }
    localStorage.setItem('favoriteLocations', JSON.stringify(storedFavoriteLocations))
    return storedFavoriteLocations
}


async function _getCurrWeather(locationKey) {
    try {
        const currWeather = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`)
        if (currWeather.data) return currWeather.data[0]
    } catch (err) { console.log('Error in _getCurrWeather in weatherService ., Error:', err); }
}

async function _getFiveDayWeather(locationKey) {
    try {
        const fiveDaysWeather = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
        if (fiveDaysWeather.data) return fiveDaysWeather.data
    } catch (err) { console.log('Error in _getFiveDayWeather in weatherService ., Error:', err); }
}

