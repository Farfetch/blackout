import { generateContentHash, generateSEOPathname } from '../utils';

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

  it('should return an hash with codes "all" when query received doesnt include codes', () => {
    const mockQuery = { contentTypeCode: 'pages' };
    const expectedResult = 'pages!all';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with contentType "all" when query received doesnt include contentTypeCode', () => {
    const mockQuery = { codes: 'abc', 'target.language': 'en_US' };
    const expectedResult = 'all!abc!en_US';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an hash with pageSize on the end when query received include pageSize', () => {
    const mockQuery = { contentTypeCode: 'pages', pageSize: 2 };
    const expectedResult = 'pages!all!2';
    const result = generateContentHash(mockQuery);

    expect(result).toBe(expectedResult);
  });
});

describe('generateSEOPathname', () => {
  it('should correctly construct the correct pathname with a query object', () => {
    const mockQuery = { path: '/about', pageType: 'pages' };
    const expectedResult = 'pages!/about';
    const result = generateSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received is an empty object', () => {
    const mockQuery = {};
    const expectedResult = '';
    const result = generateSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should return an empty string if the query received doesnt include path', () => {
    const mockQuery = { pageType: 'pages' };
    const expectedResult = '';
    const result = generateSEOPathname(mockQuery);

    expect(result).toBe(expectedResult);
  });
});
