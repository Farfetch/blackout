import type { GetSelectedSortOption } from './types';

/**
 * Get which sort option is currently selected.
 *
 * @example
 * ```
 * const selectedSort = {
 *    sort: "PRICE",
 *    sortDirection: "ASC"
 * }
 *
 * const sortOptions = [
 *    {
 *      key: 'price-asc',
 *      sort: 'price',
 *      sortDirection: 'asc',
 *      value: 0
 *    },
 *    ...
 * ]
 *
 * const selectedSortOption = getSelectedSortOption(sortOptions, selectedSort);
 * ```
 *
 * @param sortOptions  - All sort options with value.
 * @param selectedSort - Sort and sort direction of the selected sort.
 *
 * @returns Selected sort option.
 */
const getSelectedSortOption = (
  sortOptions: Array<GetSelectedSortOption>,
  selectedSort: {
    sort: GetSelectedSortOption['sort'];
    sortDirection: GetSelectedSortOption['sortDirection'];
  },
): GetSelectedSortOption | undefined =>
  sortOptions.find(
    ({ sort, sortDirection }) =>
      sort?.toLowerCase() === selectedSort.sort?.toLowerCase() &&
      (!sortDirection ||
        sortDirection?.toLowerCase() ===
          selectedSort?.sortDirection?.toLowerCase()),
  );

export default getSelectedSortOption;
