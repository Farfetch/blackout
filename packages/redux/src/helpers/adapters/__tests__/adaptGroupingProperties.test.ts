import { adaptGroupingProperties } from '../index.js';
import {
  mockProductGroupingProperties,
  mockProductGroupingPropertiesAdapted,
} from 'tests/__fixtures__/products/index.mjs';

describe('adaptGroupingProperties()', () => {
  it("should return undefined when doesn't receive groupingProperties", () => {
    // @ts-expect-error Allow passing undefined for test
    expect(adaptGroupingProperties(undefined)).toBeUndefined();
  });

  it('should map grouping to the corresponding adapted structure', () => {
    expect(
      adaptGroupingProperties(mockProductGroupingProperties),
    ).toMatchObject(mockProductGroupingPropertiesAdapted);
  });
});
