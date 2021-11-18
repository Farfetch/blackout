import * as fromReducer from '../reducer';
import { getInitialState } from '../../../../tests';
import { mockCountryCode } from 'tests/__fixtures__/locale';
import reducer, { actionTypes } from '..';

let initialState;

describe('locale redux reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_LOCALE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('countryCode() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().countryCode;

      expect(state).toBe(initialState.countryCode);
      expect(state).toBeNull();
    });

    it('should handle SET_COUNTRY action type', () => {
      expect(
        reducer(undefined, {
          payload: { countryCode: mockCountryCode },
          type: actionTypes.SET_COUNTRY,
        }).countryCode,
      ).toBe(mockCountryCode);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { countryCode: 'bar' };

      expect(reducer(state).countryCode).toBe(state.countryCode);
    });
  });

  describe('cities() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().cities;

      expect(state).toEqual(initialState.cities);
    });

    it('should handle GET_CITIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CITIES_REQUEST,
          payload: { foo: 'bar' },
        }).cities,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle GET_CITIES_FAILURE action type', () => {
      const mockError = 'Get cities error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CITIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).cities,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle GET_CITIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CITIES_SUCCESS,
          payload: { foo: 'bar' },
        }).cities,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        cities: { error: 'Error', isLoading: false },
      };

      expect(reducer(state).cities).toEqual(state.cities);
    });
  });

  describe('countries() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().countries;

      expect(state).toEqual(initialState.countries);
    });

    it('should handle GET_COUNTRIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRIES_REQUEST,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle GET_COUNTRY_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRY_REQUEST,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle GET_COUNTRIES_FAILURE action type', () => {
      const mockError = 'Get countries error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).countries,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle GET_COUNTRY_FAILURE action type', () => {
      const mockError = 'Get countries error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRY_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).countries,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle GET_COUNTRIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRIES_SUCCESS,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle GET_COUNTRY_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COUNTRY_SUCCESS,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        countries: { error: 'Error', isLoading: false },
      };

      expect(reducer(state).countries).toEqual(state.countries);
    });
  });

  describe('currencies() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().currencies;

      expect(state).toEqual(initialState.currencies);
    });

    it('should handle GET_CURRENCIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CURRENCIES_REQUEST,
          payload: { foo: 'bar' },
        }).currencies,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle GET_CURRENCIES_FAILURE action type', () => {
      const mockError = 'Get currencies error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CURRENCIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).currencies,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle GET_CURRENCIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CURRENCIES_SUCCESS,
          payload: { foo: 'bar' },
        }).currencies,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        currencies: { error: 'Error', isLoading: false },
      };

      expect(reducer(state).currencies).toEqual(state.currencies);
    });
  });

  describe('states() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().states;

      expect(state).toEqual(initialState.states);
    });

    it('should handle GET_STATES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_STATES_REQUEST,
          payload: { foo: 'bar' },
        }).states,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle GET_STATES_FAILURE action type', () => {
      const mockError = 'Get states error';
      expect(
        reducer(undefined, {
          type: actionTypes.GET_STATES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).states,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle GET_STATES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_STATES_SUCCESS,
          payload: { foo: 'bar' },
        }).states,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        states: { error: 'Error', isLoading: false },
      };

      expect(reducer(state).states).toEqual(state.states);
    });
  });

  describe('getCountryCode() selector', () => {
    it('should return the `countryCode` property from a given state', () => {
      expect(fromReducer.getCountryCode({ countryCode: mockCountryCode })).toBe(
        mockCountryCode,
      );
    });
  });

  describe('getAreCitiesLoading() selector', () => {
    it('should return the `cities.isLoading` property from a given state', () => {
      const cities = { isLoading: true };

      expect(fromReducer.getAreCitiesLoading({ cities })).toEqual(
        cities.isLoading,
      );
    });
  });

  describe('getCitiesError() selector', () => {
    it('should return the `cities.error` property from a given state', () => {
      const cities = { error: 'Error' };

      expect(fromReducer.getCitiesError({ cities })).toEqual(cities.error);
    });
  });

  describe('getAreCountriesLoading() selector', () => {
    it('should return the `countries.isLoading` property from a given state', () => {
      const countries = { isLoading: true };

      expect(fromReducer.getAreCountriesLoading({ countries })).toEqual(
        countries.isLoading,
      );
    });
  });

  describe('getCountriesError() selector', () => {
    it('should return the `countries.error` property from a given state', () => {
      const countries = { error: 'Error' };

      expect(fromReducer.getCountriesError({ countries })).toEqual(
        countries.error,
      );
    });
  });

  describe('getAreCurrenciesLoading() selector', () => {
    it('should return the `currencies.isLoading` property from a given state', () => {
      const currencies = { isLoading: true };

      expect(fromReducer.getAreCurrenciesLoading({ currencies })).toEqual(
        currencies.isLoading,
      );
    });
  });

  describe('getStatesError()Currenciestor', () => {
    it('should return the `currencies.error` property from a given state', () => {
      const currencies = { error: 'Error' };

      expect(fromReducer.getCurrenciesError({ currencies })).toEqual(
        currencies.error,
      );
    });
  });

  describe('getAreStatesLoading() selector', () => {
    it('should return the `states.isLoading` property from a given state', () => {
      const states = { isLoading: true };

      expect(fromReducer.getAreStatesLoading({ states })).toEqual(
        states.isLoading,
      );
    });
  });

  describe('getStatesError() selector', () => {
    it('should return the `states.error` property from a given state', () => {
      const states = { error: 'Error' };

      expect(fromReducer.getStatesError({ states })).toEqual(states.error);
    });
  });
});
