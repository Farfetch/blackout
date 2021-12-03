/**
 * Converts the subArea naming into a compatible one for compatibility with the subarea reducers naming.
 *
 * @param {string} subArea String that identifies the SubArea. Example: 'Profile', 'Benefits', (...).
 */
const getSelectorSubAreaName = subArea => {
  return subArea.charAt(0).toLowerCase() + subArea.slice(1);
};

/**
 * Tests all the Loading Selectors for the specified subareas in the 'subAreaNames' parameter.
 * By default the selector to test is prefixed with the string 'is' or 'are', followed by the <sub_area_name_here>, followed by 'Loading' string.
 * I.e. For a list containing ['Benefits'], the test will verify that the selector isBenefitsLoading correctly obtains the loading state for the benefits subarea.
 *
 * @param {string[]} subAreaNames  Array containing the subareas to test. Example: ['Benefits', 'Preferences'].
 * @param {object} subAreaState Object containing the mocked state for the specified areas.
 * @param {object} selectors Object containing the LOADING Selectors for the specified subAreas.
 */
export const assertSubAreasLoadingSelector = (
  subAreaNames,
  subAreaState,
  selectors,
) => {
  it.each(subAreaNames)('should handle is|are%sLoading selector', subArea => {
    const isSelectorName = `is${subArea}Loading`;
    const areSelectorName = `are${subArea}Loading`;
    const selectorName = selectors[isSelectorName]
      ? isSelectorName
      : areSelectorName;

    expect(selectors[selectorName](subAreaState)).toEqual(false);
  });
};

/**
 * Tests all the Error Selectors for the specified subareas in the 'subAreaNames' parameter.
 * By default the selector to test is prefixed with the string 'get', followed by the <sub_area_name_here>, followed by 'Error' string.
 * I.e. For the list ['Benefits'], the test will verify that the selector getBenefitsError correctly obtains the error state for the benefits subarea.
 *
 * @param {string[]} subAreaNames  Array containing the subareas to test. Example: ['Benefits', 'Preferences'].
 * @param {object} subAreaState Object containing the mocked state for the specified areas.
 * @param {string} subAreaStateWrapper String that identifies the 'wrapper' for the main area state. Example: The profile state along with its subareas (benefits, ...) is wrapped in 'profile'.
 * @param {object} selectors Object containing the ERRORS selectors for the specified subAreas.
 */
export const assertSubAreasErrorSelector = (
  subAreaNames,
  subAreaState,
  subAreaStateWrapper,
  selectors,
) => {
  it.each(subAreaNames)('should handle get%sError selector', subArea => {
    const selectorName = `get${subArea}Error`;
    const reducerSubAreaName = getSelectorSubAreaName(subArea);

    const expectedResult =
      subAreaState[subAreaStateWrapper][reducerSubAreaName].error;

    expect(selectors[selectorName](subAreaState)).toBe(expectedResult);
  });
};

/**
 * Tests all the Result Selectors for the specified subareas in the 'subAreaNames' parameter.
 * By default the selector to test is prefixed with the string 'get', followed by the <sub_area_name_here>, followed by 'Result' string.
 * I.e. For the list ['Benefits'], the test will verify that the selector getBenefitsResult correctly obtains the result state for the benefits subarea.
 *
 * @param {string[]} subAreaNames  Array containing the subareas to test. Example: ['Benefits', 'Preferences'].
 * @param {object} subAreaState Object containing the mocked state for the specified areas.
 * @param {string} subAreaStateWrapper String that identifies the 'wrapper' for the main area state. Example: The profile state along with its subareas (benefits, ...) is wrapped in 'profile'.
 * @param {object} selectors Object containing the RESULT selectors for the specified subAreas.
 */
export const assertSubAreasResultSelector = (
  subAreaNames,
  subAreaState,
  subAreaStateWrapper,
  selectors,
) => {
  it.each(subAreaNames)('should handle get%sResult selector', subArea => {
    const selectorName = `get${subArea}Result`;
    const reducerSubAreaName = getSelectorSubAreaName(subArea);

    const expectedResult =
      subAreaState[subAreaStateWrapper][reducerSubAreaName].result;

    expect(selectors[selectorName](subAreaState)).toBe(expectedResult);
  });
};
