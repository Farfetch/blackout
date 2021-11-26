import { generateBagItemHash } from '..';
import { mockBagItem } from 'tests/__fixtures__/bags';

describe('generateBagItemHash()', () => {
  describe('error handling', () => {
    it('should throw error when product id is missing', () => {
      const {
        productId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        product, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when merchant id is missing', () => {
      const {
        merchantId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        merchant, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when size id is missing', () => {
      const {
        sizeId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        size, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when scale id is missing', () => {
      const {
        sizeScale, // eslint-disable-line  @typescript-eslint/no-unused-vars
        size, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });
  });

  describe('hash creation', () => {
    const baseHashPattern = `${mockBagItem.merchantId}!${mockBagItem.product.id}!${mockBagItem.sizeId}!${mockBagItem.size.scale}!`;

    it('should create a valid hash when no custom attributes are provided', () => {
      const {
        customAttributes, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(generateBagItemHash(item)).toBe(baseHashPattern);
    });
  });
});
