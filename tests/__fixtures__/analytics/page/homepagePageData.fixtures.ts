import {
  EventData,
  pageTypes,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const data: EventData<TrackTypesValues> = {
  ...basePageData,
  properties: {
    storeId: 123123,
    cenas: 123123,
    didYouMean: 1123123,
  },
  event: pageTypes.HOMEPAGE,
};

export default data;
