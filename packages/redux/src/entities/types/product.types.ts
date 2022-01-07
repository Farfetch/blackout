import type { BagItem } from '@farfetch/blackout-client/bags/types';
import type { Brand } from '@farfetch/blackout-client/brands/types';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type {
  CustomAttributesAdapted,
  PriceAdapted,
  ProductImagesAdapted,
  SizesAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';
import type { MerchantEntity } from './merchant.types';
import type {
  Product as OriginalProduct,
  ProductAttribute,
  ProductColorGrouping,
  ProductColorGroupingEntry,
  ProductFitting,
  ProductGroup,
  ProductGroupEntry,
  ProductSizeGuide,
  ProductSummaryPrice,
  ProductVariant,
  ProductVariantByMerchantLocation,
} from '@farfetch/blackout-client/products/types';
import type { WishlistItem } from '@farfetch/blackout-client/wishlists/types';

export type ColorGroupingAdapted =
  | (Omit<ProductColorGrouping, 'entries'> & {
      entries: Array<
        Omit<ProductColorGroupingEntry, 'digitalAssets'> & {
          digitalAssets: ProductImagesAdapted;
        }
      >;
    })
  | undefined;

export type AdaptColorGrouping = (
  colorGrouping: ProductColorGrouping,
) => ColorGroupingAdapted;

export type GroupedEntriesAdapted =
  | (Omit<ProductGroup, 'entries'> & {
      entries: Array<
        Omit<ProductGroupEntry, 'images'> & {
          images: ProductImagesAdapted;
        }
      >;
    })
  | undefined
  | null;

export type AdaptGroupedEntries = (
  groupedEntries: ProductGroup,
) => GroupedEntriesAdapted;

export type PricesAdapted = PriceAdapted[] | undefined;

export type AdaptPrices = (prices: ProductSummaryPrice[]) => PricesAdapted;

export type VariantAdapted = Omit<ProductVariant, 'price'> & {
  price: PriceAdapted;
  // This is only populated after requesting for a product variant merchant locations
  // (`fetchProductVariantsByMerchantsLocations`)
  merchantsLocations?: ProductVariantByMerchantLocation[];
};

export type VariantsAdapted = VariantAdapted[] | undefined;

export type AdaptVariants = (
  variants: Array<
    ProductVariant & { merchantsLocations: ProductVariantByMerchantLocation[] }
  >,
) => VariantsAdapted;

export type ProductEntity = {
  //
  // Entities
  //
  brand: Brand['id'];
  categories: Category['id'][];
  merchant: MerchantEntity['id'];
  //
  // Raw properties
  //
  associations: OriginalProduct['result']['associations'];
  associationsInformation: OriginalProduct['result']['associationsInformation'];
  attributes: ProductAttribute[];
  brandStyleId: OriginalProduct['result']['brandStyleId'];
  breadCrumbs: OriginalProduct['breadCrumbs'];
  care: OriginalProduct['result']['care'];
  colors: OriginalProduct['result']['colors'];
  colorSet: OriginalProduct['colorSet'];
  colorSwatch: OriginalProduct['colorSwatch'];
  complementaryInformation: OriginalProduct['complementaryInformation'];
  compositions: OriginalProduct['result']['compositions'];
  currencyIsoCode: OriginalProduct['currencyIsoCode'];
  description: OriginalProduct['result']['description'];
  digitalAssets: OriginalProduct['result']['digitalAssets'];
  fittings: ProductFitting[];
  fulfillmentDate: OriginalProduct['result']['fulfillmentDate'];
  gender: OriginalProduct['result']['gender'];
  genderName: string;
  hasParentProduct: OriginalProduct['result']['hasParentProduct'];
  id: OriginalProduct['result']['id'];
  isCustomizable: OriginalProduct['result']['isCustomizable'];
  isDuplicated: boolean;
  isExclusive: OriginalProduct['result']['isExclusive'];
  isInWishlist: boolean;
  isOnline: OriginalProduct['result']['isOnline'];
  labels: OriginalProduct['result']['labels'];
  liveModel: OriginalProduct['liveModel'];
  madeIn: OriginalProduct['result']['madeIn'];
  measurements: OriginalProduct['result']['measurements'];
  parentProductId: OriginalProduct['result']['parentProductId'];
  preferedMerchant: OriginalProduct['result']['preferedMerchant'];
  productRef: OriginalProduct['productRef'];
  productSize: OriginalProduct['productSize'];
  promotions: OriginalProduct['result']['promotions'];
  quantity: number;
  recommendedSet: number;
  redirectInfo: OriginalProduct['redirectInfo'];
  relatedSets: OriginalProduct['relatedSets'];
  scaleId: OriginalProduct['result']['scaleId'];
  season: OriginalProduct['result']['season'];
  selectedSize: OriginalProduct['selectedSize'];
  shortDescription: OriginalProduct['result']['shortDescription'];
  // This is only populated after requesting for a product size guide (`fetchProductSizeGuides`)
  sizeGuides?: ProductSizeGuide[];
  sizeSet: OriginalProduct['sizeSet'];
  sku: OriginalProduct['result']['sku'];
  slug: OriginalProduct['slug'];
  styleId: OriginalProduct['result']['styleId'];
  tag: {
    name: OriginalProduct['result']['tagDescription'];
    id: OriginalProduct['result']['tag'];
  };
  translatedAttributes: OriginalProduct['result']['translatedAttributes'];
  type: OriginalProduct['result']['type'];
  variations: OriginalProduct['result']['variations'];
  videos: OriginalProduct['result']['videos'];
  //
  // Adapted properties
  //
  // This is only populated after requesting for a product color grouping (`fetchProductColorGrouping`)
  colorGrouping?: ColorGroupingAdapted;
  customAttributes: CustomAttributesAdapted;
  groupedEntries: GroupedEntriesAdapted;
  images: ProductImagesAdapted;
  price: PriceAdapted;
  prices: PricesAdapted;
  sizes: SizesAdapted;
  variants: VariantsAdapted;
  //
  // Specificities
  //
  // On the bag/wishlist the name comes from `name` instead of `shortDescription`
  // (see `bagItems` entity schema)
  name?: BagItem['productName'] | WishlistItem['productName'];
};
