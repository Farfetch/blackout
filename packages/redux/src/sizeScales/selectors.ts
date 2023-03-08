import {
  type CategoryEntity,
  getEntities,
  getEntityById,
} from '../entities/index.js';
import { createSelector } from 'reselect';
import {
  getError,
  getIsLoading,
  getSizeScaleError as getSizeScaleErrorByIdentifier,
  getSizeScaleIsLoading as getSizeScaleIsLoadingByIdentifier,
} from './reducer.js';
import type {
  Category,
  SizeScale,
  SizeScalesQuery,
} from '@farfetch/blackout-client';
import type { SizeScalesState } from './types/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Returns a specific scale by its id.
 *
 * @param state - Application state.
 * @param id    - Scale id.
 *
 * @returns Scale normalized.
 */
export const getSizeScale = (state: StoreState, id: SizeScale['sizeScaleId']) =>
  getEntityById(state, 'sizeScales', id);

/**
 * Returns all size scales fetched.
 *
 * @param state - Application state.
 *
 * @returns List of scales by id.
 */
export const getSizeScales = (state: StoreState) =>
  getEntities(state, 'sizeScales');

/**
 * Returns a list of size scales for the provided category id.
 *
 * @param state      - Application state.
 * @param categoryId - Category id.
 *
 * @returns Size scales for the provided category id.
 */
export const getSizeScalesByCategory: (
  state: StoreState,
  categoryId: CategoryEntity['id'],
) => SizeScale[] = createSelector(
  [
    getSizeScales,
    (state: StoreState, categoryId: Category['id']) => categoryId,
  ],
  (scales, categoryId) => {
    if (scales) {
      return Object.values(scales).filter(
        scale => scale.categoryId === categoryId,
      );
    }

    return [];
  },
);

/**
 * Returns the loading state of size scales.
 *
 * @param state - Application state.
 *
 * @returns Size scales loading state.
 */
export const areSizeScalesLoading = (state: StoreState) =>
  getIsLoading(state.sizeScales as SizeScalesState);

/**
 * Returns the loading state of the size scale.
 *
 * @param state           - Application state.
 * @param scaleIdentifier - Size scale id or the query object used to fetch the size scale.
 *
 * @returns The scale loading state.
 */
export const isSizeScaleLoading = (
  state: StoreState,
  scaleIdentifier: SizeScale['sizeScaleId'] | SizeScalesQuery,
) => {
  let identifier;

  if (typeof scaleIdentifier === 'object') {
    identifier = `categoryId_${scaleIdentifier.categoryId}`;
  } else {
    identifier = scaleIdentifier;
  }

  return getSizeScaleIsLoadingByIdentifier(state.sizeScales as SizeScalesState)[
    identifier
  ];
};

/**
 * Returns the error state of size scales.
 *
 * @param state - Application state.
 *
 * @returns Size scales error state.
 */
export const getSizeScalesError = (state: StoreState) =>
  getError(state.sizeScales as SizeScalesState);

/**
 * Returns the error of the size scale.
 *
 * @param state           - Application state.
 * @param scaleIdentifier - Size scale id or the query object used to fetch the size scale.
 *
 * @returns The scale error.
 */
export const getSizeScaleError = (
  state: StoreState,
  scaleIdentifier: number | SizeScalesQuery,
) => {
  let identifier;

  if (typeof scaleIdentifier === 'object') {
    identifier = `categoryId_${scaleIdentifier.categoryId}`;
  } else {
    identifier = scaleIdentifier;
  }

  return getSizeScaleErrorByIdentifier(state.sizeScales as SizeScalesState)[
    identifier
  ];
};

/**
 * Checks if a specific size scale is fetched.
 *
 * @param state   - Application state.
 * @param scaleId - Size scale id.
 *
 * @returns If the scale was requested or not.
 */
export const isSizeScaleFetched = (
  state: StoreState,
  scaleId: SizeScale['sizeScaleId'],
) =>
  getSizeScaleIsLoadingByIdentifier(state.sizeScales as SizeScalesState)[
    scaleId
  ] === false;
