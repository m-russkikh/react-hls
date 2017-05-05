import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import HLSPlayer from '../../dist/components/react-hls-player';

const source = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';

ReactDOM.render(
	<Provider store={store}>
		<HLSPlayer source={source}/>
	</Provider>,
	document.getElementById('app')
);