

const initialState = {
    fullWeather: null,
    favoriteLocations: null,
    currUnit: 'c',
    isDarkMode: false
}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_FULL_WEATHER':
            return { ...state, fullWeather: action.fullWeather }
        case 'LOAD_EMPTY_WEATHER':
            return { ...state, fullWeather: null }
        case 'LOAD_FAVORITE_LOCATIONS':
            return { ...state, favoriteLocations: action.favoriteLocations }
        case 'TOGGLE_FAVORITE_LOCATIONS':
            return { ...state, favoriteLocations: action.favoriteLocations }
        case 'TOGGLE_UNIT':
            return { ...state, currUnit: state.currUnit === 'c' ? 'f' : 'c' }
        default:
            return state
    }
}