import React, {Component} from 'react';
import HLSPlayer from '../dist/HLSPlayer';

import '../src/HLSPlayer.css';
import './style.css';

class App extends Component {
	render() {
		const source = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';

		return (
			<HLSPlayer
				ref={ (player) => { this.hls = player; } }
				source={source}
			/>
		);
	}
}

export default App;