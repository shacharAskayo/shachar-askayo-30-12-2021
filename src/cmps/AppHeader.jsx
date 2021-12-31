import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleUnit } from '../store/actions/weatherActions'
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';

export default function AppHeader() {
    const dispatch = useDispatch()
    const currUnit = useSelector(state => state.weatherReducer.currUnit)


    return (
        <div className='app-header flex justify-c'>
            <nav className='flex justify-sb align-c'>
                <div className="links flex">
                    <Link to='/'>
                        <HomeIcon />
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link to='/favorite'>
                        <FavoriteIcon />
                        <span>
                            favorite
                        </span>
                    </Link>
                </div>
                <div className="options flex align-c">
                    <SettingsBrightnessIcon/>
                    <span onClick={() => dispatch(toggleUnit())}> {currUnit}</span>
                </div>
            </nav>
        </div>
    )
}
