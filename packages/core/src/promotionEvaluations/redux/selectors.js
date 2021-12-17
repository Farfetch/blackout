/**
 * @module promotionEvaluations/selectors
 * @category Promotion Evaluations
 * @subcategory Selectors
 */

import { getError, getId, getIsLoading, getResult } from './reducer';

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
 * import { getPromotionEvaluationItems } from '@farfetch/blackout-core/promotionEvaluations/redux';
 *
 * const mapStateToProps = state => ({
 * promotionEvaluationsItems: getPromotionEvaluationItems(state)
 * });
 */
export const getPromotionEvaluationItems = state =>
  getResult(state.promotionEvaluations);

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
 * import { getPromotionEvaluationItemById } from '@farfetch/blackout-core/promotionEvaluations/redux';
 *
 * const mapStateToProps = (state, { id } ) => ({
 *   promotionEvaluationsItem: getPromotionEvaluationItemById(state, id)
 * });
 */
export const getPromotionEvaluationItemById = (state, id) => {
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
 * @returns {Array} - List of promotion evaluations items.
 *
 * @example
 * import { getPromotionEvaluationId } from '@farfetch/blackout-core/promotionEvaluations/redux';
 *
 * const mapStateToProps = state => ({
 *   promotionEvaluationId: getPromotionEvaluationId(state)
 * });
 */
export const getPromotionEvaluationId = state =>
  getId(state.promotionEvaluations);

/**
 * Retrieves the error status of promotion evaluations items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Error information (`undefined` if there are no errors).
 *
 * @example
 * import { getPromotionEvaluationItemsError } from '@farfetch/blackout-core/promotionEvaluations/redux';
 *
 * const mapStateToProps = state => ({
 *   error: getPromotionEvaluationItemsError(state)
 * });
 */
export const getPromotionEvaluationItemsError = state =>
  getError(state.promotionEvaluations);

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
 * import { arePromotionEvaluationItemsLoading } from '@farfetch/blackout-core/promotionEvaluations/redux';
 *
 * const mapStateToProps = state => ({
 *   isLoading: arePromotionEvaluationItemsLoading(state)
 * });
 */
export const arePromotionEvaluationItemsLoading = state =>
  getIsLoading(state.promotionEvaluations);
