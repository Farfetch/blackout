import analytics from '../analytics.js';
import AnalyticsCore, {
  TrackType as analyticsTrackTypes,
  type ConsentData,
  type EventData,
  FromParameterType,
  type IntegrationOptions,
  integrations,
  PageType,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import TestStorage from 'test-storage';
import WebContextStateManager from '../WebContextStateManager.js';
import type { WebContext } from '../context.js';

console.error = jest.fn();

// Change window to allow modifications to href
// that are needed by some tests.
// eslint-disable-next-line no-global-assign
window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost',
  },
  writable: true,
});

class LoadableIntegration extends integrations.Integration<IntegrationOptions> {
  static override shouldLoad() {
    return true;
  }

  override track = jest.fn();
}

class MarketingIntegration extends integrations.Integration<IntegrationOptions> {
  static override shouldLoad(consent: ConsentData) {
    return !!consent && !!consent.marketing;
  }

  override track = jest.fn();
}

const mockEvent = 'myEvent';
const mockEventProperties = {};
const mockEventContext = { culture: 'pt-PT' };
const mockAnalyticsContext = {
  library: { version: '1.0.0', name: '@farfech-package' },
};

// @ts-expect-error trackInternal is protected
const coreTrackSpy = jest.spyOn(AnalyticsCore.prototype, 'trackInternal');

describe('analytics web', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    // @ts-expect-error
    analytics.isReady = false;
    // @ts-expect-error
    analytics.integrations.clear();
    analytics.currentPageCallData = null;
    // @ts-expect-error Force reset of web context state
    analytics.webContextStateManager = new WebContextStateManager();

    await analytics.setStorage(new TestStorage());
    await analytics.setUser(123);

    await analytics
      .addIntegration('LoadableIntegration', LoadableIntegration, {})
      .ready();
  });

  it('Should extend the core analytics', () => {
    expect(analytics).toBeInstanceOf(AnalyticsCore);
  });

  describe('After setConsent is called', () => {
    it('Should load integrations that match the given consent', async () => {
      analytics.addIntegration(
        'marketingIntegration',
        MarketingIntegration,
        {},
      );

      expect(analytics.integration('marketingIntegration')).toBeNull();

      // Allow the integration to run - this will trigger the flow to track the previously stored page() event
      await analytics.setConsent({ marketing: true });

      const marketingIntegrationInstance = analytics.integration(
        'marketingIntegration',
      );

      expect(marketingIntegrationInstance).not.toBeNull();

      const event = 'myEvent';
      const properties = {};
      // Simulate that the event has a different culture associated with it.
      const eventContext = {
        culture: 'pt-PT',
        library: { name: 'test', version: '1' },
      };

      // This call will be held until the consent is given to the integration
      await analytics.page(event, properties, eventContext);

      expect(
        (
          marketingIntegrationInstance as integrations.Integration<IntegrationOptions>
        ).track,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event,
          properties,
        }),
      );
    });

    it('Should call the track method of a loaded integration if a page event was tracked before it loaded', async () => {
      await analytics.addIntegration(
        'marketingIntegration',
        MarketingIntegration,
        {},
      );

      expect(analytics.integration('marketingIntegration')).toBeNull();

      // @ts-expect-error
      const coreTrackSpy = jest.spyOn(AnalyticsCore.prototype, 'trackInternal');
      const event = 'myEvent';
      const properties = {};
      const eventContext = { culture: 'pt-PT' }; // Simulate that the event has a different culture associated with it.

      // This call will be held until the consent is given to the integration
      await analytics.page(event, properties, eventContext);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event,
          properties,
          context: expect.objectContaining({
            event: expect.objectContaining(eventContext),
          }),
        }),
      );

      // Allow the integration to run - this will trigger the flow to track the previously stored page() event
      await analytics.setConsent({ marketing: true });

      const marketingIntegrationInstance = analytics.integration(
        'marketingIntegration',
      );

      expect(marketingIntegrationInstance).not.toBeNull();

      expect(
        (
          marketingIntegrationInstance as integrations.Integration<IntegrationOptions>
        ).track,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event,
          properties,
        }),
      );
    });
  });

  describe('UniqueViewId and PreviousUniqueViewId', () => {
    it('Should send the correct values for page views when not done consecutively', async () => {
      await analytics.ready();

      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      const firstTrackData = (
        coreTrackSpy.mock.calls[0] as EventData<TrackTypesValues>[]
      )[0];

      const firstTrackDataPreviousUniqueViewId = (
        firstTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const firstTrackDataUniqueViewId = (firstTrackData!.context as WebContext)
        .web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      expect(firstTrackDataPreviousUniqueViewId).toBeNull();
      expect(firstTrackDataUniqueViewId).toEqual(expect.any(String));

      jest.clearAllMocks();

      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      const secondTrackData = (
        coreTrackSpy.mock.calls[0] as EventData<TrackTypesValues>[]
      )[0];

      const secondTrackDataPreviousUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const secondTrackDataUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      expect(secondTrackDataPreviousUniqueViewId).toBe(
        firstTrackDataUniqueViewId,
      );

      expect(secondTrackDataUniqueViewId).toEqual(expect.any(String));

      expect(secondTrackDataUniqueViewId).not.toBe(
        secondTrackDataPreviousUniqueViewId,
      );
    });

    it('Should send the correct values for each page view when they are done consecutively', async () => {
      await analytics.ready();

      const firstPagePromise = analytics.page(
        mockEvent,
        mockEventProperties,
        mockEventContext,
      );

      const secondPagePromise = analytics.page(
        mockEvent,
        mockEventProperties,
        mockEventContext,
      );

      await Promise.all([firstPagePromise, secondPagePromise]);

      const firstTrackData = (
        coreTrackSpy.mock.calls[0] as EventData<TrackTypesValues>[]
      )[0];
      const secondTrackData = (
        coreTrackSpy.mock.calls[1] as EventData<TrackTypesValues>[]
      )[0];

      const firstTrackDataPreviousUniqueViewId = (
        firstTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const firstTrackDataUniqueViewId = (firstTrackData!.context as WebContext)
        .web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      const secondTrackDataPreviousUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const secondTrackDataUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      expect(firstTrackDataPreviousUniqueViewId).toBeNull();

      expect(firstTrackDataUniqueViewId).toEqual(expect.any(String));

      expect(secondTrackDataPreviousUniqueViewId).toBe(
        firstTrackDataUniqueViewId,
      );

      expect(secondTrackDataUniqueViewId).toEqual(expect.any(String));

      expect(secondTrackDataUniqueViewId).not.toBe(
        secondTrackDataPreviousUniqueViewId,
      );
    });

    it('Should send the correct values for tracks that are done after a page view', async () => {
      await analytics.ready();

      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      const firstTrackData = (
        coreTrackSpy.mock.calls[0] as EventData<TrackTypesValues>[]
      )[0];

      const firstTrackDataPreviousUniqueViewId = (
        firstTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const firstTrackDataUniqueViewId = (firstTrackData!.context as WebContext)
        .web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      jest.clearAllMocks();

      await analytics.track(mockEvent, mockEventProperties, mockEventContext);

      const secondTrackData = (
        coreTrackSpy.mock.calls[0] as EventData<TrackTypesValues>[]
      )[0];

      const secondTrackDataPreviousUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID];

      const secondTrackDataUniqueViewId = (
        secondTrackData!.context as WebContext
      ).web[utils.ANALYTICS_UNIQUE_VIEW_ID];

      expect(secondTrackDataPreviousUniqueViewId).toBe(
        firstTrackDataPreviousUniqueViewId,
      );

      expect(secondTrackDataUniqueViewId).toEqual(firstTrackDataUniqueViewId);
    });
  });

  describe('processContext', () => {
    it('Should return the context via .context() method', async () => {
      const context = await analytics.context();
      const filteredContext = await analytics.context('library');

      expect(filteredContext).toEqual(context.library);
    });

    it('Should append the web context properties', async () => {
      await analytics
        .addIntegration('integration', LoadableIntegration, {})
        .ready();

      const integrationInstance = analytics.integration('integration');

      // Call the page event so it generates and stores the currentUniqueViewId
      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      // Call the track event so it stores the lastFromParameter
      await analytics.track(
        mockEvent,
        {
          ...mockEventProperties,
          from: FromParameterType.Bag,
        },
        mockEventContext,
      );

      // Call the page event again so it generates the previousUniqueViewId
      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      expect(
        (integrationInstance as integrations.Integration<IntegrationOptions>)
          .track,
      ).toHaveBeenCalledTimes(3);

      // Only test the last page call that will contain all properties we want to verify
      expect(
        (integrationInstance as integrations.Integration<IntegrationOptions>)
          .track,
      ).toHaveBeenLastCalledWith(
        expect.objectContaining({
          context: expect.objectContaining({
            web: expect.objectContaining({
              [utils.ANALYTICS_UNIQUE_VIEW_ID]: expect.any(String),
              [utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID]: expect.any(String),
              [utils.LAST_FROM_PARAMETER_KEY]: FromParameterType.Bag,
            }),
          }),
        }),
      );

      // Clears the lastFromParameter
      await analytics.track(mockEvent, mockEventProperties, mockEventContext);

      // Should track the event without the lastFromParameter
      await analytics.page(mockEvent, mockEventProperties, mockEventContext);

      expect(
        (integrationInstance as integrations.Integration<IntegrationOptions>)
          .track,
      ).toHaveBeenLastCalledWith(
        expect.objectContaining({
          context: expect.objectContaining({
            web: expect.objectContaining({
              [utils.LAST_FROM_PARAMETER_KEY]: null,
            }),
          }),
        }),
      );
    });

    it('Should append event package versions to eventContext', () => {
      // This call will be held until the consent is given to the integration
      analytics.processContext(mockAnalyticsContext as WebContext);

      expect(mockAnalyticsContext).toEqual({
        library: expect.objectContaining({
          name: '@farfetch/blackout-react',
          version: expect.stringContaining(
            '@farfech-package@1.0.0;@farfetch/blackout-react@',
          ),
        }),
      });
    });
  });

  it('Should extend the `track() method for tracking of pages`', async () => {
    await analytics.page(mockEvent, mockEventProperties, mockEventContext);

    expect(coreTrackSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: analyticsTrackTypes.Page,
        event: mockEvent,
        properties: mockEventProperties,
        context: expect.objectContaining({
          event: expect.objectContaining(mockEventContext),
        }),
      }),
    );
  });

  describe('Page Location Referrer Property', () => {
    // The 'page location referrer' property is significant within the analytics context, specifically concerning web pages.
    // It is essential to ensure, through various tests, that different scenarios verify the proper operation of references,
    // especially in the case of a Single Page Application (SPA).

    const newAnalyticsIntance = () =>
      new (analytics.constructor as {
        new (): typeof analytics;
      })();

    it('Should retrieve pageLocationReferrer value from origin on first page view', async () => {
      const origin = 'www.example.com';

      jest.spyOn(document, 'referrer', 'get').mockReturnValueOnce(origin);

      const analyticsClean = newAnalyticsIntance();

      await analyticsClean.page(PageType.Homepage);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event: PageType.Homepage,
          context: expect.objectContaining({
            web: expect.objectContaining({
              pageLocationReferrer: origin,
            }),
          }),
        }),
      );
    });

    it('Should set `pageLocationReferrer` value to the previous page instead of document.referrer after the first navigation event', async () => {
      const origin = 'www.example.com';

      jest.spyOn(document, 'referrer', 'get').mockReturnValueOnce(origin);
      window.location.href = `${origin}/${PageType.Homepage}`;

      const analyticsClean = newAnalyticsIntance();

      await analyticsClean.page(PageType.Homepage);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event: PageType.Homepage,
          context: expect.objectContaining({
            web: expect.objectContaining({
              pageLocationReferrer: origin,
            }),
          }),
        }),
      );

      // set another page location
      window.location.href = `${origin}/${PageType.About}`;

      await analyticsClean.page(PageType.About);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event: PageType.About,
          context: expect.objectContaining({
            web: expect.objectContaining({
              pageLocationReferrer: `${origin}/${PageType.Homepage}`,
            }),
          }),
        }),
      );
    });

    it('should set `pageLocationReferrer` value to the previous page instead of document.referrer on track actions', async () => {
      const origin = 'www.example.com';

      jest.spyOn(document, 'referrer', 'get').mockReturnValueOnce(origin);
      window.location.href = `${origin}/${PageType.Homepage}`;

      const analyticsClean = newAnalyticsIntance();

      await analyticsClean.track(mockEvent, mockEventProperties);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Track,
          event: mockEvent,
          context: expect.objectContaining({
            web: expect.objectContaining({
              pageLocationReferrer: origin,
            }),
          }),
        }),
      );

      await analyticsClean.page(PageType.Homepage);

      expect(coreTrackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.Page,
          event: PageType.Homepage,
          context: expect.objectContaining({
            web: expect.objectContaining({
              pageLocationReferrer: `${origin}/${PageType.Homepage}`,
            }),
          }),
        }),
      );
    });
  });
});
