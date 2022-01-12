
export default {
    getFullWeatherStracturedData,
    makeId,
}

const imgUrl = 'https://developer.accuweather.com/sites/default/files/'

function getFullWeatherStracturedData(currWeather, fiveDaysWeather) {

    const { WeatherText, Temperature, WeatherIcon, LocalObservationDateTime } = currWeather
    const { Headline, DailyForecasts } = fiveDaysWeather
    const localTime = LocalObservationDateTime.substring(0, LocalObservationDateTime.length - 6) // adding timezone calc
    const currTime = new Date(localTime)
    return {
        backgroundImg: _getImgByWeatherState(currTime, Temperature.Metric.Value),
        currWeather: {
            time: currTime,
            weatherText: WeatherText,
            temperature: {
                c: Temperature.Metric.Value,
                f: Temperature.Imperial.Value
            },
            imgUrl: `${imgUrl}${WeatherIcon < 10 ? '0' : ''}${WeatherIcon}-s.png`
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
                    dayTime: getDailyForcastPreview(Temperature.Maximum.Value, Day.Icon),
                    nightTime: getDailyForcastPreview(Temperature.Minimum.Value, Night.Icon),
                }
            })
        }
    }

}

function getDailyForcastPreview(value, icon) {
    return {
        temperature: {
            c: ((value - 32) * 5 / 9).toFixed(),
            f: value,
        },
        imgUrl: `${imgUrl}${icon < 10 ? '0' : ''}${icon}-s.png`,
    }
}

function _getImgByWeatherState(currTime, temp) {

    const hours = currTime.getHours()
    if (hours > 5 && hours < 17) return temp < 18 ? 'day-cloud' : 'day-clear'
    else return temp < 15 ? 'night-cloud' : 'night-clear'

}

function makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
