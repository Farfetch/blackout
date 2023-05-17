import type { FacetType } from './facetTypeEnum.types.js';
import type { FacetValue } from './facetValue.types.js';

export enum FacetGroupFormat {
  Autocomplete = 'autocomplete',
  Hierarchical = 'hierarchical',
  Multiple = 'multiple',
  Range = 'range',
}

export enum FacetGroupKey {
  Brands = 'brands',
  Styles = 'styles',
  Gender = 'gender',
  Season = 'season',
  Materials = 'materials',
  Departments = 'departments',
  Categories = 'categories',
  Attributes = 'attributes',
  Boutiques = 'boutiques',
  Sizes = 'sizes',
  Price = 'price',
  Colors = 'colors',
  Collection = 'collection',
  PriceType = 'pricetype',
  BoutiqueLocation = 'boutiquelocation',
  Set = 'set',
  SameDayDelivery = 'samedaydelivery',
  Discount = 'discount',
  ScaleId = 'scaleid',
  Scenarios = 'scenarios',
  ShippingFrom = 'shippingfrom',
  OnlineDate = 'onlinedate',
  SalesSeason = 'salesseason',
  SizesByCategory = 'sizesbycategory',
  NinetyMinutesDelivery = '90minutesdelivery',
  StockPoints = 'stockpoints',
  ImageSizes = 'imagesizes',
  Similarity = 'similarity',
  Cities = 'cities',
  Code = 'code',
  Labels = 'labels',
  Quantity = 'quantity',
  Looks = 'looks',
  Exclusive = 'exclusive',
}

export type FacetGroup = {
  deep: number;
  description: string;
  type: FacetType;
  values: FacetValue[][];
  order: number;
  key: FacetGroupKey;
  format: FacetGroupFormat;
  _clearUrl: string | null;
  _isClearHidden: boolean;
  _isClosed: boolean;
  dynamic: number;
};
