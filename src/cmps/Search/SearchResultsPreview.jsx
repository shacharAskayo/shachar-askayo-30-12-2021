import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { loadWeather } from '../../store/actions/weatherActions';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


export default function SearchResultsPreview({ location, onSearch, favoriteLocations}) {

    const dispatch = useDispatch()


    const { Key, LocalizedName, Country } = location
    
    return (
        <li onClick={()=>onSearch(Key, LocalizedName, Country.LocalizedName)}>
            <span>{LocalizedName} , {Country.LocalizedName}</span>
            {favoriteLocations?.some(location => location.cityName === LocalizedName) ?
                <FavoriteIcon className='favorite-icon' /> :
                <FavoriteBorderIcon className='favorite-icon' />
            }
        </li>
    )
}
