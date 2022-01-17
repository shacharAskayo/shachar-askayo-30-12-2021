import { memo, useState } from 'react'
import FiveDaysForcastList from './FiveDaysForcastList'
import CurrentForcast from './CurrentForcast'
import { useSelector } from 'react-redux';

export default memo(function Forcast({ fullWeather }) {

    const currUnit = useSelector(state => state.currUnit)
    const [isDayForcast, setIsDayForcast] = useState(true)

    return (
        <div className="section-two">
            <span className='title'>{fullWeather.fiveDaysWeather.headline.txt}</span>
            <div className="week-forcast-container align-c flex">
                <CurrentForcast fullWeather={fullWeather} setIsDayForcast={setIsDayForcast} isDayForcast={isDayForcast} currUnit={currUnit} />
                <FiveDaysForcastList fiveDaysWeather={fullWeather.fiveDaysWeather} isDayForcast={isDayForcast} currUnit={currUnit} />
            </div>
        </div>
    )
})
