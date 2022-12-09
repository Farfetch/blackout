/**
 * Some type predicates which helps in narrowing down the type of the event when
 * using typescript.
 */

import get from 'lodash/get';
import TrackTypes from '../types/TrackTypes';
import type { EventData, TrackTypesValues } from '..';

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
