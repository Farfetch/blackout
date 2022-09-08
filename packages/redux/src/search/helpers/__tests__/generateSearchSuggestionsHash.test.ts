import { generateSearchSuggestionsHash } from '..';
import { mockSearchSuggestionsQuery } from 'tests/__fixtures__/search';

describe('generateSearchSuggestionsHash()', () => {
  it('should generate an hash', () => {
    expect(generateSearchSuggestionsHash(mockSearchSuggestionsQuery)).toBe(
      'dresses!0!true',
    );
  });

  it('should generate an hash without gender', () => {
    expect(
      generateSearchSuggestionsHash({
        ...mockSearchSuggestionsQuery,
        gender: undefined,
      }),
    ).toBe('dresses!true');
  });

  it('should generate an hash without ignoreFilterExclusions', () => {
    expect(
      generateSearchSuggestionsHash({
        ...mockSearchSuggestionsQuery,
        ignoreFilterExclusions: undefined,
      }),
    ).toBe('dresses!0');
  });
});
