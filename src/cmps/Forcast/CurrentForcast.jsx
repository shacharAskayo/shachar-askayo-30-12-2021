export default function CurrentForcast({fullWeather,setIsDayForcast,isDayForcast,currUnit}) {
    return (
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
    )
}
