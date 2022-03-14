/**
 * @module addresses/reducer
 * @category Addresses
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult, reducerFactory } from '../helpers';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import get from 'lodash/get';
import omit from 'lodash/omit';
import produce from 'immer';
import type * as T from './types';
import type { AddressEntity, AddressesEntity } from '../entities/types';
import type {
  Prediction,
  PredictionDetails,
} from '@farfetch/blackout-client/addresses/types';
import type {
  ReducerSwitch,
  StateWithResult,
  StateWithResultArray,
  StoreState,
} from '../types';

export const INITIAL_STATE: T.State = {
  error: null,
  isLoading: false,
  result: null,
  predictions: {
    result: null,
    error: null,
    isLoading: false,
  },
  predictionDetails: {
    result: null,
    error: null,
    isLoading: false,
  },
  addresses: {
    error: null,
    isLoading: false,
  },
  address: {
    error: {},
    isLoading: {},
  },
  addressSchema: {
    error: null,
    isLoading: false,
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
    if (addressesList[key] && addressesList[key][prop]) {
      return addressesList[key];
    }
  }
  return null;
};

const result = (
  state = INITIAL_STATE.result,
  action:
    | T.FetchAddressesSuccessAction
    | T.CreateAddressSuccessAction
    | T.RemoveAddressSuccessAction,
): T.State['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESSES_SUCCESS:
      return action.payload.result;
    case actionTypes.CREATE_ADDRESS_SUCCESS:
      return [...state, action.meta.addressId];
    case actionTypes.REMOVE_ADDRESS_SUCCESS: {
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
  action:
    | T.FetchPredictionFailureAction
    | T.FetchPredictionRequestAction
    | T.FetchPredictionDetailsFailureAction
    | T.FetchPredictionDetailsRequestAction
    | T.FetchAddressFailureAction
    | T.FetchAddressRequestAction
    | T.FetchAddressesFailureAction
    | T.FetchAddressesRequestAction
    | T.CreateAddressFailureAction
    | T.CreateAddressRequestAction
    | T.UpdateAddressFailureAction
    | T.UpdateAddressRequestAction
    | T.SetDefaultBillingAddressFailureAction
    | T.SetDefaultBillingAddressRequestAction
    | T.SetDefaultShippingAddressFailureAction
    | T.SetDefaultShippingAddressRequestAction
    | T.SetDefaultContactAddressFailureAction
    | T.SetDefaultContactAddressRequestAction
    | T.RemoveDefaultContactAddressFailureAction
    | T.RemoveDefaultContactAddressRequestAction
    | T.FetchDefaultContactAddressFailureAction
    | T.FetchDefaultContactAddressRequestAction,
): T.State['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_PREDICTION_FAILURE:
    case actionTypes.FETCH_PREDICTION_DETAILS_FAILURE:
    case actionTypes.FETCH_ADDRESS_FAILURE:
    case actionTypes.FETCH_ADDRESSES_FAILURE:
    case actionTypes.CREATE_ADDRESS_FAILURE:
    case actionTypes.UPDATE_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_PREDICTION_REQUEST:
    case actionTypes.FETCH_PREDICTION_DETAILS_REQUEST:
    case actionTypes.FETCH_ADDRESS_REQUEST:
    case actionTypes.FETCH_ADDRESSES_REQUEST:
    case actionTypes.CREATE_ADDRESS_REQUEST:
    case actionTypes.UPDATE_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | T.FetchPredictionAction
    | T.FetchPredictionDetailsAction
    | T.FetchAddressesAction
    | T.FetchAddressAction
    | T.CreateAddressAction
    | T.UpdateAddressAction
    | T.SetDefaultBillingAddressAction
    | T.SetDefaultShippingAddressAction
    | T.SetDefaultContactAddressAction
    | T.RemoveDefaultContactAddressAction
    | T.FetchDefaultContactAddressAction,
): T.State['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_PREDICTION_REQUEST:
    case actionTypes.FETCH_PREDICTION_DETAILS_REQUEST:
    case actionTypes.FETCH_ADDRESSES_REQUEST:
    case actionTypes.FETCH_ADDRESS_REQUEST:
    case actionTypes.CREATE_ADDRESS_REQUEST:
    case actionTypes.UPDATE_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return true;
    case actionTypes.FETCH_PREDICTION_FAILURE:
    case actionTypes.FETCH_PREDICTION_SUCCESS:
    case actionTypes.FETCH_PREDICTION_DETAILS_FAILURE:
    case actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS:
    case actionTypes.FETCH_ADDRESSES_FAILURE:
    case actionTypes.FETCH_ADDRESSES_SUCCESS:
    case actionTypes.FETCH_ADDRESS_FAILURE:
    case actionTypes.FETCH_ADDRESS_SUCCESS:
    case actionTypes.CREATE_ADDRESS_FAILURE:
    case actionTypes.CREATE_ADDRESS_SUCCESS:
    case actionTypes.UPDATE_ADDRESS_FAILURE:
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const predictions = (
  state = INITIAL_STATE.predictions,
  action: T.FetchPredictionAction | T.ResetPredictionSuccessAction,
): StateWithResultArray<Prediction> => {
  switch (action.type) {
    case actionTypes.FETCH_PREDICTION_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.predictions.error,
        isLoading: true,
      };
    case actionTypes.FETCH_PREDICTION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_PREDICTION_SUCCESS:
      return {
        error: INITIAL_STATE.predictions.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_PREDICTION:
      return INITIAL_STATE.predictions;
    default:
      return state;
  }
};

const predictionDetails = (
  state = INITIAL_STATE.predictionDetails,
  action: T.FetchPredictionDetailsAction | T.ResetPredictionSuccessAction,
): StateWithResult<PredictionDetails> => {
  switch (action.type) {
    case actionTypes.FETCH_PREDICTION_DETAILS_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.predictionDetails.error,
        isLoading: true,
      };
    case actionTypes.FETCH_PREDICTION_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS:
      return {
        error: INITIAL_STATE.predictionDetails.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_PREDICTION:
      return INITIAL_STATE.predictionDetails;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.CREATE_ADDRESS_SUCCESS as typeof actionTypes.CREATE_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.CreateAddressSuccessAction,
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
  [actionTypes.UPDATE_ADDRESS_SUCCESS as typeof actionTypes.UPDATE_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.UpdateAddressSuccessAction,
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
  [actionTypes.REMOVE_ADDRESS_SUCCESS as typeof actionTypes.REMOVE_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.RemoveAddressSuccessAction,
    ): StoreState['entities'] => {
      const { addressId } = action.meta;
      const currentAddresses = state.addresses;

      return produce(state, draftState => {
        draftState.addresses = omit(currentAddresses, addressId);
      });
    },
  [actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS as typeof actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.SetDefaultShippingAddressSuccessAction,
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
          draftState.addresses[
            prevCurrentShippingAddress.id
          ].isCurrentShipping = false;
        }
        // Select the selected address as default
        draftState.addresses[addressId].isCurrentShipping = true;
      });
    },
  [actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS as typeof actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.SetDefaultBillingAddressSuccessAction,
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
  [actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS as typeof actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.FetchAddressSchemaSuccessAction,
    ): StoreState['entities'] => {
      const countryId = action.payload.result;
      const countrySchema = get(
        action,
        `payload.entities.addressSchema[${countryId}]`,
        {},
      );

      return produce(state, draftState => {
        if (draftState) {
          if (!draftState.addressSchema) {
            draftState.addressSchema = {};
          }

          draftState.addressSchema[countryId] = { ...countrySchema };
        }
      });
    },
  [actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS as typeof actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.SetDefaultContactAddressSuccessAction,
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
          draftState.addresses[
            prevCurrentContactAddress.id
          ].isCurrentPreferred = false;
        }
        // Select the selected address as default
        draftState.addresses[addressId].isCurrentPreferred = true;
      });
    },
  [actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS as typeof actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.RemoveDefaultContactAddressSuccessAction,
    ): StoreState['entities'] => {
      const { addressId } = action.meta;

      return produce(state, draftState => {
        // Unmark the selected address as default
        draftState.addresses[addressId].isCurrentPreferred = false;
      });
    },
  [LOGOUT_SUCCESS as typeof LOGOUT_SUCCESS]: (
    state: StoreState['entities'],
  ): StoreState['entities'] => {
    const newState = { ...state };
    delete newState.addresses;

    return newState;
  },
};

export const address = (
  state = INITIAL_STATE.address,
  action:
    | T.CreateAddressRequestAction
    | T.FetchAddressAction
    | T.UpdateAddressAction
    | T.RemoveAddressAction
    | T.SetDefaultBillingAddressAction
    | T.SetDefaultShippingAddressAction
    | T.SetDefaultContactAddressAction
    | T.RemoveDefaultContactAddressAction,
): T.AddressState => {
  switch (action.type) {
    case actionTypes.CREATE_ADDRESS_REQUEST:
      return {
        isLoading: { ...state.isLoading },
        error: {},
      };
    case actionTypes.FETCH_ADDRESS_REQUEST:
    case actionTypes.UPDATE_ADDRESS_REQUEST:
    case actionTypes.REMOVE_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.addressId]: true,
        },
        error: {},
      };
    case actionTypes.FETCH_ADDRESS_SUCCESS:
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.addressId]: false,
        },
      };
    case actionTypes.FETCH_ADDRESS_FAILURE:
    case actionTypes.UPDATE_ADDRESS_FAILURE:
    case actionTypes.REMOVE_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE:
    case actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE:
    case actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE:
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
  'FETCH_ADDRESSES',
  INITIAL_STATE.addresses,
  actionTypes,
);

export const addressSchema = reducerFactory(
  'FETCH_ADDRESS_SCHEMA',
  INITIAL_STATE.addressSchema,
  actionTypes,
);

export const defaultAddressDetails = createReducerWithResult(
  'FETCH_DEFAULT_CONTACT_ADDRESS',
  INITIAL_STATE.defaultAddressDetails,
  actionTypes,
);

export const getError = (state: T.State): T.State['error'] => state.error;
export const getIsLoading = (state: T.State): T.State['isLoading'] =>
  state.isLoading;
export const getResult = (state: T.State): T.State['result'] => state.result;

export const getPredictions = (state: T.State): T.State['predictions'] =>
  state.predictions;
export const getPredictionDetails = (
  state: T.State,
): T.State['predictionDetails'] => state.predictionDetails;
export const getAddresses = (state: T.State): T.State['addresses'] =>
  state.addresses;
export const getAddress = (state: T.State): T.State['address'] => state.address;
export const getAddressSchema = (state: T.State): T.State['addressSchema'] =>
  state.addressSchema;
export const getDefaultAddressDetails = (
  state: T.State,
): T.State['defaultAddressDetails'] => state.defaultAddressDetails;

const reducer = combineReducers({
  error,
  isLoading,
  result,
  predictions,
  predictionDetails,
  addresses,
  address,
  addressSchema,
  defaultAddressDetails,
});

/**
 * Reducer for addresses state.
 *
 * @function addressesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const addressesReducer: ReducerSwitch<T.State> = (state, action) => {
  if (
    action.type === actionTypes.RESET_ADDRESSES ||
    action.type === LOGOUT_SUCCESS
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default addressesReducer;
