import { toAttributeSelector, toDataTestSelector } from '../';

describe('toAttributeSelector', () => {
  it('should return a value for a given attribute', () => {
    const mockValue = 'foo';
    const mockAttribute = 'aria-label';
    const result = toAttributeSelector(mockValue, mockAttribute);

    expect(result).toMatchSnapshot();
  });
});

describe('toDataTestSelector', () => {
  it('should return a selector for a given value', () => {
    const mockValue = 'foo';
    const result = toDataTestSelector(mockValue);

    expect(result).toMatchSnapshot();
  });
});
