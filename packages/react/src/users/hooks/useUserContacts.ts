import {
  areUserContactsFetched,
  areUserContactsLoading,
  createUserContact as createUserContactAction,
  fetchUserContacts as fetchUserContactsAction,
  getUserContacts,
  getUserContactsError,
  isAuthenticated as isAuthenticatedSelector,
  removeUserContact as removeUserContactAction,
  updateUserContact as updateUserContactAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '../../index.js';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  PatchUserContactOperation,
  User,
  UserContact,
} from '@farfetch/blackout-client';
import type { UseUserContactsOptions } from './types/index.js';

function useUserContacts(
  options: UseUserContactsOptions = {
    enableAutoFetch: true,
  },
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const { data: user } = useUser();
  const userId = user?.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isFetched = useSelector(areUserContactsFetched);
  const isLoading = useSelector(areUserContactsLoading);
  const userContacts = useSelector(getUserContacts);
  const error = useSelector(getUserContactsError);
  const fetchUserContactsActionDispatcher = useAction(fetchUserContactsAction);
  const createUserContactActionDispatcher = useAction(createUserContactAction);
  const updateUserContactActionDispatcher = useAction(updateUserContactAction);
  const removeUserContactActionDispatcher = useAction(removeUserContactAction);

  const fetchUserContacts = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchUserContactsActionDispatcher(userId as User['id'], config);
    },
    [fetchUserContactsActionDispatcher, isAuthenticated, userId, fetchConfig],
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
    if (enableAutoFetch && !isFetched && !isLoading && isAuthenticated) {
      fetchUserContacts(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetchUserContacts,
    isAuthenticated,
    isFetched,
    isLoading,
  ]);

  return {
    data: userContacts,
    isLoading,
    isFetched,
    error,
    actions: {
      fetch: fetchUserContacts,
      create: createUserContact,
      update: updateUserContact,
      remove: removeUserContact,
    },
  };
}

export default useUserContacts;
