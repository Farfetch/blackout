import {
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-analytics';
import Castle, { castleEvents } from '../Castle';

utils.logger.error = jest.fn();

const appId = 123456;

const createInstanceAndLoad = async (options = { appId }, loadData) => {
  const castleInstance = Castle.createInstance(options, loadData);

  // Mimic the onload event from the script
  await castleInstance.scriptOnload();

  return castleInstance;
};

const pageTrackData = {
  type: analyticsTrackTypes.PAGE,
  properties: {},
};

const userEventData = {
  user: {
    id: 1223221,
    traits: {
      isGuest: false,
    },
  },
};

describe('Castle integration', () => {
  it('Should extend the core integration class', () => {
    expect(Castle.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('Should be an integration that loads indenpendently of user consent', () => {
    expect(Castle.shouldLoad()).toBe(true);
  });

  describe('Castle instance', () => {
    let instance;
    // force definition of the function
    window._castle = () => true;

    afterEach(() => {
      document.getElementsByTagName('html')[0].innerHTML = '';

      instance = null;

      jest.clearAllMocks();
    });

    it('Should return a Castle instance from createInstance', async () => {
      instance = await createInstanceAndLoad();

      expect(instance).toBeInstanceOf(Castle);
    });

    it('Should create the castle script and append it to the DOM', async () => {
      const windowCastleMock = jest.spyOn(window, '_castle');

      instance = await createInstanceAndLoad();

      const script = document.querySelector('[data-test="castle"]');

      expect(script).toBeDefined();
      expect(script.async).toBe(true);

      expect(script.src).toMatchInlineSnapshot(
        `"https://d2t77mnxyo7adj.cloudfront.net/v1/c.js?123456"`, // eslint-disable-line quotes
      );

      expect(windowCastleMock).toBeCalledWith(
        castleEvents.LOAD,
        instance.autoSendTracking,
      );
    });

    it('Should log an error if no appId is passed via options', () => {
      expect(() => Castle.createInstance({ appId: null })).toThrowError();
    });

    it('Should track a page when the initialization is resolved', async () => {
      // create the instance without calling the scriptOnload
      instance = Castle.createInstance({ appId });

      const windowCastleMock = jest.spyOn(window, '_castle');

      instance.track(pageTrackData);

      expect(windowCastleMock).not.toBeCalled();

      await instance.scriptOnload();

      expect(windowCastleMock).toBeCalledTimes(2);
    });

    it('Should ignore tracking of custom events', async () => {
      const windowCastleMock = jest.spyOn(window, '_castle');

      instance = await createInstanceAndLoad();

      windowCastleMock.mockClear();

      instance.track({
        type: analyticsTrackTypes.TRACK,
      });

      expect(windowCastleMock).not.toBeCalled();
    });

    it('Should not track the user login/logout when the initialization is resolved', async () => {
      // create the instance without calling the scriptOnload
      instance = Castle.createInstance({ appId });

      const windowCastleMock = jest.spyOn(window, '_castle');

      // login
      instance.onSetUser(userEventData);

      expect(windowCastleMock).not.toBeCalled();

      await instance.scriptOnload();

      expect(windowCastleMock).toBeCalledWith(
        castleEvents.LOGIN,
        userEventData.user.id,
      );

      windowCastleMock.mockClear();

      // logout
      await instance.onSetUser({
        user: {
          id: null,
          traits: {
            isGuest: true,
          },
        },
      });

      expect(windowCastleMock).toBeCalledWith(castleEvents.LOGOUT);

      expect(windowCastleMock).toBeCalledWith(castleEvents.PAGE);
    });

    it('Should ignore the identification of the user if the `userId` is the same', async () => {
      instance = await createInstanceAndLoad();

      const windowCastleMock = jest.spyOn(window, '_castle');
      await instance.onSetUser(userEventData);

      expect(windowCastleMock).toBeCalledWith(
        castleEvents.LOGIN,
        userEventData.user.id,
      );

      windowCastleMock.mockClear();

      instance.onSetUser(userEventData);

      expect(windowCastleMock).not.toBeCalled();
    });
  });
});

describe('Castle events', () => {
  it('Should match the snapshot', () => {
    expect(castleEvents).toMatchSnapshot();
  });
});
