import { buildSetFilters } from '../';

describe('buildSetFilters', () => {
  it('should build the result when adding a non existing filter', () => {
    const mockFacetKey = 'colors';
    const mockColorId = '1';
    const mockQuery = {};
    const mockFilterParams = {
      [mockFacetKey]: mockColorId,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: [mockColorId],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=${mockColorId}&pageindex=1`,
    };

    const result = buildSetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should build the result when adding to an existing filter', () => {
    const mockFacetKey = 'colors';
    const mockColorId = '1';
    const mockQuery = {
      colors: '2|3',
    };
    const mockFilterParams = {
      [mockFacetKey]: [mockColorId],
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['2', '3', mockColorId],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=2|3|${mockColorId}&pageindex=1`,
    };

    const result = buildSetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly build the result if the facet value sent is an array', () => {
    const mockFacetKey = 'colors';
    const mockColorId1 = '1';
    const mockColorId2 = '2';
    const mockQuery = {};
    const mockFilterParams = {
      [mockFacetKey]: [mockColorId1, mockColorId2],
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: [mockColorId1, mockColorId2],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=${mockColorId1}|${mockColorId2}&pageindex=1`,
    };

    const result = buildSetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly build the result if the respective facet in the query is an array', () => {
    const mockFacetKey = 'colors';
    const mockColorId1 = '1';
    const mockColorId2 = '2';
    const mockColorId3 = '8';
    const mockQuery = { [mockFacetKey]: [mockColorId1, mockColorId2] };
    const mockFilterParams = {
      [mockFacetKey]: mockColorId3,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: [mockColorId1, mockColorId2, mockColorId3],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=${mockColorId1}|${mockColorId2}|${mockColorId3}&pageindex=1`,
    };

    const result = buildSetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });
});
