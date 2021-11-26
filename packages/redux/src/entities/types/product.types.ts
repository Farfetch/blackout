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
  | undefined;

export type AdaptGroupedEntries = (
  groupedEntries: ProductGroup,
) => GroupedEntriesAdapted;

export type PricesAdapted = PriceAdapted[] | undefined;

export type AdaptPrices = (prices: ProductSummaryPrice[]) => PricesAdapted;

export type VariantAdapted = Omit<ProductVariant, 'price'> & {
  price: PriceAdapted;
  merchantsLocations: ProductVariantByMerchantLocation[];
};

export type VariantsAdapted = VariantAdapted[] | undefined;

export type AdaptVariants = (
  variants: Array<
    ProductVariant & { merchantsLocations: ProductVariantByMerchantLocation[] }
  >,
) => VariantsAdapted;

export type ProductEntity = {
  // Entities
  categories: Category['id'][];
  brand: Brand['id'];
  merchant: MerchantEntity['id'];
  // Properties
  id: OriginalProduct['result']['id'];
  attributes: ProductAttribute[];
  recommendedSet: number;
  isInWishlist: boolean;
  quantity: number;
  genderName: string;
  fittings: ProductFitting[];
  sizeGuides: ProductSizeGuide[];
  isDuplicated: boolean;
  breadCrumbs: OriginalProduct['breadCrumbs'];
  colorSet: OriginalProduct['colorSet'];
  colorSwatch: OriginalProduct['colorSwatch'];
  sizeSet: OriginalProduct['sizeSet'];
  complementaryInformation: OriginalProduct['complementaryInformation'];
  currencyIsoCode: OriginalProduct['currencyIsoCode'];
  liveModel: OriginalProduct['liveModel'];
  productSize: OriginalProduct['productSize'];
  productRef: OriginalProduct['productRef'];
  brandStyleId: OriginalProduct['result']['brandStyleId'];
  compositions: OriginalProduct['result']['compositions'];
  colors: OriginalProduct['result']['colors'];
  care: OriginalProduct['result']['care'];
  description: OriginalProduct['result']['description'];
  gender: OriginalProduct['result']['gender'];
  measurements: OriginalProduct['result']['measurements'];
  season: OriginalProduct['result']['season'];
  shortDescription: OriginalProduct['result']['shortDescription'];
  tag: {
    name: OriginalProduct['result']['tagDescription'];
    id: OriginalProduct['result']['tag'];
  };
  videos: OriginalProduct['result']['videos'];
  hasParentProduct: OriginalProduct['result']['hasParentProduct'];
  parentProductId: OriginalProduct['result']['parentProductId'];
  preferedMerchant: OriginalProduct['result']['preferedMerchant'];
  madeIn: OriginalProduct['result']['madeIn'];
  isOnline: OriginalProduct['result']['isOnline'];
  isExclusive: OriginalProduct['result']['isExclusive'];
  translatedAttributes: OriginalProduct['result']['translatedAttributes'];
  isCustomizable: OriginalProduct['result']['isCustomizable'];
  styleId: OriginalProduct['result']['styleId'];
  scaleId: OriginalProduct['result']['scaleId'];
  labels: OriginalProduct['result']['labels'];
  fulfillmentDate: OriginalProduct['result']['fulfillmentDate'];
  variations: OriginalProduct['result']['variations'];
  type: OriginalProduct['result']['type'];
  sku: OriginalProduct['result']['sku'];
  associationsInformation: OriginalProduct['result']['associationsInformation'];
  associations: OriginalProduct['result']['associations'];
  digitalAssets: OriginalProduct['result']['digitalAssets'];
  promotions: OriginalProduct['result']['promotions'];
  selectedSize: OriginalProduct['selectedSize'];
  relatedSets: OriginalProduct['relatedSets'];
  slug: OriginalProduct['slug'];
  redirectInfo: OriginalProduct['redirectInfo'];
  // Adapters
  colorGrouping: ColorGroupingAdapted;
  customAttributes: CustomAttributesAdapted;
  groupedEntries: GroupedEntriesAdapted;
  images: ProductImagesAdapted;
  price: PriceAdapted;
  prices: PricesAdapted;
  sizes: SizesAdapted;
  variants: VariantsAdapted;
  // Specificities
  // On the bag/wishlist the name comes from `name` instead of `shortDescription`
  // (see `bagItems` entity schema)
  name: BagItem['productName'] | WishlistItem['productName'];
};
