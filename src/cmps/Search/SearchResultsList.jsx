import React from 'react'
import SearchResultsPreview from './SearchResultsPreview'

export default function SearchResultsList({ results ,onSearch , favoriteLocations}) {
    return (
        <div className="results">
            <ul>
                {results.map(location => <SearchResultsPreview key={location.key + Math.random(1000).toString()} location={location}  onSearch={onSearch} favoriteLocations={favoriteLocations} />)}
            </ul>
        </div>
    )
}
