import { adaptTimestamp } from '..';
import { mockDateStructure } from '../__fixtures__/adapters.fixtures';

describe('adaptTimestamp()', () => {
  it('should return a valid timestamp by providing a JSON date string', () => {
    expect(adaptTimestamp(mockDateStructure.timestamp)).toBe(
      mockDateStructure.jsonDate,
    );
  });

  it('should return null when an invalid JSON date is provided', () => {
    const date = 'aaaaaaa';

    expect(adaptTimestamp(date)).toBeNull();
  });

  it('should not convert the date if it is already an date string', () => {
    const date = '/Date(1234567890123)/';

    expect(adaptTimestamp(date)).toBe(date);
  });
});
