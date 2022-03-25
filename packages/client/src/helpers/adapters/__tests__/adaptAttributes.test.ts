import { adaptAttributes } from '..';
import {
  oneSizeProduct,
  productWithTwoSizes,
  sizeAttributes,
} from '../__fixtures__/adapters.fixtures';
import { VariantAttributeTypeEnum } from '@farfetch/blackout-client/products/types';

describe('adaptAttributes()', () => {
  it("should return an empty object when doesn't receive sizes", () => {
    expect(adaptAttributes([])).toEqual({});
  });

  it('should return an empty object when there is only one attribute', () => {
    expect(
      adaptAttributes([
        {
          type: VariantAttributeTypeEnum.Size,
          value: 'value',
          description: 'description',
        },
      ]),
    ).toEqual({});
  });

  it('should map attributes to the corresponding structure', () => {
    expect(
      adaptAttributes(sizeAttributes, productWithTwoSizes),
    ).toMatchSnapshot('size attributes adapter');
  });

  it('should not map invalid attributes on the final structure', () => {
    const invalidAttribute = {
      type: 100,
      description: 'Foo',
      value: 'foo',
    };
    const attributes = [...sizeAttributes, invalidAttribute];

    expect(adaptAttributes(attributes)).not.toEqual(
      expect.objectContaining({
        [invalidAttribute.description]: invalidAttribute.value,
      }),
    );
  });

  it('should map attributes to the corresponding structure when the given size does not exist in the available sizes', () => {
    const result = adaptAttributes(
      sizeAttributes,
      productWithTwoSizes.slice(1),
    );
    expect(result).not.toHaveProperty('globalQuantity');
    expect(result).toMatchSnapshot(
      'size attributes adapter when the given size does not exist in the available sizes',
    );
  });

  it('should map attributes to the corresponding structure for a one size product', () => {
    expect(adaptAttributes(sizeAttributes, oneSizeProduct)).toMatchSnapshot(
      'size attributes adapter for one size product',
    );
  });
});
