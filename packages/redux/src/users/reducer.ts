import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import addressesReducer, {
  entitiesMapper as addressesEntitiesMapper,
  INITIAL_STATE as INITIAL_ADDRESSES_STATE,
} from './addresses/reducer';
import attributesReducer, {
  INITIAL_STATE as INITIAL_ATTRIBUTES_STATE,
} from './attributes/reducer';
import authenticationReducer, {
  INITIAL_STATE as INITIAL_AUTHENTICATION_STATE,
} from './authentication/reducer';
import benefitsReducer, {
  entitiesMapper as benefitsEntitiesMapper,
  INITIAL_STATE as INITIAL_BENEFITS_STATE,
} from './benefits/reducer';
import contactsReducer, {
  entitiesMapper as contactsEntitiesMapper,
  INITIAL_STATE as INITIAL_CONTACTS_STATE,
} from './contacts/reducer';
import creditsReducers, {
  entitiesMapper as creditsEntitiesMapper,
  INITIAL_STATE as INITIAL_CREDITS_STATE,
} from './credits/reducer';
import preferencesReducers, {
  INITIAL_STATE as INITIAL_PREFERENCES_STATE,
  entitiesMapper as preferencesEntitiesMapper,
} from './preferences/reducer';
import titlesReducer, {
  INITIAL_STATE as INITIAL_TITLES_STATE,
} from './titles/reducer';
import type { ReducerSwitch, StoreState } from '../types';
import type { UsersState } from './types';

export const INITIAL_STATE: UsersState = {
  error: null,
  id: null,
  isLoading: false,
  addresses: INITIAL_ADDRESSES_STATE,
  authentication: INITIAL_AUTHENTICATION_STATE,
  attributes: INITIAL_ATTRIBUTES_STATE,
  benefits: INITIAL_BENEFITS_STATE,
  titles: INITIAL_TITLES_STATE,
  credits: INITIAL_CREDITS_STATE.credits,
  creditMovements: INITIAL_CREDITS_STATE.creditMovements,
  contacts: INITIAL_CONTACTS_STATE,
  preferences: INITIAL_PREFERENCES_STATE.preferences,
  updatePreferences: INITIAL_PREFERENCES_STATE.updatePreferences,
};

export const entitiesMapper = {
  [actionTypes.RESET_USER_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const { user, ...rest } = state;
    return {
      ...rest,
    };
  },
  ...addressesEntitiesMapper,
  ...benefitsEntitiesMapper,
  ...preferencesEntitiesMapper,
  ...creditsEntitiesMapper,
  ...contactsEntitiesMapper,
  [actionTypes.LOGOUT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const {
      benefits,
      preferences,
      titles,
      contacts,
      addresses,
      user,
      ...rest
    } = state;

    return { ...rest };
  },
};

/**
 * `error` reducer.
 */
const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.PASSWORD_CHANGE_FAILURE:
    case actionTypes.PASSWORD_RECOVER_FAILURE:
    case actionTypes.PASSWORD_RESET_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.RESET_USER_STATE:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
    case actionTypes.PASSWORD_CHANGE_REQUEST:
    case actionTypes.PASSWORD_RECOVER_REQUEST:
    case actionTypes.PASSWORD_RESET_REQUEST:
    case actionTypes.REGISTER_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

/**
 * `id` reducer.
 */
const id = (state = INITIAL_STATE.id, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.PASSWORD_CHANGE_REQUEST:
    case actionTypes.PASSWORD_RECOVER_REQUEST:
    case actionTypes.PASSWORD_RESET_REQUEST:
      return true;
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
    case actionTypes.RESET_USER_STATE:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE:
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
    case actionTypes.PASSWORD_CHANGE_FAILURE:
    case actionTypes.PASSWORD_RECOVER_SUCCESS:
    case actionTypes.PASSWORD_RECOVER_FAILURE:
    case actionTypes.PASSWORD_RESET_SUCCESS:
    case actionTypes.PASSWORD_RESET_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const getError = (state: UsersState): UsersState['error'] => state.error;
export const getId = (state: UsersState): UsersState['id'] => state.id;
export const getIsLoading = (state: UsersState): UsersState['isLoading'] =>
  state.isLoading;
export const getUserBenefits = (state: UsersState): UsersState['benefits'] =>
  state.benefits;
export const getUserPreferences = (
  state: UsersState,
): UsersState['preferences'] => state.preferences;
export const getUserPreferencesUpdate = (
  state: UsersState,
): UsersState['updatePreferences'] => state.updatePreferences;
export const getUserTitles = (state: UsersState): UsersState['titles'] =>
  state.titles;
export const getUserCredits = (state: UsersState): UsersState['credits'] =>
  state.credits;
export const getUserCreditMovements = (
  state: UsersState,
): UsersState['creditMovements'] => state.creditMovements;
export const getUserContacts = (state: UsersState): UsersState['contacts'] =>
  state.contacts;
export const getUserAttributes = (
  state: UsersState,
): UsersState['attributes'] => state.attributes;
export const getAddresses = (state: UsersState): UsersState['addresses'] =>
  state.addresses;
export const getAuthentication = (
  state: UsersState,
): UsersState['authentication'] => state.authentication;

const reducer = combineReducers({
  error,
  id,
  isLoading,
  addresses: addressesReducer,
  attributes: attributesReducer,
  authentication: authenticationReducer,
  benefits: benefitsReducer,
  contacts: contactsReducer,
  creditMovements: creditsReducers.creditMovements,
  credits: creditsReducers.credits,
  preferences: preferencesReducers.preferences,
  updatePreferences: preferencesReducers.updatePreferences,
  titles: titlesReducer,
});

/**
 * Reducer for users state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const usersReducer: ReducerSwitch<UsersState> = (state, action): UsersState => {
  if (
    action.type === actionTypes.LOGOUT_SUCCESS ||
    action.type === actionTypes.RESET_USER_STATE
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default usersReducer;
