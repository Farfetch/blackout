// @TODO: Remove this file in version 2.0.0.
import * as actionTypes from '../actionTypes';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:search/actions
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the doResetSearchIntents method instead.
 *
 * @returns {Function} Dispatch reset action.
 */
export default () => dispatch => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'reset',
    'doResetSearchIntents',
  );

  dispatch({
    type: actionTypes.RESET_SEARCH,
  });
};
