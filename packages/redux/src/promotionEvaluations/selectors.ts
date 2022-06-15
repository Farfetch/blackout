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
 * @example
 * ```
 * import { getPromotionEvaluationItems } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   promotionEvaluationsItems: getPromotionEvaluationItems(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - List of promotion evaluations items.
 */
export const getPromotionEvaluationItems = (
  state: StoreState,
): State['result'] => getResult(state.promotionEvaluations);

/**
 * Retrieves a promotion evaluation item given an id.
 *
 * @example
 * ```
 * import { getPromotionEvaluationItemById } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = (state, { id } ) => ({
 *   promotionEvaluationsItem: getPromotionEvaluationItemById(state, id)
 * });
 * ```
 *
 * @param state - Application state.
 * @param id    - Promotion evaluation item identifier to retrieve.
 *
 * @returns - Promotion evaluations item.
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
 * @example
 * ```
 * import { getPromotionEvaluationId } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   promotionEvaluationId: getPromotionEvaluationId(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Promotion evaluation id.
 */
export const getPromotionEvaluationId = (state: StoreState): State['id'] =>
  getId(state.promotionEvaluations);

/**
 * Retrieves the error status of promotion evaluations items.
 *
 * @example
 * ```
 * import { getPromotionEvaluationItemsError } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   error: getPromotionEvaluationItemsError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information (`null` if there are no errors).
 */
export const getPromotionEvaluationItemsError = (
  state: StoreState,
): State['error'] => getError(state.promotionEvaluations);

/**
 * Retrieves the loading state of promotion evaluations items.
 *
 * @example
 * ```
 * import { arePromotionEvaluationItemsLoading } from '@farfetch/blackout-redux/promotionEvaluations';
 *
 * const mapStateToProps = state => ({
 *   isLoading: arePromotionEvaluationItemsLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Loading status of promotion evaluations items.
 */
export const arePromotionEvaluationItemsLoading = (
  state: StoreState,
): State['isLoading'] => getIsLoading(state.promotionEvaluations);