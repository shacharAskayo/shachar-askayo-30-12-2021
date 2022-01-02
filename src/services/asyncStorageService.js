

export const storageService = {
    query,
    addAutoCompleteLocations
}


function query(entityType,filterBy = null) {
    var locations = JSON.parse(localStorage.getItem(entityType)) || []
    if (locations && locations.length > 0) {
        if (filterBy) {
            return locations.filter(location => location.LocalizedName.toLowerCase().startsWith(filterBy.toLowerCase()))
        } else {
            return JSON.parse(JSON.stringify(locations))
        }
    } else return []
}

function addAutoCompleteLocations(entityType,newLocations) {
    var storgedLocations = query(entityType)
    if (storgedLocations.length > 0) {
        newLocations.map(location => storgedLocations.every(loc => loc.LocalizedName !== location.LocalizedName) ? storgedLocations.push(location) : null)
        _save(entityType, storgedLocations)
    } else {
        _save(entityType, newLocations)
    }
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}



