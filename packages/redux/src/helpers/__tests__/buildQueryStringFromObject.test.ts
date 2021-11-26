import buildQueryStringFromObject from '../buildQueryStringFromObject';

describe('buildQueryStringFromObject', () => {
  it('should correctly construct the correct query string given a query object', () => {
    const mockQuery = { sort: 'price', sortdirection: 'asc' };
    const expectedResult = '?sort=price&sortdirection=asc';
    const result = buildQueryStringFromObject(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the correct query string given a query object with some values as array', () => {
    const mockQuery = { pageindex: 1, colors: [1, 2] };
    const expectedResult = '?pageindex=1&colors=1|2';
    const result = buildQueryStringFromObject(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received is an empty object', () => {
    const mockQuery = {};
    const expectedResult = '';
    const result = buildQueryStringFromObject(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should not return a key if its value is not valid', () => {
    const mockQuery = {
      colors: [],
    };
    const expectedResult = '';
    const result = buildQueryStringFromObject(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should not use question mark prefix as if useQuestionMark is false', () => {
    const mockQuery = { sort: 'price', sortdirection: 'asc' };
    const expectedResult = 'sort=price&sortdirection=asc';
    const result = buildQueryStringFromObject(mockQuery, false);

    expect(result).toBe(expectedResult);
  });
});
