import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFavorite } from '../store/actions/weatherActions';

import Search from '../cmps/Search/Search'
import WeekForcast from '../cmps/WeatherDetails/WeekForcast'

import ForcastDetailsKeletonLoading from '../cmps/ForcastDetailsKeletonLoading';
import AttachmentPosts from '../cmps/AttachmentPosts';

import dayClearBg from '../assets/imgs/day-clear.jpg'
import dayCloudyBg from '../assets/imgs/day-cloudy.jpg'
import nightCloudyBg from '../assets/imgs/night-cloudy.jpg'
import nightClearBg from '../assets/imgs/night-clear.jpg'
import WeatherLocationPreview from '../cmps/WeatherDetails/WeatherLocationPreview';


export default function WeatherDetails() {

    const [isDayForcast, setIsDayForcast] = useState(true)

    const fullWeather = useSelector(state => state.fullWeather)
    const favoriteLocations = useSelector(state => state.favoriteLocations)
    const currUnit = useSelector(state => state.currUnit)
    const isDarkMode = useSelector(state => state.isDarkMode)

    const currLocation = useMemo(() => {
        return { cityName: fullWeather?.cityName, countryName: fullWeather?.countryName }
    }, [fullWeather])

    const dispatch = useDispatch()

    const onToggleFavorite = useCallback(() => {
        const { cityName, countryName, locationKey, currWeather } = fullWeather
        const { temperature, imgUrl } = currWeather
        const favoriteObj = { cityName, countryName, locationKey, temperature, imgUrl }
        dispatch(toggleFavorite(favoriteObj))
    }, [fullWeather])

    const getWeatherBackground = () => { // try require  or object
        if (fullWeather.backgroundImg === 'day-clear') return dayClearBg
        if (fullWeather.backgroundImg === 'day-cloud') return dayCloudyBg
        if (fullWeather.backgroundImg === 'night-clear') return nightClearBg
        if (fullWeather.backgroundImg === 'night-cloud') return nightCloudyBg
    }

    if (!fullWeather) return (
        <ForcastDetailsKeletonLoading />
    )

    return (
        <div className="page">
            <div className='forcast-container flex col' style={{ background: `linear-gradient(rgba(0, 0, 0, ${isDarkMode ? 0.7 : 0.5}), rgba(0, 0, 0, ${isDarkMode ? 1 : 0.5})),url(${getWeatherBackground()})` }}>
                <Search
                    favoriteLocations={favoriteLocations}
                    dispatch={dispatch}
                    currLocation={currLocation}
                />
                <div className="section-one flex col ">
                    <WeatherLocationPreview
                        fullWeather={fullWeather}
                        favoriteLocations={favoriteLocations}
                        onToggleFavorite={onToggleFavorite}
                    />
                    <AttachmentPosts
                        dispatch={dispatch}
                        fullWeather={fullWeather}
                    />
                </div>
                <WeekForcast
                    fullWeather={fullWeather}
                    isDayForcast={isDayForcast}
                    setIsDayForcast={setIsDayForcast}
                    currUnit={currUnit}
                />
            </div>
        </div>
    )
}
