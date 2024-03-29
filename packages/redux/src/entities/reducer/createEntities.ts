import * as actionTypes from '../actionTypes.js';
import { isFunction } from 'lodash-es';
import createMergedObject from '../../helpers/createMergedObject.js';
import type { AnyAction } from 'redux';
import type {
  CustomEntitiesReducer,
  CustomEntitiesReducerByAction,
} from './createDefaultEntitiesReducer.js';
import type { StoreState } from '../../types/index.js';

const isFunctionTypePredicate = (
  arg: unknown,
): arg is (...args: unknown[]) => unknown => {
  return isFunction(arg);
};

export type CreateEntitiesReducer = (
  entitiesReducerByAction: CustomEntitiesReducerByAction,
) => CustomEntitiesReducer;

export const basicEntitiesReducer = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
) => {
  if (action.type === actionTypes.RESET_ENTITIES) {
    return {};
  }

  if (action.payload && action.payload.entities) {
    return createMergedObject(state, action.payload.entities);
  }

  return state;
};

const createEntitiesReducer: CreateEntitiesReducer =
  (entitiesReducerByAction: CustomEntitiesReducerByAction = {}) =>
  (state: StoreState['entities'] = {}, action: AnyAction) => {
    const actionEntitiesReducer = entitiesReducerByAction[action.type];

    if (isFunctionTypePredicate(actionEntitiesReducer)) {
      return actionEntitiesReducer(state, action);
    }

    return basicEntitiesReducer(state, action);
  };

export default createEntitiesReducer;
