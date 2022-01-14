import type { Config } from '../../types';

export type GetProductRecommendations = (
  query: GetProductRecommendationQuery,
  config?: Config,
) => Promise<GetProductRecommendation[]>;

export type GetProductRecommendationQuery = {
  /** Get recommendation products to specified product ID. */
  productId: number;
  /** Strategy name to get recommendation items. */
  strategyName: string;
  /** Set how many recommendation products will be returned. */
  howMany?: number;
  /** Get recommendation products to specified country. */
  countryCode?: string;
  /** Get recommendations with products or brands to a specific gender: None, Women, Men, Unisex, Kids. */
  gender?: string;
  /** Type of user identifier. One cookieID, userID, deviceID, or emailHash. */
  userType?: string;
  /** Get recommendations with products or brands to a specific user. */
  userIdentifier?: string;
  /** Get recommendations for products with the categoryId as context. */
  categoryId?: number;
  /** Get recommendations with products with brandId as context. */
  brandId?: string;
  /** Get recommendations with products with merchantId as context. */
  merchantId?: number;
};

export type GetProductRecommendation = {
  id: string;
  products: GetProductItem[];
  recommendationTracker?: GetRecommendationTrackerItem[];
};

export enum GetRecommendationTrackerType {
  Load,
  View,
  Click,
}

export enum GetProductRecommendationType {
  Internal,
  Sponsored,
}

export type GetRecommendationTrackerItem = {
  type: GetRecommendationTrackerType;
  targetUri: string;
};

export type GetProductItem = {
  product: {
    id: string;
  };
  score: number;
  trackers: GetRecommendationTrackerItem[];
  productRecommendationType: GetProductRecommendationType;
};
