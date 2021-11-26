enum TypeRequestEnum {
  Listing,
  Product,
  Redirect,
}

enum TypeFilterEnum {
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

type searchIntentsValue = {
  value: string;
  slug: string;
};

export type searchIntentsResource = {
  typeFilter: TypeFilterEnum;
  values: searchIntentsValue[];
};

export type SearchIntents = {
  typeRequest: TypeRequestEnum;
  redirectUrl: string;
  resources: searchIntentsResource[];
};
