import Moment from 'react-moment';

export default function FiveDaysForcastPreview({day,isDayForcast,currUnit}) {
    return (
        <div className="forcast-preview flex col align-c" >
            <Moment date={day.time} format="ddd" />
            <img className='weather-icon' src={isDayForcast ? day.dayTime.imgUrl : day.nightTime.imgUrl} alt="" />
            <span>
                {isDayForcast ? day.dayTime.temperature[currUnit] : day.nightTime.temperature[currUnit]}°
            </span>

        </div>
    )
}
