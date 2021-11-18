import {
  UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
  UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
  UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
} from '../actionTypes';

/**
 * @callback UpdateDeliveryBundleUpgradesThunkFactory
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {Array}  data - JSON Patch document to update a list of upgrades
 *    JSONPatch document as defined by RFC 6902 using:
 *      op: replace and test
 *      path: {index}/isSelected and {index}/id
 *      where {index} is the index (zero-based) of the
 *      delivery bundle upgrade to select.
 *
 *     It's recomended to add a test operation to the request to
 *     guarantee the index is the upgrade to be selected.
 *     Example:
 *       [
 *          {
 *             "op":"replace",
 *             "path": "0/isSelected",
 *             "value": "true"
 *          }
 *          {
 *             "op":"test",
 *             "path": "0/id",
 *             "value": "25314851"
 *          }
 *       ].
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates a list of delivery bundle upgrades available for a delivery bundle.
 *
 * @function doUpdateDeliveryBundleUpgrades
 * @memberof module:checkout/actions
 *
 * @param {Function} patchDeliveryBundleUpgrades - Patch delivery bundle
 * upgrades client.
 *
 * @returns {UpdateDeliveryBundleUpgradesThunkFactory} Thunk factory.
 */
export default patchDeliveryBundleUpgrades =>
  (id, deliveryBundleId, data, config) =>
  async dispatch => {
    dispatch({
      type: UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    });

    try {
      await patchDeliveryBundleUpgrades(id, deliveryBundleId, data, config);
      dispatch({
        type: UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      });

      throw error;
    }
  };
