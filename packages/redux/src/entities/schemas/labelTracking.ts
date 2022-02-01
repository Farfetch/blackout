import { schema } from 'normalizr';
import courier from '@farfetch/blackout-client/entities/schemas/courier';

export default new schema.Entity(
  'labelTracking',
  { courier },
  {
    idAttribute: value => {
      return value.trackingNumber;
    },
  },
);
