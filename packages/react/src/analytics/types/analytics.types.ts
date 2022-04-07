import type { EventData, TrackTypesValues } from '@farfetch/blackout-analytics';
import type { WebContextType } from '../context';

export type WebEventData = EventData<TrackTypesValues> & {
  context: WebContextType;
};
