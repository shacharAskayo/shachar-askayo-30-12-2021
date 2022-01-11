import React from 'react'
import Moment from 'react-moment';
import FadeIn from 'react-fade-in';


export default function FiveDaysForcast({ fiveDaysWeather, isDayForcast, currUnit }) {
    return (
        <FadeIn className="forcast-list-container flex justify-sb">

            {fiveDaysWeather.forcast.map(day => {
                return (
                    <div className="forcast-preview flex col align-c" key={day.time + Math.random(10008280)}>
                        <Moment date={day.time} format="ddd" />
                        <img className='weather-icon' src={isDayForcast ? day.dayTime.imgUrl : day.nightTime.imgUrl} alt="" />
                        <span>
                            {isDayForcast ? day.dayTime.temperature[currUnit] : day.nightTime.temperature[currUnit]}°
                        </span>

                    </div>
                )
            })}
        </FadeIn>
    )
}
