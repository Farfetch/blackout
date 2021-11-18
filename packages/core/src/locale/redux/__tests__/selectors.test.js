import * as fromLocale from '../reducer';
import * as selectors from '../selectors';
import {
  mockCities,
  mockCitiesEntities,
  mockCountriesEntities,
  mockCountry,
  mockCountryCode,
  mockCurrenciesEntities,
  mockStateId,
  mockStates,
  mockStatesEntities,
} from 'tests/__fixtures__/locale';

describe('locale redux selectors', () => {
  const mockState = {
    locale: {
      countryCode: mockCountryCode,
      cities: {
        isLoading: false,
        error: '😫',
      },
      countries: {
        isLoading: false,
        error: '😫',
      },
      currencies: {
        isLoading: false,
        error: '😫',
      },
      states: {
        isLoading: false,
        error: '😫',
      },
    },
    entities: {
      cities: mockCitiesEntities,
      countries: mockCountriesEntities,
      currencies: mockCurrenciesEntities,
      states: mockStatesEntities,
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('areCitiesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.cities.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCitiesLoading');

      expect(selectors.areCitiesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCitiesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.cities.error;
      const spy = jest.spyOn(fromLocale, 'getCitiesError');

      expect(selectors.getCitiesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCountriesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.countries.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountriesLoading');

      expect(selectors.areCountriesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountriesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.countries.error;
      const spy = jest.spyOn(fromLocale, 'getCountriesError');

      expect(selectors.getCountriesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCurrenciesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.currencies.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCurrenciesLoading');

      expect(selectors.areCurrenciesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCurrenciesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.currencies.error;
      const spy = jest.spyOn(fromLocale, 'getCurrenciesError');

      expect(selectors.getCurrenciesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areStatesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.states.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreStatesLoading');

      expect(selectors.areStatesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStatesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.states.error;
      const spy = jest.spyOn(fromLocale, 'getStatesError');

      expect(selectors.getStatesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCode()', () => {
    it('should get the country code', () => {
      expect(selectors.getCountryCode(mockState)).toEqual(mockCountryCode);
    });
  });

  describe('getCultureCode()', () => {
    it('should get the culture code', () => {
      expect(selectors.getCultureCode(mockState)).toEqual(
        mockCountry.cultureCode,
      );
    });
  });

  describe('getCurrencyCode()', () => {
    it('should get the currency code', () => {
      expect(selectors.getCurrencyCode(mockState)).toEqual(
        mockCountry.currencies[0].isoCode,
      );
    });
  });

  describe('getSubfolder()', () => {
    it('should get the subfolder', () => {
      expect(selectors.getSubfolder(mockState)).toEqual(mockCountry.structure);
    });
  });

  describe('getCurrenciesByCountryCode()', () => {
    it('should get all the currencies to a specific countryCode', () => {
      expect(selectors.getCurrenciesByCountryCode(mockState)).toEqual(
        mockCountry.currencies,
      );
    });
  });

  describe('getCitiesByStateId()', () => {
    it('should get all the cities to a specific stateId', () => {
      expect(selectors.getCitiesByStateId(mockState, mockStateId)).toEqual([
        mockCities[0],
      ]);
    });
  });

  describe('getStatesByCountryCode()', () => {
    it('should get all the states to a specific countryCode', () => {
      expect(selectors.getStatesByCountryCode(mockState)).toEqual([
        { ...mockStates[0], cities: [mockCities[0].id] },
        { ...mockStates[1], cities: [mockCities[1].id] },
      ]);
    });
  });
});
