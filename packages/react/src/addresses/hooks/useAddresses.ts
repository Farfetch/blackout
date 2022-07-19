/**
 * Hook to provide all kinds of data for the business logic attached to addresses.
 */
import * as selectorsAddresses from '@farfetch/blackout-redux/addresses/selectors';
import * as selectorsLocale from '@farfetch/blackout-redux/locale/selectors';
import * as selectorsUsers from '@farfetch/blackout-redux/users/selectors';
import {
  createUserAddress as createUserAddressAction,
  fetchUserAddresses,
  removeUserAddress,
  setUserDefaultBillingAddress as setUserDefaultBillingAddressAction,
  setUserDefaultContactAddress as setUserDefaultContactAddressAction,
  setUserDefaultShippingAddress as setUserDefaultShippingAddressAction,
  updateUserAddress as updateUserAddressAction,
} from '@farfetch/blackout-redux/users';
import {
  fetchAddressPrediction,
  fetchAddressPredictions,
  resetAddressPredictions as resetAddressPredictionsAction,
} from '@farfetch/blackout-redux/addresses';
import { fetchCountryAddressSchema } from '@farfetch/blackout-redux/locale';
import { useAction } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Address } from '@farfetch/blackout-client/users';
import type { AddressesEntity } from '@farfetch/blackout-redux/entities/types';
import type {
  AddressPrediction,
  AddressPredictions,
} from '@farfetch/blackout-client/addresses/types';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CountryAddressSchema } from '@farfetch/blackout-client/locale/types';
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
export const useAddresses = ({
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
  createUserAddress: Promise<Address>;
  deleteUserAddress: Promise<void>;
  getUserAddresses: Promise<Address[]>;
  updateUserAddress: Promise<Address>;
  setUserDefaultBillingAddress: Promise<void>;
  setUserDefaultContactAddress: Promise<void>;
  setUserDefaultShippingAddress: Promise<void>;
  userAddressError: BlackoutError | null | undefined;
  isUserAddressLoading: boolean | undefined;
  addressPredictions: Nullable<AddressPredictions[]> | undefined;
  isAddressPredictionLoading: boolean;
  isAddressPredictionsLoading: boolean;
  addressPredictionsError: Nullable<BlackoutError>;
  addressPredictionError: Nullable<BlackoutError>;
  countryAddressSchema: CountryAddressSchema | undefined;
  isCountryAddressSchemaLoading: boolean;
  countryAddressSchemaError: Nullable<BlackoutError>;
  handleDeleteUserAddress: DeleteAddressHandlerData;
  handleCreateUserAddress: (address: { k: string }) => Promise<Address>;
  handleSetUserDefaultShippingAddress: (addressId: string) => Promise<void>;
  handleSetUserDefaultBillingAddress: (addressId: string) => Promise<void>;
  handleSetUserDefaultContactAddress: (addressId: string) => Promise<void>;
  handleUpdateUserAddress: (
    addressId: string,
    address: {
      k: string;
    },
  ) => Promise<Address>;
  handleGetUserAddress: () => Promise<Address[]>;
  handleGetAddressPredictions: (
    text: string,
    query?: Query | undefined,
  ) => Promise<AddressPredictions[]>;
  handleGetAddressPrediction: (
    predictionId: string,
    query?: QueryPredictionDetails | undefined,
  ) => Promise<AddressPrediction>;
  resetAddressPredictions: () => void;
  handleGetCountryAddressSchema: (
    isoCode: string,
  ) => Promise<CountryAddressSchema>;
} => {
  // Selectors
  const addressesData = useSelector((state: StoreState) =>
    selectorsUsers.getUserAddresses(state),
  );
  const addressesIds = useSelector((state: StoreState) =>
    selectorsUsers.getAddressesResult(state),
  );
  const addressesError = useSelector((state: StoreState) =>
    selectorsUsers.getUserError(state),
  );
  const isAddressesLoading = useSelector((state: StoreState) =>
    selectorsUsers.isUserAddressesLoading(state),
  );
  const userAddressError = useSelector((state: StoreState) =>
    selectorsUsers.getUserAddressError(state, addressId || ''),
  );
  const isUserAddressLoading = useSelector((state: StoreState) =>
    selectorsUsers.isUserAddressLoading(state, addressId || ''),
  );
  const addressPredictions = useSelector((state: StoreState) =>
    selectorsAddresses.getAddressPredictions(state),
  );
  const isAddressPredictionsLoading = useSelector((state: StoreState) =>
    selectorsAddresses.isAddressPredictionsLoading(state),
  );
  const addressPredictionsError = useSelector((state: StoreState) =>
    selectorsAddresses.getAddressPredictionsError(state),
  );
  const isAddressPredictionLoading = useSelector((state: StoreState) =>
    selectorsAddresses.isAddressPredictionLoading(state),
  );
  const addressPredictionError = useSelector((state: StoreState) =>
    selectorsAddresses.getAddressPredictionError(state),
  );
  const countryAddressSchema = useSelector((state: StoreState) =>
    selectorsLocale.getCountryAddressSchema(state, isoCode || ''),
  );
  const isCountryAddressSchemaLoading = useSelector((state: StoreState) =>
    selectorsLocale.isCountryAddressSchemaLoading(state),
  );
  const countryAddressSchemaError = useSelector((state: StoreState) =>
    selectorsLocale.getCountryAddressSchemaError(state),
  );

  // Actions
  const deleteUserAddress = useAction(removeUserAddress);
  const getUserAddresses = useAction(fetchUserAddresses);
  const createUserAddress = useAction(createUserAddressAction);
  const updateUserAddress = useAction(updateUserAddressAction);
  const setUserDefaultBillingAddress = useAction(
    setUserDefaultBillingAddressAction,
  );
  const setUserDefaultContactAddress = useAction(
    setUserDefaultContactAddressAction,
  );
  const setUserDefaultShippingAddress = useAction(
    setUserDefaultShippingAddressAction,
  );
  const getAddressPredictions = useAction(fetchAddressPredictions);
  const getAddressPrediction = useAction(fetchAddressPrediction);
  const resetAddressPredictions = useAction(resetAddressPredictionsAction);
  const getCountryAddressSchema = useAction(fetchCountryAddressSchema);
  /**
   * Deleting status is used to differentiate between different addresses currently
   * being removed Whenever someone clicks the delete button it adds a boolean
   * associated to the address id to determine if it's currently loading or not.
   */
  const [deletingStatus, setDeletingStatus] = useState({});

  useEffect(() => {
    auto && getUserAddresses(userId);
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
  const handleDeleteUserAddress: DeleteAddressHandlerData = async address => {
    // Mark the loading as active for the delete operation
    setDeletingStatus({ ...deletingStatus, [address.id]: true });
    try {
      await deleteUserAddress(userId, address.id);
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
            setUserDefaultShippingAddress(userId, addressIdToSetDefault);
          }

          if (address?.isCurrentBilling) {
            setUserDefaultBillingAddress(userId, addressIdToSetDefault);
          }

          if (address?.isCurrentPreferred) {
            setUserDefaultContactAddress(userId, addressIdToSetDefault);
          }
        }
      }
      setDeletingStatus({ ...deletingStatus, [address.id]: false });
    } finally {
      setDeletingStatus({ ...deletingStatus, [address.id]: false });
    }
  };

  const handleSetUserDefaultShippingAddress = (
    addressId: string,
  ): Promise<void> => setUserDefaultShippingAddress(userId, addressId);

  const handleSetUserDefaultBillingAddress = (
    addressId: string,
  ): Promise<void> => setUserDefaultBillingAddress(userId, addressId);

  const handleSetUserDefaultContactAddress = (
    addressId: string,
  ): Promise<void> => setUserDefaultContactAddress(userId, addressId);

  const handleUpdateUserAddress = (
    addressId: string,
    address: { k: string },
  ): Promise<Address> => updateUserAddress(userId, addressId, address);

  const handleCreateUserAddress = (address: { k: string }): Promise<Address> =>
    createUserAddress(userId, address);

  const handleGetUserAddress = (): Promise<Address[]> =>
    getUserAddresses(userId);

  const handleGetAddressPredictions = (
    text: string,
    query?: Query,
  ): Promise<AddressPredictions[]> => getAddressPredictions(text, query);

  const handleGetAddressPrediction = (
    predictionId: string,
    query?: QueryPredictionDetails,
  ): Promise<AddressPrediction> =>
    getAddressPrediction({ predictionId }, query);

  const handleGetCountryAddressSchema = (
    isoCode: string,
  ): Promise<CountryAddressSchema> => getCountryAddressSchema(isoCode);

  return {
    deletingStatus,
    addressesData,
    addressesIds,
    addressesError,
    isAddressesLoading,
    createUserAddress,
    deleteUserAddress,
    getUserAddresses,
    updateUserAddress,
    setUserDefaultBillingAddress,
    setUserDefaultContactAddress,
    setUserDefaultShippingAddress,
    userAddressError,
    isUserAddressLoading,
    addressPredictions,
    isAddressPredictionLoading,
    isAddressPredictionsLoading,
    addressPredictionsError,
    addressPredictionError,
    countryAddressSchema,
    isCountryAddressSchemaLoading,
    countryAddressSchemaError,
    handleDeleteUserAddress,
    handleCreateUserAddress,
    handleSetUserDefaultShippingAddress,
    handleSetUserDefaultBillingAddress,
    handleSetUserDefaultContactAddress,
    handleUpdateUserAddress,
    handleGetUserAddress,
    handleGetAddressPredictions,
    handleGetAddressPrediction,
    resetAddressPredictions,
    handleGetCountryAddressSchema,
  };
};
