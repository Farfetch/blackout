import * as selectors from '../sets.js';
import {
  mockProductId,
  mockProductsState,
  mockSetId,
} from 'tests/__fixtures__/products/index.mjs';

describe('Sets', () => {
  describe('getProductRelatedSetsIdsByType()', () => {
    it('should get the related sets of a specific type', () => {
      const mockProductType = 3;

      expect(
        selectors.getProductRelatedSetsIdsByType(
          mockProductsState,
          mockProductId,
          mockProductType,
        ),
      ).toEqual([mockSetId]);
    });

    it('should return an empty array if there are no related sets of the given type', () => {
      const mockProductType = 1;

      expect(
        selectors.getProductRelatedSetsIdsByType(
          mockProductsState,
          mockProductId,
          mockProductType,
        ),
      ).toEqual([]);
    });
  });
});
