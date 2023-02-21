import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  mockCategoryId,
  mockScaleId,
  mockSizeScale,
  mockState,
} from 'tests/__fixtures__/sizeScales';
import { toBlackoutError } from '@farfetch/blackout-client';

const error = toBlackoutError(new Error('This is an error'));
const newMockState = {
  sizeScales: {
    error: error,
    isLoading: false,
    sizeScale: {
      error: { [mockScaleId]: error },
      isLoading: { [mockScaleId]: false },
    },
  },
};

describe('Size scales', () => {
  describe('getSizeScalesByCategory()', () => {
    it('Should return the size scale for the id provided', () => {
      expect(
        selectors.getSizeScalesByCategory(mockState, mockCategoryId),
      ).toEqual([mockSizeScale]);
    });

    it('Should return an empty list if there are no scales', () => {
      const mockNewState = {
        sizeScales: {
          error: null,
          isLoading: false,
          sizeScale: {
            error: {},
            isLoading: {
              [mockScaleId]: false,
              [`categoryId_${mockCategoryId}`]: false,
            },
          },
        },
        entities: {},
      };

      expect(
        selectors.getSizeScalesByCategory(mockNewState, mockCategoryId),
      ).toEqual([]);
    });
  });

  describe('areSizeScalesLoading()', () => {
    it('Should return the loading status of size scales', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areSizeScalesLoading(mockState)).toEqual(
        mockState.sizeScales.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.sizeScales);
    });
  });

  describe('isSizeScaleLoading', () => {
    const spy = jest.spyOn(fromReducer, 'getSizeScaleIsLoading');

    it('Should return the loading status of the size scale by scale id', () => {
      expect(selectors.isSizeScaleLoading(mockState, mockScaleId)).toEqual(
        mockState.sizeScales.sizeScale.isLoading[mockScaleId],
      );
      expect(spy).toHaveBeenCalledWith(mockState.sizeScales);
    });

    it('Should return the loading status of the size scale by query', () => {
      expect(
        selectors.isSizeScaleLoading(mockState, {
          categoryId: mockCategoryId,
        }),
      ).toEqual(
        mockState.sizeScales.sizeScale.isLoading[
          `categoryId_${mockCategoryId}`
        ],
      );
      expect(spy).toHaveBeenCalledWith(mockState.sizeScales);
    });
  });

  describe('getSizeScalesError()', () => {
    it('should get the sizescales error property', () => {
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getSizeScalesError(newMockState)).toEqual(error);
      expect(spy).toHaveBeenCalledWith(newMockState.sizeScales);
    });
  });

  describe('getSizeScaleError()', () => {
    const spy = jest.spyOn(fromReducer, 'getSizeScaleError');

    it('should get the sizescale error property of a size scale by scale id', () => {
      expect(selectors.getSizeScaleError(newMockState, mockScaleId)).toEqual(
        error,
      );
      expect(spy).toHaveBeenCalledWith(newMockState.sizeScales);
    });

    it('should get the sizescale error property of a size scale by query', () => {
      const newMockState = {
        sizeScales: {
          isLoading: true,
          error: error,
          sizeScale: {
            error: {
              [`categoryId_${mockCategoryId}`]: error,
            },
            isLoading: { [mockScaleId]: false },
          },
        },
      };

      expect(
        selectors.getSizeScaleError(newMockState, {
          categoryId: mockCategoryId,
        }),
      ).toEqual(error);
      expect(spy).toHaveBeenCalledWith(newMockState.sizeScales);
    });
  });

  describe('isSizeScaleFetched()', () => {
    it('Should return true if the scale was already fetched', () => {
      expect(selectors.isSizeScaleFetched(mockState, mockScaleId)).toBe(true);
    });
  });

  describe('getSizeScale()', () => {
    it('should return the sizeScale entity', () => {
      const state = {
        entities: {
          sizeScales: {
            [mockScaleId]: mockSizeScale,
          },
        },
      };

      expect(selectors.getSizeScale(state, mockScaleId)).toEqual(mockSizeScale);
    });
  });

  describe('getSizeScales()', () => {
    it('should return all the sizeScales entities', () => {
      const state = {
        entities: {
          sizeScales: {
            [mockScaleId]: mockSizeScale,
            118: { ...mockSizeScale, sizeScaleId: 118 },
          },
        },
      };

      expect(selectors.getSizeScales(state)).toEqual(state.entities.sizeScales);
    });
  });
});
