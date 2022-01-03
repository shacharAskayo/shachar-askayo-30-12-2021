import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleDarkMode, toggleUnit } from '../store/actions/weatherActions'
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import MenuIcon from '@material-ui/icons/Menu';

export default function AppHeader() {
    const dispatch = useDispatch()
    const currUnit = useSelector(state => state.currUnit)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <div className='app-header flex justify-c'>
            <MenuIcon className='menu-icon' onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <nav className={`flex justify-sb align-c ${isMenuOpen ? 'open' : ''}`}>
                <div className="links flex">
                    <Link to='/' onClick={()=>setIsMenuOpen(false)}>
                        <HomeIcon />
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link to='/favorite' onClick={()=>setIsMenuOpen(false)}>
                        <FavoriteIcon />
                        <span>
                            Favorite
                        </span>
                    </Link>
                </div>
                <div className="options flex align-c">
                    <SettingsBrightnessIcon onClick={() => dispatch(toggleDarkMode())} />
                    <span onClick={() => dispatch(toggleUnit())}> {currUnit}</span>
                </div>
            </nav>
        </div>
    )
}
