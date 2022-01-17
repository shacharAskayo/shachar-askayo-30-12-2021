import React, { useEffect, useMemo, useRef, useState } from 'react'
import weatherService from '../../services/weatherService';
import { loadEmptyWeather, loadWeather } from '../../store/actions/weatherActions';
import SearchResultsList from './SearchResultsList';
import _ from 'lodash';

export default function Search({ favoriteLocations, dispatch, fullWeather }) {

    const [results, setResults] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => inputRef.current.value = `${fullWeather.cityName}, ${fullWeather.countryName} `, [inputRef])

    const handleChange = async ({ target }) => {
        const { value } = target
        const reg = /^[a-z]+$/i;
        if (value.length > 0 && reg.test(value)) {
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
}
