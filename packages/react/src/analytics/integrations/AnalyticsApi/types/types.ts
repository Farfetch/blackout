import {
  type EventData,
  type IntegrationOptions,
  type TrackTypesValues,
} from '@farfetch/blackout-analytics';

export type EventList = Array<string>;

export interface AnalyticsApiIntegrationOptions extends IntegrationOptions {
  whitelistedEvents?: EventList;
  blacklistedEvents?: EventList;
  conversionsAPI?: {
    testEventCode?: string;
  };
}

export type AnalyticsApiTrackData = {
  data: EventData<TrackTypesValues>;
  options: AnalyticsApiIntegrationOptions;
};
