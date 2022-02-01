import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import { schema } from 'normalizr';
import merchant from '@farfetch/blackout-client/entities/schemas/merchant';

export default new schema.Entity(
  'orders',
  { merchant },
  {
    mergeStrategy: (entityA, entityB) => {
      return {
        ...entityA,
        ...entityB,
        totalItems: entityA.totalItems + entityB.totalItems,
        byMerchant: { ...entityA.byMerchant, ...entityB.byMerchant },
      };
    },
    processStrategy: value => {
      const { id, merchantId, createdDate, merchantName, ...item } = value;

      const convertedItem = {
        id,
        createdDate: adaptDate(createdDate),
        totalItems: item.totalQuantity,
        byMerchant: {
          [merchantId]: {
            ...item,
            merchant: {
              id: merchantId,
              name: merchantName,
            },
          },
        },
      };

      return convertedItem;
    },
  },
);
