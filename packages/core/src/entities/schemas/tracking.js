import { schema } from 'normalizr';
import labelTracking from './labelTracking';

export default new schema.Object(
  'trackings',
  { labelTrackings: [labelTracking] },
  {},
);
