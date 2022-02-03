import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('users redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_USER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_GUEST_USER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_GUEST_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_GUEST_USER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_GUEST_USER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_USER_ATTRIBUTES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_USER_ATTRIBUTES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle SET_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
    });

    it('should handle FETCH_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_GUEST_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: '123' };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_GUEST_USER_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, result: { bar: 'foo' } };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.UPDATE_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_GUEST_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_GUEST_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_GUEST_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.CREATE_GUEST_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_GUEST_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_GUEST_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_GUEST_USER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_GUEST_USER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_GUEST_USER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_GUEST_USER_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_GUEST_USER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_GUEST_USER_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_ATTRIBUTES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_USER_ATTRIBUTES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_USER_ATTRIBUTES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_USER_ATTRIBUTES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle SET_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.SET_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle SET_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle SET_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_USER_ATTRIBUTE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    const state = {
      test: 'test',
      user: {
        id: 1213123,
        name: 'teste',
      },
    };

    it('should handle FETCH_BENEFITS_SUCCESS action type', () => {
      const idBenefit1 = 1111;
      const benefitsEntity = {
        [idBenefit1]: {
          id: idBenefit1,
          code: 'SummerParty2017',
          isActive: true,
          metadata: {
            'dress-code': 'green',
          },
          benefitType: 'price',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, benefits: [idBenefit1] },
        benefits: { ...benefitsEntity },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_BENEFITS_SUCCESS](state, {
          payload: {
            result: [idBenefit1],
            entities: {
              benefits: { ...benefitsEntity },
            },
          },
          type: actionTypes.FETCH_BENEFITS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    describe('FETCH_PREFERENCES_SUCCESS', () => {
      it('should handle FETCH_PREFERENCES_SUCCESS action type when _NO_ preferences are available on the server', () => {
        const expectedResult = {
          ...state,
          user: { ...state.user, preferences: [] },
          preferences: {},
        };

        expect(
          entitiesMapper[actionTypes.FETCH_PREFERENCES_SUCCESS](state, {
            payload: {
              result: [],
              entities: {},
            },
            type: actionTypes.FETCH_PREFERENCES_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle FETCH_PREFERENCES_SUCCESS action type when preferences are available on the server', () => {
        const codePreference = 'code1';
        const preferencesEntity = {
          [codePreference]: {
            code: codePreference,
            values: ['136968', '136831', '136908'],
            groupId: 'mobile',
            updatedDate: '2019-08-19T10:46:59.543Z',
          },
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, preferences: [codePreference] },
          preferences: { ...preferencesEntity },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_PREFERENCES_SUCCESS](state, {
            payload: {
              result: [codePreference],
              entities: {
                preferences: { ...preferencesEntity },
              },
            },
            type: actionTypes.FETCH_PREFERENCES_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    it('should handle FETCH_CREDIT_SUCCESS action type', () => {
      const credit = {
        currency: 'GB',
        value: 50,
        formattedValue: '£50',
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, credit },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_CREDIT_SUCCESS](state, {
          payload: {
            credit,
          },
          type: actionTypes.FETCH_CREDIT_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_CREDIT_MOVEMENTS_SUCCESS action type', () => {
      const creditMovements = {
        entries: [
          {
            type: 1,
            value: 0.57,
            formattedValue: '$0.57',
            currency: 'USD',
            description: 'Other Reason (FF fault)',
            createdOn: '/Date(1581071861195)/',
          },
        ],
        number: 1,
        totalItems: 1,
        totalPages: 1,
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, creditMovements },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS](state, {
          payload: {
            creditMovements,
          },
          type: actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_CONTACTS_SUCCESS action type', () => {
      const idContact1 = 'contact1';
      const contactsEntity = {
        [idContact1]: {
          id: idContact1,
          value: 'TEST',
          countryDetails: {
            countryCode: 'PT',
            countryCallingCode: '351',
          },
          type: 'Phone',
          description: 'TEST',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, contacts: [idContact1] },
        contacts: { ...contactsEntity },
      };

      expect(
        entitiesMapper[actionTypes.FETCH_CONTACTS_SUCCESS](state, {
          payload: {
            result: [idContact1],
            entities: {
              contacts: { ...contactsEntity },
            },
          },
          type: actionTypes.FETCH_CONTACTS_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle UPDATE_PREFERENCES_SUCCESS action type', () => {
      const codePreference = 'code1Updated';
      const preferencesEntity = {
        [codePreference]: {
          code: codePreference,
          values: ['136968', '136831', '136908'],
          groupId: 'mobile',
          updatedDate: '2019-08-19T10:46:59.543Z',
        },
      };

      const expectedResult = {
        ...state,
        user: { ...state.user, preferences: [codePreference] },
        preferences: { ...preferencesEntity },
      };

      expect(
        entitiesMapper[actionTypes.UPDATE_PREFERENCES_SUCCESS](state, {
          payload: {
            result: [codePreference],
            entities: {
              preferences: { ...preferencesEntity },
            },
          },
          type: actionTypes.UPDATE_PREFERENCES_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });
  });
});
