import { schema } from 'normalizr';

export default new schema.Entity(
  'sizeScales',
  {},
  {
    idAttribute: value => value.sizeScaleId,
  },
);
