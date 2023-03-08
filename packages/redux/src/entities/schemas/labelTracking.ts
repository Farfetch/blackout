import { schema } from 'normalizr';
import courier from './courier.js';

export default new schema.Entity(
  'labelTracking',
  { courier },
  {
    idAttribute: value => {
      return value.trackingNumber;
    },
  },
);
