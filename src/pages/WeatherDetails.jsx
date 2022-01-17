import { useDispatch, useSelector } from 'react-redux'
import Search from '../cmps/Search/Search'
import ForcastDetailsKeletonLoading from '../cmps/ForcastDetailsKeletonLoading';
import Attachments from '../cmps/Attachments/Attachments';
import dayClearBg from '../assets/imgs/day-clear.jpg'
import dayCloudyBg from '../assets/imgs/day-cloudy.jpg'
import nightCloudyBg from '../assets/imgs/night-cloudy.jpg'
import nightClearBg from '../assets/imgs/night-clear.jpg'
import WeatherLocationPreview from '../cmps/WeatherLocationPreview/WeatherLocationPreview';
import Forcast from '../cmps/Forcast/Forcast';

const weatherBackgrounds = { 'day-clear': dayClearBg, 'day-cloud': dayCloudyBg, 'night-clear': nightClearBg, 'night-cloud': nightCloudyBg }

export default function WeatherDetails() {

    const fullWeather = useSelector(state => state.fullWeather)
    const favoriteLocations = useSelector(state => state.favoriteLocations)
    const isDarkMode = useSelector(state => state.isDarkMode)
    const dispatch = useDispatch()

    if (!fullWeather) return (
        <ForcastDetailsKeletonLoading />
    )

    return (
        <div className="page">
            <div className='forcast-container flex col' style={{
                background: `linear-gradient(rgba(0, 0, 0, ${isDarkMode ? 0.7 : 0.5}),
                  rgba(0, 0, 0, ${isDarkMode ? 1 : 0.5})),
                  url(${weatherBackgrounds[fullWeather.backgroundImg]})`
            }}>
                <Search favoriteLocations={favoriteLocations} dispatch={dispatch} fullWeather={fullWeather} />
                <WeatherLocationPreview dispatch={dispatch} fullWeather={fullWeather} favoriteLocations={favoriteLocations} />
                <Attachments dispatch={dispatch} fullWeather={fullWeather} />
                <Forcast fullWeather={fullWeather} />
            </div>
        </div>
    )
}
