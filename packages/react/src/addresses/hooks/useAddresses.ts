/**
 * Hook to provide all kinds of data for the business logic attached to addresses.
 */
import {
  AddressesEntity,
  areAddressPredictionDetailsLoading as areAddressPredictionDetailsLoadingSelector,
  areAddressPredictionsLoading as areAddressPredictionsLoadingSelector,
  areCountryAddressSchemasLoading as areCountryAddressSchemasLoadingSelector,
  areUserAddressesLoading as areUserAddressesLoadingSelector,
  createUserAddress as createUserAddressAction,
  fetchAddressPredictionDetails,
  fetchAddressPredictions,
  fetchCountryAddressSchemas,
  fetchUserAddresses,
  getAddressPredictionError,
  getAddressPredictionsError,
  getAddressPredictions as getAddressPredictionsSelector,
  getCountryAddressSchemaError,
  getCountryAddressSchema as getCountryAddressSchemaSelector,
  getUserAddressError,
  getUserAddressesError,
  getUserAddressesResult,
  getUserAddresses as getUserAddressesSelector,
  isUserAddressLoading as isUserAddressLoadingSelector,
  Nullable,
  removeUserAddress,
  resetAddressPredictions as resetAddressPredictionsAction,
  setUserDefaultBillingAddress as setUserDefaultBillingAddressAction,
  setUserDefaultContactAddress as setUserDefaultContactAddressAction,
  setUserDefaultShippingAddress as setUserDefaultShippingAddressAction,
  StoreState,
  updateUserAddress as updateUserAddressAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type {
  AddressPrediction,
  BlackoutError,
  CountryAddressSchema,
  UserAddress,
} from '@farfetch/blackout-client';
import type { DeleteAddressHandlerData } from './types';

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

const useAddresses = ({
  auto = false,
  userId,
  addressId,
  isoCode,
}: Props): {
  deletingStatus: { [k: string]: boolean };
  addressesData: AddressesEntity;
  addressesIds: string[] | null;
  addressesError: Nullable<BlackoutError>;
  areUserAddressesLoading: boolean;
  createUserAddress: Promise<UserAddress>;
  deleteUserAddress: Promise<void>;
  getUserAddresses: Promise<UserAddress[]>;
  updateUserAddress: Promise<UserAddress>;
  setUserDefaultBillingAddress: Promise<void>;
  setUserDefaultContactAddress: Promise<void>;
  setUserDefaultShippingAddress: Promise<void>;
  userAddressError: BlackoutError | null | undefined;
  isUserAddressLoading: boolean | undefined;
  addressPredictions: Nullable<AddressPrediction[]> | undefined;
  isAddressPredictionLoading: boolean;
  areAddressPredictionsLoading: boolean;
  addressPredictionsError: Nullable<BlackoutError>;
  addressPredictionError: Nullable<BlackoutError>;
  countryAddressSchemas: CountryAddressSchema[] | undefined;
  areCountryAddressSchemasLoading: boolean;
  countryAddressSchemaError: Nullable<BlackoutError>;
  handleDeleteUserAddress: DeleteAddressHandlerData;
  handleCreateUserAddress: (address: { k: string }) => Promise<UserAddress>;
  handleSetUserDefaultShippingAddress: (addressId: string) => Promise<void>;
  handleSetUserDefaultBillingAddress: (addressId: string) => Promise<void>;
  handleSetUserDefaultContactAddress: (addressId: string) => Promise<void>;
  handleUpdateUserAddress: (
    addressId: string,
    address: {
      k: string;
    },
  ) => Promise<UserAddress>;
  handleGetUserAddress: () => Promise<UserAddress[]>;
  handleGetAddressPredictions: (
    text: string,
    query?: Query | undefined,
  ) => Promise<AddressPrediction[]>;
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
    getUserAddressesSelector(state),
  );
  const addressesIds = useSelector((state: StoreState) =>
    getUserAddressesResult(state),
  );
  const addressesError = useSelector((state: StoreState) =>
    getUserAddressesError(state),
  );
  const areUserAddressesLoading = useSelector((state: StoreState) =>
    areUserAddressesLoadingSelector(state),
  );
  const userAddressError = useSelector((state: StoreState) =>
    getUserAddressError(state, addressId || ''),
  );
  const isUserAddressLoading = useSelector((state: StoreState) =>
    isUserAddressLoadingSelector(state, addressId || ''),
  );
  const addressPredictions = useSelector((state: StoreState) =>
    getAddressPredictionsSelector(state),
  );
  const areAddressPredictionsLoading = useSelector((state: StoreState) =>
    areAddressPredictionsLoadingSelector(state),
  );
  const addressPredictionsError = useSelector((state: StoreState) =>
    getAddressPredictionsError(state),
  );
  const isAddressPredictionLoading = useSelector((state: StoreState) =>
    areAddressPredictionDetailsLoadingSelector(state),
  );
  const addressPredictionError = useSelector((state: StoreState) =>
    getAddressPredictionError(state),
  );
  const countryAddressSchemas = useSelector((state: StoreState) =>
    getCountryAddressSchemaSelector(state, isoCode || ''),
  );
  const areCountryAddressSchemasLoading = useSelector((state: StoreState) =>
    areCountryAddressSchemasLoadingSelector(state),
  );
  const countryAddressSchemaError = useSelector((state: StoreState) =>
    getCountryAddressSchemaError(state),
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
  const getAddressPrediction = useAction(fetchAddressPredictionDetails);
  const resetAddressPredictions = useAction(resetAddressPredictionsAction);
  const getCountryAddressSchema = useAction(fetchCountryAddressSchemas);
  /**
   * Deleting status is used to differentiate between different addresses currently
   * being removed Whenever someone clicks the delete button it adds a boolean
   * associated to the address id to determine if it's currently loading or not.
   */
  const [deletingStatus, setDeletingStatus] = useState({});

  useEffect(() => {
    auto && getUserAddresses(userId);
  }, [auto, getUserAddresses, userId]);

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
    addressesList: { k: unknown },
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
          addressesData as { k: unknown },
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
  ): Promise<UserAddress> => updateUserAddress(userId, addressId, address);

  const handleCreateUserAddress = (address: {
    k: string;
  }): Promise<UserAddress> => createUserAddress(userId, address);

  const handleGetUserAddress = (): Promise<UserAddress[]> =>
    getUserAddresses(userId);

  const handleGetAddressPredictions = (
    text: string,
    query?: Query,
  ): Promise<AddressPrediction[]> => getAddressPredictions(text, query);

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
    areUserAddressesLoading,
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
    areAddressPredictionsLoading,
    addressPredictionsError,
    addressPredictionError,
    countryAddressSchemas,
    areCountryAddressSchemasLoading,
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

export default useAddresses;
