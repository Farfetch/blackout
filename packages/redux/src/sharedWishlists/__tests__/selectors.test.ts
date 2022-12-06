import * as fromEntities from '../../entities/selectors/entity';
import * as fromSharedWishlist from '../reducer';
import * as selectors from '../selectors';
import {
  mockProductId,
  mockSharedWishlistId,
  mockSharedWishlistItemId,
  mockSharedWishlistState,
} from 'tests/__fixtures__/sharedWishlists';
import { mockProductsEntity } from 'tests/__fixtures__/products';

describe('shared wishlists redux selectors', () => {
  const sharedWishlistItemEntity =
    mockSharedWishlistState.entities.sharedWishlistItems[
      mockSharedWishlistItemId
    ];
  const sharedWishlistEntity =
    mockSharedWishlistState.entities.sharedWishlists[mockSharedWishlistId];

  beforeEach(jest.clearAllMocks);

  describe('getSharedWishlistId()', () => {
    it('should get the shared wishlist id from state', () => {
      const spy = jest.spyOn(fromSharedWishlist, 'getResult');

      expect(selectors.getSharedWishlistId(mockSharedWishlistState)).toEqual(
        mockSharedWishlistState.sharedWishlist.result,
      );
      expect(spy).toHaveBeenCalledTimes(1);
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
    it('should get the shared wishlist loading status from state', () => {
      const expectedResult = mockSharedWishlistState.sharedWishlist.isLoading;
      const spy = jest.spyOn(fromSharedWishlist, 'getIsLoading');

      expect(selectors.isSharedWishlistLoading(mockSharedWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSharedWishlist()', () => {
    const expectedResult = {
      ...sharedWishlistEntity,
    };

    it('should return all data regarding a shared wishlist item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

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

  describe('getSharedWishlistItem()', () => {
    const expectedResult = {
      ...sharedWishlistItemEntity,
      product: { ...mockProductsEntity[mockProductId] },
    };

    it('should return all data regarding a shared wishlist item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getSharedWishlistItem(
          mockSharedWishlistState,
          mockSharedWishlistItemId,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockSharedWishlistState,
        'sharedWishlistItems',
        mockSharedWishlistItemId,
      );
    });
  });

  describe('getSharedWishlistItems()', () => {
    it('should return the shared wishlist items content from state', () => {
      const expectedResult = [
        {
          ...mockSharedWishlistState.entities.sharedWishlistItems[
            mockSharedWishlistItemId
          ],
          product: mockSharedWishlistState.entities.products[mockProductId],
        },
        {
          ...mockSharedWishlistState.entities.sharedWishlistItems[102],
          id: 102,
          product: {
            ...mockProductsEntity[mockProductId],
            id: 1002,
            description: 'wide leg pant',
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
