/**
 * Hook to provide all kinds of data for the business logic attached to addresses.
 */
import * as selectors from '@farfetch/blackout-redux/addresses/selectors';
import {
  createAddress as createAddressAction,
  fetchAddresses,
  fetchAddressSchema,
  fetchPredictionDetails,
  fetchPredictions,
  removeAddress,
  resetPredictions as resetPredictionsAction,
  setDefaultBillingAddress as setDefaultBillingAddressAction,
  setDefaultContactAddress as setDefaultContactAddressAction,
  setDefaultShippingAddress as setDefaultShippingAddressAction,
  updateAddress as updateAddressAction,
} from '@farfetch/blackout-redux/addresses';
import { useAction } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type {
  Address,
  Prediction,
  PredictionDetails,
  Schema,
} from '@farfetch/blackout-client/addresses/types';
import type { AddressesEntity } from '@farfetch/blackout-redux/entities/types';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { DeleteAddressHandlerData } from './types';
import type { Nullable, StoreState } from '@farfetch/blackout-redux/types';

interface Props {
  auto?: boolean;
  userId?: number;
  addressId?: string;
  isoCode?: string;
}
interface Query {
  containerId?: string;
  countries?: string;
  sampleSize?: number;
}

interface QueryPredictionDetails {
  sessionToken: string; // Session token for Google's session logic.
}

/**
 * @param data - Optional object that has the following properties:
 * auto - Pass this prop as true to automatically fetch user addresses (userId is mandatory in this case).
 * userId - User to iterate over. Send nothing if you just need the actions.
 * addressId - To be able to return address errors and loading states it is mandatory to pass an addressId. Otherwise it's not needed.
 * isoCode - To be able to return address schema state it is mandatory to pass an isoCode. Otherwise it's not needed.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage address book
 * operations.
 */
export default ({
  auto = false,
  userId,
  addressId,
  isoCode,
}: Props): {
  deletingStatus: { [k: string]: boolean };
  addressesData: AddressesEntity;
  addressesIds: string[] | null;
  addressesError: Nullable<BlackoutError>;
  isAddressesLoading: boolean;
  createAddress: Promise<Address>;
  deleteAddress: Promise<void>;
  getAddresses: Promise<Address[]>;
  updateAddress: Promise<Address>;
  setDefaultBillingAddress: Promise<void>;
  setDefaultContactAddress: Promise<void>;
  setDefaultShippingAddress: Promise<void>;
  addressError: BlackoutError | null | undefined;
  isAddressLoading: boolean | undefined;
  predictions: Nullable<Prediction[]> | undefined;
  isPredictionDetailsLoading: boolean;
  isPredictionsLoading: boolean;
  predictionsError: Nullable<BlackoutError>;
  predictionDetailsError: Nullable<BlackoutError>;
  addressSchema: Schema | undefined;
  isAddressSchemaLoading: boolean;
  addressSchemaError: Nullable<BlackoutError>;
  handleDeleteAddress: DeleteAddressHandlerData;
  handleCreateAddress: (address: { k: string }) => Promise<Address>;
  handleSetDefaultShippingAddress: (addressId: string) => Promise<void>;
  handleSetDefaultBillingAddress: (addressId: string) => Promise<void>;
  handleSetDefaultContactAddress: (addressId: string) => Promise<void>;
  handleUpdateAddress: (
    addressId: string,
    address: {
      k: string;
    },
  ) => Promise<Address>;
  handleGetAddress: () => Promise<Address[]>;
  handleGetPredictions: (
    text: string,
    query?: Query | undefined,
  ) => Promise<Prediction[]>;
  handleGetPredictionDetails: (
    predictionId: string,
    query?: QueryPredictionDetails | undefined,
  ) => Promise<PredictionDetails>;
  resetPredictions: () => void;
  handleGetAddressSchema: (isoCode: string) => Promise<Schema>;
} => {
  // Selectors
  const addressesData = useSelector((state: StoreState) =>
    selectors.getAddresses(state),
  );
  const addressesIds = useSelector((state: StoreState) =>
    selectors.getResult(state),
  );
  const addressesError = useSelector((state: StoreState) =>
    selectors.getError(state),
  );
  const isAddressesLoading = useSelector((state: StoreState) =>
    selectors.isAddressesLoading(state),
  );
  const addressError = useSelector((state: StoreState) =>
    selectors.getAddressError(state, addressId || ''),
  );
  const isAddressLoading = useSelector((state: StoreState) =>
    selectors.isAddressLoading(state, addressId || ''),
  );
  const predictions = useSelector((state: StoreState) =>
    selectors.getPredictions(state),
  );
  const isPredictionsLoading = useSelector((state: StoreState) =>
    selectors.isPredictionsLoading(state),
  );
  const predictionsError = useSelector((state: StoreState) =>
    selectors.getPredictionsError(state),
  );
  const isPredictionDetailsLoading = useSelector((state: StoreState) =>
    selectors.isPredictionDetailsLoading(state),
  );
  const predictionDetailsError = useSelector((state: StoreState) =>
    selectors.getPredictionDetailsError(state),
  );
  const addressSchema = useSelector((state: StoreState) =>
    selectors.getSchema(state, isoCode || ''),
  );
  const isAddressSchemaLoading = useSelector((state: StoreState) =>
    selectors.isAddressSchemaLoading(state),
  );
  const addressSchemaError = useSelector((state: StoreState) =>
    selectors.getAddressSchemaError(state),
  );

  // Actions
  const deleteAddress = useAction(removeAddress);
  const getAddresses = useAction(fetchAddresses);
  const createAddress = useAction(createAddressAction);
  const updateAddress = useAction(updateAddressAction);
  const setDefaultBillingAddress = useAction(setDefaultBillingAddressAction);
  const setDefaultContactAddress = useAction(setDefaultContactAddressAction);
  const setDefaultShippingAddress = useAction(setDefaultShippingAddressAction);
  const getPredictions = useAction(fetchPredictions);
  const getPredictionDetails = useAction(fetchPredictionDetails);
  const resetPredictions = useAction(resetPredictionsAction);
  const getAddressSchema = useAction(fetchAddressSchema);
  /**
   * Deleting status is used to differentiate between different addresses currently
   * being removed Whenever someone clicks the delete button it adds a boolean
   * associated to the address id to determine if it's currently loading or not.
   */
  const [deletingStatus, setDeletingStatus] = useState({});

  useEffect(() => {
    auto && getAddresses(userId);
  }, [auto, userId]);

  // Gets the address to set as the new default address.
  // By default it is the first one.
  // If the first one is the only address, no address will be set as default, and
  // `null` is returned.
  // Otherwise the id of the first address in the list will be returned.
  const getAddressIdToSetDefault = (
    clickedAddress: {
      id: string | number;
      isCurrentShipping?: boolean;
      isCurrentBilling?: boolean;
      isCurrentPreferred?: boolean;
    },
    addressesList: { k: any },
  ): null | string | undefined => {
    const addressesIdsList = Object.keys(addressesList);
    let addressIdToSetDefault = null;

    // If only 1 address exists, no address will be set as default, therefore
    // null will be returned.
    if (addressesIdsList.length > 1) {
      // If the first address on the list is the same as the current one, the
      // default will be the one after that.
      if (addressesIdsList[0] === clickedAddress.id) {
        addressIdToSetDefault = addressesIdsList[1];
      }

      if (addressesIdsList[0] !== clickedAddress.id) {
        addressIdToSetDefault = addressesIdsList[0];
      }
    }

    return addressIdToSetDefault;
  };

  /**
   * Deletes the given address.
   *
   * @param address - The address.
   */
  const handleDeleteAddress: DeleteAddressHandlerData = async address => {
    // Mark the loading as active for the delete operation
    setDeletingStatus({ ...deletingStatus, [address.id]: true });
    try {
      await deleteAddress(userId, address.id);
      // If the address to be removed is the default for shipping, billing
      // or contact, a new address will be set as the respective default.
      if (
        address?.isCurrentShipping ||
        address?.isCurrentBilling ||
        address?.isCurrentPreferred
      ) {
        const addressIdToSetDefault = getAddressIdToSetDefault(
          address,
          addressesData as { k: any },
        );
        if (addressIdToSetDefault) {
          if (address?.isCurrentShipping) {
            setDefaultShippingAddress(userId, addressIdToSetDefault);
          }

          if (address?.isCurrentBilling) {
            setDefaultBillingAddress(userId, addressIdToSetDefault);
          }

          if (address?.isCurrentPreferred) {
            setDefaultContactAddress(userId, addressIdToSetDefault);
          }
        }
      }
      setDeletingStatus({ ...deletingStatus, [address.id]: false });
    } finally {
      setDeletingStatus({ ...deletingStatus, [address.id]: false });
    }
  };

  const handleSetDefaultShippingAddress = (addressId: string): Promise<void> =>
    setDefaultShippingAddress(userId, addressId);

  const handleSetDefaultBillingAddress = (addressId: string): Promise<void> =>
    setDefaultBillingAddress(userId, addressId);

  const handleSetDefaultContactAddress = (addressId: string): Promise<void> =>
    setDefaultContactAddress(userId, addressId);

  const handleUpdateAddress = (
    addressId: string,
    address: { k: string },
  ): Promise<Address> => updateAddress(userId, addressId, address);

  const handleCreateAddress = (address: { k: string }): Promise<Address> =>
    createAddress(userId, address);

  const handleGetAddress = (): Promise<Address[]> => getAddresses(userId);

  const handleGetPredictions = (
    text: string,
    query?: Query,
  ): Promise<Prediction[]> => getPredictions(text, query);

  const handleGetPredictionDetails = (
    predictionId: string,
    query?: QueryPredictionDetails,
  ): Promise<PredictionDetails> =>
    getPredictionDetails({ predictionId }, query);

  const handleGetAddressSchema = (isoCode: string): Promise<Schema> =>
    getAddressSchema(isoCode);

  return {
    deletingStatus,
    addressesData,
    addressesIds,
    addressesError,
    isAddressesLoading,
    createAddress,
    deleteAddress,
    getAddresses,
    updateAddress,
    setDefaultBillingAddress,
    setDefaultContactAddress,
    setDefaultShippingAddress,
    addressError,
    isAddressLoading,
    predictions,
    isPredictionDetailsLoading,
    isPredictionsLoading,
    predictionsError,
    predictionDetailsError,
    addressSchema,
    isAddressSchemaLoading,
    addressSchemaError,
    handleDeleteAddress,
    handleCreateAddress,
    handleSetDefaultShippingAddress,
    handleSetDefaultBillingAddress,
    handleSetDefaultContactAddress,
    handleUpdateAddress,
    handleGetAddress,
    handleGetPredictions,
    handleGetPredictionDetails,
    resetPredictions,
    handleGetAddressSchema,
  };
};
