import * as fromEntities from '../../entities/selectors/entity';
import * as fromReturns from '../reducer';
import * as selectors from '../selectors';
import {
  mockState,
  returnEntity,
  returnId,
  returnItem,
  returnItemId,
} from 'tests/__fixtures__/returns';

describe('returns redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getReturnItem()', () => {
    it('should get the return item from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');
      expect(selectors.getReturnItem(mockState, returnItemId)).toEqual(
        returnItem,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'returnItems', returnItemId);
    });
  });

  describe('getReturnId()', () => {
    it('should get the return id property from state', () => {
      const spy = jest.spyOn(fromReturns, 'getId');

      expect(selectors.getReturnId(mockState)).toEqual(returnId);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnError()', () => {
    it('should get the return error property from state', () => {
      const expectedResult = mockState.returns.error;
      const spy = jest.spyOn(fromReturns, 'getError');

      expect(selectors.getReturnError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isReturnLoading()', () => {
    it('should get the return loading property from state', () => {
      const expectedResult = mockState.returns.isLoading;
      const spy = jest.spyOn(fromReturns, 'getIsLoading');

      expect(selectors.isReturnLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturn()', () => {
    it('should get the return from state', () => {
      expect(selectors.getReturn(mockState)).toEqual(returnEntity);
    });

    it('should return undefined', () => {
      const newMock = {
        ...mockState,
        returns: {
          ...mockState.returns,
          id: undefined,
        },
      };
      expect(selectors.getReturn(newMock)).toBe(undefined);
    });
  });

  describe('getReturnItemsIds()', () => {
    it('should get the return items ids from state', () => {
      const expectedResult = mockState.entities.returns[returnId].items;
      expect(selectors.getReturnItemsIds(mockState)).toEqual(expectedResult);
    });
  });

  describe('getReturnItems()', () => {
    it('should get the return items from state', () => {
      const expectedResult = [mockState.entities.returnItems[returnItemId]];
      expect(selectors.getReturnItems(mockState)).toEqual(expectedResult);
    });
  });

  describe('areReturnsLoading()', () => {
    it('should get the loading property from the returns sub-area', () => {
      const expectedResult = mockState.returns.returns.isLoading;
      const spy = jest.spyOn(fromReturns, 'getReturns');

      expect(selectors.areReturnsLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnsError()', () => {
    it('should get the error property from the returns sub-area', () => {
      const expectedResult = mockState.returns.returns.error;
      const spy = jest.spyOn(fromReturns, 'getReturns');

      expect(selectors.getReturnsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areReturnPickupCapabilitiesLoading()', () => {
    it('should get the loading property from the pickup capabilities sub-area', () => {
      const expectedResult = mockState.returns.pickupCapabilities.isLoading;
      const spy = jest.spyOn(fromReturns, 'getPickupCapabilities');

      expect(selectors.areReturnPickupCapabilitiesLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReturnPickupCapabilitiesError()', () => {
    it('should get the error property from the pickup capabilities sub-area', () => {
      const expectedResult = mockState.returns.pickupCapabilities.error;
      const spy = jest.spyOn(fromReturns, 'getPickupCapabilities');

      expect(selectors.getReturnPickupCapabilitiesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
