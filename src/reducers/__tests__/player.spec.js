import deepFreeze from 'deep-freeze';

import playerReducer from '../player';
import * as playerActions from '../../actions/player';


describe('player reducer', () => {
  const initialState = {
    isPlaying: false,
    isMuted: false,
    isFullscreen: false,
    currentTime: '00:00',
    volume: 70,
    canPlayed: false,
  };

  it('should return the initialState', () => {
    expect(
      playerReducer(undefined, {})
    ).toEqual(initialState);
  });

  describe('CHANGE_PLAYBACK_STATUS', () => {
    it('should not change playback status', () => {
      const isPlaying = !initialState.isPlaying;

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.changePlaybackStatus(isPlaying)
      )).toEqual(initialState);
    });

    it('should change playback status', () => {
      const isPlaying = !initialState.isPlaying;
      const canPlayed = true;

      expect(playerReducer(
        deepFreeze({ ...initialState, canPlayed }),
        playerActions.changePlaybackStatus(isPlaying)
      )).toEqual({
        ...initialState,
        isPlaying,
        canPlayed,
      });
    });
  });

  describe('CHANGE_MUTE_STATUS', () => {
    it('should handle CHANGE_MUTE_STATUS', () => {
      const isMuted = !initialState.isMuted;

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.changeMuteStatus(isMuted)
      )).toEqual({
        ...initialState,
        isMuted,
      });
    });
  });

  describe('CHANGE_FULLSCREEN_STATUS', () => {
    it('should handle CHANGE_FULLSCREEN_STATUS', () => {
      const isFullscreen = !initialState.isFullscreen;

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.changeFullscreenStatus(isFullscreen)
      )).toEqual({
        ...initialState,
        isFullscreen,
      });
    })
  });

  describe('CHANGE_CURRENT_TIME', () => {
    it('should handle CHANGE_CURRENT_TIME', () => {
      const currentTime = 'some time';

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.changeCurrentTime(currentTime)
      )).toEqual({
        ...initialState,
        currentTime,
      });
    })
  });

  describe('CHANGE_VOLUME', () => {
    it('should handle CHANGE_VOLUME', () => {
      const volume = 99;

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.changeVolume(volume)
      )).toEqual({
        ...initialState,
        volume,
      });
    })
  });

  describe('CAN_PLAY', () => {
    it('should handle CAN_PLAY', () => {
      const canPlayed = !initialState.canPlayed;

      expect(playerReducer(
        deepFreeze(initialState),
        playerActions.canPlay(canPlayed)
      )).toEqual({
        ...initialState,
        canPlayed,
      });
    })
  });
});
