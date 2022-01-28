import { getReturnItems, getReturns, getTimeSlots } from '..';
import { mockState } from 'tests/__fixtures__/returns';

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

describe('getTimeSlots', () => {
  it('should get the time slots entity from state', () => {
    expect(getTimeSlots(mockState)).toEqual(
      mockState.entities.availableTimeSlots,
    );
  });
});
