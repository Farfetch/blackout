import {
  SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
  SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
  SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  PutDefaultContactAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { SetDefaultContactAddressAction } from '../../types';

/**
 * @callback SetDefaultContactAddressThunkFactory
 * @param {string} userId - Identifier of the user.
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default contact address.
 *
 * @function doSetDefaultContactAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putDefaultContactAddress - Put default contact
 * address client.
 *
 * @returns {SetDefaultContactAddressThunkFactory} Thunk factory.
 */
const setDefaultContactAddressFactory =
  (putDefaultContactAddress: PutDefaultContactAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (dispatch: Dispatch<SetDefaultContactAddressAction>): Promise<void> => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultContactAddress(userId, addressId, config);

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default setDefaultContactAddressFactory;
