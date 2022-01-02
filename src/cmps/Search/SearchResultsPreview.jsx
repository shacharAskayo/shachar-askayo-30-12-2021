import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


export default function SearchResultsPreview({ location, onSearch, favoriteLocations}) {

    const { Key, LocalizedName, Country } = location
    return (
        <li onClick={()=>onSearch(Key, LocalizedName, Country.LocalizedName)}>
            <span>{LocalizedName} , {Country.LocalizedName}</span>
            {favoriteLocations?.some(location => location.cityName === LocalizedName && location.countryName === Country.LocalizedName) ?
                <FavoriteIcon className='favorite-icon search' /> :
                <FavoriteBorderIcon className='favorite-icon search' />
            }
        </li>
    )
}
