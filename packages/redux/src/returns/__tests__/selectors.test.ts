import * as fromEntities from '../../entities/selectors/entity';
import * as selectors from '../selectors';
import {
  mockState,
  pickupDay,
  returnEntityDenormalized,
  returnId,
  returnItem,
  returnItemId,
  returnPickupCapabilityId,
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
      ).toBe(undefined);
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
      ).toBe(undefined);
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
              [returnId]: undefined,
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
              [returnId]: undefined,
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
              [returnId]: undefined,
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
              [returnId]: undefined,
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
      expect(selectors.getReturn(mockStateWithoutReturnEntity, returnId)).toBe(
        undefined,
      );

      const mockStateWithoutReturnEntities = {
        ...mockState,
        entities: {
          ...mockState.entities,
          returns: undefined,
        },
      };

      expect(
        selectors.getReturn(mockStateWithoutReturnEntities, returnId),
      ).toBe(undefined);
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
      ).toBe(undefined);
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
              [returnPickupCapabilityId]: undefined,
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
              [returnPickupCapabilityId]: undefined,
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
              [returnPickupCapabilityId]: undefined,
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
        ),
      ).toBe(undefined);
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

  describe('isCreateReturnLoading()', () => {
    it('should get the loading property from the create return sub-area', () => {
      expect(selectors.isCreateReturnLoading(mockState)).toEqual(false);

      const mockStateIsLoading = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            isLoading: true,
          },
        },
      };

      expect(selectors.isCreateReturnLoading(mockStateIsLoading)).toEqual(true);
    });
  });

  describe('getCreateReturnError()', () => {
    it('should get the error property from the create return sub-area', () => {
      expect(selectors.getCreateReturnError(mockState)).toEqual(
        expect.any(Error),
      );

      const mockStateNoError = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            error: null,
          },
        },
      };

      expect(selectors.getCreateReturnError(mockStateNoError)).toEqual(null);
    });
  });

  describe('getCreateReturn()', () => {
    it('should get the return entity corresponding to the id in the result of the create return sub-area', () => {
      expect(selectors.getCreatedReturn(mockState)).toEqual(undefined);

      const mockStateHasResult = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            result: returnId,
          },
        },
      };

      expect(selectors.getCreatedReturn(mockStateHasResult)).toEqual(
        returnEntityDenormalized,
      );
    });
  });

  describe('isCreateReturnFetched()', () => {
    it('should return true when there is an error, it is not loading and has result', () => {
      const mockStateHasErrorNotLoadingHasResult = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            result: returnId,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateHasErrorNotLoadingHasResult),
      ).toBe(true);
    });

    it('should return true when there is an error, it is not loading and does not have result', () => {
      const mockStateHasErrorNotLoadingNoResult = mockState;

      expect(
        selectors.isCreateReturnFetched(mockStateHasErrorNotLoadingNoResult),
      ).toBe(true);
    });

    it('should return true when there is no error, it is not loading and has result', () => {
      const mockStateNoErrorNotLoadingHasResult = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            error: null,
            result: returnId,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateNoErrorNotLoadingHasResult),
      ).toBe(true);
    });

    it('should return false when there is no error, it is not loading and does not have result', () => {
      const mockStateNoErrorNotLoadingNoResult = {
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            error: null,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateNoErrorNotLoadingNoResult),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and has result', () => {
      const mockStateHasErrorIsLoadingHasResult = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            isLoading: true,
            result: returnId,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateHasErrorIsLoadingHasResult),
      ).toBe(false);
    });

    it('should return false when there is an error, it is loading and does not have result', () => {
      const mockStateHasErrorIsLoadingNoResult = {
        returns: {
          ...mockState.returns,
          createReturn: {
            ...mockState.returns.createReturn,
            isLoading: true,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateHasErrorIsLoadingNoResult),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and does not have result', () => {
      const mockStateNoErrorIsLoadingNoResult = {
        entities: {
          ...mockState.entities,
          returns: {},
        },
        returns: {
          ...mockState.returns,
          createReturn: {
            isLoading: true,
            error: null,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateNoErrorIsLoadingNoResult),
      ).toBe(false);
    });

    it('should return false when there is no error, it is loading and has result', () => {
      const mockStateNoErrorIsLoadingHasResult = {
        ...mockState,
        returns: {
          ...mockState.returns,
          createReturn: {
            isLoading: true,
            error: null,
          },
        },
      };

      expect(
        selectors.isCreateReturnFetched(mockStateNoErrorIsLoadingHasResult),
      ).toBe(false);
    });
  });
});
