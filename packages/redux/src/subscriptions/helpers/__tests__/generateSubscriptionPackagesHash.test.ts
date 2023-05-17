import { generateSubscriptionPackagesHash } from '../index.js';

describe('generateSubscriptionPackagesHash()', () => {
  it('should generate an hash', () => {
    expect(generateSubscriptionPackagesHash({ id: ['Newsletter'] })).toBe(
      'id=Newsletter',
    );
  });

  it('should generate an hash with multiple packages ids', () => {
    expect(
      generateSubscriptionPackagesHash({ id: ['Newsletter', 'BackInStock'] }),
    ).toBe('id=Newsletter&id=BackInStock');
  });
});
