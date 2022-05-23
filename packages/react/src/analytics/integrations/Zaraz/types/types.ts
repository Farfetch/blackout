import type {
  EventData,
  IntegrationOptions,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import type {
  OPTION_ENVIRONMENT,
  OPTION_EVENTS_MAPPER,
  OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT,
} from '../constants';

export type ZarazEventData = [
  'ecommerce' | 'track',
  Record<string, string | number | boolean | undefined | null>,
];

type Environment = string;
type EventMapper = (data: EventData<TrackTypesValues>) => ZarazEventData;

export type EventsMapper = Record<string, EventMapper>;

export interface ZarazIntegrationOptions extends IntegrationOptions {
  [OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT]?: string;
  [OPTION_EVENTS_MAPPER]?: EventsMapper;
  [OPTION_ENVIRONMENT]?: Environment;
}
