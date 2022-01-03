
const initialState = {
    fullWeather: null,
    favoriteLocations: null,
    currUnit: 'c',
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)')?.matches || false
}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_FULL_WEATHER':
            return { ...state, fullWeather: action.fullWeather }
        case 'UPDATE_FULL_WEATHER':
            return { ...state, fullWeather: action.updatedFullWeather }
        case 'LOAD_EMPTY_WEATHER':
            return { ...state, fullWeather: null }
        case 'LOAD_FAVORITE_LOCATIONS':
            return { ...state, favoriteLocations: action.favoriteLocations }
        case 'TOGGLE_FAVORITE_LOCATIONS':
            return { ...state, favoriteLocations: action.favoriteLocations }
        case 'TOGGLE_UNIT':
            return { ...state, currUnit: state.currUnit === 'c' ? 'f' : 'c' }
        case 'TOGGLE_DARK_MODE':
            return { ...state, isDarkMode: !state.isDarkMode }
        default:
            return state
    }
}