
export default {
    getImgByWeatherState
}

function getImgByWeatherState( currTime, temp ) {
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


// (() => {
//     const fullWeatherObj = {
//         refreshtime: 1640927070271 + (1000 * 60 * 60 * 3),
//         locationKey: 213123,
//         cityName: 'Tel aviv',
//         countryName: 'israel',
//         // backgroundImg: utilsService.getImgByWeatherState({ currTime,temp:Temperature.Metric.Value}),
//         backgroundImg: `https://wallpaperaccess.com/full/3364029.jpg`,
//         currWeather: {
//             time: 'Fri Dec 31 2021 12:03:56 GMT+0700 (Indochina Time)',
//             weatherText: 'cloudy asf',
//             temperature: {
//                 c: 20,
//                 f: 68
//             },
//             imgUrl: `https://developer.accuweather.com/sites/default/files/${5 < 10 ? '0' : ''}${5}-s.png`
//         },
//         fiveDaysWeather: {
//             headline: {
//                 txt: 'terribly sunny this bloody week',
//                 severity: 4
//             },
//             forcast: [1, 2, 3, 4, 5].map(currDay => {
//                 // const { Temperature, Day, Night } = currDay
//                 return {
//                     time: new Date(),
//                     dayTime: {
//                         temperature: {
//                             c: 20,
//                             f: 68,
//                         },
//                         imgUrl: `https://developer.accuweather.com/sites/default/files/${6 < 10 ? '0' : ''}${6}-s.png`,
//                         // IconPhrase: Day.IconPhrase
//                     },
//                     nightTime: {
//                         temperature: {
//                             c: 10,
//                             f: 34,
//                         },
//                         imgUrl: `https://developer.accuweather.com/sites/default/files/${24 < 10 ? '0' : ''}${24}-s.png`,
//                         // IconPhrase: Day.IconPhrase
//                     },

//                 }
//             })
//         }
//     }
//     localStorage.setItem('fullWeather', JSON.stringify(fullWeatherObj))
// })()

// (() => {
//     var storedFavoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || []
//     const favoriteObj = { cityName :'Jerusalem', countryName:'Israel', locationKey:213222, temperature:{c:25,f:72}, imgUrl:`https://developer.accuweather.com/sites/default/files/${24 < 10 ? '0' : ''}06-s.png` }

//     if (storedFavoriteLocations && storedFavoriteLocations.length > 0) {
//         if (storedFavoriteLocations.every(location => location.cityName !== favoriteObj.cityName)) {
//             storedFavoriteLocations.push(favoriteObj)
//         }
//         else {
//             const idx = storedFavoriteLocations.findIndex(location => location.cityName === favoriteObj.cityName)
//             storedFavoriteLocations.splice(idx, 1)
//         }
//     }else{
//         storedFavoriteLocations.push(favoriteObj)
//     }


//     localStorage.setItem('favoriteLocations', JSON.stringify(storedFavoriteLocations))

// })()
