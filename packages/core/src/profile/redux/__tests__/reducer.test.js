import * as fromReducer from '../reducer';
import { reducerAssertions } from '../../../../tests/helpers';
import reducer, { actionTypes, entitiesMapper } from '..';

const reducerActionTypes = {
  request: [
    actionTypes.GET_PROFILE_REQUEST,
    actionTypes.UPDATE_PROFILE_REQUEST,
    actionTypes.CREATE_GUEST_USER_REQUEST,
    actionTypes.GET_GUEST_USER_REQUEST,
  ],
  success: [
    actionTypes.GET_PROFILE_SUCCESS,
    actionTypes.UPDATE_PROFILE_SUCCESS,
    actionTypes.CREATE_GUEST_USER_SUCCESS,
    actionTypes.GET_GUEST_USER_SUCCESS,
  ],
  failure: [
    actionTypes.GET_PROFILE_FAILURE,
    actionTypes.UPDATE_PROFILE_FAILURE,
    actionTypes.CREATE_GUEST_USER_FAILURE,
    actionTypes.GET_GUEST_USER_FAILURE,
  ],
};

describe('profile reducer', () => {
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

  it('should handle GET_BENEFITS_SUCCESS action type', () => {
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
      entitiesMapper[actionTypes.GET_BENEFITS_SUCCESS](state, {
        payload: {
          result: [idBenefit1],
          entities: {
            benefits: { ...benefitsEntity },
          },
        },
        type: actionTypes.GET_BENEFITS_SUCCESS,
      }),
    ).toEqual(expectedResult);
  });

  describe('GET_PREFERENCES_SUCCESS', () => {
    it('should handle GET_PREFERENCES_SUCCESS action type when _NO_ preferences are available on the server', () => {
      const expectedResult = {
        ...state,
        user: { ...state.user, preferences: [] },
        preferences: {},
      };

      expect(
        entitiesMapper[actionTypes.GET_PREFERENCES_SUCCESS](state, {
          payload: {
            result: [],
            entities: {},
          },
          type: actionTypes.GET_PREFERENCES_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle GET_PREFERENCES_SUCCESS action type when preferences are available on the server', () => {
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
        entitiesMapper[actionTypes.GET_PREFERENCES_SUCCESS](state, {
          payload: {
            result: [codePreference],
            entities: {
              preferences: { ...preferencesEntity },
            },
          },
          type: actionTypes.GET_PREFERENCES_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });
  });

  it('should handle GET_CREDIT_SUCCESS action type', () => {
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
      entitiesMapper[actionTypes.GET_CREDIT_SUCCESS](state, {
        payload: {
          credit,
        },
        type: actionTypes.GET_CREDIT_SUCCESS,
      }),
    ).toEqual(expectedResult);
  });

  it('should handle GET_CREDIT_MOVEMENTS_SUCCESS action type', () => {
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
      entitiesMapper[actionTypes.GET_CREDIT_MOVEMENTS_SUCCESS](state, {
        payload: {
          creditMovements,
        },
        type: actionTypes.GET_CREDIT_MOVEMENTS_SUCCESS,
      }),
    ).toEqual(expectedResult);
  });

  it('should handle GET_CONTACTS_SUCCESS action type', () => {
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
      entitiesMapper[actionTypes.GET_CONTACTS_SUCCESS](state, {
        payload: {
          result: [idContact1],
          entities: {
            contacts: { ...contactsEntity },
          },
        },
        type: actionTypes.GET_CONTACTS_SUCCESS,
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

describe('userAttributes() reducer', () => {
  it.each([actionTypes.GET_USER_ATTRIBUTES_SUCCESS])(
    'should handle %s action type',
    actionType => {
      const payload = {
        type: 'Generic',
        channelCode: 'channel_abc',
        details: {
          items: {
            key1: 'value1',
            key2: 'value2',
          },
        },
      };
      const reducerResult = reducer(undefined, {
        payload,
        type: actionType,
      }).userAttributes;
      const expectedResult = {
        error: null,
        isLoading: false,
        result: payload,
      };

      expect(reducerResult).toEqual(expectedResult);
    },
  );

  it.each([actionTypes.GET_USER_ATTRIBUTE_SUCCESS])(
    'should handle %s action type',
    actionType => {
      const state = {
        userAttributes: {
          error: null,
          result: [],
        },
      };
      const payload = {
        id: 'e194de8d-de70-4933-9116-ecf91fbf59cc',
        type: 'Generic',
        channelCode: 'channel_abc',
        details: {
          items: {
            key1: 'value1',
            key2: 'value2',
          },
        },
      };
      const reducerResult = reducer(state, {
        payload,
        type: actionType,
      }).userAttributes;
      const expectedResult = {
        error: state.userAttributes.error,
        isLoading: false,
        result: [payload],
      };

      expect(reducerResult).toEqual(expectedResult);
    },
  );
});
