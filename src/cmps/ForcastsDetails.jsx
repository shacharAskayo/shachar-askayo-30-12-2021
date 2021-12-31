import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment';
import Search from '../cmps/Search/Search'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { toggleFavorite } from '../store/actions/weatherActions';
import ForcastDetailsKeletonLoading from './ForcastDetailsKeletonLoading';
import dayClearBg from '../assets/imgs/day-clear.jpg'
import dayCloudyBg from '../assets/imgs/day-cloudy.jpg'
import nightCloudyBg from '../assets/imgs/night-cloudy.jpg'
import nightClearBg from '../assets/imgs/night-clear.jpg'


export default function ForcastsDetails() {


    const fullWeather = useSelector(state => state.weatherReducer.fullWeather)
    const favoriteLocations = useSelector(state => state.weatherReducer.favoriteLocations)
    const currUnit = useSelector(state => state.weatherReducer.currUnit)

    const dispatch = useDispatch()

    if (!fullWeather) return (
        <ForcastDetailsKeletonLoading />
    )

    const onToggleFavorite = () => {
        const { cityName, countryName, locationKey, currWeather } = fullWeather
        const { temperature, imgUrl } = currWeather
        const favoriteObj = { cityName, countryName, locationKey, temperature, imgUrl }
        dispatch(toggleFavorite(favoriteObj))
    }

    const getWeatherBackground = () => {
        if (fullWeather.backgroundImg === 'day-clear') return dayClearBg
        if (fullWeather.backgroundImg === 'day-cloud') return dayCloudyBg
        if (fullWeather.backgroundImg === 'night-clear') return nightClearBg
        if (fullWeather.backgroundImg === 'night-cloud') return nightCloudyBg
    }
    return (
        <div className='forcast-container flex col'
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${getWeatherBackground()})`
            }}>
            <Search favoriteLocations={favoriteLocations} dispatch={dispatch} currLocation={{ cityName: fullWeather.cityName, countryName: fullWeather.countryName }} />
            <div className="section-one flex col ">
                <div className="time-and-location flex justify-sb align-c">
                    <div className="time flex col align-s">
                        <img className='weather-icon' src={fullWeather.currWeather.imgUrl} alt="" />
                        <span>{fullWeather.currWeather.weatherText}</span>
                        <span className="clock">
                            <Moment date={fullWeather.currWeather.time} format="hh:mm" />
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
                        {favoriteLocations?.some(location => location.cityName === fullWeather.cityName) ?
                            <FavoriteIcon className='favorite-icon' onClick={onToggleFavorite} /> :
                            <FavoriteBorderIcon className='favorite-icon' onClick={onToggleFavorite} />
                        }
                        <span className="city-name">{fullWeather.cityName}</span>
                        <span className="country-name">{fullWeather.countryName}</span>
                    </div>

                </div>
            </div>
            <div className="section-two">
                <span className='title'>{fullWeather.fiveDaysWeather.headline.txt}</span>
                <div className="week-forcast-container align-c flex">
                    <div className="today-weather flex align-c">
                        <img className='weather-icon' src={fullWeather.currWeather.imgUrl} alt="" />
                        <div className="day-and-temp flex col">
                            <span className='day'>Now</span>
                            <span className='temp'>
                                {fullWeather.currWeather.temperature[currUnit]}°</span>
                        </div>
                    </div>
                    <div className="forcast-list-container flex justify-sb">

                        {fullWeather.fiveDaysWeather.forcast.map(day => {
                            return (
                                <div className="forcast-preview flex col align-c" key={day.time + Math.random(10008280)}>
                                    <Moment date={day.time} format="ddd" />
                                    <img className='weather-icon' src={day.dayTime.imgUrl} alt="" />
                                    <span>
                                        {day.dayTime.temperature[currUnit]}°
                                    </span>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
