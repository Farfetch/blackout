export enum SearchIntentsTypeRequest {
  Listing,
  Product,
  Redirect,
}

export enum SearchIntentsTypeFilter {
  ProductId,
  Brands,
  Categories,
  Gender,
  Materials,
  Attributes,
  Sizes,
  Price,
  Colors,
  PriceType,
  Text,
}

export type SearchIntentsValue = {
  value: string;
  slug: string;
};

export type SearchIntentsResource = {
  typeFilter: SearchIntentsTypeFilter;
  values: SearchIntentsValue[];
};

export type SearchIntents = {
  typeRequest: SearchIntentsTypeRequest;
  redirectUrl: string;
  resources: SearchIntentsResource[];
};
