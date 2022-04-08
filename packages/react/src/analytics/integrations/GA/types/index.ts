import type {
  EventData,
  IntegrationOptions,
  LoadIntegrationEventData,
  SetUserEventData,
  trackTypes,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import type { Schema } from '../../shared/types/shared.types';

export type GACommand = [command: string, ...args: unknown[]];
export type GACommandList = GACommand[];

export type ProductMappings = Record<string, string | string[]>;
export type Schemas = Record<string, Schema>;
export type OnPreProcessCommandsHandler = (
  commandList: GACommandList,
  data:
    | EventData<TrackTypesValues>
    | SetUserEventData
    | LoadIntegrationEventData,
) => GACommandList;
export type NonInteractionEvents = Record<string, boolean>;

export interface GAIntegrationOptions extends IntegrationOptions {
  createFields: { trackingId: string; name?: string };
  productMappings?: ProductMappings;
  scopeCommands?: ScopeCommands;
  schemas?: Schemas;
  onPreProcessCommands?: OnPreProcessCommandsHandler;
  nonInteractionEvents?: NonInteractionEvents;
}

export type EventScopeCommandsHandlers = {
  extras?: (data: EventData<typeof trackTypes.TRACK>) => GACommandList;
  main?: (
    data: EventData<typeof trackTypes.TRACK>,
    productMappings: ProductMappings,
  ) => GACommandList;
};

export type PageviewScopeExtrasCommandsHandler = {
  extras: (data: EventData<typeof trackTypes.PAGE>) => GACommandList;
};

export type UserScopeCommandsHandler = (
  data: SetUserEventData | LoadIntegrationEventData,
) => GACommandList;

type EventScopeCommands = {
  [eventName: string]: EventScopeCommandsHandlers;
};

export interface ScopeCommands {
  user?: UserScopeCommandsHandler;
  hit?: {
    pageview?: PageviewScopeExtrasCommandsHandler;
    event?: EventScopeCommands;
  };
}

export type ValidateCommandResult = {
  isValid: boolean;
  errorMessage?: string;
};
