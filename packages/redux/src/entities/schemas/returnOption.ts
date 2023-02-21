import { schema } from 'normalizr';

export default new schema.Entity(
  'returnOptions',
  {},
  {
    idAttribute: value => value.merchantOrderId,
  },
);
