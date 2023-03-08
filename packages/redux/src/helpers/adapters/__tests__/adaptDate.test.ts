import { adaptDate } from '../index.js';
import { mockDateStructure } from '../__fixtures__/adapters.fixtures.js';

describe('adaptDate()', () => {
  it('should return a valid timestamp by providing a JSON date string', () => {
    expect(adaptDate(mockDateStructure.jsonDate)).toBe(
      mockDateStructure.timestamp,
    );
  });

  it('should return a valid timestamp by providing a regular date string', () => {
    expect(adaptDate(mockDateStructure.string)).toBe(
      mockDateStructure.timestamp,
    );
  });

  it('should return a valid timestamp when providing a JSON date string with a negative timestamp', () => {
    const negativeDate = '/Date(-631152000000)/';

    expect(adaptDate(negativeDate)).toBe(-631152000000);
  });

  it('should return a valid timestamp when providing a JSON date string with the timezone format', () => {
    expect(adaptDate(mockDateStructure.jsonDateWithTime)).toBe(
      mockDateStructure.jsonDateWithTimeTimestamp,
    );
  });

  it('should return a valid timestamp when providing a JSON date string with a negative timestamp and with the timezone format', () => {
    const jsonDateNegativeWithTime = '/Date(-631152000000+0530)/';

    expect(adaptDate(jsonDateNegativeWithTime)).toBe(-631132200000);
  });

  it('should return null when an invalid JSON date is provided', () => {
    const date = '/Date(foo)/';

    expect(adaptDate(date)).toBeNull();
  });
});
