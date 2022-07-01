import * as actionTypes from '../actionTypes';
import createMergedObject from '../../helpers/createMergedObject';
import isFunction from 'lodash/isFunction';
import type { AnyAction } from 'redux';
import type {
  CustomEntitiesReducer,
  CustomEntitiesReducerByAction,
} from './createDefaultEntitiesReducer';
import type { StoreState } from '../../types';

const isFunctionTypePredicate = (
  arg: unknown,
): arg is (...args: unknown[]) => unknown => {
  return isFunction(arg);
};

export type CreateEntitiesReducer = (
  entitiesReducerByAction: CustomEntitiesReducerByAction,
) => CustomEntitiesReducer;

const createEntitiesReducer: CreateEntitiesReducer =
  (entitiesReducerByAction: CustomEntitiesReducerByAction = {}) =>
  (state: StoreState['entities'] = {}, action: AnyAction) => {
    if (!action) {
      return state;
    }

    const actionEntitiesReducer = entitiesReducerByAction[action.type];

    if (isFunctionTypePredicate(actionEntitiesReducer)) {
      return actionEntitiesReducer(state, action);
    }

    if (action.type === actionTypes.RESET_ENTITIES) {
      return {};
    }

    if (action.payload && action.payload.entities) {
      return createMergedObject(state, action.payload.entities);
    }

    return state;
  };

export default createEntitiesReducer;
