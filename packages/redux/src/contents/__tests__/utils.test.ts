import {
  defaultStrategyResult,
  mergeStrategyResult,
  mergeStrategyResultOneEntry,
  mockCommercePages,
} from 'tests/__fixtures__/contents';
import {
  generateContentHash,
  generateSEOPathname,
  getDefaultStrategy,
  getMergeStrategy,
  getPageRanking,
  getRankedCommercePage,
} from '../utils';
import { SeoPageType } from '@farfetch/blackout-client';

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

  it('should correctly apply commerce pages merge strategy to the page result when there is only one entry', () => {
    const commercePagesResult = getMergeStrategy({
      number: 1,
      totalPages: 1,
      totalItems: 1,
      entries: [mockCommercePages.entries[0]!],
    });

    expect(commercePagesResult).toMatchObject(mergeStrategyResultOneEntry);
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

describe('generateContentHash', () => {
  it('should correctly construct the correct hash with a query object', () => {
    const mockQuery = {
      codes: 'abc',
      contentTypeCode: 'pages',
      'target.language': 'en_US',
    };
    const expectedResult = 'pages!abc!en_US';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received not includes contentTypeCode or codes', () => {
    const mockQuery = { totalItems: 2 };
    const expectedResult = '';
    // @ts-expect-error Force contentTypeCode to be undefined for test
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with codes "all" when query received doesnt include codes', () => {
    const mockQuery = { contentTypeCode: 'pages' };
    const expectedResult = 'pages!all';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with pageSize on the end when query received include pageSize', () => {
    const mockQuery = { contentTypeCode: 'pages', pageSize: 2 };
    const expectedResult = 'pages!all!2';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with contentType "all" when query received doesnt include contentTypeCode', () => {
    const mockQuery = {
      codes: 'abc',
      'target.language': 'en_US',
    };
    const expectedResult = 'all!abc!en_US';
    // @ts-expect-error Force contentTypeCode to be undefined for test
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });
});

describe('generateSEOPathname', () => {
  it('should correctly construct the correct pathname with a query object', () => {
    const mockQuery = { path: '/about', pageType: SeoPageType.Pages };
    const expectedResult = '/about';
    const result = generateSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received is an empty object', () => {
    const mockQuery = { pageType: '', path: '' };
    const expectedResult = '';
    // @ts-expect-error Force invalid pageType for test
    const result = generateSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });
});
