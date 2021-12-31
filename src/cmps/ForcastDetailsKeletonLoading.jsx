import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Search from './Search/Search';


export default function ForcastDetailsKeletonLoading() {
    return (
        <div className='forcast-container flex col'>

            <div className='search-center-container flex' >
                <div className="search-and-results-container" style={{ boxShadow: 'none', border: 'none',background:'none' }}>
                    <Skeleton animation="wave" style={{ width: '100%',borderRadius:20 }} height={65} />
                </div>
            </div>
            <div className="section-one flex col ">
                <div className="time-and-location flex justify-sb align-c">
                    <div className="time flex col align-s">
                        <Skeleton className='weather-icon' animation="wave" variant='circular' width={60} height={60} />
                        <Skeleton animation="wave" width={80} height={10} />
                        {/* <span className="clock"> */}
                        <Skeleton animation="wave" width={80} height={60} />
                        {/* </span> */}
                        {/* <span className="date"> */}
                        <Skeleton animation="wave" width={150} height={25} />
                        {/* </span> */}
                    </div>
                    <div className="location-name flex col align-e">
                        <Skeleton className='weather-icon' animation="wave" variant='circular' width={40} height={40} />
                        <Skeleton className="city-name" animation="wave" width={90} height={60} />
                        <Skeleton className="country-name" animation="wave" width={40} height={20} />
                    </div>

                </div>
            </div>
            <div className="section-two">
                <Skeleton className='title' animation="wave" width={500} height={25} />

                <div className="week-forcast-container align-c flex">
                    <div className="today-weather flex align-c">
                        <Skeleton className='weather-icon' animation="wave" variant='circular' style={{ marginRight: 15 }} width={60} height={60} />

                        <div className="day-and-temp flex col">
                            <Skeleton className='day' animation="wave" width={65} height={25} />
                            <Skeleton className='temp' animation="wave" width={80} height={45} />
                        </div>
                    </div>
                    <div className="forcast-list-container flex justify-sb">

                        {[0, 1, 2, 3, 4].map(day => {
                            return (
                                <div className="forcast-preview flex col align-c" key={Math.random(10000)}>
                                    {/* <Moment date={''} format="ddd" /> */}
                                    <Skeleton className='day' animation="wave" width={45} height={20} />
                                    <Skeleton className='weather-icon' animation="wave" variant='circular' width={60} height={60} />
                                    <Skeleton className='day' animation="wave" width={45} height={20} />

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
