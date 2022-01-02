import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadFavoirteLocations, loadWeather, reset } from './store/actions/weatherActions';
import WeatherDetails from './pages/WeatherDetails';
import AppHeader from './cmps/AppHeader';
import Favorites from './pages/Favorites';
import weatherService from './services/weatherService';
import SnackBar from './cmps/SnackBar';


function App() {

  const fullWeather = useSelector(state => state.weatherReducer.fullWeather)
  const favoriteLocations = useSelector(state => state.weatherReducer.favoriteLocations)
  const isDarkMode = useSelector(state => state.weatherReducer.isDarkMode)
  const [snackBarContent, setSnackBarContent] = useState(null)

  const dispatch = useDispatch()


  useEffect(async () => {
    var currTime;
    // if (!fullWeather) {
    //   navigator.geolocation.getCurrentPosition(async (pos) => {
    //     const { latitude, longitude } = pos.coords
    //     const currLocation = await weatherService.getLocationByCords(latitude, longitude)
    //     if (currLocation) {
    //       const { locationKey, cityName, countryName } = currLocation
    //       dispatch(loadWeather(locationKey, cityName, countryName))
    //     }
    //     else {
    //       dispatch(loadWeather('215854', 'Tel Aviv', 'Israel'))
    //     }
    //   })
    // }
    if (!fullWeather) {
      // setTimeout(async () => {
      const errMsg = await dispatch(loadWeather('', ' ', ''))
      if (errMsg) {
        setSnackBarContent(errMsg)
        currTime = setTimeout(() => {
          setSnackBarContent(null)
        }, 5000);
      }
      // }, 2000);
    }
    !favoriteLocations && dispatch(loadFavoirteLocations())
    return () => {
      clearTimeout(currTime)
    }
  }, [])

  useEffect(() => {
    const bodyEl = document.querySelector('body')
    bodyEl.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  return (
    <div className='app-container flex justify-c '>
      <div className='app'>
        <Router>
          <AppHeader />
          <Switch>
            <Route exact path='/favorite' component={Favorites} />
            <Route exact path='/' component={WeatherDetails} />
          </Switch>
        </Router>
        <SnackBar snackBarContent={snackBarContent} />

      </div>
    </div>
  );
}

export default App;
