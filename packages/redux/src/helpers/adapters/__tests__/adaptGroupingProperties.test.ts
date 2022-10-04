import { adaptGroupingProperties } from '..';
import {
  mockProductGroupingProperties,
  mockProductGroupingPropertiesAdapted,
} from 'tests/__fixtures__/products';

describe('adaptGroupingProperties()', () => {
  it("should return undefined when doesn't receive groupingProperties", () => {
    expect(adaptGroupingProperties(undefined)).toEqual(undefined);
  });

  it('should map grouping to the corresponding adapted structure', () => {
    expect(
      adaptGroupingProperties(mockProductGroupingProperties),
    ).toMatchObject(mockProductGroupingPropertiesAdapted);
  });
});
