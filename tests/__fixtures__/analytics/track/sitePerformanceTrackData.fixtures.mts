import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.SitePerformance,
  properties: {
    performanceStats: {
      ttfb: 766.2,
      dcl: 2716.1,
      fp: 1545.1,
      fcp: 1545.2,
      lcp: 1838.8,
      plt: 3166.2,
      fid: 2,
      cls: 0.008834942534125895,
      tlt: 13244,
      tbt: 6594,
      fltst: 1591.4,
      fltd: 124,
      loltst: 1907.9,
      loltd: 812,
      lltst: 250539.2,
      lltd: 126,
      nlt: 133,
      top: 252654,
    },
  },
};

export default fixtures;
