import { findSpecificSizeGuide } from '../utils';
import {
  mockBrandId,
  mockCategories,
  mockSizeGuides,
} from 'tests/__fixtures__/sizeGuides';

describe('findSpecificSizeGuide', () => {
  describe('should correctly found the most specific sizeGuide', () => {
    it('with categories - deep 1 and brand id', () => {
      const result = findSpecificSizeGuide({
        sizeGuides: mockSizeGuides,
        categories: mockCategories,
        brandId: mockBrandId,
      });

      expect(result).toBe(mockSizeGuides[2]);
    });

    it('with categories - deep 0 and brand id', () => {
      const sizeGuides = [mockSizeGuides[0], mockSizeGuides[1]];
      const categories = [mockCategories[0]];
      const result = findSpecificSizeGuide({
        sizeGuides,
        categories,
        brandId: mockBrandId,
      });

      expect(result).toBe(mockSizeGuides[1]);
    });

    it('with categories - deep 1 and brandId null', () => {
      const sizeGuides = [mockSizeGuides[0], mockSizeGuides[1]];
      const categories = [mockCategories[0], mockCategories[1]];
      const result = findSpecificSizeGuide({
        sizeGuides,
        categories,
        brandId: mockBrandId,
      });

      expect(result).toBe(mockSizeGuides[1]);
    });

    it('with categories - deep 0 and brandId null', () => {
      const sizeGuides = [mockSizeGuides[0], mockSizeGuides[3]];
      const categories = [mockCategories[0]];
      const result = findSpecificSizeGuide({
        sizeGuides,
        categories,
        brandId: mockBrandId,
      });

      expect(result).toBe(mockSizeGuides[0]);
    });
  });

  it('should return undefined if does not have sizeGuides', () => {
    const result = findSpecificSizeGuide({
      categories: mockCategories,
      brandId: mockBrandId,
    });

    expect(result).toBeUndefined();
  });
});
