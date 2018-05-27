import * as playerActions from '../player';
import * as playerActionTypes from '../../actionTypes/player';


describe('player actions', () => {
  it('should create an action to change playback status', () => {
    const isPlaying = false;

    expect(playerActions.changePlaybackStatus(isPlaying)).toEqual({
      type: playerActionTypes.CHANGE_PLAYBACK_STATUS,
      payload: { isPlaying },
    });
  });

  it('should create an action to change mute status', () => {
    const isMuted = false;

    expect(playerActions.changeMuteStatus(isMuted)).toEqual({
      type: playerActionTypes.CHANGE_MUTE_STATUS,
      payload: { isMuted },
    });
  });

  it('should create an action to change fullscreen status', () => {
    const isFullscreen = false;

    expect(playerActions.changeFullscreenStatus(isFullscreen)).toEqual({
      type: playerActionTypes.CHANGE_FULLSCREEN_STATUS,
      payload: { isFullscreen },
    });
  });

  it('should create an action to change current time', () => {
    const currentTime = 'some time';

    expect(playerActions.changeCurrentTime(currentTime)).toEqual({
      type: playerActionTypes.CHANGE_CURRENT_TIME,
      payload: { currentTime },
    });
  });

  it('should create an action to change volume', () => {
    const volume = 50;

    expect(playerActions.changeVolume(volume)).toEqual({
      type: playerActionTypes.CHANGE_VOLUME,
      payload: { volume },
    });
  });

  it('should create an action to change canPlayed', () => {
    const canPlayed = false;

    expect(playerActions.canPlay(canPlayed)).toEqual({
      type: playerActionTypes.CAN_PLAY,
      payload: { canPlayed },
    });
  });
});
