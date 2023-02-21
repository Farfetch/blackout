import { adaptGrouping } from '..';
import {
  mockProductGrouping,
  mockProductGroupingAdapted,
} from 'tests/__fixtures__/products';

describe('adaptGrouping()', () => {
  it("should return undefined when doesn't receive grouping", () => {
    // @ts-expect-error Allow pass undefined for test
    expect(adaptGrouping(undefined)).toBeUndefined();
  });

  it('should map grouping to the corresponding adapted structure', () => {
    expect(adaptGrouping(mockProductGrouping)).toMatchObject(
      mockProductGroupingAdapted,
    );
  });
});
