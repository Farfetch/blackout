import { areBagItemsIdentical } from '../';
import { mockBagItem, mockIdenticalBagItem } from 'tests/__fixtures__/bags';

describe('areBagItemsIdentical()', () => {
  it('should return true if bag items are identical', () => {
    expect(areBagItemsIdentical(mockIdenticalBagItem, mockBagItem)).toBe(true);
  });

  it('should return false if bag items are different', () => {
    const mockDifferentBagItem = {
      ...mockBagItem,
      product: { id: 9000 },
    };

    expect(areBagItemsIdentical(mockDifferentBagItem, mockBagItem)).toBe(false);
  });

  it('should return false if the bag item is the same', () => {
    expect(areBagItemsIdentical(mockBagItem, mockBagItem)).toBe(false);
  });
});
