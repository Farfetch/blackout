import type {
  EventData,
  SetUserEventData,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import type { WebContextType } from '../context';

export type TrackWebEventData = EventData<TrackTypesValues> & {
  context: WebContextType;
};

export type PageWebEventData = EventData<TrackTypesValues> & {
  context: WebContextType;
};

export type SetUserWebEventData = SetUserEventData & {
  context: WebContextType;
};
