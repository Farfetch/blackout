import type {
  CONSENT_KEYS,
  LOAD_INTEGRATION_TRACK_TYPE,
  ON_SET_USER_TRACK_TYPE,
} from '../utils/constants';
import type { Integration } from '../integrations';
import type { IntegrationFactory } from '../integrations/Integration';
import type trackTypes from '../types/trackTypes';

export type TrackTypesValues = typeof trackTypes[keyof typeof trackTypes];

export type ConsentData = {
  [key in typeof CONSENT_KEYS[number]]?: boolean;
};

export type ContextData = {
  library: string;
  version: string;
} & Record<string, unknown>;

export type EventProperties = Record<string, unknown>;
export type EventContextData = Record<string, unknown>;
export type EventContext = ContextData & { event: Record<string, unknown> };

export type EventData<T> = {
  type: T;
  event: T extends typeof LOAD_INTEGRATION_TRACK_TYPE
    ? typeof LOAD_INTEGRATION_TRACK_TYPE
    : T extends typeof ON_SET_USER_TRACK_TYPE
    ? typeof ON_SET_USER_TRACK_TYPE
    : string;
  user: UserData | null;
  consent: ConsentData;
  context: EventContext;
  platform: string | undefined;
  timestamp: number;
  properties: EventProperties;
};

export type LoadIntegrationEventData = EventData<
  typeof LOAD_INTEGRATION_TRACK_TYPE
>;
export type SetUserEventData = EventData<typeof ON_SET_USER_TRACK_TYPE>;

export type IntegrationRuntimeData = {
  instance: Integration | undefined;
  Factory: IntegrationFactory;
  options: Record<string, unknown>;
  name: string;
};

export type IntegrationOptions = Record<string, unknown>;

export type UserTraits = Record<string, unknown>;

export type UserData = {
  id: string | null;
  localId: string;
  traits: UserTraits;
};

export type StrippedDownAnalytics = {
  createEvent: (
    type: TrackTypesValues,
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ) => Promise<EventData<TrackTypesValues>>;
};
