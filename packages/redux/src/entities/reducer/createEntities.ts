import * as actionTypes from '../actionTypes';
import { createMergedObject } from '../../helpers';
import isFunction from 'lodash/isFunction';

export default (mapper = {}) =>
  (state = {}, action: any = {}) => {
    // @ts-ignore
    if (isFunction(mapper[action.type])) {
      // @ts-ignore
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
