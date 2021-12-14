import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPromotionEvaluationItems } from './types';

/**
 * Method responsible for getting the promotion evaluation items of an evaluation.
 *
 * @memberof module:promotionEvaluations/client
 *
 * @param {string} promotionEvaluationId - Promotion evaluation identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getPromotionEvaluationItems: GetPromotionEvaluationItems = (
  promotionEvaluationId,
  config,
) =>
  client
    .get(
      join(
        '/commerce/v1/promotionEvaluations',
        promotionEvaluationId,
        'promotionEvaluationItems',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPromotionEvaluationItems;
