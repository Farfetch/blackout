import * as fromEntities from '../../../../entities/redux/selectors/entity';
import * as fromWishlist from '../../reducer/wishlists';
import * as selectors from '../';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';

describe('wishlists redux selectors', () => {
  const wishlistEntity =
    mockWishlistNormalizedPayload.entities.wishlist[mockWishlistId];
  const wishlistItemEntity =
    mockWishlistNormalizedPayload.entities.wishlistItems[mockWishlistItemId];
  const productEntity =
    mockWishlistNormalizedPayload.entities.products[mockProductId];

  beforeEach(jest.clearAllMocks);

  describe('getWishlistId()', () => {
    it('should get the wishlist id property from state', () => {
      const spy = jest.spyOn(fromWishlist, 'getId');

      expect(selectors.getWishlistId(mockWishlistState)).toEqual(
        mockWishlistId,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlist()', () => {
    it('should get the user wishlist from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getWishlist(mockWishlistState)).toEqual(wishlistEntity);
      expect(spy).toHaveBeenCalledWith(
        mockWishlistState,
        'wishlist',
        mockWishlistId,
      );
    });
  });

  describe('getWishlistError()', () => {
    it('should get the wishlist error property from state', () => {
      const expectedResult = mockWishlistState.wishlist.error;
      const spy = jest.spyOn(fromWishlist, 'getError');

      expect(selectors.getWishlistError(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistLoading()', () => {
    it('should get the wishlist loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.isLoading;
      const spy = jest.spyOn(fromWishlist, 'getIsLoading');

      expect(selectors.isWishlistLoading(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistItem()', () => {
    const expectedResult = {
      ...wishlistItemEntity,
      product: productEntity,
    };

    it('should return all data regarding a wishlist item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockWishlistState,
        'wishlistItems',
        mockWishlistItemId,
      );
    });

    it('should return the wishlist item data with parent sets information', () => {
      const expectedResult = {
        ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
        parentSets: [
          {
            id: mockWishlistSetId,
            name: mockWishlistState.entities.wishlistSets[mockWishlistSetId]
              .name,
          },
        ],
        product: mockWishlistState.entities.products[mockProductId],
      };

      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId, true),
      ).toEqual(expectedResult);
    });
  });

  describe('getWishlistItemsIds()', () => {
    it("should return a list of wishlist item ID's from state", () => {
      const expectedResult = wishlistEntity.items;

      expect(selectors.getWishlistItemsIds(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined', () => {
      const state = {
        ...mockWishlistState,
        entities: { wishlist: { id: mockWishlistId } },
      };

      expect(selectors.getWishlistItemsIds(state)).toBeUndefined();
    });
  });

  describe('getWishlistItems()', () => {
    it('should return the wishlist items content from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
          product: mockWishlistState.entities.products[mockProductId],
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return the wishlist items content with parent sets information from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
          parentSets: [
            {
              id: mockWishlistSetId,
              name: mockWishlistState.entities.wishlistSets[mockWishlistSetId]
                .name,
            },
          ],
          product: mockWishlistState.entities.products[mockProductId],
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState, true)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistItemsCounter()', () => {
    it('should return the wishlistItems counter when wishlistItems exists', () => {
      const expectedResult = 1;

      expect(selectors.getWishlistItemsCounter(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;

      expect(
        selectors.getWishlistItemsCounter({
          ...mockWishlistState,
          entities: { wishlistItems: [] },
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('getWishlistTotalQuantity()', () => {
    it('should return the wishlistItems total quantity when wishlistItems exists', () => {
      const expectedResult = 2;

      expect(selectors.getWishlistTotalQuantity(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;

      expect(
        selectors.getWishlistTotalQuantity({
          ...mockWishlistState,
          entities: { wishlistItems: [] },
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('itemInWishlist()', () => {
    it('should return the wishlist item that already exists', () => {
      const expectedResult = {
        ...wishlistItemEntity,
        product: productEntity,
      };

      expect(
        selectors.itemInWishlist(mockWishlistState, mockProductId),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product id does not exists on wishlistItems', () => {
      const mockProductId = 1005;

      expect(
        selectors.itemInWishlist(mockWishlistState, mockProductId),
      ).toBeUndefined();
    });
  });

  describe('createGetItemInWishlist()', () => {
    it('should return the wishlist item that already exists', () => {
      const expectedResult = {
        ...wishlistItemEntity,
        product: productEntity,
      };

      expect(
        selectors.createGetItemInWishlist(mockWishlistState)({
          product: productEntity,
          size: wishlistItemEntity.size,
        }),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product does not exist in the wishlist items', () => {
      const state = {
        ...mockWishlistState,
        entities: {
          wishlistItems: undefined,
          products: undefined,
        },
      };

      expect(
        selectors.createGetItemInWishlist(state)({
          product: productEntity,
          size: {},
        }),
      ).toBeUndefined();
    });
  });

  describe('isWishlistItemLoading()', () => {
    it('should get the wishlist item loading status', () => {
      const spy = jest.spyOn(fromWishlist, 'getIsItemLoading');

      expect(
        selectors.isWishlistItemLoading(mockWishlistState, mockWishlistItemId),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistItemError()', () => {
    it('should get the wishlist item error', () => {
      const expectedResult =
        mockWishlistState.wishlist.wishlistItems.error[mockWishlistItemId];
      const spy = jest.spyOn(fromWishlist, 'getItemError');

      expect(
        selectors.getWishlistItemError(mockWishlistState, mockWishlistItemId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistWithAnyError()', () => {
    it('should return true if there is a general wishlist error', () => {
      const mockStateWithGeneralError = {
        ...mockWishlistState,
        wishlist: {
          error: 'error: not loaded',
          id: mockWishlistId,
          isLoading: false,
          wishlistItems: {
            isLoading: {
              [mockWishlistItemId]: true,
            },
            error: {
              [mockWishlistItemId]: null,
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStateWithGeneralError),
      ).toEqual(true);
    });

    it('should return true if there is an error in a wishlist item', () => {
      const mockStatewithWishlistItemError = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          wishlistItems: {
            isLoading: {
              [mockWishlistItemId]: true,
            },
            error: {
              [mockWishlistItemId]: 'Oh no! Terrible error!',
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStatewithWishlistItemError),
      ).toEqual(true);
    });

    it('should return false if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          wishlistItems: {
            isLoading: {
              [mockWishlistItemId]: true,
            },
            error: {
              [mockWishlistItemId]: null,
            },
          },
        },
      };
      expect(selectors.isWishlistWithAnyError(mockStateWithoutError)).toEqual(
        false,
      );
    });

    it('should return false if the wishlist items are an empty array', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        entities: {
          wishlist: {
            [mockWishlistId]: { id: mockWishlistId, items: [] },
          },
        },
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          wishlistItems: {
            isLoading: {},
            error: {},
          },
        },
      };
      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toEqual(false);
    });

    it('should return false if does not exist wishlist items', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        entities: {
          wishlist: { [mockWishlistId]: { id: mockWishlistId } },
        },
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          wishlistItems: {
            isLoading: {},
            error: {},
          },
        },
      };
      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toEqual(false);
    });
  });
});
