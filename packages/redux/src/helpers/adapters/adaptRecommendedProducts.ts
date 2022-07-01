import type { RecommendedProductsResult } from '@farfetch/blackout-client';
import type { RecommendedProductsResultNormalized } from './types';

/**
 * Formats and simplifies the recommendations object structure.
 *
 * @example
 * ```
 * const recommendations = adaptRecommendedProducts(result);
 * Result of recommendations === {
 *      id: '0000-00000-0000-0000-000',
 *      values: [{
 *          id: 12312312, // product ID
 *          score: 1
 *      }]
 * }
 * ```
 *
 * @param result - The payload received by the endpoint to be formatted.
 *
 * @returns The formatted result including the ID of the recommendation.
 */
const adaptRecommendedProducts = (
  result: RecommendedProductsResult[],
): RecommendedProductsResultNormalized => ({
  id: result[0]?.id,
  values: result[0]?.products.map(
    (item: { product: { id: string }; score: number }) => ({
      id: item.product.id,
      score: item.score,
    }),
  ),
});

export default adaptRecommendedProducts;
