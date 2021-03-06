
export default {
    getFullWeatherStracturedData,
    getImgByWeatherState,
    makeId,
}

function getFullWeatherStracturedData(currWeather, fiveDaysWeather) {

    const currWeatherCopy = JSON.parse(JSON.stringify(currWeather))
    const fiveDaysWeatherrCopy = JSON.parse(JSON.stringify(fiveDaysWeather))
    const { WeatherText, Temperature, WeatherIcon, LocalObservationDateTime } = currWeatherCopy
    const { Headline, DailyForecasts } = fiveDaysWeatherrCopy
    const localTime = LocalObservationDateTime.substring(0, LocalObservationDateTime.length - 6)
    const currTime = new Date(localTime)
    return {
        createdAt: Date.now(),
        backgroundImg: getImgByWeatherState(currTime, Temperature.Metric.Value),
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

}

function getImgByWeatherState(currTime, temp) {

    const hours = currTime.getHours()
    if (hours > 5 && hours < 17) return _getDayImg(temp)
    else return _getNightImg(temp)

}

function _getDayImg(temp) {
    if (temp < 18) return 'day-cloud'
    else return 'day-clear'
}

function _getNightImg(temp) {
    if (temp < 15) return 'night-cloud'
    else return 'night-clear'
}

function makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
