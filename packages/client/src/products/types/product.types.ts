import type { Brand } from '../../brands/types/index.js';
import type {
  Color,
  ColorSet,
  GenderCode,
  ImageGroup,
  Label,
  LiveModel,
  ProductImageGroup,
  ProductVariantAttributeType,
} from '../../index.js';
import type { DigitalAsset } from './common.types.js';
import type { Price } from './price.types.js';
import type { ProductCategory } from '../../categories/types/index.js';
import type { ProductMeasurement } from './productMeasurement.types.js';
import type { ProductsBreadcrumb } from './productsBreadcrumb.types.js';
import type { ProductTag } from './productTagEnum.types.js';
import type { ProductType } from './productTypeEnum.types.js';
import type { ProductVariant } from './productVariant.types.js';
import type { Size } from './size.types.js';

export type ProductResult = {
  associations: ProductAssociation | null;
  associationsInformation: AssociationsInformation;
  brand: Brand;
  brandStyleId: string;
  care: Care[];
  categories: ProductCategory[];
  colors: Color[];
  compositions: Composition[];
  customAttributes: string | null;
  description: string;
  digitalAssets: DigitalAsset[];
  fulfillmentDate: string | null;
  gender: GenderCode;
  hasParentProduct: boolean;
  id: number;
  images: ProductImageGroup;
  isCustomizable: boolean;
  isExclusive: boolean;
  isOnline: boolean;
  labels: Label[];
  madeIn: string;
  measurements: ProductMeasurement[];
  parentProductId: number;
  preferedMerchant: PreferredMerchant;
  promotions: Promotion[] | null;
  scaleId: number;
  season: FashionSeason;
  shortDescription: string;
  sku: string | null;
  styleId: number;
  tag: ProductTag;
  tagDescription: string;
  translatedAttributes: string | null;
  type: ProductType;
  variants: ProductVariant[];
  variations: Variation[];
  videos: Video[];
};

/**
 * The result of fetching a product detail page.
 */
export type Product = {
  breadCrumbs: ProductsBreadcrumb[];
  colorSet: ColorSet[];
  colorSwatch: string | null;
  complementaryInformation: Information[];
  currencyIsoCode: string | null;
  imageGroups: ImageGroup[];
  liveModel: LiveModel;
  price: Price | null;
  productAttributes?: string[];
  productRef: string | null;
  productSize: string;
  recommendedSet?: number;
  redirectInfo: RedirectInfo | null;
  relatedSets: RelatedSet[];
  result: ProductResult;
  scaleId: number;
  selectedSize: string | null;
  sizes: Size[];
  sizeSet: SizeSet[] | null;
  slug: string;
};

export type Information = {
  key: string;
  title: string;
  value: string;
};

export type RedirectInfo = {
  url: string;
  responseCode: number;
};

export type RelatedSet = {
  setId: number;
  setType: number;
};

export type ProductAssociation = {
  id: number;
  type: ProductType;
};

export type AssociationsInformation = {
  hasColorGrouping: boolean;
  hasGrouping: boolean;
};

export type SizeSet = {
  productId: number;
  url: string;
  volumeLabel: string;
};

export type Care = {
  instruction: string;
  value: string;
};

export type Composition = {
  material: string;
  productId: number;
  productPart: string | null;
  value: string;
};

export type PreferredMerchantByAttribute = {
  merchantId: number;
  type: ProductVariantAttributeType;
  value: string;
};

export type PreferredMerchant = {
  byAttribute: PreferredMerchantByAttribute[];
  merchantId: number;
};

export type Promotion = {
  id: string;
  name: string;
};

export type FashionSeason = {
  id: number;
  name: string | null;
};

export type Variation = {
  products: Array<{
    id: number;
    isDefault: boolean;
    order: number;
    variantId: string;
  }>;
  values: Array<{
    property: {
      id: string;
      value: string;
    };
    type: string;
  }>;
};

export type Video = {
  order: number;
  url: string;
};
