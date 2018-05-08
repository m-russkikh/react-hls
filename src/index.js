import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';
import HLSPlayerConnector from './components/react-hls-player';

import './styles/react-hls-player.scss';
import './styles/style.css';

axios.get('../webcast.json').then(response => response.data)
  .catch((error) => {
    console.warn('Error when load webcast.json', error);
    return {
      url: '',
      title: 'Ошибка при загрузке плейлиста',
    };
  })
  .then((data) => {
    ReactDOM.render(
      <Provider store={store}>
        <HLSPlayerConnector source={data.url} title={data.title} />
      </Provider>,
      document.getElementById('app'),
    );
  });
