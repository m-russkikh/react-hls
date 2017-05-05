import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HLSPlayer from '../src/components/HLSPlayer';

import '../styles/HLSPlayer.css';

const source = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';

class App extends Component {
	render() {

		return (
			<Provider store={store}>
				<HLSPlayer source={source}/>
			</Provider>
		);
	}
}

export default App;