import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromSharedWishlist from '../reducer';
import * as selectors from '../';
import {
  mockProductId,
  mockSharedWishlistId,
  mockSharedWishlistItemId,
  mockSharedWishlistNormalizedPayload,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists';

describe('shared wishlists redux selectors', () => {
  const sharedWishlistsEntity =
    mockSharedWishlistNormalizedPayload.entities.sharedWishlists[
      mockSharedWishlistId
    ];

  beforeEach(jest.clearAllMocks);

  describe('getSharedWishlistId()', () => {
    it('should get the shared wishlist id property from state', () => {
      const spy = jest.spyOn(fromSharedWishlist, 'getResult');

      expect(selectors.getSharedWishlistId(mockSharedWishlistState)).toEqual(
        mockSharedWishlistId,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSharedWishlist()', () => {
    const expectedResult = {
      ...sharedWishlistsEntity,
      items: [mockSharedWishlistItemId, 102],
    };

    it('should get the user shared wishlist from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(
        selectors.getSharedWishlist(
          mockSharedWishlistState,
          mockSharedWishlistId,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockSharedWishlistState,
        'sharedWishlists',
        mockSharedWishlistId,
      );
    });
  });

  describe('getSharedWishlistError()', () => {
    it('should get the shared wishlist error property from state', () => {
      const expectedResult = mockSharedWishlistState.sharedWishlist.error;
      const spy = jest.spyOn(fromSharedWishlist, 'getError');

      expect(selectors.getSharedWishlistError(mockSharedWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isSharedWishlistLoading()', () => {
    it('should get the wishlist loading status from state', () => {
      const expectedResult = mockSharedWishlistState.sharedWishlist.isLoading;
      const spy = jest.spyOn(fromSharedWishlist, 'getIsLoading');

      expect(selectors.isSharedWishlistLoading(mockSharedWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSharedWishlistItem()', () => {
    const expectedResult = {
      ...mockSharedWishlistState.entities.sharedWishlistItems[
        mockSharedWishlistItemId
      ],
      product: {
        ...mockSharedWishlistState.entities.products[mockProductId],
        brand: mockSharedWishlistState.entities.brands[2450],
        categories: [mockSharedWishlistState.entities.categories[136301]],
      },
    };

    it('should return all data regarding a shared wishlist item', () => {
      expect(
        selectors.getSharedWishlistItem(
          mockSharedWishlistState,
          mockSharedWishlistItemId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getSharedWishlistItems()', () => {
    it('should return the shared wishlist items content from state', () => {
      const expectedResult = [
        {
          ...mockSharedWishlistState.entities.sharedWishlistItems[
            mockSharedWishlistItemId
          ],
          product: {
            ...mockSharedWishlistState.entities.products[mockProductId],
            brand: mockSharedWishlistState.entities.brands[2450],
            categories: [mockSharedWishlistState.entities.categories[136301]],
          },
        },
        {
          ...mockSharedWishlistState.entities.sharedWishlistItems[102],
          id: 102,
          product: {
            ...mockSharedWishlistState.entities.products[1002],
            id: 1002,
            description: 'wide leg pant',
            brand: mockSharedWishlistState.entities.brands[2450],
            categories: [mockSharedWishlistState.entities.categories[136301]],
          },
          quantity: 2,
        },
      ];

      expect(
        selectors.getSharedWishlistItems(
          mockSharedWishlistState,
          mockSharedWishlistId,
        ),
      ).toEqual(expectedResult);
    });
  });
});
