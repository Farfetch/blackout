/**
 * @module entities/reducer
 * @category Entities
 * @subcategory Reducer
 */

import * as actionTypes from '../actionTypes';
import { createMergedObject } from '../../../helpers/redux';
import isFunction from 'lodash/isFunction';

export default (mapper = {}) =>
  (state = {}, action = {}) => {
    if (isFunction(mapper[action.type])) {
      return mapper[action.type](state, action);
    }

    if (action.type === actionTypes.RESET_ENTITIES) {
      return {};
    }

    if (action.payload && action.payload.entities) {
      return createMergedObject(state, action.payload.entities);
    }

    return state;
  };
