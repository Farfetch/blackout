import { getMerchant } from '../../index.js';
import {
  mockMerchant,
  mockMerchantId,
} from 'tests/__fixtures__/products/index.mjs';

describe('getMerchant()', () => {
  it('should return the merchant entity', () => {
    const state = {
      entities: {
        merchants: {
          [mockMerchantId]: mockMerchant,
        },
      },
    };

    expect(getMerchant(state, mockMerchantId)).toEqual(mockMerchant);
  });
});
