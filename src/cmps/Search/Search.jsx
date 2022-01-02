import React, { useEffect, useRef, useState } from 'react'
import autoCompleteService from '../../services/autoCompleteService';
import { loadEmptyWeather, loadWeather } from '../../store/actions/weatherActions';
import SearchResultsList from './SearchResultsList';
var _ = require('lodash');

var englishAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
export default function Search({ favoriteLocations, dispatch, currLocation }) {

    const [results, setResults] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => inputRef.current.value = `${currLocation.cityName}, ${currLocation.countryName} `, [inputRef])

    const handleChange = async ({ target }) => {
        const { value } = target
        if (value.length > 0 && value.split('').every(val => englishAlphabet.includes(val.toLowerCase()))) {
            const autoCompleteResults = await autoCompleteService.getAutoCompleteResults(value)
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
