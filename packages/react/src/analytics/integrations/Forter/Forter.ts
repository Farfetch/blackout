import { defaultTo, get } from 'lodash-es';
import {
  ForterTokenLoadedAnalyticsEvent,
  ForterTokenTid,
} from './constants.js';
import {
  integrations,
  type LoadIntegrationEventData,
  type SetUserEventData,
  type StrippedDownAnalytics,
  TrackTypes,
  utils,
} from '@farfetch/blackout-analytics';
import { postTracking } from '@farfetch/blackout-client';
import ForterTokenLoadedDetector from './forterTokenLoadedEventDetector.js';
import loadForterScriptForSiteId from './loadForterScriptForSiteId.js';
import type { ForterIntegrationOptions } from './types/index.js';

class Forter extends integrations.Integration<ForterIntegrationOptions> {
  private onSetUserPromise!: Promise<SetUserEventData>;
  private resolveOnSetUserPromise?:
    | ((value: SetUserEventData | PromiseLike<SetUserEventData>) => void)
    | null;

  static override shouldLoad(): boolean {
    return true;
  }

  constructor(
    options: ForterIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    const safeOptions = defaultTo({ ...options }, { siteId: '' });

    super(safeOptions, loadData, analytics);

    if (!safeOptions.siteId) {
      throw new Error(
        "[Forter] - `siteId` parameter was not provided in options. It's mandatory to load Forter Integration.",
      );
    }

    this.initialize();
  }

  initialize() {
    const { siteId, origin } = this.options;

    if (!origin) {
      utils.logger.warn(
        "[Forter] - `origin` parameter was not provided in options. It's advisable to provide an origin option to aid in debugging",
      );
    }

    this.setupOnSetUserPromise();

    this.setupForterTokenLoadedEventListener();

    this.loadForterScript(siteId as string);
  }

  /**
   * Sets up a ForterTokenLoadedDetector instance in order to detect
   * when the forter token loaded event is raised.
   * When raised, it will then post a tracking message to Omnitracking
   * with the loaded forter token.
   *
   * @returns Promise that will be resolved when the forter token is loaded.
   */
  async setupForterTokenLoadedEventListener() {
    const forterTokenLoadedDetector = new ForterTokenLoadedDetector();
    const forterToken = await forterTokenLoadedDetector.getForterToken();

    this.sendForterTokenLoadedEventForOmnitracking(forterToken);
  }

  /**
   * Creates a synthetic analytics event representing a track of
   * the forter loaded event in order to be used
   * in calls to omnitracking-helper functions.
   *
   * @returns Promise that will be resolved when analytics creates an event.
   */
  async createSyntheticForterTokenLoadedEvent() {
    const syntheticEventData = await this.strippedDownAnalytics.createEvent(
      TrackTypes.TRACK,
      ForterTokenLoadedAnalyticsEvent,
    );

    return syntheticEventData;
  }

  /**
   * Responsible for sending the loaded forter token to Omnitracking.
   * Needs to wait for a user to be set in analytics by analytics.setUser method
   * in order to have the `customerId` parameter filled as it is a required
   * parameter by Omnitracking.
   *
   * @param forterToken - String representing the loaded forter token.
   * @returns Promise that will be resolved when the user is set in analytics and the Omnitracking message is built.
   *
   */
  async sendForterTokenLoadedEventForOmnitracking(forterToken: string) {
    await this.onSetUserPromise;

    const omnitrackingMessage = await this.getForterTokenLoadedEventPayload(
      forterToken,
    );

    if (this.options.omnitrackingHttpClient) {
      try {
        await this.options.omnitrackingHttpClient(omnitrackingMessage);
      } catch (error) {
        utils.logger.error(
          '[Forter] - Error sending tracking event through Omnitracking HTTP client: ',
          error,
        );
      }

      return;
    }

    await postTracking({ ...omnitrackingMessage });
  }

  /**
   * Generates an Omnitracking message as specified by the documentation
   * in order to be posted to Omnitracking and thus, obtain the reference
   * to the forter token for this session.
   *
   * @param forterToken - String representing the loaded forter token.
   *
   * @returns Promise that will be resolved when the Omnitracking message is built.
   */
  async getForterTokenLoadedEventPayload(forterToken: string) {
    const forterTokenLoadedEventData =
      await this.createSyntheticForterTokenLoadedEvent();

    const additionalParameters = {
      tid: ForterTokenTid,
      val: JSON.stringify({
        forterTokenCookie: forterToken,
        origin: get(this.options, 'origin', 'NOT_DEFINED'),
        userAgent: get(
          forterTokenLoadedEventData,
          'context.web.window.navigator.userAgent',
        ),
      }),
    };

    const payload = integrations.Omnitracking.formatTrackEvent(
      forterTokenLoadedEventData,
      additionalParameters,
    );

    return payload;
  }

  /**
   * Sets up the promise that will be resolved when onSetUser of this instance
   * is called by analytics.
   */
  setupOnSetUserPromise() {
    this.onSetUserPromise = new Promise<SetUserEventData>(resolve => {
      this.resolveOnSetUserPromise = resolve;
    });
  }

  /**
   * Loads the forter script with the corresponding siteId.
   *
   * @param siteId - Site identifier required by forter script and is configured by the user when adding this integration with `analytics.addIntegration` method.
   */
  loadForterScript(siteId: string) {
    loadForterScriptForSiteId(siteId);
  }

  /**
   * Resolves the configured set user promise.
   */
  override onSetUser(data: SetUserEventData) {
    if (this.resolveOnSetUserPromise) {
      this.resolveOnSetUserPromise(data);
      this.resolveOnSetUserPromise = null;
    }
  }

  /**
   * Overrides track method to remove the default
   * implementation which throws an error.
   */
  override track() {
    // Do nothing
  }
}

export default Forter;
