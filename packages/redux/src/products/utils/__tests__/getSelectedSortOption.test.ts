import { getSelectedSortOption } from '..';
import { mockSortOptions } from 'tests/__fixtures__/products';

describe('getSelectedSortOption', () => {
  it('should correctly return the correct value', () => {
    const selectedSort = { sort: 'PRICE', sortDirection: 'DESC' };
    const expectedResult = mockSortOptions[1];
    const result = getSelectedSortOption(mockSortOptions, selectedSort);

    expect(result).toBe(expectedResult);
  });

  it('should correctly return when sort direction is not defined', () => {
    const selectedSort = { sort: 'NEWITEMS', sortDirection: 'ASC' };
    const expectedResult = mockSortOptions[2];
    const result = getSelectedSortOption(mockSortOptions, selectedSort);

    expect(result).toBe(expectedResult);
  });
});
