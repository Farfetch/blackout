import { getReturnItems, getReturns } from '..';
import { mockState } from '../../__fixtures__/returns.fixtures';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getReturns', () => {
  it('should get the returns entity from state', () => {
    expect(getReturns(mockState)).toEqual(mockState.entities.returns);
  });
});

describe('getReturnItems', () => {
  it('should get the returns entity from state', () => {
    expect(getReturnItems(mockState)).toEqual(mockState.entities.returnItems);
  });
});
