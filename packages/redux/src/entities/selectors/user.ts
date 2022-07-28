import { getEntities } from './entity';
import { USER_ID_PROPERTY } from '../constants';
import get from 'lodash/get';
import type { StoreState } from '../../types';
import type { UserEntity } from '../types/user.types';

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
 * Return the user's membership.
 *
 * @param user - User data.
 *
 * @returns User membership.
 */
export const getUserMembership = (user: UserEntity | undefined) =>
  get(user, 'membership');

/**
 * Return the user's credit.
 *
 * @param user - User data.
 *
 * @returns User credit.
 */
export const getUserCredit = (user: UserEntity | undefined) =>
  get(user, 'credit');

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
