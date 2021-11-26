import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

const UNVERIFIED_USER = 4;

/**
 * @typedef {object} RegisterData
 * @property {string} countryCode - ISO 3166-1 alpha-2 code of the country.
 * @property {string} email - User's email.
 * @property {string} password - User's password.
 * @property {string} userName - User's email.
 * @property {string} name - User's full name.
 * @property {string} [phoneNumber] - User's phone number.
 * @property {string} [titleId] - User title identifier.
 * @property {string} [firstName] - User's first name.
 * @property {string} [lastName] - User's last name.
 * @property {boolean} [receiveNewsletters] - If should receive newsletter.
 */

/**
 * @callback RegisterThunkFactory
 * @param {RegisterData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Performs the register operation for a new user.
 *
 * @function register
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postRegister - Post register client.
 *
 * @returns {RegisterThunkFactory} Thunk factory.
 */
export default (postRegister: any) =>
  (
    data: {
      countryCode: string;
      email: string;
      password: string;
      username: string;
      name: string;
      phoneNumber?: string;
      titleId?: string;
      firstName?: string;
      lastName?: string;
      receiveNewsletters?: boolean;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    try {
      const result = await postRegister(data, config);
      const isUnverifiedUser = result.status === UNVERIFIED_USER && !result.id;
      const user = isUnverifiedUser ? {} : result;
      const userId = isUnverifiedUser ? null : result.id;
      const userEntity = {
        entities: { user },
        result: userId,
      };

      dispatch({
        payload: userEntity,
        type: REGISTER_SUCCESS,
        meta: {
          isRegisterAction: true,
          method: loginMethodParameterTypes.TENANT,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REGISTER_FAILURE,
      });

      throw error;
    }
  };
