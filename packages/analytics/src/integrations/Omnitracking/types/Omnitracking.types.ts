import {
  OPTION_HTTP_CLIENT,
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from '../constants';
import type {
  commonTrackAndPageParams,
  pageActionEventTypes,
  pageDefinitions,
  pageViewEventTypes,
  trackDefinitions,
} from '../definitions';
import type {
  EventData,
  EventTypes,
  IntegrationOptions,
  PageTypes,
  PlatformTypes,
  TrackTypes,
  TrackTypesValues,
} from '../../..';

export type PageViewEvents =
  typeof pageViewEventTypes[keyof typeof pageViewEventTypes];

export type PageActionEvents =
  typeof pageActionEventTypes[keyof typeof pageActionEventTypes];

export type OmnitrackingPageEventParameters = {
  [K in typeof pageDefinitions[PageViewEvents][number]]?: unknown;
};

export type ValParameter = Record<string, unknown>;

export type OmnitrackingTrackEventParameters = {
  [K in typeof trackDefinitions[number]]?: unknown;
} & { val?: string };

export type OmnitrackingCommonEventParameters = {
  [K in typeof commonTrackAndPageParams[number]]?: unknown;
};

export type OmnitrackingPreCalculatedEventParameters =
  OmnitrackingTrackEventParameters & OmnitrackingPageEventParameters;

export interface OmnitrackingRequestPayload<
  T extends PageViewEvents | PageActionEvents,
> {
  clientId: number;
  correlationId: string;
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
  typeof EventTypes[keyof typeof EventTypes];

export type OmnitrackingPageMapperKey =
  typeof PageTypes[keyof typeof PageTypes];

export type OmnitrackingTrackEventsMapper = {
  [k in OmnitrackingTrackMapperKey]?: OmnitrackingTrackOrPageEventMapper;
};

export type OmnitrackingPageEventsMapper = {
  [K in OmnitrackingPageMapperKey]?: OmnitrackingTrackOrPageEventMapper;
};

export type SearchQueryParameters = string[];
export type HttpClient = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
) => Promise<void>;
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
> = T extends EventData<typeof TrackTypes.PAGE | typeof TrackTypes.SCREEN>
  ? OmnitrackingRequestPayload<PageViewEvents>['parameters']
  : OmnitrackingRequestPayload<PageActionEvents>['parameters'];

export type SpecificParametersBuilderByPlatform = {
  [K in typeof PlatformTypes[keyof typeof PlatformTypes]]: <
    T extends EventData<TrackTypesValues>,
  >(
    data: T,
  ) => SpecificParametersForEventType<T>;
};
