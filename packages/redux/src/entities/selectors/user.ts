import { getEntities } from './entity';
import { USER_ID_PROPERTY } from '../constants';
import get from 'lodash/get';

/**
 * Returns the current user.
 *
 * @param state - Application state.
 *
 * @returns User object.
 */
export const getUser = (state: any): any => getEntities(state, 'user');

/**
 * Return the user with the specified id.
 *
 * @param user - User data.
 *
 * @returns The user id, if defined.
 */
export const getUserId = (user: any): any => get(user, USER_ID_PROPERTY);

/**
 * Return the user's email.
 *
 * @param user - User data.
 *
 * @returns User email.
 */
export const getUserEmail = (user: any): any => get(user, 'email');

/**
 * Return the user segments.
 *
 * @param user - User data.
 *
 * @returns User segments.
 */
export const getUserSegments = (user: any): any => get(user, 'segments');

/**
 * Return if the user is guest or not.
 *
 * @param user - User data.
 *
 * @returns If user is guest.
 */
export const getUserIsGuest = (user: any): any => get(user, 'isGuest');

/**
 * Return the user's name.
 *
 * @param user - User data.
 *
 * @returns User name.
 */
export const getUsername = (user: any): any => get(user, 'username');

/**
 * Return the user's membership.
 *
 * @param user - User data.
 *
 * @returns User membership.
 */
export const getUserMembership = (user: any): any => get(user, 'membership');

/**
 * Return the user's credit.
 *
 * @param user - User data.
 *
 * @returns User credit.
 */
export const getUserCredit = (user: any): any => get(user, 'credit');

/**
 * Return the user's credit movements.
 *
 * @param user - User data.
 *
 * @returns Credit movements.
 */
export const getUserCreditMovements = (user: any): any =>
  get(user, 'creditMovements');

/**
 * Return the user's gender.
 *
 * @param user - User data.
 *
 * @returns User gender.
 */
export const getUserGender = (user: any): any => get(user, 'gender');

/**
 * Return the user's bag id.
 *
 * @param user - User data.
 *
 * @returns Bag id.
 */
export const getUserBagId = (user: any): any => get(user, 'bagId');

/**
 * Returns the user's title.
 *
 * @param user - User data.
 *
 * @returns Object containing the title details (id and value).
 */
export const getUserTitle = (user: any): any => get(user, 'title');
