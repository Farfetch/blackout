import parsePickupDate from '../parsePickupDate';

const mockDateStructure = {
  timestamp: 631152000000,
  string: '1990-1-1',
  jsonDate: '/Date(631152000000)/',
  jsonDateWithTime: '/Date(1580828400000+0549)/',
  jsonDateWithTimeTimestamp: 1580849340000,
};

describe('parsePickupDate()', () => {
  it('should return a valid parsed data from a provided timestamp', () => {
    expect(parsePickupDate(mockDateStructure.timestamp)).toBe(
      mockDateStructure.string,
    );
  });
});
