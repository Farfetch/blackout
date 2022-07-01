import { getEntities } from './entity';
import type { StoreState } from '../../types';

/**
 * Returns the 'returns' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns entity.
 */
export const getReturnsEntity = (state: StoreState) =>
  getEntities(state, 'returns');

/**
 * Returns the 'returnItems' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns ReturnsItems entity.
 */
export const getReturnItemsEntity = (state: StoreState) =>
  getEntities(state, 'returnItems');

/**
 * Returns the 'availableTimeSlots' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns AvailableTimeSlots entity.
 */
export const getTimeSlots = (state: StoreState) =>
  getEntities(state, 'availableTimeSlots');
