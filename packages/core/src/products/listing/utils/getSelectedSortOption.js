/**
 * Get which sort option is currently selected.
 *
 * @function getSelectedSortOption
 * @memberof module:product/listing/utils
 *
 * @param {Array} sortOptions - All sort options with value.
 * @param {object} selectedSort - Sort and sort direction of the selected sort.
 *
 * @returns {object} Selected sort option.
 *
 * @example
 * const selectedSort = {
 *  sort: "PRICE",
 *  sortDirection: "ASC"
 * }
 *
 * const sortOptions = [
 *  {
 *    key: 'price-asc',
 *    sort: 'price',
 *    sortDirection: 'asc',
 *    value: 0
 *  },
 * ...
 * ]
 *
 * const selectedSortOption = getSelectedSortOption(sortOptions, selectedSort);
 */
export default (sortOptions, selectedSort) =>
  sortOptions.find(
    ({ sort, sortDirection }) =>
      sort?.toLowerCase() === selectedSort.sort?.toLowerCase() &&
      (!sortDirection ||
        sortDirection?.toLowerCase() ===
          selectedSort?.sortDirection?.toLowerCase()),
  );
