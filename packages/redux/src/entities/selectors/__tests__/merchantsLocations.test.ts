import {
  getMerchantLocation,
  getMerchantsLocations,
  getMerchantsLocationsByIds,
} from '..';
import {
  mockMerchantLocation,
  mockMerchantLocationId,
  mockMerchantLocationId1,
  mockState,
} from 'tests/__fixtures__/merchantsLocations';

describe('getMerchantLocation()', () => {
  it('should return the merchant location entity', () => {
    expect(getMerchantLocation(mockState, mockMerchantLocationId)).toEqual(
      mockMerchantLocation,
    );
  });
});

describe('getMerchantsLocations()', () => {
  it('should return all the merchantsLocations entities', () => {
    expect(getMerchantsLocations(mockState)).toEqual(
      mockState.entities.merchantsLocations,
    );
  });
});

describe('getMerchantsLocationsByIds()', () => {
  it('should get the merchants locations of the provided array of ids ', () => {
    const ids = [mockMerchantLocationId, mockMerchantLocationId1];

    const result = [
      mockMerchantLocation,
      { ...mockMerchantLocation, id: mockMerchantLocationId1 },
    ];

    expect(getMerchantsLocationsByIds(mockState, ids)).toEqual(result);
  });
});
