import { generateSearchDidYouMeanHash } from '..';
import { mockSearchDidYouMeanQuery } from 'tests/__fixtures__/search';

describe('generateSearchDidYouMeanHash()', () => {
  it('should generate an hash', () => {
    expect(generateSearchDidYouMeanHash(mockSearchDidYouMeanQuery)).toBe(
      'balenciaga!0,1',
    );
  });

  it('should generate an hash without gender', () => {
    expect(
      generateSearchDidYouMeanHash({
        ...mockSearchDidYouMeanQuery,
        genders: undefined,
      }),
    ).toBe('balenciaga');
  });
});
