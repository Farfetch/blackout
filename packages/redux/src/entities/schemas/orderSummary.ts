import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';
import merchant from './merchant';

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
        merchant: {
          id: merchantId,
          name: merchantName,
        },
        byMerchant: {
          [merchantId]: {
            ...item,
            merchant: merchantId,
          },
        },
      };

      return convertedItem;
    },
  },
);
