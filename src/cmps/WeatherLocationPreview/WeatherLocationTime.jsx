import Moment from 'react-moment';

export default function WeatherLocationTime({currWeather}) {
    return (
        <div className="time flex col align-s">
                <img className='weather-icon' src={currWeather.imgUrl} alt="" />
                <span>{currWeather.weatherText}</span>
                <span className="clock">
                    <Moment date={currWeather.time} format="LT" />
                </span>
                <span className="date">
                    <span className='day'>
                        <Moment date={currWeather.time} format="ddd" />,
                    </span>
                    <Moment date={currWeather.time} format="D" />
                    <Moment date={currWeather.time} format="MMM" />
                    <Moment date={currWeather.time} format="YYYY" />
                </span>
            </div>
    )
}
