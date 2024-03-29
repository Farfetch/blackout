import type {
  CONSENT_CATEGORIES_PROPERTY,
  LOAD_INTEGRATION_TRACK_TYPE,
  ON_SET_USER_TRACK_TYPE,
} from '../utils/constants.js';
import type { Integration } from '../integrations/index.js';
import type { User, UserLegacy } from '@farfetch/blackout-client';
import type TrackType from './TrackType.js';

export type TrackTypesValues = (typeof TrackType)[keyof typeof TrackType];

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

export type PageviewEventData = EventData<TrackType.Page>;
export type ScreenviewEventData = EventData<TrackType.Screen>;
export type TrackEventData = EventData<TrackType.Track>;

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

export type UserTraits =
  | Partial<Omit<User, 'id'>>
  | Partial<Omit<UserLegacy, 'id'>>;

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
  affiliation?: string;
  brand?: string;
  category?: string;
  coupon?: string;
  currency?: string;
  discountValue?: number;
  id?: string;
  list?: string;
  listId?: string;
  name?: string;
  position?: number;
  price?: number;
  priceWithoutDiscount?: number;
  quantity?: number;
  size?: string;
  unitSalePrice?: number;
  variant?: string;
} & Record<string, unknown>;
