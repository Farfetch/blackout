import { schema } from 'normalizr';
import merchant from './merchant.js';

export default new schema.Entity(
  'returnOptions',
  { merchant },
  {
    idAttribute: (value, parent) => `${parent.merchantId}_${value.type}`,
    processStrategy: (value, parent) => ({
      ...value,
      id: `${parent.merchantId}_${value.type}`,
      merchantOrderId: parent.merchantOrderId,
      merchant: {
        id: parent.merchantId,
        name: parent.merchantName,
      },
    }),
  },
);
