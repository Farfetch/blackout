import buildUnsetFilters, { PRICE_FACET_KEY } from '../buildUnsetFilters';

describe('buildUnsetFilters', () => {
  it('should build the result when removing a filter', () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: '1|2',
    };
    const mockFilterParams = {
      [mockFacetKey]: 1,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['2'],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=2&pageindex=1`,
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should build the result when removing a filter if the facet value sent is an array ', () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: '1|2',
    };
    const mockFilterParams = {
      [mockFacetKey]: [1],
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['2'],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=2&pageindex=1`,
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly build the result when removing a filter of a non set value', () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: '1|2',
    };
    const mockFilterParams = {
      [mockFacetKey]: 5,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['1', '2'],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=1|2&pageindex=1`,
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it("should correctly build the result when removing a filter and was sent a facet that doesn't exist", () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: '1|2',
      pageindex: 1,
    };
    const mockFilterParams = {
      [mockFacetKey]: 5,
      categories: [135972, 135973],
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['1', '2'],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=1|2&pageindex=1`,
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly build the result if the respective facet in the query is an array', () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: ['1', '2'],
    };
    const mockFilterParams = {
      [mockFacetKey]: 1,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: ['2'],
        pageindex: 1,
      },
      queryString: `?${mockFacetKey}=2&pageindex=1`,
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly build the result if the respective facet in the query is price', () => {
    const mockQuery = {
      [PRICE_FACET_KEY]: ['1-2'],
    };
    const mockFilterParams = {
      [PRICE_FACET_KEY]: ['1-2'],
    };
    const expectedResult = {
      queryParams: {
        pageindex: 1,
      },
      queryString: '?pageindex=1',
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });

  it('should return undefined if the last facet of a certain type is removed', () => {
    const mockFacetKey = 'colors';
    const mockQuery = {
      [mockFacetKey]: ['1'],
    };
    const mockFilterParams = {
      [mockFacetKey]: 1,
    };
    const expectedResult = {
      queryParams: {
        [mockFacetKey]: undefined,
        pageindex: 1,
      },
      queryString: '?pageindex=1',
    };

    const result = buildUnsetFilters(mockQuery, mockFilterParams);

    expect(result).toEqual(expectedResult);
  });
});
