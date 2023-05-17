import {
  fetchUserAddress as fetchUserAddressAction,
  getUserAddress,
  getUserAddressError,
  isAuthenticated as isAuthenticatedSelector,
  isUserAddressFetched,
  isUserAddressLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUser, useUserAddresses } from '../../index.js';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  User,
  UserAddress,
  UserAddressInput,
} from '@farfetch/blackout-client';
import type { UseUserAddressOptions } from './types/index.js';

function useUserAddress(
  addressId: UserAddress['id'],
  options: UseUserAddressOptions = {
    enableAutoFetch: true,
  },
) {
  const { enableAutoFetch, fetchConfig } = options;
  const { data: user } = useUser();
  const {
    actions: {
      update: updateUserAddressAction,
      remove: removeUserAddressAction,
      setDefaultBillingAddress: setDefaultBillingAddressAction,
      setDefaultContactAddress: setDefaultContactAddressAction,
      setDefaultShippingAddress: setDefaultShippingAddressAction,
    },
  } = useUserAddresses({
    enableAutoFetch: false,
    manageDefaultsOnRemoveAddress: false,
  });
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userId = user?.id;
  const fetchUserAddressActionDispatcher = useAction(fetchUserAddressAction);

  const fetchUserAddress = useCallback(
    (config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchUserAddressActionDispatcher(
        userId as User['id'],
        addressId,
        config,
      );
    },
    [addressId, fetchUserAddressActionDispatcher, isAuthenticated, userId],
  );

  const updateUserAddress = useCallback(
    (
      updateData: UserAddressInput,
      options?: {
        defaultBilling?: boolean;
        defaultShipping?: boolean;
        defaultContact?: boolean;
      },
    ) => {
      updateUserAddressAction(addressId, updateData, options);
    },
    [addressId, updateUserAddressAction],
  );

  const removeUserAddress = useCallback(
    (config?: Config) => {
      removeUserAddressAction(addressId, config);
    },
    [addressId, removeUserAddressAction],
  );

  const setDefaultBillingAddress = useCallback(
    (config?: Config) => {
      return setDefaultBillingAddressAction(addressId, config);
    },
    [setDefaultBillingAddressAction, addressId],
  );

  const setDefaultShippingAddress = useCallback(
    (config?: Config) => {
      return setDefaultShippingAddressAction(addressId, config);
    },
    [setDefaultShippingAddressAction, addressId],
  );

  const setDefaultContactAddress = useCallback(
    (config?: Config) => {
      return setDefaultContactAddressAction(addressId, config);
    },
    [setDefaultContactAddressAction, addressId],
  );

  const isFetched = useSelector((state: StoreState) =>
    isUserAddressFetched(state, addressId),
  );
  const userAddress = useSelector((state: StoreState) =>
    getUserAddress(state, addressId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isUserAddressLoading(state, addressId),
  );
  const error = useSelector((state: StoreState) =>
    getUserAddressError(state, addressId),
  );

  useEffect(() => {
    if (enableAutoFetch && !isFetched && !isLoading && isAuthenticated) {
      fetchUserAddress(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetchUserAddress,
    isAuthenticated,
    isFetched,
    isLoading,
  ]);

  return {
    data: userAddress,
    isLoading,
    isFetched,
    error,
    actions: {
      fetch: fetchUserAddress,
      update: updateUserAddress,
      remove: removeUserAddress,
      setDefaultBillingAddress,
      setDefaultShippingAddress,
      setDefaultContactAddress,
    },
  };
}

export default useUserAddress;
