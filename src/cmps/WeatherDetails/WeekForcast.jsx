import React from 'react'
import FiveDaysForcast from './FiveDaysForcast'

export default function WeekForcast({fullWeather ,isDayForcast,setIsDayForcast,currUnit}) {
    return (
        <div className="section-two">
            <span className='title'>{fullWeather.fiveDaysWeather.headline.txt}</span>
            <div className="week-forcast-container align-c flex">
                <div className="today-weather flex align-c">
                    <div className="weather-and-btn flex col align-s" >
                        <img className='weather-icon' src={fullWeather.currWeather.imgUrl} alt="" />
                        <button onClick={() => setIsDayForcast(!isDayForcast)}>{isDayForcast ? 'Day' : 'Night'}</button>
                    </div>
                    <div className="day-and-temp flex col" >
                        <span className='day'>Now</span>
                        <span className='temp'>
                            {fullWeather.currWeather.temperature[currUnit]}°
                        </span>
                    </div>
                </div>
                <FiveDaysForcast fiveDaysWeather={fullWeather.fiveDaysWeather} isDayForcast={isDayForcast} currUnit={currUnit} />
            </div>
        </div>
    )
}
