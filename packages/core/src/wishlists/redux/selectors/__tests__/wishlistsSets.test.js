import * as fromEntities from '../../../../entities/redux/selectors/entity';
import * as fromWishlistSets from '../../reducer/wishlistsSets';
import * as selectors from '../';
import {
  mockProductId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';

describe('wishlists redux selectors', () => {
  const productEntity =
    mockWishlistNormalizedPayload.entities.products[mockProductId];

  beforeEach(jest.clearAllMocks);

  describe('getWishlistSetsError()', () => {
    it('should get the wishlist sets error property from state', () => {
      const spy = jest.spyOn(fromWishlistSets, 'getError');
      const mockStateWithError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            error: { message: 'foo' },
          },
        },
      };
      const expectedResult = mockStateWithError.wishlist.wishlistSets.error;

      expect(selectors.getWishlistSetsError(mockStateWithError)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistSetsIds()', () => {
    it('should get the wishlist sets loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.wishlistSets.ids;
      const spy = jest.spyOn(fromWishlistSets, 'getIds');

      expect(selectors.getWishlistSetsIds(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areWishlistSetsLoading()', () => {
    it('should get the wishlist sets loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.wishlistSets.isLoading;
      const spy = jest.spyOn(fromWishlistSets, 'getIsLoading');

      expect(selectors.areWishlistSetsLoading(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistSetError()', () => {
    it('should get the wishlist set error', () => {
      const expectedResult =
        mockWishlistState.wishlist.wishlistSets.sets.error[mockWishlistSetId];
      const spy = jest.spyOn(fromWishlistSets, 'getSetError');

      expect(
        selectors.getWishlistSetError(mockWishlistState, mockWishlistSetId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistSetLoading()', () => {
    it('should get the wishlist set loading status', () => {
      const expectedResult =
        mockWishlistState.wishlist.wishlistSets.sets.isLoading[
          mockWishlistSetId
        ];
      const spy = jest.spyOn(fromWishlistSets, 'getIsSetLoading');

      expect(
        selectors.isWishlistSetLoading(mockWishlistState, mockWishlistSetId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistSets()', () => {
    it('should get the user wishlist sets from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities.wishlistSets[mockWishlistSetId],
          wishlistSetItems: [
            {
              ...mockWishlistState.entities.wishlistSets[mockWishlistSetId]
                .wishlistSetItems[0],
              ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
              product: mockWishlistState.entities.products[mockProductId],
            },
          ],
        },
      ];

      expect(selectors.getWishlistSets(mockWishlistState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistSet()', () => {
    it('should return all data regarding a wishlist set', () => {
      const expectedResult = {
        ...mockWishlistState.entities.wishlistSets[mockWishlistSetId],
        wishlistSetItems: [
          {
            ...mockWishlistState.entities.wishlistSets[mockWishlistSetId]
              .wishlistSetItems[0],
            ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
            product: productEntity,
          },
        ],
      };
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getWishlistSet(mockWishlistState, mockWishlistSetId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockWishlistState,
        'wishlistSets',
        mockWishlistSetId,
      );
    });

    it('should return empty array for wishlist set items', () => {
      const expectedResult = {
        ...mockWishlistState.entities.wishlistSets[mockWishlistSetId],
        wishlistSetItems: [],
      };
      const mockState = {
        ...mockWishlistState,
        entities: {
          ...mockWishlistState.entities,
          wishlistSets: {
            [mockWishlistSetId]: {
              id: mockWishlistSetId,
              name: 'set name',
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getWishlistSet(mockState, mockWishlistSetId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'wishlistSets',
        mockWishlistSetId,
      );
    });
  });

  describe('getWishlistSetItemsCounter()', () => {
    it('should return the wishlistSetItems counter when wishlistSet exists', () => {
      expect(
        selectors.getWishlistSetItemsCounter(
          mockWishlistState,
          mockWishlistSetId,
        ),
      ).toBe(1);
    });

    it('should return 0 when does not exists wishlistSet', () => {
      expect(
        selectors.getWishlistSetItemsCounter(
          {
            ...mockWishlistState,
            entities: { wishlistSets: {} },
          },
          mockWishlistSetId,
        ),
      ).toBe(0);
    });
  });

  describe('getWishlistSetTotalQuantity()', () => {
    it('should return the wishlistSetItems total quantity when wishlistSet exists', () => {
      expect(
        selectors.getWishlistSetTotalQuantity(
          mockWishlistState,
          mockWishlistSetId,
        ),
      ).toBe(2);
    });

    it('should return 0 when does not exists wishlistSet', () => {
      expect(
        selectors.getWishlistSetTotalQuantity(
          {
            ...mockWishlistState,
            entities: { wishlistSets: {} },
          },
          mockWishlistSetId,
        ),
      ).toBe(0);
    });
  });

  describe('isAnyWishlistSetLoading()', () => {
    it('should return true if the general wishlist sets is loading', () => {
      const mockStateLoading = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            isLoading: true,
          },
        },
      };

      expect(selectors.isAnyWishlistSetLoading(mockStateLoading)).toBe(true);
    });

    it('should return true if at least on wishlist set is loading', () => {
      expect(selectors.isAnyWishlistSetLoading(mockWishlistState)).toBe(true);
    });

    it('should return false if nothing is loading', () => {
      const mockStateNotLoading = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            sets: {
              ...mockWishlistState.wishlist.wishlistSets.sets,
              isLoading: {},
            },
          },
        },
      };

      expect(selectors.isAnyWishlistSetLoading(mockStateNotLoading)).toBe(
        false,
      );
    });

    it('should return false if there are no wishlist sets', () => {
      const mockStateWithoutIds = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            ids: null,
          },
        },
      };

      expect(selectors.isAnyWishlistSetLoading(mockStateWithoutIds)).toBe(
        false,
      );
    });
  });

  describe('areWishlistSetsWithAnyError()', () => {
    it('should return true if the general wishlist sets has errors', () => {
      const mockStateWithError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            error: { message: 'foo' },
          },
        },
      };

      expect(selectors.areWishlistSetsWithAnyError(mockStateWithError)).toBe(
        true,
      );
    });

    it('should return true if at least on wishlist set has errors', () => {
      expect(selectors.areWishlistSetsWithAnyError(mockWishlistState)).toBe(
        true,
      );
    });

    it('should return false if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            sets: {
              ...mockWishlistState.wishlist.wishlistSets.sets,
              error: {},
            },
          },
        },
      };

      expect(selectors.areWishlistSetsWithAnyError(mockStateWithoutError)).toBe(
        false,
      );
    });

    it('should return false if there are no wishlist sets', () => {
      const mockStateWithoutIds = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            ids: null,
          },
        },
      };

      expect(selectors.areWishlistSetsWithAnyError(mockStateWithoutIds)).toBe(
        false,
      );
    });
  });

  describe('getAllWishlistSetsErrors()', () => {
    it('should return the error for each wishlist set with errors', () => {
      const expectedResult = [
        {
          id: mockWishlistState.entities.wishlistSets[mockWishlistSetId].id,
          name: mockWishlistState.entities.wishlistSets[mockWishlistSetId].name,
          error:
            mockWishlistState.wishlist.wishlistSets.sets.error[
              mockWishlistSetId
            ],
        },
      ];

      expect(selectors.getAllWishlistSetsErrors(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return nothing if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            sets: {
              ...mockWishlistState.wishlist.wishlistSets.sets,
              error: {},
            },
          },
        },
      };

      expect(
        selectors.getAllWishlistSetsErrors(mockStateWithoutError),
      ).toBeUndefined();
    });

    it('should return nothing if there are no wishlist sets', () => {
      const mockStateWithoutIds = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          wishlistSets: {
            ...mockWishlistState.wishlist.wishlistSets,
            ids: null,
          },
        },
      };

      expect(
        selectors.getAllWishlistSetsErrors(mockStateWithoutIds),
      ).toBeUndefined();
    });
  });
});
