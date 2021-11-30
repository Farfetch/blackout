import {
  buildContentGroupHash,
  buildSEOPathname,
  getDefaultStrategy,
  getMergeStrategy,
  getPageRanking,
  getRankedCommercePage,
} from '../utils';
import {
  defaultStrategyResult,
  mergeStrategyResult,
  mockCommercePages,
} from 'tests/__fixtures__/contents';

describe('getPageRanking', () => {
  it('should correctly construct a ranking number for a specific metadata', () => {
    const metadata = {
      custom: {
        gender: '1',
        brand: '2450',
        category: '',
        priceType: '',
        id: '',
      },
    };
    const expectedRanking = 110;
    const ranking = getPageRanking(metadata);

    expect(ranking).toBe(expectedRanking);
  });

  it('should correctly construct a ranking number for a specific metadata without data', () => {
    const metadata = {
      custom: {
        gender: '',
        brand: '',
        category: '',
        priceType: '',
        id: '',
      },
    };
    const expectedRanking = 0;
    const ranking = getPageRanking(metadata);

    expect(ranking).toBe(expectedRanking);
  });
});

describe('getDefaultStrategy', () => {
  it('should correctly apply commerce pages default strategy to the page result', () => {
    const commercePagesResult = getDefaultStrategy(mockCommercePages);

    expect(commercePagesResult).toMatchObject(defaultStrategyResult);
  });
});

describe('getMergeStrategy', () => {
  it('should correctly apply commerce pages merge strategy to the page result', () => {
    const commercePagesResult = getMergeStrategy(mockCommercePages);

    expect(commercePagesResult).toMatchObject(mergeStrategyResult);
  });
});

describe('getRankedCommercePage', () => {
  it('should correctly select the commerce pages strategy return the respective page result', () => {
    const commercePagesResult = getRankedCommercePage(mockCommercePages);

    expect(commercePagesResult).toMatchObject(defaultStrategyResult);

    const mergeStrategy = getRankedCommercePage(mockCommercePages, 'merge');

    expect(mergeStrategy).toMatchObject(mergeStrategyResult);
  });
});

describe('buildContentGroupHash', () => {
  it('should correctly construct the correct hash a query object', () => {
    const mockQuery = { codes: 'abc', contentTypeCode: 'pages' };
    const expectedResult = 'pages!abc';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received is an empty object', () => {
    const mockQuery = {};
    const expectedResult = '';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received not includes contentTypeCode or codes', () => {
    const mockQuery = { totalItems: 2 };
    const expectedResult = '';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with codes "all" when query received doesnt include codes', () => {
    const mockQuery = { contentTypeCode: 'pages' };
    const expectedResult = 'pages!all';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with contentType "all" when query received doesnt include contentTypeCode', () => {
    const mockQuery = { codes: 'abc' };
    const expectedResult = 'all!abc';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with pageSize on the end when query received include pageSize', () => {
    const mockQuery = { contentTypeCode: 'pages', pageSize: 2 };
    const expectedResult = 'pages!all!2';
    const result = buildContentGroupHash(mockQuery);

    expect(result).toBe(expectedResult);
  });
});

describe('buildSEOPathname', () => {
  it('should correctly construct the correct pathname with a query object', () => {
    const mockQuery = { path: '/about', pageType: 'pages' };
    const expectedResult = 'pages!/about';
    const result = buildSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received is an empty object', () => {
    const mockQuery = {};
    const expectedResult = '';
    const result = buildSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received doesnt include path', () => {
    const mockQuery = { pageType: 'pages' };
    const expectedResult = '';
    const result = buildSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with pageType "all" when query received doesnt include pageType', () => {
    const mockQuery = { path: '/about' };
    const expectedResult = 'all!/about';
    const result = buildSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });
});
