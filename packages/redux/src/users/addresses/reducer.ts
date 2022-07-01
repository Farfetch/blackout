import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import omit from 'lodash/omit';
import produce from 'immer';
import reducerFactory, {
  createReducerWithResult,
} from '../../helpers/reducerFactory';
import type {
  AddressEntity,
  AddressesEntity,
} from '../../entities/types/addresses.types';
import type { ReducerSwitch, StoreState } from '../../types';
import type { UserAddressesState } from './types';

export const INITIAL_STATE: UserAddressesState = {
  error: null,
  isLoading: false,
  result: null,
  addresses: {
    error: null,
    isLoading: false,
  },
  address: {
    error: {},
    isLoading: {},
  },
  /* Used for operations related with the default address that
    have a result associated, such as getting the default contact address */
  defaultAddressDetails: {
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
    const address = addressesList[key];

    if (address && address[prop]) {
      return address;
    }
  }
  return null;
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): UserAddressesState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ADDRESSES_SUCCESS:
      return action.payload.result;
    case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
      if (!state) {
        return [action.meta.addressId];
      }

      return [...state, action.meta.addressId];
    case actionTypes.REMOVE_USER_ADDRESS_SUCCESS: {
      return (
        state && state.filter(addressId => addressId !== action.meta.addressId)
      );
    }
    default:
      return state;
  }
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): UserAddressesState['error'] => {
  switch (action.type) {
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
    case actionTypes.FETCH_USER_ADDRESS_REQUEST:
    case actionTypes.FETCH_USER_ADDRESSES_REQUEST:
    case actionTypes.CREATE_USER_ADDRESS_REQUEST:
    case actionTypes.UPDATE_USER_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): UserAddressesState['isLoading'] => {
  switch (action.type) {
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
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.CREATE_USER_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const id = action.payload.result;
    const createdAddress = action.payload.entities.addresses[id];

    return produce(state, draftState => {
      if (!draftState) {
        draftState = {};
      }

      draftState.addresses = {
        ...draftState.addresses,
        [id]: { ...createdAddress },
      };
    });
  },
  [actionTypes.UPDATE_USER_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const id = action.payload.result;
    const updatedAddress = action.payload.entities.addresses[id];

    return produce(state, draftState => {
      if (!draftState) {
        draftState = {};
      }

      draftState.addresses = {
        ...draftState.addresses,
        [id]: { ...updatedAddress },
      };
    });
  },
  [actionTypes.REMOVE_USER_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;
    const currentAddresses = state?.addresses;

    return produce(state, draftState => {
      if (!draftState) {
        return draftState;
      }

      draftState.addresses = omit(currentAddresses, addressId);

      return draftState;
    });
  },
  [actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;
    // Get prev default address so it can later be unmarked as the default
    const prevCurrentShippingAddress = getDefaultAddress(
      state?.addresses,
      'isCurrentShipping',
    );

    return produce(state, draftState => {
      if (!draftState) {
        return draftState;
      }

      const addresses = draftState.addresses;

      if (!addresses) {
        return draftState;
      }

      if (prevCurrentShippingAddress) {
        // Unmark previous shipping address as default
        const prevCurrentShippingAddressStore =
          addresses[prevCurrentShippingAddress.id];
        if (prevCurrentShippingAddressStore) {
          prevCurrentShippingAddressStore.isCurrentShipping = false;
        }
      }

      // Select the selected address as default
      const newDefaultShippingAddress = addresses[addressId];
      if (newDefaultShippingAddress) {
        newDefaultShippingAddress.isCurrentShipping = true;
      }

      return draftState;
    });
  },
  [actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;
    // Get prev default address so it can later be unmarked as the default
    const prevCurrentBillingAddress = getDefaultAddress(
      state?.addresses,
      'isCurrentBilling',
    );

    return produce(state, draftState => {
      if (!draftState) {
        return draftState;
      }

      const addresses = draftState.addresses;

      if (!addresses) {
        return draftState;
      }

      if (prevCurrentBillingAddress) {
        // Unmark previous billing address as default
        const prevCurrentBillingAddressStore =
          addresses[prevCurrentBillingAddress.id];
        if (prevCurrentBillingAddressStore) {
          prevCurrentBillingAddressStore.isCurrentBilling = false;
        }
      }

      // Select the selected address as default
      const newDefaultBillingAddress = addresses[addressId];
      if (newDefaultBillingAddress) {
        newDefaultBillingAddress.isCurrentBilling = true;
      }

      return draftState;
    });
  },
  [actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    // Get prev default address so it can later be unmarked as the default
    const prevCurrentContactAddress = getDefaultAddress(
      state?.addresses,
      'isCurrentPreferred',
    );

    return produce(state, draftState => {
      if (!draftState) {
        return draftState;
      }

      const addresses = draftState.addresses;

      if (!addresses) {
        return draftState;
      }

      if (prevCurrentContactAddress) {
        // Unmark previous contact address as default
        const prevCurrentContactAddressStore =
          addresses[prevCurrentContactAddress.id];

        if (prevCurrentContactAddressStore) {
          prevCurrentContactAddressStore.isCurrentPreferred = false;
        }
      }

      // Select the selected address as default
      const newDefaultContactAddress = addresses[addressId];

      if (newDefaultContactAddress) {
        newDefaultContactAddress.isCurrentPreferred = true;
      }

      return draftState;
    });
  },
  [actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { addressId } = action.meta;

    return produce(state, draftState => {
      if (!draftState) {
        return draftState;
      }

      const addresses = draftState.addresses;

      if (!addresses) {
        return draftState;
      }

      // Unmark the selected address as default
      const defaultContactAddress = addresses[addressId];

      if (defaultContactAddress) {
        defaultContactAddress.isCurrentPreferred = false;
      }

      return draftState;
    });
  },
};

export const address = (
  state = INITIAL_STATE.address,
  action: AnyAction,
): UserAddressesState['address'] => {
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

export const addresses = reducerFactory(
  'FETCH_USER_ADDRESSES',
  INITIAL_STATE.addresses,
  actionTypes,
);

export const defaultAddressDetails = createReducerWithResult(
  'FETCH_USER_DEFAULT_CONTACT_ADDRESS',
  INITIAL_STATE.defaultAddressDetails,
  actionTypes,
);

export const getError = (
  state: UserAddressesState,
): UserAddressesState['error'] => state.error;
export const getIsLoading = (
  state: UserAddressesState,
): UserAddressesState['isLoading'] => state.isLoading;
export const getResult = (
  state: UserAddressesState,
): UserAddressesState['result'] => state.result;
export const getAddresses = (
  state: UserAddressesState,
): UserAddressesState['addresses'] => state.addresses;
export const getAddress = (
  state: UserAddressesState,
): UserAddressesState['address'] => state.address;
export const getDefaultAddressDetails = (
  state: UserAddressesState,
): UserAddressesState['defaultAddressDetails'] => state.defaultAddressDetails;

const reducer = combineReducers({
  error,
  isLoading,
  result,
  addresses,
  address,
  defaultAddressDetails,
});

/**
 * Reducer for addresses state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const addressesReducer: ReducerSwitch<UserAddressesState> = (state, action) => {
  if (action.type === actionTypes.RESET_USER_ADDRESSES) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default addressesReducer;
