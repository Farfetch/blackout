// @TODO: Remove this file in version 2.0.0.
import * as fromReducer from '../../reducer';
import * as fromSizeScaleEntities from '../../../../../entities/redux/selectors/sizeScales';
import * as selectors from '..';
import {
  mockDetailsState,
  mockProduct,
  mockProductId,
  mockSizeScale,
  mockSizeScaleId,
} from 'tests/__fixtures__/products';

describe('Size scale', () => {
  describe('getProductSizeScaleId()', () => {
    it('Should return undefined if there are no scaleId', () => {
      expect(
        selectors.getProductSizeScaleId(
          {
            entities: {
              products: {
                [mockProductId]: {
                  ...mockProduct,
                  scaleId: undefined,
                },
              },
            },
          },
          mockProductId,
        ),
      ).toBeUndefined();
    });

    it('Should return the scale ID of the product', () => {
      expect(
        selectors.getProductSizeScaleId(mockDetailsState, mockProductId),
      ).toEqual(mockSizeScaleId);
    });
  });

  describe('isProductSizeScaleLoading()', () => {
    it('Should return the loading status of the size scale', () => {
      expect(
        selectors.isProductSizeScaleLoading(mockDetailsState, mockProductId),
      ).toEqual(mockDetailsState.details.sizeScale.isLoading[mockSizeScaleId]);
    });
  });

  describe('isProductSizeScaleFetched()', () => {
    it('Should return true if the scale was already fetched', () => {
      expect(
        selectors.isProductSizeScaleFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductSizeScale()', () => {
    it('Should return the full size scale', () => {
      const spy = jest.spyOn(fromSizeScaleEntities, 'getSizeScale');

      expect(
        selectors.getProductSizeScale(mockDetailsState, mockProductId),
      ).toEqual(mockSizeScale);

      expect(spy).toBeCalledWith(mockDetailsState, mockSizeScaleId);
    });
  });

  describe('getProductSizeScaleError()', () => {
    it('should get the sizescale error property of any product', () => {
      const spy = jest.spyOn(fromReducer, 'getSizeScaleError');
      const error = 'This is an error';
      const newMockState = {
        ...mockDetailsState,
        details: {
          sizeScale: {
            error: error,
          },
        },
      };

      expect(selectors.getProductSizeScaleError(newMockState)).toEqual(error);
      expect(spy).toBeCalledWith(newMockState.details);
    });
  });
});
