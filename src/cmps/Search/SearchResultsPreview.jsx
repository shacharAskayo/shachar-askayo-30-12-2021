import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


export default function SearchResultsPreview({ location, onSearch, favoriteLocations}) {

    const { Key, LocalizedName, Country } = location
    return (
        <li onClick={()=>onSearch(Key, LocalizedName, Country.LocalizedName)}>
            <span>{LocalizedName} , {Country.LocalizedName}</span>
            {favoriteLocations?.every(location => location.locationKey !== Key) ?
                <FavoriteBorderIcon className='favorite-icon search' /> :
                <FavoriteIcon className='favorite-icon search' /> 
            }
        </li>
    )
}
