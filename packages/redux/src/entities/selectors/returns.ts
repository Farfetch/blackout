import { getEntities } from './entity';
import type {
  Return,
  ReturnItem,
  TimeSlots,
} from '@farfetch/blackout-client/returns/types';
import type { StoreState } from '../../types';

/**
 * Returns the 'returns' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns entity.
 */
export const getReturns = (state: StoreState): Return | undefined =>
  getEntities(state, 'returns');

/**
 * Returns the 'returnItems' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns ReturnsItems entity.
 */
export const getReturnItems = (state: StoreState): ReturnItem | undefined =>
  getEntities(state, 'returnItems');

/**
 * Returns the 'availableTimeSlots' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns AvailableTimeSlots entity.
 */
export const getTimeSlots = (state: StoreState): TimeSlots[] | undefined =>
  getEntities(state, 'availableTimeSlots');
