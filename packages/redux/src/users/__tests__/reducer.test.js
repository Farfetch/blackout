import * as fromReducer from '../reducer';
import { reducerAssertions } from '../../../tests/helpers';
import reducer, { actionTypes, entitiesMapper } from '..';

const reducerActionTypes = {
  request: [
    actionTypes.FETCH_USER_REQUEST,
    actionTypes.UPDATE_USER_REQUEST,
    actionTypes.CREATE_GUEST_USER_REQUEST,
    actionTypes.FETCH_GUEST_USER_REQUEST,
  ],
  success: [
    actionTypes.FETCH_USER_SUCCESS,
    actionTypes.UPDATE_USER_SUCCESS,
    actionTypes.CREATE_GUEST_USER_SUCCESS,
    actionTypes.FETCH_GUEST_USER_SUCCESS,
  ],
  failure: [
    actionTypes.FETCH_USER_FAILURE,
    actionTypes.UPDATE_USER_FAILURE,
    actionTypes.CREATE_GUEST_USER_FAILURE,
    actionTypes.FETCH_GUEST_USER_FAILURE,
  ],
};

describe('users reducer', () => {
  reducerAssertions.assertErrorReducer(reducer, reducerActionTypes);
  reducerAssertions.assertResultReducer(reducer, reducerActionTypes);
  reducerAssertions.assertLoadingReducer(reducer, reducerActionTypes);
  reducerAssertions.assertGetters(fromReducer);
});

describe('Sub-areas WITHOUT result property', () => {
  const subAreaResult = {
    error: null,
    isLoading: false,
  };

  const subAreas = {
    benefits: { ...subAreaResult },
    preferences: { ...subAreaResult },
    titles: { ...subAreaResult },
    credit: { ...subAreaResult },
    creditMovements: { ...subAreaResult },
    contacts: { ...subAreaResult },
  };

  const subAreaNames = [
    'Benefits',
    'Preferences',
    'Titles',
    'Credit',
    'CreditMovements',
    'Contacts',
  ];

  reducerAssertions.assertSubAreasReducer(
    fromReducer,
    subAreaNames,
    subAreas,
    subAreaResult,
  );
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
