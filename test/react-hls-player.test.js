import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme'
import ConnectedHLSPlayer, {HLSPlayer} from '../src/components/react-hls-player';
import * as actions from '../src/actions/player';
import { createStore } from 'redux';
import reducer from '../example/js/reducer'

describe('<HLSPlayer />', () => {
	const webcast = {
		"title": "Демо hls.js",
		"url": "http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8"
	};

	describe('Инициализация компонента без параметров', () => {
		it('Без параметра source', () => {
			const store = createStore(reducer);
			const renderedComponent = mount(
				<Provider store={store}>
					<ConnectedHLSPlayer title={webcast.title}/>
				</Provider> );

			expect(renderedComponent.find('.hlsPlayer-title').exists()).toBe(true);
			expect(renderedComponent.find('.hlsPlayer-title').text()).toBe(webcast.title);
			expect(renderedComponent.find('.hlsPlayer-controls').exists()).toBe(false);
		});
	});

	describe('Инициализация компонента c параметрами', () => {
		let renderedComponent, store;

		beforeEach(() => {
			store = createStore(reducer);
			renderedComponent = mount(
				<Provider store={store}>
					<ConnectedHLSPlayer source={webcast.url} title={webcast.title}/>
				</Provider> );
		});

		it('Инициализация компонента с правильным source', () => {
			store.dispatch(actions.startBufferingChanged(true));

			expect(renderedComponent.find(HLSPlayer).prop('state').startBuffering).toBe(true);
			expect(renderedComponent.find(HLSPlayer).prop('state').disableControls).toBe(false);

			expect(renderedComponent.find('.hlsPlayer-title').exists()).toBe(true);
			expect(renderedComponent.find('.hlsPlayer-title').text()).toBe(webcast.title);
			expect(renderedComponent.find('.hlsPlayer-controls').exists()).toBe(true);
		});

		it('Инициализация компонента с неправильным source', () => {
			expect(renderedComponent.find('.hlsPlayer-title').exists()).toBe(false);
			expect(renderedComponent.find('.hlsPlayer-controls').exists()).toBe(false);
		});

		it('Скрытие элементов управления и панели заголовка', () => {
			store.dispatch(actions.startBufferingChanged(true));
			store.dispatch(actions.disableControlsChanged(true));

			expect(renderedComponent.find(HLSPlayer).prop('state').startBuffering).toBe(true);
			expect(renderedComponent.find(HLSPlayer).prop('state').disableControls).toBe(true);

			expect(renderedComponent.find('.hlsPlayer-title').exists()).toBe(false);
			expect(renderedComponent.find('.hlsPlayer-controls').exists()).toBe(false);
		});
	});
});