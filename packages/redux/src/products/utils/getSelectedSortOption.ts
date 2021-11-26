type SortOption = {
  key: string;
  sort: string;
  sortDirection?: string;
  value: number;
};

/**
 * Get which sort option is currently selected.
 *
 * @memberof module:products/utils
 *
 * @param {Array} sortOptions - All sort options with value.
 * @param {object} selectedSort - Sort and sort direction of the selected sort.
 * @param {object} selectedSort.sort - Sort of the selected sort.
 * @param {object} selectedSort.sortDirection - Sort direction of the selected sort.
 *
 * @returns {object} Selected sort option.
 *
 * @example
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
 */
const getSelectedSortOption = (
  sortOptions: Array<SortOption>,
  selectedSort: {
    sort: SortOption['sort'];
    sortDirection: SortOption['sortDirection'];
  },
): SortOption | undefined =>
  sortOptions.find(
    ({ sort, sortDirection }) =>
      sort?.toLowerCase() === selectedSort.sort?.toLowerCase() &&
      (!sortDirection ||
        sortDirection?.toLowerCase() ===
          selectedSort?.sortDirection?.toLowerCase()),
  );

export default getSelectedSortOption;
