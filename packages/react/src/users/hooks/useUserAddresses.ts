import {
  areUserAddressesFetched as areUserAddressesFetchedSelector,
  areUserAddressesLoading as areUserAddressesLoadingSelector,
  createUserAddress as createAddressAction,
  fetchUserAddresses as fetchAddressesAction,
  getUserAddresses,
  getUserAddressesError,
  removeUserAddress as removeAddressAction,
  setUserDefaultBillingAddress as setDefaultBillingAddressAction,
  setUserDefaultContactAddress as setDefaultContactAddressAction,
  setUserDefaultShippingAddress as setDefaultShippingAddressAction,
  updateUserAddress as updateAddressAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { usePrevious, useUser } from '../..';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type {
  Config,
  User,
  UserAddress,
  UserAddressInput,
} from '@farfetch/blackout-client';
import type { UseUserAddressesOptions } from './types/useUserAddresses.types';

const isPreferredAddress = (address: UserAddress) =>
  !!address.isCurrentPreferred;
const isBillingAddress = (address: UserAddress) => !!address.isCurrentBilling;
const isShippingAddress = (address: UserAddress) => !!address.isCurrentShipping;

function useUserAddresses(
  options: UseUserAddressesOptions = {
    enableAutoFetch: true,
    manageDefaultsOnRemoveAddress: true,
  },
) {
  const { enableAutoFetch, manageDefaultsOnRemoveAddress, fetchConfig } =
    options;
  const { data: user, isFetched: isUserFetched } = useUser();
  const isAuthenticated = isUserFetched && !user?.isGuest;
  const userId = user?.id;
  const createAddressActionDispatcher = useAction(createAddressAction);
  const fetchAddressesActionDispatcher = useAction(fetchAddressesAction);
  const updateAddressActionDispatcher = useAction(updateAddressAction);
  const removeAddressActionDispatcher = useAction(removeAddressAction);
  const setDefaultBillingAddressActionDispatcher = useAction(
    setDefaultBillingAddressAction,
  );
  const setDefaultShippingAddressActionDispatcher = useAction(
    setDefaultShippingAddressAction,
  );
  const setDefaultContactAddressActionDispatcher = useAction(
    setDefaultContactAddressAction,
  );

  const fetchAddresses = useCallback(
    (config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchAddressesActionDispatcher(userId as User['id'], config);
    },
    [fetchAddressesActionDispatcher, isAuthenticated, userId],
  );

  const createAddress = useCallback(
    (data: UserAddressInput, config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return createAddressActionDispatcher(userId as User['id'], data, config);
    },
    [createAddressActionDispatcher, isAuthenticated, userId],
  );

  const updateAddress = useCallback(
    (addressId: UserAddress['id'], data: UserAddressInput, config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return updateAddressActionDispatcher(
        userId as User['id'],
        addressId,
        data,
        config,
      );
    },
    [userId, isAuthenticated, updateAddressActionDispatcher],
  );

  const removeAddress = useCallback(
    (addressId: UserAddress['id'], config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return removeAddressActionDispatcher(
        userId as User['id'],
        addressId,
        config,
      );
    },
    [userId, isAuthenticated, removeAddressActionDispatcher],
  );

  const setDefaultBillingAddress = useCallback(
    (addressId: UserAddress['id'], config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return setDefaultBillingAddressActionDispatcher(
        userId as User['id'],
        addressId,
        config,
      );
    },
    [userId, isAuthenticated, setDefaultBillingAddressActionDispatcher],
  );

  const setDefaultShippingAddress = useCallback(
    (addressId: UserAddress['id'], config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return setDefaultShippingAddressActionDispatcher(
        userId as User['id'],
        addressId,
        config,
      );
    },
    [userId, isAuthenticated, setDefaultShippingAddressActionDispatcher],
  );

  const setDefaultContactAddress = useCallback(
    (addressId: UserAddress['id'], config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return setDefaultContactAddressActionDispatcher(
        userId as User['id'],
        addressId,
        config,
      );
    },
    [userId, isAuthenticated, setDefaultContactAddressActionDispatcher],
  );

  const isLoading = useSelector(areUserAddressesLoadingSelector);
  const isFetched = useSelector(areUserAddressesFetchedSelector);
  const addressesMap = useSelector(getUserAddresses);
  const error = useSelector(getUserAddressesError);
  const addresses = useMemo(
    () => Object.values(addressesMap || {}),
    [addressesMap],
  );
  const previousAddressesLength = usePrevious(addresses.length) || 0;
  const defaultAddresses = useMemo(() => {
    return {
      billing: addresses.find(isBillingAddress),
      shipping: addresses.find(isShippingAddress),
      contact: addresses.find(isPreferredAddress),
    };
  }, [addresses]);

  useEffect(() => {
    if (enableAutoFetch && !isFetched && !isLoading && isAuthenticated) {
      fetchAddresses(fetchConfig);
    }
  }, [
    fetchAddresses,
    fetchConfig,
    enableAutoFetch,
    isLoading,
    isAuthenticated,
    isFetched,
  ]);

  const updateDefaultAddresses = useCallback(
    async (
      addressId: UserAddress['id'],
      options: {
        defaultShipping?: boolean;
        defaultBilling?: boolean;
        defaultContact?: boolean;
      },
    ) => {
      if (options.defaultShipping) {
        await setDefaultShippingAddress(addressId);
      }

      if (options.defaultBilling) {
        await setDefaultBillingAddress(addressId);
      }

      if (options.defaultContact) {
        await setDefaultContactAddress(addressId);
      }
    },
    [
      setDefaultBillingAddress,
      setDefaultContactAddress,
      setDefaultShippingAddress,
    ],
  );

  useEffect(() => {
    if (
      manageDefaultsOnRemoveAddress &&
      addresses.length &&
      previousAddressesLength > addresses.length
    ) {
      const { shipping, billing } = defaultAddresses;
      const defaultShipping = shipping?.id;
      const defaultBilling = billing?.id;

      if (!defaultShipping && defaultBilling) {
        setDefaultShippingAddress(defaultBilling);
      } else if (defaultShipping && !defaultBilling) {
        setDefaultBillingAddress(defaultShipping);
      } else if (!defaultShipping && !defaultBilling) {
        const firstAddress: UserAddress = addresses[0] as UserAddress;

        updateDefaultAddresses(firstAddress.id, {
          defaultShipping: true,
          defaultBilling: true,
        });
      }
    }
  }, [
    previousAddressesLength,
    addresses,
    defaultAddresses,
    updateDefaultAddresses,
    setDefaultShippingAddress,
    setDefaultBillingAddress,
    manageDefaultsOnRemoveAddress,
  ]);

  const add = useCallback(
    async (
      address: UserAddressInput,
      options?: {
        defaultBilling?: boolean;
        defaultShipping?: boolean;
        defaultContact?: boolean;
      },
    ) => {
      const { id: addressId } = await createAddress({
        ...address,
      });

      if (!options) {
        return;
      }

      await updateDefaultAddresses(addressId, options);
    },
    [createAddress, updateDefaultAddresses],
  );

  const update = useCallback(
    async (
      addressId: UserAddress['id'],
      updateData: UserAddressInput,
      options?: {
        defaultBilling?: boolean;
        defaultShipping?: boolean;
        defaultContact?: boolean;
      },
    ) => {
      await updateAddress(addressId, updateData);

      if (options) {
        await updateDefaultAddresses(addressId, options);
      }
    },
    [updateAddress, updateDefaultAddresses],
  );

  return {
    data: { addresses, defaultAddresses },
    isLoading,
    isFetched,
    error,
    actions: {
      fetch: fetchAddresses,
      add,
      update,
      remove: removeAddress,
      setDefaultBillingAddress,
      setDefaultShippingAddress,
      setDefaultContactAddress,
    },
  };
}

export default useUserAddresses;
