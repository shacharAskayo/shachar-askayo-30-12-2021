import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
// import { store } from './app/store';
import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './assets/styles/main.scss';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();





/**
 (()=>{
   const el = document.querySelectorAll('.container-interview')
   document.getElementById('openModal').style.visibility='hidden'
  for(let i=0;i<el.length;i++){
    el[i].style['filter'] = 'none'
  }
})()
*/


const attachments = [
  // {
  //   id:'l1',
  //   cityName: 'Ban Khai',
  //   contryName: 'Thailand',
  //   posts: [
  //     {
  //       id:'l1p1',
  //       title: 'Awsome Trip!!',
  //       img: 'https://res.cloudinary.com/askayo/image/upload/v1627328785/glezhrordq9a3jmc578c.jpg'
  //     }
  //   ]
  // }
]

