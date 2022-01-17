import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { toggleFavorite } from '../store/actions/weatherActions';

export default function FavoriteToggle({ dispatch, favoriteLocations, fullWeather }) {

    const onToggleFavorite = () => {
        const { cityName, countryName, locationKey, currWeather } = fullWeather
        const { temperature, imgUrl } = currWeather
        const favoriteObj = { cityName, countryName, locationKey, temperature, imgUrl }
        dispatch(toggleFavorite(favoriteObj))
    }

    if (favoriteLocations?.every(location => location.locationKey !== fullWeather.locationKey))
        return <FavoriteBorderIcon className='favorite-icon' onClick={onToggleFavorite} />

    else
        return <FavoriteIcon className='favorite-icon' onClick={onToggleFavorite} />
}
