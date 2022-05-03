import type {
  IntegrationOptions,
  LoadIntegrationEventData,
  PageviewEventData,
  SetUserEventData,
  TrackEventData,
} from '@farfetch/blackout-analytics';
import type {
  OPTION_DATA_LAYER_NAME,
  OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS,
  OPTION_LOAD_SCRIPT_FUNCTION,
  OPTION_MEASUREMENT_ID,
  OPTION_NON_INTERACTION_EVENTS,
  OPTION_ON_PRE_PROCESS_COMMANDS,
  OPTION_PRODUCT_MAPPINGS,
  OPTION_SCHEMAS,
  OPTION_SCOPE_COMMANDS,
  OPTION_SET_CUSTOM_USER_ID_PROPERTY,
} from '../constants';
import type { Schema } from '../../shared/types/shared.types';

export type Schemas = Record<string, Schema>;

export interface GA4IntegrationOptions extends IntegrationOptions {
  [OPTION_MEASUREMENT_ID]: string;
  [OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS]?: boolean;
  [OPTION_NON_INTERACTION_EVENTS]?: NonInteractionEvents;
  [OPTION_PRODUCT_MAPPINGS]?: ProductMappings;
  [OPTION_SCOPE_COMMANDS]?: ScopeCommands;
  [OPTION_SCHEMAS]?: Schemas;
  [OPTION_SET_CUSTOM_USER_ID_PROPERTY]?: boolean;
  [OPTION_DATA_LAYER_NAME]?: string;
  [OPTION_LOAD_SCRIPT_FUNCTION]?: () => Promise<void>;
  [OPTION_ON_PRE_PROCESS_COMMANDS]?: OnPreProcessCommandsHandler;
}

export type ProductMappings = Record<string, string | string[]>;

export type NonInteractionEvents = Record<string, boolean>;

export type OnPreProcessCommandsHandler = (
  commandList: GA4CommandList,
  data:
    | TrackEventData
    | PageviewEventData
    | SetUserEventData
    | LoadIntegrationEventData,
) => GA4CommandList;

export type GA4CommandList = GA4Command[];
export type GA4Command = [command: string, ...args: unknown[]];

export type EventScopeCommandsHandlers = {
  extras?: (data: TrackEventData) => GA4CommandList;
  main?: (
    data: TrackEventData,
    productMappings?: ProductMappings,
  ) => GA4CommandList;
};

type EventScopeCommands = {
  [eventName: string]: EventScopeCommandsHandlers;
};

export type PageviewScopeExtrasCommandsHandler = {
  extras: (data: PageviewEventData) => GA4CommandList;
};

export type UserScopeCommandsHandler = (
  data: SetUserEventData | LoadIntegrationEventData,
) => GA4CommandList;

export type ScopeCommands = {
  user?: UserScopeCommandsHandler;
  pageview?: PageviewScopeExtrasCommandsHandler;
  event?: EventScopeCommands;
};
