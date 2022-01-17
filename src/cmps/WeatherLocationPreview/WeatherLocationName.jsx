import FavoriteToggle from '../FavoriteToggle';

export default function WeatherLocationName({ dispatch, favoriteLocations, fullWeather }) {
    return (
        <div className="location-name flex col align-e">
            <FavoriteToggle dispatch={dispatch} favoriteLocations={favoriteLocations} fullWeather={fullWeather} />
            <span className="city-name">{fullWeather.cityName}</span>
            <span className="country-name">{fullWeather.countryName}</span>
        </div>
    )
}
