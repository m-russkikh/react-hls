import React from 'react';
import axios from 'axios';

import { getShallowWrapper } from '../../../utils/testUtils';
import Player from '../../Player';
import { AppContainer } from '../containers';


describe('AppContainer', () => {
  const state = {
    source: 'source',
    title: 'title',
  };

  describe('root element', () => {
    let wrapper;
    let instance;

    beforeAll(() => {
      wrapper = getShallowWrapper(AppContainer, {});
      instance = wrapper.instance();
    });

    it('should contain Player component', () => {
      wrapper.setState(state);

      expect(wrapper.contains(<Player source={state.source} title={state.title} />)).toBeTruthy();
    });
  });

  describe('methods', () => {
    describe('componentDidMount', () => {
      let wrapper;
      let instance;

      beforeEach(() => {
        wrapper = getShallowWrapper(AppContainer, {});
        instance = wrapper.instance();
      });

      describe('successful download of playlist', () => {
        beforeAll(() => {
          axios.get.mockResolvedValueOnce({
            data: state
          });
        });

        it('should handle correctly', () => {
          expect(wrapper.state()).toEqual(state);
        });
      });

      describe('error loading playlist', () => {
        beforeAll(() => {
          axios.get.mockRejectedValueOnce({});
        });

        it('should handle correctly', () => {
          expect(wrapper.state()).toEqual({
            source: '',
            title: 'Ошибка при загрузке плейлиста',
          });
        });
      });
    });
  });
});