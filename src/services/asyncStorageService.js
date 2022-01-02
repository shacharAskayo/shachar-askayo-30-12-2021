

const ENTITY_TYPE = 'locations'
export const storageService = {
    autocompleteQuery,
    addAutoCompleteLocations
}


function autocompleteQuery(filterBy = null) {
    var locations = JSON.parse(localStorage.getItem(ENTITY_TYPE)) || []
    if (locations && locations.length > 0) {
        if (filterBy) {
            return locations.filter(location => location.LocalizedName.toLowerCase().startsWith(filterBy.toLowerCase()))
        } else {
            return JSON.parse(JSON.stringify(locations))
        }
    } else return []
}

function addAutoCompleteLocations(newLocations) {
    var storgedLocations = autocompleteQuery()
    if (storgedLocations.length > 0) {
        newLocations.map(location => !storgedLocations.some(loc => loc.LocalizedName === location.LocalizedName) ? storgedLocations.push(location) : null)
        _save(ENTITY_TYPE, storgedLocations)
    } else {
        _save(ENTITY_TYPE, newLocations)
    }
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}



