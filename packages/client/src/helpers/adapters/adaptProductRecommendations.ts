import type {
  GetProductRecommendation,
  ProductRecommendation,
} from '../../recommendations/types';
/**
 * Formats and simplifies the recommendations object structure.
 *
 * @function adaptProductRecommendations
 * @memberof module:helpers/adapters
 *
 * @param result - The payload received by the endpoint to be formatted.
 *
 * @example
 * const recommendations = adaptProductRecommendations(result);
 * Result of recommendations === {
 *      id: '0000-00000-0000-0000-000',
 *      values: [{
 *          id: 12312312, // product ID
 *          score: 1
 *      }]
 * }
 * @returns The formatted result including the ID of the recommendation.
 */
export default (result: GetProductRecommendation[]): ProductRecommendation => ({
  id: result[0].id,
  values: result[0].products.map(
    (item: { product: { id: string }; score: number }) => ({
      id: item.product.id,
      score: item.score,
    }),
  ),
});
