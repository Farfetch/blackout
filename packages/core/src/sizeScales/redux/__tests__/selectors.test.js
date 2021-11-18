import * as fromReducer from '../reducer';
import * as fromSizeScaleEntities from '../../../entities/redux/selectors/sizeScales';
import * as selectors from '../selectors';
import {
  mockCategoryId,
  mockScaleId,
  mockSizeScale,
  mockSizeScaleMappingsHash,
  mockSizeScaleMappingsQuery,
  mockSizeScaleMappingsState,
  mockState,
} from 'tests/__fixtures__/sizeScales';

describe('Size scale', () => {
  describe('getSizeScales()', () => {
    it('Should return all size scales', () => {
      const spy = jest.spyOn(fromSizeScaleEntities, 'getSizeScales');

      expect(selectors.getSizeScales(mockState)).toEqual(
        mockState.entities.sizeScales,
      );

      expect(spy).toBeCalledWith(mockState);
    });
  });

  describe('getSizeScaleById()', () => {
    it('Should return the size scale for the id provided', () => {
      const spy = jest.spyOn(fromSizeScaleEntities, 'getSizeScale');

      expect(selectors.getSizeScaleById(mockState, mockScaleId)).toEqual(
        mockSizeScale,
      );

      expect(spy).toBeCalledWith(mockState, mockScaleId);
    });
  });

  describe('getSizeScalesByCategory()', () => {
    it('Should return the size scale for the id provided', () => {
      const spy = jest.spyOn(fromSizeScaleEntities, 'getSizeScales');

      expect(
        selectors.getSizeScalesByCategory(mockState, mockCategoryId),
      ).toEqual([mockSizeScale]);

      expect(spy).toBeCalledWith(mockState);
    });

    it('Should return an empty list if there are no scales', () => {
      const mockNewState = {
        sizeScales: {
          error: null,
          errorById: {},
          errorByQuery: {},
          isLoading: false,
          isLoadingById: {
            [mockScaleId]: false,
          },
          isLoadingByQuery: {
            [mockCategoryId]: false,
          },
        },
        entities: {},
      };
      const spy = jest.spyOn(fromSizeScaleEntities, 'getSizeScales');

      expect(
        selectors.getSizeScalesByCategory(mockNewState, mockCategoryId),
      ).toEqual([]);

      expect(spy).toBeCalledWith(mockNewState);
    });
  });

  describe('areSizeScalesLoading()', () => {
    it('Should return the loading status of size scales', () => {
      expect(selectors.areSizeScalesLoading(mockState)).toEqual(
        mockState.sizeScales.isLoading,
      );
    });
  });

  describe('isSizeScaleLoadingByQuery()', () => {
    it('Should return the loading status of the size scale by query', () => {
      expect(
        selectors.isSizeScaleLoadingByQuery(mockState, {
          categoryId: mockCategoryId,
        }),
      ).toEqual(mockState.sizeScales.isLoadingByQuery[mockCategoryId]);
    });
  });

  describe('isSizeScaleLoadingById()', () => {
    it('Should return the loading status of the size scale by scale id', () => {
      expect(selectors.isSizeScaleLoadingById(mockState, mockScaleId)).toEqual(
        mockState.sizeScales.isLoadingById[mockScaleId],
      );
    });
  });

  describe('getSizeScalesError()', () => {
    it('should get the sizescale error property of any ', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const error = 'This is an error';
      const newMockState = {
        sizeScales: {
          error: error,
        },
      };

      expect(selectors.getSizeScalesError(newMockState)).toEqual(error);
      expect(spy).toBeCalledWith(newMockState.sizeScales);
    });
  });

  describe('getSizeScaleErrorByQuery()', () => {
    it('should get the sizescale error property of any ', () => {
      const spy = jest.spyOn(fromReducer, 'getErrorByQuery');
      const error = 'This is an error';
      const newMockState = {
        sizeScales: {
          errorByQuery: {
            [mockCategoryId]: error,
          },
        },
      };

      expect(
        selectors.getSizeScaleErrorByQuery(newMockState, {
          categoryId: mockCategoryId,
        }),
      ).toEqual(error);
      expect(spy).toBeCalledWith(newMockState.sizeScales);
    });
  });

  describe('getSizeScaleErrorById()', () => {
    it('should get the sizescale error property of any ', () => {
      const spy = jest.spyOn(fromReducer, 'getErrorById');
      const error = 'This is an error';
      const newMockState = {
        sizeScales: {
          errorById: {
            [mockScaleId]: error,
          },
        },
      };

      expect(
        selectors.getSizeScaleErrorById(newMockState, mockScaleId),
      ).toEqual(error);
      expect(spy).toBeCalledWith(newMockState.sizeScales);
    });
  });

  describe('isSizeScaleFetched()', () => {
    it('Should return true if the scale was already fetched', () => {
      expect(selectors.isSizeScaleFetched(mockState, mockScaleId)).toBe(true);
    });
  });

  describe('mappings', () => {
    describe('getSizeScaleMappingError()', () => {
      it('should get the error', () => {
        const expectedResult =
          mockSizeScaleMappingsState.sizeScales.mappings.error[
            mockSizeScaleMappingsHash
          ];
        const spy = jest.spyOn(fromReducer, 'getMappingError');

        expect(
          selectors.getSizeScaleMappingError(
            mockSizeScaleMappingsState,
            mockSizeScaleMappingsQuery,
          ),
        ).toEqual(expectedResult);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('isSizeScaleMappingLoading()', () => {
      it('should get the loading status', () => {
        const expectedResult =
          mockSizeScaleMappingsState.sizeScales.mappings.isLoading[
            mockSizeScaleMappingsHash
          ];
        const spy = jest.spyOn(fromReducer, 'getMappingIsLoading');

        expect(
          selectors.isSizeScaleMappingLoading(
            mockSizeScaleMappingsState,
            mockSizeScaleMappingsQuery,
          ),
        ).toBe(expectedResult);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getSizeScaleMapping()', () => {
      it('should get the result', () => {
        const expectedResult =
          mockSizeScaleMappingsState.sizeScales.mappings.result[
            mockSizeScaleMappingsHash
          ];
        const spy = jest.spyOn(fromReducer, 'getMappingResult');

        expect(
          selectors.getSizeScaleMapping(
            mockSizeScaleMappingsState,
            mockSizeScaleMappingsQuery,
          ),
        ).toEqual(expectedResult);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
