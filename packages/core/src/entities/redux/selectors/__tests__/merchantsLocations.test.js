import { getMerchantLocation, getMerchantsLocations } from '..';
import {
  mockMerchantLocation,
  mockMerchantLocationId,
} from 'tests/__fixtures__/merchantsLocations';

describe('getMerchantLocation()', () => {
  it('should return the merchant location entity', () => {
    const state = {
      entities: {
        merchantsLocations: {
          [mockMerchantLocationId]: mockMerchantLocation,
        },
      },
    };

    expect(getMerchantLocation(state, mockMerchantLocationId)).toEqual(
      mockMerchantLocation,
    );
  });
});

describe('getMerchantsLocations()', () => {
  it('should return all the merchantsLocations entities', () => {
    const state = {
      entities: {
        merchantsLocations: {
          [mockMerchantLocationId]: mockMerchantLocation,
        },
      },
    };

    expect(getMerchantsLocations(state)).toEqual(
      state.entities.merchantsLocations,
    );
  });
});
