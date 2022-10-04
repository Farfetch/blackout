import { adaptGrouping } from '..';
import {
  mockProductGrouping,
  mockProductGroupingAdapted,
} from 'tests/__fixtures__/products';

describe('adaptGrouping()', () => {
  it("should return undefined when doesn't receive grouping", () => {
    expect(adaptGrouping(undefined)).toEqual(undefined);
  });

  it('should map grouping to the corresponding adapted structure', () => {
    expect(adaptGrouping(mockProductGrouping)).toMatchObject(
      mockProductGroupingAdapted,
    );
  });
});
