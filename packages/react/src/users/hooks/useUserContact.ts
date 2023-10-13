import {
  areUserContactsFetched,
  areUserContactsLoading,
  createUserContact as createUserContactAction,
  fetchUserContact as fetchUserContactAction,
  getUserContacts,
  getUserContactsError,
  isAuthenticated as isAuthenticatedSelector,
  removeUserContact as removeUserContactAction,
  type StoreState,
  updateUserContact as updateUserContactAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useUser } from '../../index.js';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  PatchUserContactOperation,
  User,
  UserContact,
} from '@farfetch/blackout-client';
import type { UseUserContactOptions } from './types/index.js';

function useUserContact(
  contactId: UserContact['id'],
  options: UseUserContactOptions = {
    enableAutoFetch: true,
  },
) {
  const store = useStore();
  const { enableAutoFetch = true, fetchConfig } = options;
  const { data: user } = useUser();
  const userId = user?.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isFetched = useSelector(areUserContactsFetched);
  const isLoading = useSelector(areUserContactsLoading);
  const userContact = useSelector(getUserContacts)?.[contactId];
  const error = useSelector(getUserContactsError);
  const fetchUserContactActionDispatcher = useAction(fetchUserContactAction);
  const createUserContactActionDispatcher = useAction(createUserContactAction);
  const updateUserContactActionDispatcher = useAction(updateUserContactAction);
  const removeUserContactActionDispatcher = useAction(removeUserContactAction);

  const fetchUserContact = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchUserContactActionDispatcher(
        userId as User['id'],
        contactId,
        config,
      );
    },
    [
      fetchUserContactActionDispatcher,
      isAuthenticated,
      userId,
      contactId,
      fetchConfig,
    ],
  );

  const createUserContact = useCallback(
    (data: UserContact, config: Config | undefined = fetchConfig) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      if (!data) {
        return Promise.reject(new Error('No data provided'));
      }

      return createUserContactActionDispatcher(
        userId as User['id'],
        data,
        config,
      );
    },
    [createUserContactActionDispatcher, isAuthenticated, userId, fetchConfig],
  );

  const updateUserContact = useCallback(
    (
      contactId: UserContact['id'],
      data: PatchUserContactOperation[],
      config: Config | undefined = fetchConfig,
    ) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      if (!contactId) {
        return Promise.reject(new Error('No contactId provided'));
      }

      if (!data) {
        return Promise.reject(new Error('No data provided'));
      }

      return updateUserContactActionDispatcher(
        userId as User['id'],
        contactId,
        data,
        config,
      );
    },
    [isAuthenticated, updateUserContactActionDispatcher, userId, fetchConfig],
  );

  const removeUserContact = useCallback(
    (
      contactId: UserContact['id'],
      config: Config | undefined = fetchConfig,
    ) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      if (!contactId) {
        return Promise.reject(new Error('No contactId provided'));
      }

      return removeUserContactActionDispatcher(
        userId as User['id'],
        contactId,
        config,
      );
    },
    [isAuthenticated, removeUserContactActionDispatcher, userId, fetchConfig],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areUserContactsLoading(updatedState);
    const updatedIsFetched = areUserContactsFetched(updatedState);

    if (
      enableAutoFetch &&
      !updatedIsFetched &&
      !updatedIsLoading &&
      isAuthenticated
    ) {
      fetchUserContact(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetchUserContact,
    isAuthenticated,
    isFetched,
    isLoading,
    store,
  ]);

  return {
    data: userContact,
    isLoading,
    isFetched,
    error,
    actions: {
      fetch: fetchUserContact,
      create: createUserContact,
      update: updateUserContact,
      remove: removeUserContact,
    },
  };
}

export default useUserContact;
