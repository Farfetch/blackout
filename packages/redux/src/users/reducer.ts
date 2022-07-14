import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult, reducerFactory } from '../helpers';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import omit from 'lodash/omit';
import produce from 'immer';
import type * as T from './types';
import type { AddressEntity, AddressesEntity } from '../entities/types';
import type { ReducerSwitch, StoreState } from '../types';

export const INITIAL_STATE: T.State = {
  error: null,
  result: null,
  isLoading: false,
  benefits: {
    error: null,
    isLoading: false,
  },
  preferences: {
    error: null,
    isLoading: false,
  },
  updatePreferences: {
    error: null,
    isLoading: false,
  },
  titles: {
    error: null,
    isLoading: false,
  },
  credit: {
    error: null,
    isLoading: false,
  },
  creditMovements: {
    error: null,
    isLoading: false,
  },
  contacts: {
    error: null,
    isLoading: false,
  },
  userAttributes: {
    result: null,
    error: null,
    isLoading: false,
  },
  addresses: {
    result: null,
    error: null,
    isLoading: false,
  },
  address: {
    error: {},
    isLoading: {},
  },
  /* Used for operations related with the default address that
    have a result associated, such as getting the default contact address */
  defaultAddress: {
    error: null,
    isLoading: false,
    result: null,
  },
};

// Goes through the addresses list and returns the default `shipping|billing|contact` address details. The
// address returned is the one passed in `prop` param, i.e. isCurrentShipping, isCurrentBilling or isCurrentPreferred.
// If no default address with that prop exists, null is returned.
export const getDefaultAddress = (
  addressesList: AddressesEntity,
  prop: 'isCurrentShipping' | 'isCurrentBilling' | 'isCurrentPreferred',
): AddressEntity | null | undefined => {
  for (const key in addressesList) {
    if (addressesList[key] && addressesList[key][prop]) {
      return addressesList[key];
    }
  }
  return null;
};

export const entitiesMapper = {
  [actionTypes.RESET_USER_ENTITIES]: (state: StoreState['entities']) => {
    const { user, ...rest } = state;
    return {
      ...rest,
    };
  },
  [actionTypes.FETCH_USER_BENEFITS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { benefits } = action.payload.entities;
    // Add benefits reference to user entity
    const user = { ...state?.user, benefits: action.payload.result };

    return {
      ...state,
      user,
      benefits,
    };
  },
  [actionTypes.FETCH_USER_PREFERENCES_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state?.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences: preferences || {},
    };
  },
  [actionTypes.FETCH_USER_CREDIT_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { credit } = action.payload;
    // Add credit to user entity
    const user = { ...state?.user, credit };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { creditMovements } = action.payload;
    // Add movements to user entity
    const user = { ...state?.user, creditMovements };

    return {
      ...state,
      user,
    };
  },
  [actionTypes.FETCH_USER_CONTACTS_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { contacts } = action.payload.entities;
    // Add contacts reference to user entity
    const user = { ...state?.user, contacts: action.payload.result };

    return {
      ...state,
      user,
      contacts,
    };
  },
  [actionTypes.UPDATE_USER_PREFERENCES_SUCCESS]: (
    state: StoreState['entities'],
    action: any,
  ): StoreState['entities'] => {
    const { preferences } = action.payload.entities;
    // Add preferences reference to user entity
    const user = { ...state?.user, preferences: action.payload.result };

    return {
      ...state,
      user,
      preferences,
    };
  },
  [actionTypes.CREATE_USER_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.CreateUserAddressSuccessAction,
  ): StoreState['entities'] => {
    const id = action.payload.result;
    const createdAddress = action.payload.entities.addresses[id];

    return produce(state, draftState => {
      if (!draftState.addresses) {
        draftState.addresses = {};
      }

      draftState.addresses = {
        ...draftState.addresses,
        [id]: { ...createdAddress },
      };
    });
  },
  [actionTypes.UPDATE_USER_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.UpdateUserAddressSuccessAction,
  ): StoreState['entities'] => {
    const id = action.payload.result;
    const updatedAddress = action.payload.entities.addresses[id];

    return produce(state, draftState => {
      if (!draftState.addresses) {
        draftState.addresses = {};
      }

      draftState.addresses = {
        ...draftState.addresses,
        [id]: { ...updatedAddress },
      };
    });
  },
  [actionTypes.REMOVE_USER_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.RemoveUserAddressSuccessAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;
    const currentAddresses = state.addresses;

    return produce(state, draftState => {
      draftState.addresses = omit(currentAddresses, addressId);
    });
  },
  [actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.SetUserDefaultShippingAddressSuccessAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    // Get prev default address so it can later be unmarked as the default
    const prevCurrentShippingAddress = getDefaultAddress(
      state.addresses,
      'isCurrentShipping',
    );

    return produce(state, draftState => {
      if (prevCurrentShippingAddress) {
        // Unmark previous shipping address as default
        draftState.addresses[prevCurrentShippingAddress.id].isCurrentShipping =
          false;
      }
      // Select the selected address as default
      draftState.addresses[addressId].isCurrentShipping = true;
    });
  },
  [actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.SetUserDefaultBillingAddressSuccessAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    // Get prev default address so it can later be unmarked as the default
    const prevCurrentBillingAddress = getDefaultAddress(
      state.addresses,
      'isCurrentBilling',
    );

    return produce(state, draftState => {
      if (prevCurrentBillingAddress) {
        // Unmark previous billing address as default
        draftState.addresses[prevCurrentBillingAddress.id].isCurrentBilling =
          false;
      }
      // Select the selected address as default
      draftState.addresses[addressId].isCurrentBilling = true;
    });
  },
  [actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.SetUserDefaultContactAddressSuccessAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    // Get prev default address so it can later be unmarked as the default
    const prevCurrentContactAddress = getDefaultAddress(
      state.addresses,
      'isCurrentPreferred',
    );

    return produce(state, draftState => {
      if (prevCurrentContactAddress) {
        // Unmark previous contact address as default
        draftState.addresses[prevCurrentContactAddress.id].isCurrentPreferred =
          false;
      }
      // Select the selected address as default
      draftState.addresses[addressId].isCurrentPreferred = true;
    });
  },
  [actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS]: (
    state: StoreState['entities'],
    action: T.RemoveUserDefaultContactAddressSuccessAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    return produce(state, draftState => {
      // Unmark the selected address as default
      draftState.addresses[addressId].isCurrentPreferred = false;
    });
  },
  [LOGOUT_SUCCESS]: (state: T.State) => {
    const {
      result,
      benefits,
      preferences,
      updatePreferences,
      titles,
      credit,
      creditMovements,
      contacts,
      userAttributes,
      address,
      addresses,
      defaultAddress,
      ...rest
    } = state;

    return { ...rest };
  },
};

/**
 * `error` reducer.
 */

const error = (
  state = INITIAL_STATE.error,
  action:
    | T.FetchUserAttributesFailureAction
    | T.FetchUserAttributesRequestAction
    | T.CreateUserAttributesFailureAction
    | T.CreateUserAttributesRequestAction
    | T.FetchUserAttributeFailureAction
    | T.FetchUserAttributeRequestAction
    | T.SetUserAttributeFailureAction
    | T.SetUserAttributeRequestAction
    | T.UpdateUserAttributeFailureAction
    | T.UpdateUserAttributeRequestAction
    | T.RemoveUserAttributeFailureAction
    | T.RemoveUserAttributeRequestAction
    | T.FetchUserFailureAction
    | T.FetchUserRequestAction
    | T.UpdateUserFailureAction
    | T.UpdateUserRequestAction
    | T.CreateGuestUserFailureAction
    | T.CreateGuestUserRequestAction
    | T.FetchGuestUserFailureAction
    | T.FetchGuestUserRequestAction
    | T.FetchUserAddressFailureAction
    | T.FetchUserAddressRequestAction
    | T.FetchUserAddressesFailureAction
    | T.FetchUserAddressesRequestAction
    | T.CreateUserAddressFailureAction
    | T.CreateUserAddressRequestAction
    | T.UpdateUserAddressFailureAction
    | T.UpdateUserAddressRequestAction
    | T.SetUserDefaultBillingAddressFailureAction
    | T.SetUserDefaultBillingAddressRequestAction
    | T.SetUserDefaultShippingAddressFailureAction
    | T.SetUserDefaultShippingAddressRequestAction
    | T.SetUserDefaultContactAddressFailureAction
    | T.SetUserDefaultContactAddressRequestAction
    | T.RemoveUserDefaultContactAddressFailureAction
    | T.RemoveUserDefaultContactAddressRequestAction
    | T.FetchUserDefaultContactAddressFailureAction
    | T.FetchUserDefaultContactAddressRequestAction
    | T.ResetUserAction
    | T.LogoutAction,
): T.State['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.FETCH_USER_ADDRESS_FAILURE:
    case actionTypes.FETCH_USER_ADDRESSES_FAILURE:
    case actionTypes.CREATE_USER_ADDRESS_FAILURE:
    case actionTypes.UPDATE_USER_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.RESET_USER_STATE:
    case actionTypes.FETCH_USER_ADDRESS_REQUEST:
    case actionTypes.FETCH_USER_ADDRESSES_REQUEST:
    case actionTypes.CREATE_USER_ADDRESS_REQUEST:
    case actionTypes.UPDATE_USER_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action:
    | T.FetchGuestUserSuccessAction
    | T.FetchUserSuccessAction
    | T.UpdateUserSuccessAction
    | T.CreateGuestUserSuccessAction
    | T.FetchUserAddressesSuccessAction
    | T.CreateUserAddressSuccessAction
    | T.RemoveUserAddressSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_USER_ADDRESSES_SUCCESS:
      return action.payload.result;
    case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
      return [...state, action.meta.addressId];
    case actionTypes.REMOVE_USER_ADDRESS_SUCCESS: {
      return (
        state &&
        state.filter((addressId: string) => addressId !== action.meta.addressId)
      );
    }
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | T.FetchUserAttributesAction
    | T.CreateUserAttributesAction
    | T.FetchUserAttributeAction
    | T.SetUserAttributeAction
    | T.UpdateUserAttributeAction
    | T.RemoveUserAttributeAction
    | T.FetchUserAction
    | T.UpdateUserAction
    | T.CreateGuestUserAction
    | T.FetchGuestUserAction
    | T.FetchUserAddressesAction
    | T.FetchUserAddressAction
    | T.CreateUserAddressAction
    | T.UpdateUserAddressAction
    | T.SetUserDefaultBillingAddressAction
    | T.SetUserDefaultShippingAddressAction
    | T.SetUserDefaultContactAddressAction
    | T.RemoveUserDefaultContactAddressAction
    | T.FetchUserDefaultContactAddressAction
    | T.LogoutAction
    | T.ResetUserAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.CREATE_GUEST_USER_REQUEST:
    case actionTypes.FETCH_GUEST_USER_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.FETCH_USER_ADDRESSES_REQUEST:
    case actionTypes.FETCH_USER_ADDRESS_REQUEST:
    case actionTypes.CREATE_USER_ADDRESS_REQUEST:
    case actionTypes.UPDATE_USER_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return true;
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.UPDATE_USER_FAILURE:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.CREATE_GUEST_USER_FAILURE:
    case actionTypes.CREATE_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_GUEST_USER_FAILURE:
    case actionTypes.FETCH_GUEST_USER_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.FETCH_USER_ADDRESSES_FAILURE:
    case actionTypes.FETCH_USER_ADDRESSES_SUCCESS:
    case actionTypes.FETCH_USER_ADDRESS_FAILURE:
    case actionTypes.FETCH_USER_ADDRESS_SUCCESS:
    case actionTypes.CREATE_USER_ADDRESS_FAILURE:
    case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
    case actionTypes.UPDATE_USER_ADDRESS_FAILURE:
    case actionTypes.UPDATE_USER_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.RESET_USER_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const benefits = reducerFactory(
  'FETCH_USER_BENEFITS',
  INITIAL_STATE.benefits,
  actionTypes,
);

export const preferences = reducerFactory(
  'FETCH_USER_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const updatePreferences = reducerFactory(
  'UPDATE_USER_PREFERENCES',
  INITIAL_STATE.preferences,
  actionTypes,
);

export const titles = reducerFactory(
  'FETCH_USER_TITLES',
  INITIAL_STATE.titles,
  actionTypes,
);

export const credit = reducerFactory(
  'FETCH_USER_CREDITS',
  INITIAL_STATE.credit,
  actionTypes,
);

export const creditMovements = reducerFactory(
  'FETCH_USER_CREDIT_MOVEMENTS',
  INITIAL_STATE.creditMovements,
  actionTypes,
);

export const contacts = reducerFactory(
  ['FETCH_USER_CONTACTS', 'FETCH_USER_CONTACT'],
  INITIAL_STATE.contacts,
  actionTypes,
);

export const userAttributes = (
  state = INITIAL_STATE.userAttributes,
  action:
    | T.FetchUserAttributesSuccessAction
    | T.FetchUserAttributeSuccessAction,
): T.State['userAttributes'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
      return {
        error: INITIAL_STATE.userAttributes.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
      const newArray = state.result && [...state.result];
      const index =
        state.result &&
        state.result.findIndex(
          attribute => attribute?.id === action.payload.id,
        );

      if (index !== -1 && index && newArray) {
        newArray[index] = action.payload;
      }

      return {
        error: INITIAL_STATE.userAttributes.error,
        isLoading: false,
        result:
          index !== -1
            ? newArray
            : state.result && [...state.result, action.payload],
      };
    default:
      return state;
  }
};

export const address = (
  state = INITIAL_STATE.address,
  action:
    | T.CreateUserAddressRequestAction
    | T.FetchUserAddressAction
    | T.UpdateUserAddressAction
    | T.RemoveUserAddressAction
    | T.SetUserDefaultBillingAddressAction
    | T.SetUserDefaultShippingAddressAction
    | T.SetUserDefaultContactAddressAction
    | T.RemoveUserDefaultContactAddressAction,
): T.AddressState => {
  switch (action.type) {
    case actionTypes.CREATE_USER_ADDRESS_REQUEST:
      return {
        isLoading: { ...state.isLoading },
        error: {},
      };
    case actionTypes.FETCH_USER_ADDRESS_REQUEST:
    case actionTypes.UPDATE_USER_ADDRESS_REQUEST:
    case actionTypes.REMOVE_USER_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.addressId]: true,
        },
        error: {},
      };
    case actionTypes.FETCH_USER_ADDRESS_SUCCESS:
    case actionTypes.UPDATE_USER_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_USER_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.addressId]: false,
        },
      };
    case actionTypes.FETCH_USER_ADDRESS_FAILURE:
    case actionTypes.UPDATE_USER_ADDRESS_FAILURE:
    case actionTypes.REMOVE_USER_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.addressId]: false,
        },
        error: {
          ...state.error,
          [action.meta.addressId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const addresses = (
  state = INITIAL_STATE.addresses,
  action: T.FetchUserAddressesAction,
): T.State['addresses'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ADDRESSES_REQUEST:
      return {
        isLoading: true,
        error: null,
        result: null,
      };
    case actionTypes.FETCH_USER_ADDRESSES_SUCCESS:
      return {
        isLoading: false,
        error: null,
        result: action.payload.result,
      };
    case actionTypes.FETCH_USER_ADDRESSES_FAILURE:
      return {
        isLoading: false,
        error: null,
        result: action.payload.error,
      };
    default:
      return state;
  }
};

export const defaultAddress = createReducerWithResult(
  'FETCH_USER_DEFAULT_CONTACT_ADDRESS',
  INITIAL_STATE.defaultAddress,
  actionTypes,
);

export const getError = (state: T.State): T.State['error'] => state.error;
export const getResult = (state: T.State): T.State['result'] => state.result;
export const getIsLoading = (state: T.State): T.State['isLoading'] =>
  state.isLoading;
export const getUserBenefits = (state: T.State): T.State['benefits'] =>
  state.benefits;
export const getUserPreferences = (state: T.State): T.State['preferences'] =>
  state.preferences;
export const getUserPreferencesUpdate = (
  state: T.State,
): T.State['updatePreferences'] => state.updatePreferences;
export const getUserTitles = (state: T.State): T.State['titles'] =>
  state.titles;
export const getUserCredit = (state: T.State): T.State['credit'] =>
  state.credit;
export const getUserCreditMovements = (
  state: T.State,
): T.State['creditMovements'] => state.creditMovements;
export const getUserContacts = (state: T.State): T.State['contacts'] =>
  state.contacts;
export const getUserAttributes = (state: T.State): T.State['userAttributes'] =>
  state.userAttributes;
export const getUserAddresses = (state: T.State): T.State['addresses'] =>
  state.addresses;
export const getUserAddress = (state: T.State): T.State['address'] =>
  state.address;
export const getUserDefaultAddressDetails = (
  state: T.State,
): T.State['defaultAddress'] => state.defaultAddress;

const reducer = combineReducers({
  benefits,
  contacts,
  credit,
  creditMovements,
  error,
  isLoading,
  preferences,
  result,
  titles,
  updatePreferences,
  userAttributes,
  address,
  addresses,
  defaultAddress,
});

/**
 * Reducer for users state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const usersReducer: ReducerSwitch<T.State> = (state, action): T.State => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === actionTypes.RESET_USER_STATE
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default usersReducer;
