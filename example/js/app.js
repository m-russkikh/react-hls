import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';
import HLSPlayer from '../../dist/components/react-hls-player';

axios.get('../webcast.json').then(response => {
		return response.data;
	})
	.catch(error => {
		console.warn('Error when load webcast.json', error);
		return {
			url: '',
			title: 'Ошибка при загрузке плейлиста'
		};
	})
	.then(data => {
		ReactDOM.render(
			<Provider store={store}>
				<HLSPlayer source={data.url} title={data.title}/>
			</Provider>,
			document.getElementById('app')
		);
	});