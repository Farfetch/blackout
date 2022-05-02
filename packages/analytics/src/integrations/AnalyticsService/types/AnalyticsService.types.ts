import type {
  EventData,
  IntegrationOptions,
  SetUserEventData,
  TrackTypesValues,
} from '../../../types/analytics.types';
import type { REQUEST_INTERVAL_KEY } from '../constants';

export interface AnalyticsServiceOptions extends IntegrationOptions {
  [REQUEST_INTERVAL_KEY]?: number;
}

export type AnalyticsRequestPayload = {
  type: string;
  version: string;
  data: EventData<TrackTypesValues> | SetUserEventData;
};
