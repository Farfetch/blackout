/**
 * Some type predicates which helps in narrowing down the type of the event when
 * using typescript.
 */

import { get } from 'lodash-es';
import TrackType from '../types/TrackType.js';
import type { EventData, TrackTypesValues } from '../index.js';

export const isScreenEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackType.Screen> => {
  const type = get(data, 'type');

  return type === TrackType.Screen;
};

export const isPageEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackType.Page> => {
  const type = get(data, 'type');

  return type === TrackType.Page;
};

export const isTrackEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackType.Track> => {
  const type = get(data, 'type');

  return type === TrackType.Track;
};
