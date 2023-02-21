import {
  type EventData,
  integrations,
  type LoadIntegrationEventData,
  type StrippedDownAnalytics,
  TrackTypes,
  type TrackTypesValues,
} from '@farfetch/blackout-analytics';
import get from 'lodash/get';
import type { RiskifiedIntegrationOptions } from './types';

class Riskified extends integrations.Integration<RiskifiedIntegrationOptions> {
  baseUrl!: string;
  isReadyPromise: Promise<unknown>;
  resolveIsReadyPromise!: (value?: unknown) => void;

  /**
   * Creates an instance of Riskified and sets the script on the page.
   *
   * @param options - Custom options for the integration.
   * @param loadData - Analytics's load event data.
   * @param analytics - Stripped down analytics instance.
   */
  constructor(
    options: RiskifiedIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.isReadyPromise = new Promise(resolve => {
      this.resolveIsReadyPromise = resolve;
    });

    if (!options.shop) {
      throw new Error(
        "[Riskified] - `shop` parameter was not provided in options. It's mandatory to load Riskified Integration.",
      );
    }

    this.baseUrl = `https://beacon.riskified.com?shop=${this.options.shop}&sid=`;

    this.setupScript(loadData);
  }

  /**
   * Returns true due to being a required integration - No need to check for consent.
   *
   * @returns A value indicating if the integration should load.
   */
  static override shouldLoad(): boolean {
    return true;
  }

  /**
   * Creates the script based on the correlation `id` and appends it on the page.
   * Once the script is on the page, it will automatically set `isReady` property to true.
   *
   * @param loadData - Analytics's load event data.
   *
   * @returns The Riskified instance to allow chaining calls.
   */
  setupScript(loadData: LoadIntegrationEventData): this {
    const correlationId = get(loadData, 'user.localId');
    const script = document.createElement('script');
    const url = `${this.baseUrl}${correlationId}`;

    script.onload = this.onLoad;

    script.setAttribute('data-test', 'riskified');
    script.async = true;
    script.src = url;
    document.body.appendChild(script);

    return this;
  }

  /**
   * Tracks events (page views or page actions).
   *
   * @param data - The event object.
   *
   */
  override track(data: EventData<TrackTypesValues>) {
    switch (data.type) {
      case TrackTypes.PAGE:
        this.trackPage(get(data, 'context.web.window.location.href'));
    }
  }

  /**
   * Tracks the page view event. Calls the global Riskified variable RISKX.go with the web location.
   *
   * @param location - The location data.
   *
   */
  async trackPage(location: string) {
    await this.isReadyPromise;
    window.RISKX.go(location);
  }

  /**
   * When the script loads onto the DOM, it will set the integration as ready.
   */
  onLoad = () => {
    this.resolveIsReadyPromise?.();
  };
}

export default Riskified;
