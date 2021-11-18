import { buildDesignerResultHash } from '../utils';

describe('buildDesignerResultHash', () => {
  it('should correctly construct the designer result hash - subfolder with slash', () => {
    const mockSubfolder = '/pt';
    const mockQuery = { categoryId: '123' };
    const expectedResult = '/pt?categoryid=123';
    const result = buildDesignerResultHash(mockSubfolder, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the designer result hash - subfolder without slash and with query object', () => {
    const mockSubfolder = 'pt';
    const mockQuery = { categoryId: '123' };
    const expectedResult = '/pt?categoryid=123';
    const result = buildDesignerResultHash(mockSubfolder, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the designer result hash when does not receive query', () => {
    const mockSubfolder = '/pt';
    const expectedResult = '/pt';
    const result = buildDesignerResultHash(mockSubfolder);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the designer result hash when receive a query string', () => {
    const mockSubfolder = '/pt';
    const mockQuery = '?categoryid=123';
    const expectedResult = '/pt?categoryid=123';
    const result = buildDesignerResultHash(mockSubfolder, mockQuery);

    expect(result).toBe(expectedResult);
  });
});
