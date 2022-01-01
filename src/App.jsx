import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadFavoirteLocations, loadWeather, reset } from './store/actions/weatherActions';
import WeatherDetails from './pages/WeatherDetails';
import AppHeader from './cmps/AppHeader';
import Favorites from './cmps/Favorite/Favorites';

/// imgs https://developer.accuweather.com/sites/default/files/02-s.png

function App() {

  const currWeather = useSelector(state => state.weatherReducer.currWeather)
  const favoriteLocations = useSelector(state => state.weatherReducer.favoriteLocations)
  const isDarkMode = useSelector(state => state.weatherReducer.isDarkMode)

  const dispatch = useDispatch()


  useEffect(() => {
    // navigator.geolocation.getCurrentPosition() // GEOLOCATION BONUS
    setTimeout(() => {
      !currWeather && dispatch(loadWeather('215854', 'Tel Aviv', 'Israel'))
    }, 2200);
    !favoriteLocations && dispatch(loadFavoirteLocations())
  }, [])

  useEffect(() => {
    const bodyEl = document.querySelector('body')
    bodyEl.className = isDarkMode ? 'dark' : ''
    return () => {
      bodyEl.className = ''
    }
  }, [isDarkMode])

  return (
    <div className={`App-container flex justify-c `}>
      <div className="App">
        <Router>
          <AppHeader />
          <Switch>
            <Route exact path="/favorite" component={Favorites} />
            <Route exact path="/" component={WeatherDetails} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
