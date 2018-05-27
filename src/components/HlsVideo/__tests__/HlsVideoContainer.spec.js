import Hls from 'hls.js';

import { getMountWrapper } from '../../../utils/testUtils';
import { HlsVideoContainer } from '../containers';


describe('HlsVideoContainer', () => {
  const props = {
    source: 'source',
    volume: 70,
    isMuted: false,
    isPlaying: false,
    changeCurrentTime: jest.fn(),
    changePlaybackStatus: jest.fn(),
    canPlay: jest.fn(),
  };

  describe('root element', () => {
    let instance;
    let videoWrapper;

    beforeAll(() => {
      const wrapper = getMountWrapper(HlsVideoContainer, props);

      instance = wrapper.instance();
      videoWrapper = wrapper.find('video');
    });

    it('should be presented with video', () => {
      expect(videoWrapper).toHaveLength(1);
    });

    describe('props', () => {
      describe('className', () => {
        it('should have correct class name', () => {
          expect(videoWrapper.prop('className')).toBe('video');
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          expect(videoWrapper.prop('onClick')).toEqual(instance.handleClick);
        });
      });

      describe('ref', () => {
        it('should save a link to the video element', () => {
          expect(instance.videoElement).toEqual(videoWrapper.getDOMNode());
        });
      });
    });
  });

  describe('methods', () => {
    describe('componentDidMount', () => {
      describe('hls is supported', () => {
        let handleCanPlaySpy;
        let handleTimeUpdateSpy;
        let handleEndedSpy;
        let wrapper;
        let instance;

        beforeAll(() => {
          handleCanPlaySpy = spyOn(HlsVideoContainer.prototype, 'handleCanPlay');
          handleTimeUpdateSpy = spyOn(HlsVideoContainer.prototype, 'handleTimeUpdate');
          handleEndedSpy = spyOn(HlsVideoContainer.prototype, 'handleEnded');

          wrapper = getMountWrapper(HlsVideoContainer, props);
          instance = wrapper.instance();
        });

        it('should init hls object', () => {
          const expectedEventHandlers = [
            [Hls.Events.MEDIA_ATTACHED, instance.onMediaAttached],
            [Hls.Events.MANIFEST_PARSED, instance.onManifestParsed],
            [Hls.Events.ERROR, instance.onHlsError],
          ];

          expect(instance.hls.attachMedia).toHaveBeenCalledWith(instance.videoElement);
          expect(instance.hls.on.mock.calls).toEqual(expectedEventHandlers);
        });

        it('should subscribe to canplay event', () => {
          const event = new Event('canplay');

          instance.videoElement.dispatchEvent(event);

          expect(handleCanPlaySpy).toHaveBeenCalledTimes(1);
        });

        it('should subscribe to timeupdate event', () => {
          const event = new Event('timeupdate');

          instance.videoElement.dispatchEvent(event);

          expect(handleTimeUpdateSpy).toHaveBeenCalledTimes(1);
        });

        it('should subscribe to ended event', () => {
          const event = new Event('ended');

          instance.videoElement.dispatchEvent(event);

          expect(handleEndedSpy).toHaveBeenCalledTimes(1);
        });

        it('should set the volume', () => {
          const expected = props.volume / 100;

          expect(instance.videoElement.volume).toBe(expected);
        });

        it('should mute the sound', () => {
          expect(instance.videoElement.muted).toBe(props.isMuted);
        });
      });

      describe('hls is not supported', () => {
        let handleCanPlaySpy;
        let handleTimeUpdateSpy;
        let handleEndedSpy;
        let wrapper;
        let instance;

        beforeAll(() => {
          Hls.isSupported.mockReturnValueOnce(false);

          handleCanPlaySpy = spyOn(HlsVideoContainer.prototype, 'handleCanPlay');
          handleTimeUpdateSpy = spyOn(HlsVideoContainer.prototype, 'handleTimeUpdate');
          handleEndedSpy = spyOn(HlsVideoContainer.prototype, 'handleEnded');

          wrapper = getMountWrapper(HlsVideoContainer, props);
          instance = wrapper.instance();
        });

        it('should not initialize hls object', () => {
          expect(instance.hls).toBeUndefined();
        });

        it('should not subscribe to canplay event', () => {
          const event = new Event('canplay');

          instance.videoElement.dispatchEvent(event);

          expect(handleCanPlaySpy).not.toHaveBeenCalled();
        });

        it('should not subscribe to timeupdate event', () => {
          const event = new Event('timeupdate');

          instance.videoElement.dispatchEvent(event);

          expect(handleTimeUpdateSpy).not.toHaveBeenCalled();
        });

        it('should not subscribe to ended event', () => {
          const event = new Event('ended');

          instance.videoElement.dispatchEvent(event);

          expect(handleEndedSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('componentDidUpdate', () => {
      let wrapper;
      let instance;

      beforeEach(() => {
        wrapper = getMountWrapper(HlsVideoContainer, props);
        instance = wrapper.instance();
      });

      describe('playback status', () => {
        beforeEach(() => {
          spyOn(instance.videoElement, 'play');
          spyOn(instance.videoElement, 'pause');
        });

        it('should start playback', () => {
          wrapper.setProps({ ...props, isPlaying: false });
          wrapper.setProps({ ...props, isPlaying: true });

          expect(instance.videoElement.play).toHaveBeenCalledTimes(1);
        });

        it('should stop playback', () => {
          wrapper.setProps({ ...props, isPlaying: true });
          wrapper.setProps({ ...props, isPlaying: false });

          expect(instance.videoElement.pause).toHaveBeenCalledTimes(1);
        });

        it('should not change the playback status', () => {
          wrapper.setProps({ ...props, isPlaying: false });
          wrapper.setProps({ ...props, isPlaying: false });

          expect(instance.videoElement.pause).toHaveBeenCalledTimes(0);

          wrapper.setProps({ ...props, isPlaying: true });
          wrapper.setProps({ ...props, isPlaying: true });

          expect(instance.videoElement.play).toHaveBeenCalledTimes(1);
        });
      });

      describe('volume', () => {
        it('should change the volume', () => {
          wrapper.setProps({ ...props, volume: 90 });

          expect(instance.videoElement.volume).toBe(0.9);
        });

        it('should not change the volume', () => {
          const expected = props.volume / 100;

          wrapper.setProps(props);

          expect(instance.videoElement.volume).toBe(expected);
        });
      });

      describe('mute status', () => {
        it('should mute the sound', () => {
          wrapper.setProps({ ...props, isMuted: false });
          wrapper.setProps({ ...props, isMuted: true });

          expect(instance.videoElement.muted).toBe(true);
        });

        it('sshould turn on the sound', () => {
          wrapper.setProps({ ...props, isMuted: true });
          wrapper.setProps({ ...props, isMuted: false });

          expect(instance.videoElement.muted).toBe(false);
        });
      });
    });

    describe('componentWillUnmount', () => {
      let wrapper;
      let instance;
      let removeEventListenerMock = jest.fn();

      beforeAll(() => {
        wrapper = getMountWrapper(HlsVideoContainer, props);
        instance = wrapper.instance();

        instance.videoElement.removeEventListener = removeEventListenerMock;

        wrapper.unmount();
      });

      it('should remove video event listeners', () => {
        const expected = [
          ['canplay', instance.handleCanPlay],
          ['timeupdate', instance.handleTimeUpdate],
          ['ended', instance.handleEnded]
        ];

        expect(removeEventListenerMock.mock.calls).toEqual(expected);
      });
    });

    describe('onMediaAttached', () => {
      let instance;

      beforeAll(() => {
        const wrapper = getMountWrapper(HlsVideoContainer, props);

        instance = wrapper.instance();
      });

      it('should attach media', () => {
        instance.onMediaAttached();

        expect(instance.hls.loadSource).toHaveBeenCalledWith(props.source);
      });
    });

    describe('onManifestParsed', () => {
      let instance;

      beforeAll(() => {
        const wrapper = getMountWrapper(HlsVideoContainer, props);

        instance = wrapper.instance();
      });

      it('should start load video', () => {
        instance.onManifestParsed();

        expect(instance.hls.startLoad).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleCanPlay', () => {
      let instance;

      beforeAll(() => {
        const wrapper = getMountWrapper(HlsVideoContainer, props);

        instance = wrapper.instance();
      });

      afterAll(() => {
        props.canPlay.mockClear();
      });

      it('should handle canplay event', () => {
        instance.handleCanPlay();

        expect(props.canPlay).toHaveBeenCalledTimes(1);
        expect(props.canPlay).toHaveBeenCalledWith(true);
      });
    });

    describe('handleEnded', () => {
      let instance;

      beforeAll(() => {
        const wrapper = getMountWrapper(HlsVideoContainer, props);

        instance = wrapper.instance();
      });

      afterAll(() => {
        props.changePlaybackStatus.mockClear();
      });

      it('should handle ended event', () => {
        instance.handleEnded();

        expect(props.changePlaybackStatus).toHaveBeenCalledTimes(1);
        expect(props.changePlaybackStatus).toHaveBeenCalledWith(false);
      });
    });

    describe('handleTimeUpdate', () => {
      let instance;

      beforeAll(() => {
        const wrapper = getMountWrapper(HlsVideoContainer, props);

        instance = wrapper.instance();
      });

      afterAll(() => {
        props.changeCurrentTime.mockClear();
      });

      it('should handle timeupdate event', () => {
        const event = { currentTarget: { currentTime: 60 }};

        instance.handleTimeUpdate(event);

        expect(props.changeCurrentTime).toHaveBeenCalledTimes(1);
        expect(props.changeCurrentTime).toHaveBeenCalledWith('01:00');
      });
    });
  });
});
