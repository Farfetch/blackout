/**
 * @module promotionEvaluations/selectors
 * @category Promotion Evaluations
 * @subcategory Selectors
 */

import { getError, getId, getIsLoading, getResult } from './reducer';
import type {
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from '@farfetch/blackout-client/src/promotionEvaluations/types';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Retrieves a list of all the promotion evaluations items available.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - List of promotion evaluations items.
 *
 * @example
 * import { getPromotionEvaluationItems } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   promotionEvaluationsItems: getPromotionEvaluationItems(state)
 * });
 */
export const getPromotionEvaluationItems = (
  state: StoreState,
): State['result'] => getResult(state.promotionEvaluations);

/**
 * Retrieves a promotion evaluation item given an id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - Promotion evaluation item identifier to retrieve.
 *
 * @returns {object | undefined} - Promotion evaluations item.
 *
 * @example
 * import { getPromotionEvaluationItemById } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = (state, { id } ) => ({
 *   promotionEvaluationsItem: getPromotionEvaluationItemById(state, id)
 * });
 */
export const getPromotionEvaluationItemById = (
  state: StoreState,
  id: PromotionEvaluationId,
): PromotionEvaluationItem | undefined => {
  const promotionEvaluationsItems = getResult(state.promotionEvaluations);

  return promotionEvaluationsItems?.find(item => item.id === id);
};

/**
 * Retrieves the promotion evaluation id stored.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {string} - Promotion evaluation id.
 *
 * @example
 * import { getPromotionEvaluationId } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   promotionEvaluationId: getPromotionEvaluationId(state)
 * });
 */
export const getPromotionEvaluationId = (state: StoreState): State['id'] =>
  getId(state.promotionEvaluations);

/**
 * Retrieves the error status of promotion evaluations items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | null} Error information (`null` if there are no errors).
 *
 * @example
 * import { getPromotionEvaluationItemsError } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   error: getPromotionEvaluationItemsError(state)
 * });
 */
export const getPromotionEvaluationItemsError = (
  state: StoreState,
): State['error'] => getError(state.promotionEvaluations);

/**
 * Retrieves the loading state of promotion evaluations items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Loading status of promotion evaluations items.
 *
 * @example
 * import { arePromotionEvaluationItemsLoading } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   isLoading: arePromotionEvaluationItemsLoading(state)
 * });
 */
export const arePromotionEvaluationItemsLoading = (
  state: StoreState,
): State['isLoading'] => getIsLoading(state.promotionEvaluations);
