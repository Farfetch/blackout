import { schema } from 'normalizr';

const itemDeliveryProvisioning = new schema.Entity(
  'itemDeliveryProvisioning',
  {},
  { idAttribute: 'itemId' },
);

export default new schema.Array(itemDeliveryProvisioning);
