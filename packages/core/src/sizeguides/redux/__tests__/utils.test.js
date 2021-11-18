import { getSpecificSizeguide } from '../utils';
import {
  mockBrandId,
  mockCategories,
  mockSizeguides,
} from 'tests/__fixtures__/sizeguides';

describe('getSpecificSizeguide', () => {
  describe('should correctly found the most specific sizeguide', () => {
    it('with categories - deep 1 and brand id', () => {
      const result = getSpecificSizeguide(
        mockSizeguides,
        mockCategories,
        mockBrandId,
      );

      expect(result).toBe(mockSizeguides[2]);
    });

    it('with categories - deep 0 and brand id', () => {
      const sizeguides = [mockSizeguides[0], mockSizeguides[1]];
      const categories = [mockCategories[0]];
      const result = getSpecificSizeguide(sizeguides, categories, mockBrandId);

      expect(result).toBe(mockSizeguides[1]);
    });

    it('with categories - deep 1 and brandId null', () => {
      const sizeguides = [mockSizeguides[0], mockSizeguides[1]];
      const categories = [mockCategories[0], mockCategories[1]];
      const result = getSpecificSizeguide(sizeguides, categories, mockBrandId);

      expect(result).toBe(mockSizeguides[1]);
    });

    it('with categories - deep 0 and brandId null', () => {
      const sizeguides = [mockSizeguides[0], mockSizeguides[3]];
      const categories = [mockCategories[0]];
      const result = getSpecificSizeguide(sizeguides, categories, mockBrandId);

      expect(result).toBe(mockSizeguides[0]);
    });
  });
});
