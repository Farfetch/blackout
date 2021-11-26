import * as fromReducer from '../reducer';
import { mockCountryCode } from 'tests/__fixtures__/locale';
import reducer, { actionTypes } from '..';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
let initialState;

describe('locale redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_LOCALE_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('countryCode() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).countryCode;

      expect(state).toBe(initialState.countryCode);
      expect(state).toBeNull();
    });

    it('should handle SET_COUNTRY_CODE action type', () => {
      expect(
        reducer(undefined, {
          payload: { countryCode: mockCountryCode },
          type: actionTypes.SET_COUNTRY_CODE,
        }).countryCode,
      ).toBe(mockCountryCode);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { countryCode: 'bar' };

      expect(reducer(state, mockAction).countryCode).toBe(state.countryCode);
    });
  });

  describe('cities() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).cities;

      expect(state).toEqual(initialState.cities);
    });

    it('should handle FETCH_COUNTRY_CITIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CITIES_REQUEST,
          payload: { foo: 'bar' },
        }).cities,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle FETCH_COUNTRY_CITIES_FAILURE action type', () => {
      const mockError = 'Get cities error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CITIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).cities,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle FETCH_COUNTRY_CITIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CITIES_SUCCESS,
          payload: { foo: 'bar' },
        }).cities,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        cities: { error: 'Error', isLoading: false },
      };

      expect(reducer(state, mockAction).cities).toEqual(state.cities);
    });
  });

  describe('countries() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).countries;

      expect(state).toEqual(initialState.countries);
    });

    it('should handle FETCH_COUNTRIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRIES_REQUEST,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle FETCH_COUNTRY_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_REQUEST,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle FETCH_COUNTRIES_FAILURE action type', () => {
      const mockError = 'Get countries error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).countries,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle FETCH_COUNTRY_FAILURE action type', () => {
      const mockError = 'Get countries error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).countries,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle FETCH_COUNTRIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRIES_SUCCESS,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle FETCH_COUNTRY_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_SUCCESS,
          payload: { foo: 'bar' },
        }).countries,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        countries: { error: 'Error', isLoading: false },
      };

      expect(reducer(state, mockAction).countries).toEqual(state.countries);
    });
  });

  describe('currencies() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).currencies;

      expect(state).toEqual(initialState.currencies);
    });

    it('should handle FETCH_COUNTRY_CURRENCIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST,
          payload: { foo: 'bar' },
        }).currencies,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle FETCH_COUNTRY_CURRENCIES_FAILURE action type', () => {
      const mockError = 'Get currencies error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).currencies,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle FETCH_COUNTRY_CURRENCIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS,
          payload: { foo: 'bar' },
        }).currencies,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        currencies: { error: 'Error', isLoading: false },
      };

      expect(reducer(state, mockAction).currencies).toEqual(state.currencies);
    });
  });

  describe('states() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).states;

      expect(state).toEqual(initialState.states);
    });

    it('should handle FETCH_COUNTRY_STATES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_STATES_REQUEST,
          payload: { foo: 'bar' },
        }).states,
      ).toEqual({ error: null, isLoading: true });
    });

    it('should handle FETCH_COUNTRY_STATES_FAILURE action type', () => {
      const mockError = 'Get states error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_STATES_FAILURE,
          payload: { error: mockError, foo: 'bar' },
        }).states,
      ).toEqual({
        error: mockError,
        isLoading: false,
      });
    });

    it('should handle FETCH_COUNTRY_STATES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_COUNTRY_STATES_SUCCESS,
          payload: { foo: 'bar' },
        }).states,
      ).toEqual({ error: null, isLoading: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        states: { error: 'Error', isLoading: false },
      };

      expect(reducer(state, mockAction).states).toEqual(state.states);
    });
  });

  describe('getCountryCode() selector', () => {
    it('should return the `countryCode` property from a given state', () => {
      expect(fromReducer.getCountryCode({ countryCode: mockCountryCode })).toBe(
        mockCountryCode,
      );
    });
  });

  describe('getAreCountryCitiesLoading() selector', () => {
    it('should return the `cities.isLoading` property from a given state', () => {
      const cities = { isLoading: true };

      expect(fromReducer.getAreCountryCitiesLoading({ cities })).toEqual(
        cities.isLoading,
      );
    });
  });

  describe('getCountryCitiesError() selector', () => {
    it('should return the `cities.error` property from a given state', () => {
      const cities = { error: 'Error' };

      expect(fromReducer.getCountryCitiesError({ cities })).toEqual(
        cities.error,
      );
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

  describe('getAreCountryCurrenciesLoading() selector', () => {
    it('should return the `currencies.isLoading` property from a given state', () => {
      const currencies = { isLoading: true };

      expect(
        fromReducer.getAreCountryCurrenciesLoading({ currencies }),
      ).toEqual(currencies.isLoading);
    });
  });

  describe('getCountryStatesError()Currenciestor', () => {
    it('should return the `currencies.error` property from a given state', () => {
      const currencies = { error: 'Error' };

      expect(fromReducer.getCountryCurrenciesError({ currencies })).toEqual(
        currencies.error,
      );
    });
  });

  describe('getAreCountryStatesLoading() selector', () => {
    it('should return the `states.isLoading` property from a given state', () => {
      const states = { isLoading: true };

      expect(fromReducer.getAreCountryStatesLoading({ states })).toEqual(
        states.isLoading,
      );
    });
  });

  describe('getCountryStatesError() selector', () => {
    it('should return the `states.error` property from a given state', () => {
      const states = { error: 'Error' };

      expect(fromReducer.getCountryStatesError({ states })).toEqual(
        states.error,
      );
    });
  });
});
