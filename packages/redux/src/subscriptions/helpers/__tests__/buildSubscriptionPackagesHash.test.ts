import { buildSubscriptionPackagesHash } from '../index.js';

describe('buildSubscriptionPackagesHash()', () => {
  it('should generate an hash', () => {
    expect(buildSubscriptionPackagesHash({ id: ['Newsletter'] })).toBe(
      'id=Newsletter',
    );
  });

  it('should generate an hash with multiple packages ids', () => {
    expect(
      buildSubscriptionPackagesHash({ id: ['Newsletter', 'BackInStock'] }),
    ).toBe('id=Newsletter&id=BackInStock');
  });
});
