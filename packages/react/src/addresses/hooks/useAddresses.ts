/**
 * Hook to provide all kinds of data for the business logic attached to addresses.
 *
 * @module useAddresses
 * @category Addresses
 * @subcategory Hooks
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
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { StoreState } from '@farfetch/blackout-redux/types';

export interface MetaData {
  userId?: number;
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
 * @typedef {object} MetaData
 *
 * @alias MetaData
 *
 * @property {number} [userId]  - User to iterate over. Send nothing if you just need the actions.
 */

/**
 * @function useAddresses
 * @memberof module:addresses/hooks
 *
 * @param {MetaData} data - Object containing the necessary info to use inside the hook.
 *
 * @returns {object} All the handlers, state, actions and relevant data needed to manage address book operations.
 */
export default ({ userId }: MetaData): any => {
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
  const addressError = useCallback((addressId: string) => {
    useSelector((state: StoreState) =>
      selectors.getAddressError(state, addressId),
    );
  }, []);
  const isAddressLoading = useCallback((addressId: string) => {
    useSelector((state: StoreState) =>
      selectors.isAddressLoading(state, addressId),
    );
  }, []);
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
  const addressSchema = useCallback((isoCode: string) => {
    useSelector((state: StoreState) => selectors.getSchema(state, isoCode));
  }, []);
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
   * Deleting status is used to differentiate between different addresses currently being removed
   * Whenever someone clicks the delete button it adds a boolean associated to the address id
   * to determine if it's currently loading or not.
   */
  const [deletingStatus, setDeletingStatus] = useState({});

  useEffect(() => {
    getAddresses(userId);
  }, []);

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
   * @function handleDeleteAddress
   * @param {object} address                        - The address.
   * @param {string} [address.id]                   - The id of the address.
   * @param {boolean} [address.isCurrentShipping]   - If this is the current shipping address.
   * @param {boolean} [address.isCurrentBilling]    - If this is the current billing address.
   * @param {boolean} [address.isCurrentPreferred]  - If this is the current contact address.
   */
  const handleDeleteAddress = async (address: {
    id: string;
    isCurrentShipping?: boolean;
    isCurrentBilling?: boolean;
    isCurrentPreferred?: boolean;
  }): Promise<any> => {
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
          addressesData,
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

  const handleSetDefaultShippingAddress = (addressId: string): any =>
    setDefaultShippingAddress(userId, addressId);

  const handleSetDefaultBillingAddress = (addressId: string): any =>
    setDefaultBillingAddress(userId, addressId);

  const handleSetDefaultContactAddress = (addressId: string): any =>
    setDefaultContactAddress(userId, addressId);

  const handleUpdateAddress = (
    addressId: string,
    address: { k: string },
  ): any => updateAddress(userId, addressId, address);

  const handleCreateAddress = (address: { k: string }): any =>
    createAddress(userId, address);

  const handleGetAddress = () => getAddresses(userId);

  const handleGetPredictions = (text: string, query?: Query) =>
    getPredictions(text, query);

  const handleGetPredictionDetails = (
    predictionId: string,
    query?: QueryPredictionDetails,
  ) => getPredictionDetails({ predictionId }, query);

  const handleGetAddressSchema = (isoCode: string) => getAddressSchema(isoCode);

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
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleDeleteAddress|handleDeleteAddress} method
     */
    handleDeleteAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleSetDefaultShippingAddress|handleSetDefaultShippingAddress} method
     */
    handleCreateAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleCreateAddress|handleCreateAddress} method
     */
    handleSetDefaultShippingAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleSetDefaultBillingAddress|handleSetDefaultBillingAddress} method
     */
    handleSetDefaultBillingAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleSetDefaultContactAddress|handleSetDefaultContactAddress} method
     */
    handleSetDefaultContactAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleUpdateAddress|handleUpdateAddress} method
     */
    handleUpdateAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleGetAddress|handleGetAddress} method
     */
    handleGetAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleGetPredictions|handleGetPredictions} method
     */
    handleGetPredictions,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleGetPredictionDetails|handleGetPredictionDetails} method
     */
    handleGetPredictionDetails,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~resetPredictions|resetPredictions} method
     */
    resetPredictions,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useAddresses~handleGetAddressSchema|handleGetAddressSchema} method
     */
    handleGetAddressSchema,
  };
};
