/**
 * Some type predicates which helps in narrowing down the type of the event when
 * using typescript.
 */

import { get } from 'lodash-es';
import TrackTypes from '../types/TrackTypes.js';
import type { EventData, TrackTypesValues } from '../index.js';

export const isScreenEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackTypes.SCREEN> => {
  const type = get(data, 'type');

  return type === TrackTypes.SCREEN;
};

export const isPageEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackTypes.PAGE> => {
  const type = get(data, 'type');

  return type === TrackTypes.PAGE;
};

export const isTrackEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof TrackTypes.TRACK> => {
  const type = get(data, 'type');

  return type === TrackTypes.TRACK;
};
