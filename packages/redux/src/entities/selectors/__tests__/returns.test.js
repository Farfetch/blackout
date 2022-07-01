import {
  getReturnItemsEntity,
  getReturnsEntity,
  getTimeSlots,
} from '../returns';
import { mockState } from 'tests/__fixtures__/returns';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getReturns', () => {
  it('should get the returns entity from state', () => {
    expect(getReturnsEntity(mockState)).toEqual(mockState.entities.returns);
  });
});

describe('getReturnItemsEntity', () => {
  it('should get the returns entity from state', () => {
    expect(getReturnItemsEntity(mockState)).toEqual(
      mockState.entities.returnItems,
    );
  });
});

describe('getTimeSlots', () => {
  it('should get the time slots entity from state', () => {
    expect(getTimeSlots(mockState)).toEqual(
      mockState.entities.availableTimeSlots,
    );
  });
});
