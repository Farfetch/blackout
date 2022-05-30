import type {
  EventData,
  IntegrationOptions,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import type {
  OPTION_ENVIRONMENT,
  OPTION_EVENTS_MAPPER,
  OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT,
  ZARAZ_ECOMMERCE_EVENTS,
} from '../constants';

export type EcommerceEvents =
  typeof ZARAZ_ECOMMERCE_EVENTS[keyof typeof ZARAZ_ECOMMERCE_EVENTS];

export type ZarazEventData<T extends 'ecommerce' | 'track'> = [
  T,
  T extends 'ecommerce' ? EcommerceEvents : string,
  Record<string, string | number | boolean | undefined | null>,
];

type Environment = string;
type EventMapper = (
  data: EventData<TrackTypesValues>,
) => ZarazEventData<'ecommerce'> | ZarazEventData<'track'>;

export type EventsMapper = Record<string, EventMapper>;

export interface ZarazIntegrationOptions extends IntegrationOptions {
  [OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT]?: string;
  [OPTION_EVENTS_MAPPER]?: EventsMapper;
  [OPTION_ENVIRONMENT]?: Environment;
}
