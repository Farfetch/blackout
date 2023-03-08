import type { Config } from '../../types/index.js';

export type GetRecommendedProducts = (
  query: GetRecommendedProductsQuery,
  config?: Config,
) => Promise<RecommendedProductsResult[]>;

export type GetRecommendedProductsQuery = {
  /**
   * Get recommended products to specified product ID.
   */
  productId?: string;
  /**
   * Strategy name to get recommended items.
   */
  strategyName?: string;
  /**
   * Set how many recommended products will be returned.
   */
  howMany?: number;
  /**
   * Get recommended products to specified country.
   */
  countryCode?: string;
  /**
   * Get recommendations with products or brands to a specific gender: None, Women,
   * Men, Unisex, Kids.
   */
  gender?: string;
  /**
   * Type of user identifier. One of cookieID, userID, deviceID, or emailHash.
   */
  userType?: string;
  /**
   * Get recommendations with products or brands to a specific user.
   */
  userIdentifier?: string;
  /**
   * Get recommendations for products with the categoryId as context.
   */
  categoryId?: number;
  /**
   * Get recommendations with products with brandId as context.
   */
  brandId?: string;
  /**
   * Get recommendations with products with merchantId as context.
   */
  merchantId?: number;
};

export type RecommendedProductsResult = {
  id: string;
  products: RecommendedProduct[];
  recommendationTracker?: RecommendationTracker[];
};

export enum RecommendationTrackerType {
  Load,
  View,
  Click,
}

export enum ProductRecommendationType {
  Internal,
  Sponsored,
}

export type RecommendationTracker = {
  type?: RecommendationTrackerType;
  targetUri?: string;
};

export type RecommendedProduct = {
  product: {
    id: string;
  };
  score: number;
  trackers?: RecommendationTracker[];
  productRecommendationType: ProductRecommendationType;
};
