import { generateSearchIntentsHash } from '..';
import { mockSearchIntentsQuery } from 'tests/__fixtures__/search';

describe('generateSearchIntentsHash()', () => {
  it('should generate an hash', () => {
    expect(generateSearchIntentsHash(mockSearchIntentsQuery)).toBe(
      'white dresses!0',
    );
  });

  it('should generate an hash without gender', () => {
    expect(
      generateSearchIntentsHash({
        ...mockSearchIntentsQuery,
        gender: undefined,
      }),
    ).toBe('white dresses');
  });
});
