import { AnalyticsConstants } from '../shared/constants';
import { ForterProductionSiteId, ForterTokenTid } from '../Forter/constants';
import { postTrackings } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';
import { utils } from '@farfetch/blackout-core/analytics';
import Forter from '../Forter/Forter';
import trackDataMock from '../__fixtures__/analyticsTrackData.fixtures';

let mockPostTrackingsPromiseResolve;
const mockPostTrackingsPromise = new Promise(
  resolve => (mockPostTrackingsPromiseResolve = resolve),
);
const mockSiteId = 'c3f674e6511e';
const mockOrigin = 'Whitelabel Portal';
const mockForterToken =
  '44807307964b4931a89bf364e580bdc5_1594724271711__UDF43_9ck';
const mockForterTokenLoadedPromise = Promise.resolve(mockForterToken);

jest.mock(
  '@farfetch/blackout-core/analytics/integrations/Omnitracking/client',
  () => ({
    postTrackings: jest.fn(async () => {
      mockPostTrackingsPromiseResolve();
      return await mockPostTrackingsPromise;
    }),
  }),
);

jest.mock(
  '../Forter/ForterTokenLoadedEventDetector',
  () =>
    class {
      getForterToken = jest.fn(async () => await mockForterTokenLoadedPromise);
    },
);

utils.logger.error = jest.fn();
utils.logger.warn = jest.fn();

describe('Forter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true on its shouldLoad method', () => {
    expect(Forter.shouldLoad()).toBe(true);
  });

  it('should return an instance of Forter class in its createInstance method', () => {
    expect(
      Forter.createInstance({ siteId: mockSiteId }, {}, {}),
    ).toBeInstanceOf(Forter);
  });

  it('should warn when `siteId` is empty and `environment` is different from production.', () => {
    Forter.createInstance({}, {}, {});

    expect(utils.logger.warn).toHaveBeenCalledWith(
      "[Forter] - `siteId` parameter was not provided in options. It's mandatory on the development environment for the Forter integration to be loaded.",
    );
  });

  it('should return default `siteId` (for production) if empty value are passed on options', () => {
    const forter = Forter.createInstance(
      { environment: AnalyticsConstants.ENVIRONMENT_TYPES.prod },
      {},
      {},
    );

    expect(forter.options.siteId).toEqual(ForterProductionSiteId);
  });

  it('should return custom `siteId` if empty value are passed on options', () => {
    const forter = Forter.createInstance({ siteId: 'sampleKey' }, {}, {});

    expect(forter.options.siteId).toEqual('sampleKey');
  });

  it('should log a warn message if `origin` is not specified in options', () => {
    Forter.createInstance({ siteId: mockSiteId }, {}, {});

    expect(utils.logger.warn).toHaveBeenCalledWith(
      "[Forter] - `origin` parameter was not provided in options. It's advisable to provide an origin option to aid in debugging",
    );
  });

  it('should post a message to Omnitracking with forter token when it is loaded', async () => {
    const createEventMock = async function (type, event) {
      return Promise.resolve({
        event,
        type,
        ...trackDataMock,
      });
    };

    const forterInstance = Forter.createInstance(
      {
        siteId: mockSiteId,
        origin: mockOrigin,
      },
      {},
      {
        createEvent: createEventMock,
      },
    );

    forterInstance.onSetUser({});

    await mockPostTrackingsPromise;

    expect(postTrackings).toHaveBeenCalledWith(
      expect.objectContaining({
        tenantId: trackDataMock.context.tenantId,
        clientId: trackDataMock.context.clientId,
        correlationId: trackDataMock.user.localId,
        customerId: 'g_' + trackDataMock.user.id,
        event: 'PageAction',
        parameters: expect.objectContaining({
          clientTimestamp: expect.any(String),
          tid: ForterTokenTid,
          uuid: expect.any(String),
          val: JSON.stringify({
            forterTokenCookie: mockForterToken,
            origin: mockOrigin,
            userAgent: trackDataMock.context.web.window.navigator.userAgent,
          }),
        }),
      }),
    );
  });
});
