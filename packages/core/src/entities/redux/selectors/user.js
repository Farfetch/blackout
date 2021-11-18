import { getEntity } from './entity';
import get from 'lodash/get';

export const USER_ID_PROPERTY = 'id';

/**
 * Returns the current user.
 *
 * @function getUser
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User object.
 */
export const getUser = state => getEntity(state, 'user');

/**
 * Return the user with the specified id.
 *
 * @function getUserId
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {(number|undefined)} The user id, if defined.
 */
export const getUserId = user => get(user, USER_ID_PROPERTY);

/**
 * Return the user's email.
 *
 * @function getUserEmail
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {string} User email.
 */
export const getUserEmail = user => get(user, 'email');

/**
 * Return the user segments.
 *
 * @function getUserSegments
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {object} User segments.
 */
export const getUserSegments = user => get(user, 'segments');

/**
 * Return if the user is guest or not.
 *
 * @function getUserIsGuest
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {boolean} If user is guest.
 */
export const getUserIsGuest = user => get(user, 'isGuest');

/**
 * Return the user's name.
 *
 * @function getUsername
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {string} User name.
 */
export const getUsername = user => get(user, 'username');

/**
 * Return the user's membership.
 *
 * @function getUserMembership
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {object} User membership.
 */
export const getUserMembership = user => get(user, 'membership');

/**
 * Return the user's credit.
 *
 * @function getUserCredit
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {object} User credit.
 */
export const getUserCredit = user => get(user, 'credit');

/**
 * Return the user's credit movements.
 *
 * @function getUserCreditMovements
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {object} Credit movements.
 */
export const getUserCreditMovements = user => get(user, 'creditMovements');

/**
 * Return the user's gender.
 *
 * @function getUserGender
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {string} User gender.
 */
export const getUserGender = user => get(user, 'gender');

/**
 * Return the user's bag id.
 *
 * @function getUserBagId
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 *
 * @returns {string} Bag id.
 */
export const getUserBagId = user => get(user, 'bagId');

/**
 * Returns the user's title.
 *
 * @function getUserTitle
 * @memberof module:entities/selectors
 *
 * @param {object} user - User data.
 * @returns {object} Object containing the title details (id and value).
 */
export const getUserTitle = user => get(user, 'title');
