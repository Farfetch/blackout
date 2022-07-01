import analytics from '../analytics';
import AnalyticsCore, {
  trackTypes as analyticsTrackTypes,
  ConsentData,
  IntegrationOptions,
  integrations,
} from '@farfetch/blackout-analytics';
import TestStorage from 'test-storage';

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

describe('analytics web', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    // @ts-expect-error
    analytics.isReady = false;
    // @ts-expect-error
    analytics.integrations.clear();
    analytics.currentPageCallData = null;

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
      await analytics.addIntegration(
        'marketingIntegration',
        MarketingIntegration,
        {},
      );

      expect(analytics.integration('marketingIntegration')).toBe(null);

      // Allow the integration to run - this will trigger the flow to track the previously stored page() event
      await analytics.setConsent({ marketing: true });

      const marketingIntegrationInstance = analytics.integration(
        'marketingIntegration',
      );

      expect(marketingIntegrationInstance).not.toBe(null);

      const event = 'myEvent';
      const properties = {};
      const eventContext = { culture: 'pt-PT' }; // Simulate that the event has a different culture associated with it.

      // This call will be held until the consent is given to the integration
      await analytics.page(event, properties, eventContext);

      expect(
        (
          marketingIntegrationInstance as integrations.Integration<IntegrationOptions>
        ).track,
      ).toBeCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.PAGE,
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

      expect(analytics.integration('marketingIntegration')).toBe(null);

      // @ts-expect-error
      const coreTrackSpy = jest.spyOn(AnalyticsCore.prototype, 'trackInternal');
      const event = 'myEvent';
      const properties = {};
      const eventContext = { culture: 'pt-PT' }; // Simulate that the event has a different culture associated with it.

      // This call will be held until the consent is given to the integration
      await analytics.page(event, properties, eventContext);

      expect(coreTrackSpy).toBeCalledWith(
        analyticsTrackTypes.PAGE,
        event,
        properties,
        eventContext,
      );

      // Allow the integration to run - this will trigger the flow to track the previously stored page() event
      await analytics.setConsent({ marketing: true });

      const marketingIntegrationInstance = analytics.integration(
        'marketingIntegration',
      );

      expect(marketingIntegrationInstance).not.toBe(null);

      expect(
        (
          marketingIntegrationInstance as integrations.Integration<IntegrationOptions>
        ).track,
      ).toBeCalledWith(
        expect.objectContaining({
          type: analyticsTrackTypes.PAGE,
          event,
          properties,
        }),
      );
    });
  });

  it('Should extend the `track() method for tracking of pages`', async () => {
    // @ts-expect-error
    const coreTrackSpy = jest.spyOn(AnalyticsCore.prototype, 'trackInternal');
    const event = 'myEvent';
    const properties = {};
    const eventContext = { culture: 'pt-PT' }; // Simulate that the event has a different culture associated with it.

    await analytics.page(event, properties, eventContext);

    expect(coreTrackSpy).toBeCalledWith(
      analyticsTrackTypes.PAGE,
      event,
      properties,
      eventContext,
    );
  });
});
