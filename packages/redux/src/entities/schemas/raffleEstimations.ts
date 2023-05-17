import { schema } from 'normalizr';

export default new schema.Entity(
  'raffleEstimations',
  {},
  {
    idAttribute: 'raffleId',
    processStrategy: value => {
      const { raffleId, ...rest } = value;

      return rest;
    },
  },
);
