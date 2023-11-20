import type {
  commonTrackAndPageParams,
  pageActionEventTypes,
  pageDefinitions,
  pageViewEventTypes,
  trackDefinitions,
} from '../definitions.js';
import type {
  EventData,
  EventType,
  IntegrationOptions,
  PageType,
  PlatformType,
  TrackType,
  TrackTypesValues,
} from '../../../index.js';
import type {
  OPTION_HTTP_CLIENT,
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from '../constants.js';

export type PageViewEvents =
  (typeof pageViewEventTypes)[keyof typeof pageViewEventTypes];

export type PageActionEvents =
  (typeof pageActionEventTypes)[keyof typeof pageActionEventTypes];

export type OmnitrackingPageEventParameters = {
  [K in (typeof pageDefinitions)[PageViewEvents][number]]?: unknown;
};

export type ValParameter = Record<string, unknown>;

export type OmnitrackingTrackEventParameters = {
  [K in (typeof trackDefinitions)[number]]?: unknown;
};

export type OmnitrackingCommonEventParameters = {
  [K in (typeof commonTrackAndPageParams)[number]]?: unknown;
};

type OmnitrackingNonListedParameters = {
  analyticsPackageVersion?: string;
};

export type OmnitrackingPreCalculatedEventParameters =
  OmnitrackingTrackEventParameters &
    OmnitrackingPageEventParameters &
    OmnitrackingNonListedParameters;

export interface OmnitrackingRequestPayload<
  T extends PageViewEvents | PageActionEvents,
> {
  clientId: number;
  correlationId: string | null;
  customerId: string;
  event: T;
  parameters: T extends PageViewEvents
    ? OmnitrackingPageEventParameters
    : OmnitrackingTrackEventParameters;
  tenantId: number;
}

export type OmnitrackingAllParameters = OmnitrackingTrackEventParameters &
  OmnitrackingPageEventParameters &
  OmnitrackingCommonEventParameters;

export type OmnitrackingTrackOrPageMapperResult =
  | OmnitrackingTrackEventParameters
  | OmnitrackingTrackEventParameters[]
  | OmnitrackingPageEventParameters
  | OmnitrackingPageEventParameters[]
  | undefined;

export type OmnitrackingTrackOrPageEventMapper = (
  data: EventData<TrackTypesValues>,
) => OmnitrackingTrackOrPageMapperResult;

export type OmnitrackingTrackMapperKey =
  (typeof EventType)[keyof typeof EventType];

export type OmnitrackingPageMapperKey =
  (typeof PageType)[keyof typeof PageType];

export type OmnitrackingTrackEventsMapper = {
  [k in OmnitrackingTrackMapperKey]?: OmnitrackingTrackOrPageEventMapper;
};

export type OmnitrackingPageEventsMapper = {
  [K in OmnitrackingPageMapperKey]?: OmnitrackingTrackOrPageEventMapper;
};

export type SearchQueryParameters = string[];
export type HttpClient = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
) => Promise<Response | void>;
export type TransformPayloadFunction = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
  data: EventData<TrackTypesValues>,
) => OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>;

export interface OmnitrackingOptions extends IntegrationOptions {
  [OPTION_TRANSFORM_PAYLOAD]?: TransformPayloadFunction;
  [OPTION_SEARCH_QUERY_PARAMETERS]?: SearchQueryParameters;
  [OPTION_HTTP_CLIENT]?: HttpClient;
}

export type SpecificParametersForEventType<
  T extends EventData<TrackTypesValues>,
> = T extends EventData<typeof TrackType.Page | typeof TrackType.Screen>
  ? OmnitrackingRequestPayload<PageViewEvents>['parameters']
  : OmnitrackingRequestPayload<PageActionEvents>['parameters'];

export type SpecificParametersBuilderByPlatform = {
  [K in (typeof PlatformType)[keyof typeof PlatformType]]: <
    T extends EventData<TrackTypesValues>,
  >(
    data: T,
  ) => SpecificParametersForEventType<T>;
};
