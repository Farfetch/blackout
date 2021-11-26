import {
  DEFAULT_DESIGNER_RESULT_HASH,
  generateDesignerResultHash,
} from '../utils';

describe('generateDesignerResultHash', () => {
  it('should return a designer result hash when the query is an object', () => {
    const mockQuery = { categoryId: '123' };

    expect(generateDesignerResultHash(mockQuery)).toBe('?categoryid=123');
  });

  it('should return a designer result hash when the query is a string', () => {
    const mockQuery = '?categoryid=123';

    expect(generateDesignerResultHash(mockQuery)).toBe('?categoryid=123');
  });

  it('should return a designer result hash when there is no query', () => {
    expect(generateDesignerResultHash()).toBe(DEFAULT_DESIGNER_RESULT_HASH);
  });
});
