import * as fromEntities from '../../../entities/selectors/entity';
import * as fromWishlistSets from '../../reducer/wishlistsSets';
import * as selectors from '..';
import {
  mockProductId,
  mockWishlistItemId,
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';
import { toBlackoutError } from '@farfetch/blackout-client';

describe('wishlists redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getWishlistSetsError()', () => {
    it('should get the wishlist sets error property from state', () => {
      const spy = jest.spyOn(fromWishlistSets, 'getError');
      const mockStateWithError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          sets: {
            ...mockWishlistState.wishlist.sets,
            error: toBlackoutError(new Error('error')),
          },
        },
      };
      const expectedResult = mockStateWithError.wishlist.sets.error;

      expect(selectors.getWishlistSetsError(mockStateWithError)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistSetsIds()', () => {
    it('should get the wishlist sets loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.sets.ids;
      const spy = jest.spyOn(fromWishlistSets, 'getIds');

      expect(selectors.getWishlistSetsIds(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areWishlistSetsLoading()', () => {
    it('should get the wishlist sets loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.sets.isLoading;
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
        mockWishlistState.wishlist.sets.set.error[mockWishlistSetId];
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
        mockWishlistState.wishlist.sets.set.isLoading[mockWishlistSetId];
      const spy = jest.spyOn(fromWishlistSets, 'getIsSetLoading');

      expect(
        selectors.isWishlistSetLoading(mockWishlistState, mockWishlistSetId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistSetFetched()', () => {
    it('should get true if the wishlist has been fetched and it is not loading', () => {
      const newMockWishlistState = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          sets: {
            ...mockWishlistState.wishlist.sets,
            set: {
              ...mockWishlistState.wishlist.sets.set,
              isLoading: {
                ...mockWishlistState.wishlist.sets.set.isLoading,
                [mockWishlistSetId]: false,
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistSetFetched(newMockWishlistState, mockWishlistSetId),
      ).toBe(true);
    });

    it('should get false if it is loading', () => {
      expect(
        selectors.isWishlistSetFetched(mockWishlistState, mockWishlistSetId),
      ).toBe(false);
    });

    it('should get false if it has not a wishlist set for the specific id', () => {
      const newMockWishlistState = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          sets: {
            ...mockWishlistState.wishlist.sets,
            set: {
              ...mockWishlistState.wishlist.sets.set,
              isLoading: {
                ...mockWishlistState.wishlist.sets.set.isLoading,
                [mockWishlistSetId]: undefined,
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistSetFetched(newMockWishlistState, mockWishlistSetId),
      ).toBe(false);
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
            product: {
              ...mockWishlistState.entities.products[mockProductId],
              brand: mockWishlistState.entities.brands[2450],
              categories: [mockWishlistState.entities.categories[136301]],
            },
          },
        ],
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

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
            ...mockWishlistState.entities.wishlistSets,
            [mockWishlistSetId]: {
              ...mockWishlistState.entities.wishlistSets[mockWishlistSetId],
              id: mockWishlistSetId,
              name: 'set name',
              wishlistSetItems: [],
            },
          },
        },
      };
      const spy = jest.spyOn(fromEntities, 'getEntityById');

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
              product: {
                ...mockWishlistState.entities.products[mockProductId],
                brand: mockWishlistState.entities.brands[2450],
                categories: [mockWishlistState.entities.categories[136301]],
              },
            },
          ],
        },
      ];

      expect(selectors.getWishlistSets(mockWishlistState)).toEqual(
        expectedResult,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
            set: {
              ...mockWishlistState.wishlist.sets.set,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
            error: toBlackoutError(new Error('error')),
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
          sets: {
            ...mockWishlistState.wishlist.sets,
            set: {
              ...mockWishlistState.wishlist.sets.set,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
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
          error: mockWishlistState.wishlist.sets.set.error[mockWishlistSetId],
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
          sets: {
            ...mockWishlistState.wishlist.sets,
            set: {
              ...mockWishlistState.wishlist.sets.set,
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
          sets: {
            ...mockWishlistState.wishlist.sets,
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
