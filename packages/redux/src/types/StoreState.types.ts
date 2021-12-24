import type { Address } from '@farfetch/blackout-client/addresses/types';
import type {
  AddressEntity,
  BagItemEntity,
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  ContentsEntity,
  DeliveryBundlesEntity,
  DeliveryBundleUpgradesEntity,
  FacetEntity,
  InstrumentEntity,
  MerchantEntity,
  PaymentTokenEntity,
  ProductEntity,
  ProductsListEntity,
  WishlistItemEntity,
  WishlistSetEntity,
} from '../entities/types';
import type { State as AddressesState } from '../addresses/types';
import type { State as BagState } from '../bags/types';
import type { Brand } from '@farfetch/blackout-client/brands/types';
import type { State as BrandsState } from '../brands/types';
import type { State as CategoriesState } from '../categories/types';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { State as CheckoutState } from '../checkout/types';
import type { State as ContentsState } from '../contents/types';
import type { State as DesignersState } from '../designers/types';
import type { State as FormsState } from '../forms/types';
import type { State as LocaleState } from '../locale/types';
import type { MerchantLocation } from '@farfetch/blackout-client/merchantsLocations/types';
import type { State as MerchantsLocationsState } from '../merchantsLocations/types';
import type { State as PaymentsState } from '../payments/types';
import type { State as ProductsState } from '../products/types';
import type { State as PromotionEvaluationsState } from '../promotionEvaluations/types';
import type { State as SearchState } from '../search/types';
import type { State as SizeGuidesState } from '../sizeGuides/types';
import type { SizeScale } from '@farfetch/blackout-client/sizeScales/types';
import type { State as SizeScalesState } from '../sizeScales/types';
import type { State as StaffMembersState } from '../staffMembers/types';
import type { State as UsersState } from '../users/types';
import type { State as WishlistsState } from '../wishlists/types';

export type StoreState = Partial<{
  // Keep adding/changing here as we migrate chunks
  entities: Partial<{
    addresses: Record<Address['id'], AddressEntity>;
    bagItems: Record<BagItemEntity['id'], BagItemEntity>;
    brands: Record<Brand['id'], Brand>;
    categories: Record<Category['id'], Category>;
    checkout: Record<CheckoutEntity['id'], CheckoutEntity>;
    checkoutDetails: Record<CheckoutDetailsEntity['id'], CheckoutDetailsEntity>;
    checkoutOrderItems: Record<
      CheckoutOrderItemEntity['id'],
      CheckoutOrderItemEntity
    >;
    checkoutOrders: Record<CheckoutOrderEntity['id'], CheckoutOrderEntity>;
    cities: Record<string, any>;
    contents: Record<string, ContentsEntity>;
    countries: Record<string, any>;
    deliveryBundles: Record<DeliveryBundlesEntity['id'], DeliveryBundlesEntity>;
    deliveryBundleUpgrades: DeliveryBundleUpgradesEntity;
    facets: Record<FacetEntity['id'], FacetEntity>;
    instruments: Record<InstrumentEntity['id'], InstrumentEntity>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    merchantsLocations: Record<MerchantLocation['id'], MerchantLocation>;
    paymentTokens: Record<PaymentTokenEntity['id'], PaymentTokenEntity>;
    products: Record<ProductEntity['id'], ProductEntity>;
    productsLists: Record<ProductsListEntity['hash'], ProductsListEntity>;
    sizeScales: Record<SizeScale['sizeScaleId'], SizeScale>;
    states: Record<string, any>;
    user: Record<string, any>;
    wishlistItems: Record<WishlistItemEntity['id'], WishlistItemEntity>;
    wishlistSets: Record<WishlistSetEntity['id'], WishlistSetEntity>;
    [k: string]: any;
    // Keep adding/changing here as we migrate chunks
  }>;
  addresses: AddressesState;
  bag: BagState;
  brands: BrandsState;
  categories: CategoriesState;
  checkout: CheckoutState;
  contents: ContentsState;
  designers: DesignersState;
  locale: LocaleState;
  merchantsLocations: MerchantsLocationsState;
  payments: PaymentsState;
  products: ProductsState;
  promotionEvaluations: PromotionEvaluationsState;
  search: SearchState;
  sizeGuides: SizeGuidesState;
  forms: FormsState;
  sizeScales: SizeScalesState;
  staffMembers: StaffMembersState;
  users: UsersState;
  wishlist: WishlistsState;
  // Keep adding here as we migrate chunks
}>;
