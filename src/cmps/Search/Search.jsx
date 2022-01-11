import React, { useEffect, useMemo, useRef, useState } from 'react'
import weatherService from '../../services/weatherService';
import { loadEmptyWeather, loadWeather } from '../../store/actions/weatherActions';
import SearchResultsList from './SearchResultsList';
import _ from 'lodash';



export default React.memo(function Search({ favoriteLocations, dispatch, currLocation }) {

    const [results, setResults] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => inputRef.current.value = `${currLocation.cityName}, ${currLocation.countryName} `, [inputRef])


    const handleChange = async ({ target }) => {
        const { value } = target
        if (value.length > 0 && value.split('').every(val => val.charCodeAt() >= 65 && val.charCodeAt() <= 122)) {
            const autoCompleteResults = await weatherService.getAutoCompleteResults(value)
            setResults(autoCompleteResults)
        }
        else setResults(null)
    }

    const onSearch = (Key, LocalizedName, countryName) => {
        dispatch(loadEmptyWeather())
        setResults(null)
        dispatch(loadWeather(Key, LocalizedName, countryName))
    }

    const delayedHandleChange = _.debounce(handleChange, 500);

    return (
        <div className='search-center-container flex'>
            <div className="search-and-results-container">
                <input type="text" placeholder='Search...' ref={inputRef} onChange={delayedHandleChange} />
                {results && <SearchResultsList results={results} onSearch={onSearch} favoriteLocations={favoriteLocations} />}
            </div>
        </div>
    )
})
