import React from 'react'
import Moment from 'react-moment';


import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function WeatherLocationPreview({ fullWeather, favoriteLocations, onToggleFavorite }) {
    return (
        <div className="time-and-location flex justify-sb align-c">
            <div className="time flex col align-s">
                <img className='weather-icon' src={fullWeather.currWeather.imgUrl} alt="" />
                <span>{fullWeather.currWeather.weatherText}</span>
                <span className="clock">
                    <Moment date={fullWeather.currWeather.time} format="LT" />
                </span>
                <span className="date">
                    <span className='day'>
                        <Moment date={fullWeather.currWeather.time} format="ddd" />,
                    </span>
                    <Moment date={fullWeather.currWeather.time} format="D" />
                    <Moment date={fullWeather.currWeather.time} format="MMM" />
                    <Moment date={fullWeather.currWeather.time} format="YYYY" />
                </span>
            </div>
            <div className="location-name flex col align-e">
                {favoriteLocations?.every(location => location.locationKey !== fullWeather.locationKey) ?
                    <FavoriteBorderIcon className='favorite-icon' onClick={onToggleFavorite} /> :
                    <FavoriteIcon className='favorite-icon' onClick={onToggleFavorite} />
                }
                <span className="city-name">{fullWeather.cityName}</span>
                <span className="country-name">{fullWeather.countryName}</span>
            </div>
        </div>
    )
}
