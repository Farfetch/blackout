import * as fromEntities from '../../entities/selectors/entity.js';
import * as selectors from '../selectors.js';
import {
  mockState,
  pickupDay,
  returnEntity,
  returnEntityDenormalized,
  returnId,
  returnItem,
  returnItemId,
  returnPickupCapabilityId,
} from 'tests/__fixtures__/returns/index.mjs';

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

  describe('getReturnError()', () => {
    it('should get the return error property from state', () => {
      const expectedResult = mockState.returns.returnDetails.error[returnId];

      expect(selectors.getReturnError(mockState, returnId)).toBe(
        expectedResult,
      );

      expect(
        selectors.getReturnError(
          {
            ...mockState,
            returns: {
              ...mockState.returns,
              returnDetails: {
                error: {},
                isLoading: {},
              },
            },
          },
          returnId,
        ),
      ).toBeUndefined();
    });
  });

  describe('isReturnLoading()', () => {
    it('should get the return loading property from state', () => {
      const expectedResult =
        mockState.returns.returnDetails.isLoading[returnId];

      expect(selectors.isReturnLoading(mockState, returnId)).toBe(
        expectedResult,
      );

      expect(
        selectors.isReturnLoading(
          {
            ...mockState,
            returns: {
              ...mockState.returns,
              returnDetails: {
                error: {},
                isLoading: {},
              },
            },
          },
          returnId,
        ),
      ).toBeUndefined();
    });
  });

  describe('isReturnFetched()', () => {
    it('should return true when there is an error, it is not loading and has return entity', () => {
      const mockStateHasErrorNotLoadingHasReturn = mockState;

      expect(
        selectors.isReturnFetched(
          mockStateHasErrorNotLoadingHasReturn,
          returnId,
        ),
      ).toBe(true);
    });

    it('should return true when there is an error, it is not loading and does not have return entity', () => {
      const mockStateHasErrorNotLoadingNoReturn = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returns: {},
        },
      };

      expect(
        selectors.isReturnFetched(
          mockStateHasErrorNotLoadingNoReturn,
          returnId,
        ),
      ).toBe(true);
    });

    it('should return true when there is no error, it is not loading and has return entity', () => {
      const mockStateNoErrorNotLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnDetails: {
            ...mockState.returns.returnDetails,
            error: {
              [returnId]: null,
            },
          },
        },
      };

      expect(
        selectors.isReturnFetched(
          mockStateNoErrorNotLoadingHasReturn,
          returnId,
        ),
      ).toBe(true);
    });

    it('should return false when there is no error, it is not loading and does not have return entity', () => {
      const mockStateNoErrorNotLoadingNoReturn = {
        returns: {
          ...mockState.returns,
          returnDetails: {
            ...mockState.returns.returnDetails,
            error: {
              [returnId]: null,
            },
          },
        },
        entities: {
          ...mockState.entities,
          returns: {},
        },
      };

      expect(
        selectors.isReturnFetched(mockStateNoErrorNotLoadingNoReturn, returnId),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and has return entity', () => {
      const mockStateHasErrorIsLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnDetails: {
            ...mockState.returns.returnDetails,
            isLoading: {
              [returnId]: true,
            },
          },
        },
      };

      expect(
        selectors.isReturnFetched(
          mockStateHasErrorIsLoadingHasReturn,
          returnId,
        ),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and does not have return entity', () => {
      const mockStateHasErrorIsLoadingNoReturn = {
        entities: {
          ...mockState.entities,
          returns: {},
        },
        returns: {
          ...mockState.returns,
          returnDetails: {
            ...mockState.returns.returnDetails,
            isLoading: {
              [returnId]: true,
            },
          },
        },
      };

      expect(
        selectors.isReturnFetched(mockStateHasErrorIsLoadingNoReturn, returnId),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and does not have return entity', () => {
      const mockStateNoErrorIsLoadingNoReturn = {
        entities: {
          ...mockState.entities,
          returns: {},
        },
        returns: {
          ...mockState.returns,
          returnDetails: {
            isLoading: {
              [returnId]: true,
            },
            error: {
              [returnId]: null,
            },
          },
        },
      };

      expect(
        selectors.isReturnFetched(mockStateNoErrorIsLoadingNoReturn, returnId),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and has return entity', () => {
      const mockStateNoErrorIsLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnDetails: {
            isLoading: {
              [returnId]: true,
            },
            error: {
              [returnId]: null,
            },
          },
        },
      };

      expect(
        selectors.isReturnFetched(mockStateNoErrorIsLoadingHasReturn, returnId),
      ).toBe(false);
    });
  });

  describe('getReturn()', () => {
    it('should get the return from state', () => {
      expect(selectors.getReturn(mockState, returnId)).toEqual(
        returnEntityDenormalized,
      );
    });

    it('should return undefined', () => {
      const mockStateWithoutReturnEntity = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returns: {},
        },
      };

      expect(
        selectors.getReturn(mockStateWithoutReturnEntity, returnId),
      ).toBeUndefined();

      const mockStateWithoutReturnEntities = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returns: undefined,
        },
      };

      expect(
        selectors.getReturn(mockStateWithoutReturnEntities, returnId),
      ).toBeUndefined();
    });
  });

  describe('isReturnPickupCapabilityLoading()', () => {
    it('should get the loading property from the pickup capability sub-area', () => {
      const expectedResult =
        mockState.returns.returnPickupCapabilities.isLoading[
          returnPickupCapabilityId
        ];

      expect(
        selectors.isReturnPickupCapabilityLoading(
          mockState,
          returnId,
          pickupDay,
        ),
      ).toBe(expectedResult);

      expect(
        selectors.isReturnPickupCapabilityLoading(
          {
            ...mockState,
            returns: {
              ...mockState.returns,
              returnPickupCapabilities: {
                error: {},
                isLoading: {},
              },
            },
          },
          returnId,
          pickupDay,
        ),
      ).toBeUndefined();
    });
  });

  describe('isReturnPickupCapabilityFetched()', () => {
    it('should return true when there is an error, it is not loading and has return entity', () => {
      const mockStateHasErrorNotLoadingHasReturn = mockState;

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateHasErrorNotLoadingHasReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(true);
    });

    it('should return true when there is an error, it is not loading and does not have return entity', () => {
      const mockStateHasErrorNotLoadingNoReturn = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returnPickupCapabilities: {},
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateHasErrorNotLoadingNoReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(true);
    });

    it('should return true when there is no error, it is not loading and has return entity', () => {
      const mockStateNoErrorNotLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnPickupCapability: {
            ...mockState.returns.returnPickupCapabilities,
            error: {
              [returnPickupCapabilityId]: undefined,
            },
          },
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateNoErrorNotLoadingHasReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(true);
    });

    it('should return false when there is no error, it is not loading and does not have return entity', () => {
      const mockStateNoErrorNotLoadingNoReturn = {
        returns: {
          ...mockState.returns,
          returnPickupCapabilities: {
            ...mockState.returns.returnPickupCapabilities,
            error: {
              [returnPickupCapabilityId]: null,
            },
          },
        },
        entities: {
          ...mockState.entities,
          returnPickupCapabilities: {},
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateNoErrorNotLoadingNoReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and has return entity', () => {
      const mockStateHasErrorIsLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnPickupCapabilities: {
            ...mockState.returns.returnPickupCapabilities,
            isLoading: {
              [returnPickupCapabilityId]: true,
            },
          },
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateHasErrorIsLoadingHasReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and does not have return entity', () => {
      const mockStateHasErrorIsLoadingNoReturn = {
        entities: {
          ...mockState.entities,
          returnPickupCapabilities: {},
        },
        returns: {
          ...mockState.returns,
          returnPickupCapabilities: {
            ...mockState.returns.returnPickupCapabilities,
            isLoading: {
              [returnPickupCapabilityId]: true,
            },
          },
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateHasErrorIsLoadingNoReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and does not have return entity', () => {
      const mockStateNoErrorIsLoadingNoReturn = {
        entities: {
          ...mockState.entities,
          returns: {},
        },
        returns: {
          ...mockState.returns,
          returnPickupCapabilities: {
            isLoading: {
              [returnPickupCapabilityId]: true,
            },
            error: {
              [returnPickupCapabilityId]: null,
            },
          },
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateNoErrorIsLoadingNoReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and has return entity', () => {
      const mockStateNoErrorIsLoadingHasReturn = {
        ...mockState,
        returns: {
          ...mockState.returns,
          returnPickupCapabilities: {
            isLoading: {
              [returnPickupCapabilityId]: true,
            },
            error: {
              [returnPickupCapabilityId]: null,
            },
          },
        },
      };

      expect(
        selectors.isReturnPickupCapabilityFetched(
          mockStateNoErrorIsLoadingHasReturn,
          returnId,
          pickupDay,
        ),
      ).toBe(false);
    });
  });

  describe('getReturnPickupCapabilityError()', () => {
    it('should get the error property from the pickup capability sub-area', () => {
      const expectedResult =
        mockState.returns.returnPickupCapabilities.error[
          returnPickupCapabilityId
        ];

      expect(
        selectors.getReturnPickupCapabilityError(
          mockState,
          returnId,
          pickupDay,
        ),
      ).toBe(expectedResult);

      expect(
        selectors.getReturnPickupCapabilityError(
          {
            ...mockState,
            returns: {
              ...mockState.returns,
              returnPickupCapabilities: {
                error: {},
                isLoading: {},
              },
            },
          },
          returnId,
          pickupDay,
        ),
      ).toBeUndefined();
    });
  });

  describe('getReturnsEntities()', () => {
    it('should get the returns entities from state', () => {
      expect(selectors.getReturnsEntities(mockState)).toEqual(
        mockState.entities.returns,
      );
    });
  });

  describe('getReturnItemsEntities()', () => {
    it('should get the returns entity from state', () => {
      expect(selectors.getReturnItemsEntities(mockState)).toEqual(
        mockState.entities.returnItems,
      );
    });
  });

  describe('getReturnPickupCapability()', () => {
    it('should get the return pickup capability entity from state', () => {
      expect(
        selectors.getReturnPickupCapability(mockState, returnId, pickupDay),
      ).toEqual(
        mockState.entities.returnPickupCapabilities[returnPickupCapabilityId],
      );
    });
  });

  describe('getOrderReturns()', () => {
    it('should get the returns from an order', () => {
      const expectedResult = [returnEntityDenormalized];

      expect(
        selectors.getOrderReturns(mockState, returnEntity.orderId),
      ).toEqual(expectedResult);
    });

    it('should return undefined if there are no return entities', () => {
      const mockState2 = {
        ...mockState,
        entities: { ...mockState.entities, returns: undefined },
      };

      expect(
        selectors.getOrderReturns(mockState2, returnEntity.orderId),
      ).toBeUndefined();
    });

    it('should return an empty array if a non existant orderId is passed', () => {
      expect(
        selectors.getOrderReturns(mockState, 'non existant orderId'),
      ).toEqual([]);
    });
  });
});
