import WeatherLocationTime from './WeatherLocationTime';
import WeatherLocationName from './WeatherLocationName';

export default function WeatherLocationPreview({ dispatch, fullWeather, favoriteLocations }) {
    return (
        <div className="time-and-location flex justify-sb align-c">
            <WeatherLocationTime currWeather={fullWeather.currWeather} />
            <WeatherLocationName dispatch={dispatch} fullWeather={fullWeather} favoriteLocations={favoriteLocations} />
        </div>
    )
}
