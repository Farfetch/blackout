import type {
  CONTAINER_ID_KEY,
  EVENT_SCHEMAS_KEY,
  EVENTS_MAPPER_KEY,
  SET_CONSENT_KEY,
  SET_CONTEXT_FN_KEY,
  SET_CONTEXT_KEY,
  SET_USER_FN_KEY,
  SET_USER_KEY,
} from '../constants.js';
import type {
  EventContext,
  EventData,
  IntegrationOptions,
  TrackTypesValues,
  UserData,
} from '@farfetch/blackout-analytics';
import type { Schemas } from '../../GA/index.js';
import type URLParse from 'url-parse';

export type EventMappers = Record<
  string,
  (data: EventData<TrackTypesValues>) => unknown
>;

export interface GTMIntegrationOptions extends IntegrationOptions {
  [CONTAINER_ID_KEY]: string;
  [SET_CONTEXT_KEY]?: string;
  [SET_CONTEXT_FN_KEY]?: (context: EventContext) => void;
  [SET_CONSENT_KEY]?: string;
  [SET_USER_KEY]?: string;
  [SET_USER_FN_KEY]?: (user: UserData) => void;
  [EVENTS_MAPPER_KEY]?: EventMappers;
  [EVENT_SCHEMAS_KEY]?: Schemas;
}

export type GTMEventContext = {
  currencyCode: string | undefined;
  eventContext: EventContext['event'];
  libraryVersion: EventContext['library']['version'];
  location: URLParse<Record<string, string | undefined>> | undefined;
  userAgent: (typeof window.navigator)['userAgent'] | undefined;
};

export type GTMEventData = {
  event: string;
  type: string;
  context?: GTMEventContext;
} & Record<string, unknown>;
