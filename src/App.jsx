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

  const isDarkMode = useSelector(state => state.isDarkMode)
  const [snackBarContent, setSnackBarContent] = useState(null)
  const [modalTimeOut, setModalTimeOut] = useState(null)

  const dispatch = useDispatch()

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(onGeoLocationSucces, () => handleLoadWeather('215854', 'Tel Aviv', 'Israel'))
    dispatch(loadFavoirteLocations())
    return () => {
      modalTimeOut && clearTimeout(modalTimeOut)
    }
  }, [])

  useEffect(() => {
    const bodyEl = document.querySelector('body')
    bodyEl.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])


  const onGeoLocationSucces = async (pos) => {
    const { latitude, longitude } = pos.coords
    const currLocation = await weatherService.getLocationByCords(latitude, longitude)
    if (currLocation) {
      const { locationKey, cityName, countryName } = currLocation
      handleLoadWeather(locationKey, cityName, countryName)
    }
    else { handleLoadWeather('215854', 'Tel Aviv', 'Israel') }
  }

  const handleLoadWeather = async (locationKey, cityName, countryName) => {
      const errMsg = await dispatch(loadWeather(locationKey, cityName, countryName))
      errMsg && onOpenModal(errMsg)
  }

  const onOpenModal = (errMsg) => {
    setSnackBarContent(errMsg)
    setModalTimeOut(
      setTimeout(() => setSnackBarContent(null), 5000)
    )
  }

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
