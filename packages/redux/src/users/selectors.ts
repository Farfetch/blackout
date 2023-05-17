import { get } from 'lodash-es';
import { getEntities, type UserEntity } from '../entities/index.js';
import { getError, getIsLoading } from './reducer.js';
import { USER_ID_PROPERTY } from './constants.js';
import type { StoreState } from '../types/index.js';
import type { UsersState } from './types/index.js';

/** Common selectors */

/**
 * Returns the loading status for the user operations.
 *
 * @param state - Application state.
 *
 * @returns User operation Loading status.
 */
export const isUserLoading = (state: StoreState) =>
  getIsLoading(state.users as UsersState);

// isAuthenticationLoading is an alias to isUserLoading
export const isAuthenticationLoading = isUserLoading;

/**
 * Returns the users error.
 *
 * @param state - Application state.
 *
 * @returns User operation error.
 */
export const getUserError = (state: StoreState) =>
  getError(state.users as UsersState);

// getAuthenticationError is an alias to getUserError
export const getAuthenticationError = getUserError;

/**
 * Returns the current user.
 *
 * @param state - Application state.
 *
 * @returns User object.
 */
export const getUser = (state: StoreState) => getEntities(state, 'user');

/**
 * Return the user with the specified id.
 *
 * @param user - User data.
 *
 * @returns The user id, if defined.
 */
export const getUserId = (user: UserEntity | undefined) =>
  get(user, USER_ID_PROPERTY);

/**
 * Return the user's email.
 *
 * @param user - User data.
 *
 * @returns User email.
 */
export const getUserEmail = (user: UserEntity | undefined) =>
  get(user, 'email');

/**
 * Return the user segments.
 *
 * @param user - User data.
 *
 * @returns User segments.
 */
export const getUserSegments = (user: UserEntity | undefined) =>
  get(user, 'segments');

/**
 * Return if the user is guest or not.
 *
 * @param user - User data.
 *
 * @returns If user is guest.
 */
export const getUserIsGuest = (user: UserEntity | undefined) =>
  get(user, 'isGuest');

/**
 * Return the user's name.
 *
 * @param user - User data.
 *
 * @returns User name.
 */
export const getUsername = (user: UserEntity | undefined) =>
  get(user, 'username');

/**
 * Return the user's credit.
 *
 * @param user - User data.
 *
 * @returns User credit.
 */
export const getUserCredits = (user: UserEntity | undefined) =>
  get(user, 'credits');

/**
 * Return the user's credit movements.
 *
 * @param user - User data.
 *
 * @returns Credit movements.
 */
export const getUserCreditMovements = (user: UserEntity | undefined) =>
  get(user, 'creditMovements');

/**
 * Return the user's gender.
 *
 * @param user - User data.
 *
 * @returns User gender.
 */
export const getUserGender = (user: UserEntity | undefined) =>
  get(user, 'gender');

/**
 * Return the user's bag id.
 *
 * @param user - User data.
 *
 * @returns Bag id.
 */
export const getUserBagId = (user: UserEntity | undefined) =>
  get(user, 'bagId');

/**
 * Returns the user's title.
 *
 * @param user - User data.
 *
 * @returns Object containing the title details (id and value).
 */
export const getUserTitle = (user: UserEntity | undefined) =>
  get(user, 'title');

export * from './addresses/selectors.js';
export * from './attributes/selectors.js';
export * from './authentication/selectors.js';
export * from './benefits/selectors.js';
export * from './contacts/selectors.js';
export * from './credits/selectors.js';
export * from './personalIds/selectors.js';
export * from './preferences/selectors.js';
export * from './returns/selectors.js';
export * from './titles/selectors.js';
