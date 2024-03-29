import * as fromEntities from '../../entities/selectors/entity.js';
import * as fromLocale from '../reducer.js';
import * as selectors from '../selectors.js';
import {
  isoCode as countryId,
  isoCode,
  mockCities,
  mockCitiesEntities,
  mockCountriesEntities,
  mockCountry,
  mockCountryCode,
  mockGetAddressSchemaResponse,
  mockStateId,
  mockStates,
  mockStatesEntities,
} from 'tests/__fixtures__/locale/index.mjs';
import type { CityEntity } from '@farfetch/blackout-redux';

describe('locale redux selectors', () => {
  const countriesAddressSchemasEntity = {
    [isoCode]: mockGetAddressSchemaResponse,
  };

  const mockState = {
    locale: {
      countryCode: mockCountryCode,
      cities: {
        isLoading: false,
        error: null,
      },
      countries: {
        isLoading: false,
        error: null,
      },
      currencies: {
        isLoading: false,
        error: null,
      },
      states: {
        isLoading: false,
        error: null,
      },
      countriesAddressSchemas: {
        isLoading: false,
        error: null,
      },
      subfolder: 'en-US',
      sourceCountryCode: 'US',
    },
    entities: {
      cities: mockCitiesEntities,
      countries: mockCountriesEntities,
      states: mockStatesEntities,
      countriesAddressSchemas: countriesAddressSchemasEntity,
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('areCountryStateCitiesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.cities.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryStateCitiesLoading');

      expect(selectors.areCountryStateCitiesLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryStateCitiesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.cities.error;
      const spy = jest.spyOn(fromLocale, 'getCountryStateCitiesError');

      expect(selectors.getCountryStateCitiesError(mockState)).toBe(
        expectedResult,
      );
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

  describe('getCountries()', () => {
    it('should get all the countries', () => {
      expect(selectors.getCountries(mockState)).toEqual(
        mockState.entities.countries,
      );
    });
  });

  describe('getCountry()', () => {
    it('should get a country by country code', () => {
      expect(selectors.getCountry(mockState, mockCountry.code)).toEqual(
        mockState.entities.countries[mockCountry.code],
      );
    });
  });

  describe('areCountryCurrenciesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.currencies.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryCurrenciesLoading');

      expect(selectors.areCountryCurrenciesLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCurrenciesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.currencies.error;
      const spy = jest.spyOn(fromLocale, 'getCountryCurrenciesError');

      expect(selectors.getCountryCurrenciesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCountryStatesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.states.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryStatesLoading');

      expect(selectors.areCountryStatesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryStatesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.states.error;
      const spy = jest.spyOn(fromLocale, 'getCountryStatesError');

      expect(selectors.getCountryStatesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCode()', () => {
    it('should get the country code', () => {
      expect(selectors.getCountryCode(mockState)).toEqual(mockCountryCode);
    });
  });

  describe('getCountryCultureCode()', () => {
    it('should get the culture code', () => {
      expect(selectors.getCountryCulture(mockState)).toEqual(
        mockCountry.cultures[0],
      );
    });
  });

  describe('getCountryCurrencyCode()', () => {
    it('should get the currency code', () => {
      expect(selectors.getCountryCurrencyCode(mockState)).toEqual(
        mockCountry.currencies[0]?.isoCode,
      );
    });
  });

  describe('getCountryStructure()', () => {
    it('should get the subfolder', () => {
      expect(selectors.getCountryStructure(mockState)).toEqual(
        mockCountry.defaultSubfolder,
      );
    });
  });

  describe('getCountryStructures()', () => {
    it('should get the list of subfolders for a given country code', () => {
      expect(selectors.getCountryStructures(mockState)).toEqual(
        mockCountry.structures,
      );
    });
  });

  describe('getSourceCountryCode()', () => {
    it('should get the source country code', () => {
      expect(selectors.getSourceCountryCode(mockState)).toEqual(
        mockCountry.sourceCountryCode,
      );
    });
  });

  describe('getCountryCurrencies()', () => {
    it('should get all the currencies to a specific countryCode', () => {
      expect(selectors.getCountryCurrencies(mockState)).toEqual(
        mockCountry.currencies,
      );
    });
  });

  describe('getCity()', () => {
    it('should get a city by cityId', () => {
      expect(
        selectors.getCity(mockState, (mockCities[0] as CityEntity).id),
      ).toEqual(mockCities[0]);
    });
  });

  describe('getCountryStateCities()', () => {
    it('should get all the cities for a specific countryCode and stateId', () => {
      expect(selectors.getCountryStateCities(mockState, mockStateId)).toEqual([
        mockCities[0],
      ]);
    });
  });

  describe('getState()', () => {
    it('should get a state by stateId', () => {
      expect(
        selectors.getState(mockState, (mockStates[0] as CityEntity).id),
      ).toEqual(
        mockStatesEntities[
          mockStates[0]!.id as keyof typeof mockStatesEntities
        ],
      );
    });
  });

  describe('getCountryStates()', () => {
    it('should get all the states for a specific countryCode', () => {
      expect(selectors.getCountryStates(mockState)).toEqual([
        { ...mockStates[0], cities: [(mockCities[0] as CityEntity).id] },
        { ...mockStates[1], cities: [(mockCities[1] as CityEntity).id] },
      ]);
    });
  });

  describe('getCountriesAddressSchemas()', () => {
    it('should get the address schemas list', () => {
      const expectedResult = mockState.entities.countriesAddressSchemas;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getCountriesAddressSchemas(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'countriesAddressSchemas');
    });
  });

  describe('getCountryAddressSchemas()', () => {
    it('should get the schema for a specific country from state', () => {
      const expectedResult = mockGetAddressSchemaResponse;
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getCountryAddressSchemas(mockState, countryId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'countriesAddressSchemas',
        countryId,
      );
    });
  });

  describe('areCountriesAddressSchemasLoading()', () => {
    it('should get the address schema isLoading property from state', () => {
      const spy = jest.spyOn(fromLocale, 'getCountriesAddressSchemas');

      expect(selectors.areCountriesAddressSchemasLoading(mockState)).toBe(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountriesAddressSchemasError()', () => {
    it('should get the address schema error property from state', () => {
      const expectedResult = mockState.locale.countriesAddressSchemas.error;
      const spy = jest.spyOn(fromLocale, 'getCountriesAddressSchemas');

      expect(selectors.getCountriesAddressSchemasError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
