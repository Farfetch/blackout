import type {
  CONSENT_CATEGORIES_PROPERTY,
  LOAD_INTEGRATION_TRACK_TYPE,
  ON_SET_USER_TRACK_TYPE,
} from '../utils/constants';
import type { Integration } from '../integrations';
import type { User } from '@farfetch/blackout-client';
import type TrackTypes from '../types/TrackTypes';

export type TrackTypesValues = typeof TrackTypes[keyof typeof TrackTypes];

export type ConsentData = {
  [k: string]: boolean;
};

type CommonContextData = {
  tenantId?: number;
  clientId?: number;
  culture?: string;
  currencyCode?: string;
  clientCountry?: string;
};

export type ContextData = {
  library: {
    name: string;
    version: string;
  };
} & CommonContextData &
  Record<string, unknown>;

export type EventProperties = { products?: AnalyticsProduct[] } & Record<
  string,
  unknown
>;
export type EventContextData = Record<string, unknown>;
export type EventContext = ContextData & { event?: Record<string, unknown> };

export type EventData<T extends string> = {
  type: T;
  event: T extends typeof LOAD_INTEGRATION_TRACK_TYPE
    ? typeof LOAD_INTEGRATION_TRACK_TYPE
    : T extends typeof ON_SET_USER_TRACK_TYPE
    ? typeof ON_SET_USER_TRACK_TYPE
    : string;
  user: UserData;
  consent: ConsentData | null;
  context: EventContext;
  platform: string | undefined;
  timestamp: number;
  properties: EventProperties;
};

export type LoadIntegrationEventData = EventData<
  typeof LOAD_INTEGRATION_TRACK_TYPE
>;
export type SetUserEventData = EventData<typeof ON_SET_USER_TRACK_TYPE>;

export type PageviewEventData = EventData<TrackTypes.PAGE>;
export type ScreenviewEventData = EventData<TrackTypes.SCREEN>;
export type TrackEventData = EventData<TrackTypes.TRACK>;

export type IntegrationRuntimeData = {
  instance: Integration<IntegrationOptions> | undefined;
  Factory: IntegrationFactory<IntegrationOptions>;
  options: IntegrationOptions;
  name: string;
};

export type IntegrationOptions = Record<string, unknown> & {
  [CONSENT_CATEGORIES_PROPERTY]?: string | string[] | null;
};

export interface IntegrationFactory<T extends IntegrationOptions> {
  new (
    options: T,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ): Integration<T>;
  createInstance<Options extends IntegrationOptions>(
    this: IntegrationFactory<Options>,
    options: Options,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ): Integration<Options>;
  shouldLoad(
    consent: ConsentData | null | undefined,
    options: IntegrationOptions,
  ): boolean;
}

export type ExtendedTrackTypes =
  | TrackTypesValues
  | typeof ON_SET_USER_TRACK_TYPE
  | typeof LOAD_INTEGRATION_TRACK_TYPE;

export type UserTraits = Omit<User, 'id'>;

export type UserData = {
  id: number | null | undefined;
  localId: string;
  traits: UserTraits | null | undefined;
};

export type StrippedDownAnalytics = {
  createEvent: (
    type: TrackTypesValues,
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ) => Promise<EventData<TrackTypesValues>>;
};

export type UseContextFn = () => CommonContextData & { event?: never } & Record<
    string,
    unknown
  >;

export type AnalyticsProduct = {
  id?: string;
  name?: string;
  currency?: string;
  category?: string;
  brand?: string;
  variant?: string;
  price?: number;
  priceWithoutDiscount?: number;
  quantity?: number;
  affiliation?: string;
  position?: number;
  discountValue?: number;
  coupon?: string;
  list?: string;
  listId?: string;
  size?: string;
} & Record<string, unknown>;
