import React from 'react'
import ForcastsDetails from '../cmps/ForcastsDetails'
import Search from '../cmps/Search/Search'
export default function WeatherDetails() {

    return (
        <div className='weather-page page'>
            {/* <Search/> */}
            <ForcastsDetails/>
        </div>
    )
}
