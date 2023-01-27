import type {
  AddressEntity,
  BagItemEntity,
  BagOperationEntity,
  CategoryEntity,
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  CheckoutOrderItemProductEntity,
  CheckoutOrderOperationEntity,
  CityEntity,
  ContentsEntity,
  ConvertEntity,
  CountryEntity,
  CourierEntity,
  DeliveryBundleEntity,
  FacetEntity,
  LabelTrackingEntity,
  MerchantEntity,
  OrderEntity,
  OrderItemEntity,
  PaymentInstrumentEntity,
  PaymentTokenEntity,
  ProductEntity,
  ProductsListEntity,
  ProgramEntity,
  ReplacementEntity,
  ReturnEntity,
  ReturnItemEntity,
  ReturnOptionEntity,
  ReturnPickupCapabilityEntity,
  SharedWishlistEntity,
  SharedWishlistItemEntity,
  StateEntity,
  StatementEntity,
  SubscriptionPackageEntity,
  TitleEntity,
  UserBenefitEntity,
  UserContactEntity,
  UserEntity,
  UserPreferenceEntity,
  WishlistItemEntity,
  WishlistSetEntity,
} from '../entities/types';
import type { AddressesState } from '../addresses/types';
import type { BagsState } from '../bags/types';
import type {
  Brand,
  CheckoutOrder,
  Country,
  CountryAddressSchema,
  DeliveryBundle,
  DeliveryBundleUpgrades,
  MerchantLocation,
  ProgramMembership,
  SizeScale,
} from '@farfetch/blackout-client';
import type { BrandsState } from '../brands/types';
import type { CategoriesState } from '../categories/types';
import type { CheckoutState } from '../checkout/types';
import type { ConfigurationEntity } from '../entities/types/configurations.types';
import type { ContentsState } from '../contents/types';
import type { FormsState } from '../forms/types';
import type { LocaleState } from '../locale/types';
import type { LoyaltyState } from '../loyalty/types';
import type { MerchantsLocationsState } from '../merchantsLocations/types';
import type { OrdersState } from '../orders/types';
import type { PaymentsState } from '../payments/types';
import type { ProductsState } from '../products/types';
import type { PromotionEvaluationsState } from '../promotionEvaluations/types';
import type { ReturnsState } from '../returns/types';
import type { SearchState } from '../search/types';
import type { SettingsState } from '../settings/types';
import type { SharedWishlistState } from '../sharedWishlists/types';
import type { SizeGuidesState } from '../sizeGuides/types';
import type { SizeScalesState } from '../sizeScales/types';
import type { StaffMembersState } from '../staffMembers/types';
import type { SubscriptionsState } from '../subscriptions';
import type { UsersState } from '../users/types';
import type { WishlistsState } from '../wishlists/types';

export type StoreState = Partial<{
  // Keep adding/changing here as we migrate chunks
  entities: Partial<{
    addresses: Record<AddressEntity['id'], AddressEntity>;
    bagItems: Record<BagItemEntity['id'], BagItemEntity>;
    bagOperations: Record<BagOperationEntity['id'], BagOperationEntity>;
    benefits: Record<UserBenefitEntity['id'], UserBenefitEntity>;
    brands: Record<Brand['id'], Brand>;
    categories: Record<CategoryEntity['id'], CategoryEntity>;
    checkout: Record<CheckoutEntity['id'], CheckoutEntity>;
    checkoutDetails: Record<CheckoutOrder['id'], CheckoutDetailsEntity>;
    checkoutOrderItems: Record<
      CheckoutOrderItemEntity['id'],
      CheckoutOrderItemEntity
    >;
    checkoutOrderItemProducts: Record<
      CheckoutOrderItemProductEntity['id'],
      CheckoutOrderItemProductEntity
    >;
    checkoutOrderOperations: Record<
      CheckoutOrderOperationEntity['id'],
      CheckoutOrderOperationEntity
    >;
    checkoutOrders: Record<CheckoutOrderEntity['id'], CheckoutOrderEntity>;
    cities: Record<CityEntity['id'], CityEntity>;
    configurations: Record<ConfigurationEntity['code'], ConfigurationEntity>;
    contacts: Record<UserContactEntity['id'], UserContactEntity>;
    contents: Record<ContentsEntity['publicationId'], ContentsEntity>;
    converts: Record<ConvertEntity['id'], ConvertEntity>;
    countries: Record<CountryEntity['code'], CountryEntity>;
    countriesAddressSchemas: Record<Country['code'], CountryAddressSchema[]>;
    courier: Record<CourierEntity['id'], CourierEntity>;
    deliveryBundles: Record<DeliveryBundleEntity['id'], DeliveryBundleEntity>;
    deliveryBundleUpgrades: Record<
      DeliveryBundle['id'],
      DeliveryBundleUpgrades
    >;
    facets: Record<FacetEntity['id'], FacetEntity>;
    paymentInstruments: Record<
      PaymentInstrumentEntity['id'],
      PaymentInstrumentEntity
    >;
    labelTracking: Record<
      LabelTrackingEntity['trackingNumber'],
      LabelTrackingEntity
    >;
    memberships: Record<ProgramMembership['id'], ProgramMembership>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    merchantsLocations: Record<MerchantLocation['id'], MerchantLocation>;
    orders: Record<OrderEntity['id'], OrderEntity>;
    orderItems: Record<OrderItemEntity['id'], OrderItemEntity>;
    paymentTokens: Record<PaymentTokenEntity['id'], PaymentTokenEntity>;
    preferences: Record<UserPreferenceEntity['code'], UserPreferenceEntity>;
    products: Record<ProductEntity['id'], ProductEntity>;
    productsLists: Record<ProductsListEntity['hash'], ProductsListEntity>;
    programs: Record<ProgramEntity['id'], ProgramEntity>;
    replacements: Record<ReplacementEntity['id'], ReplacementEntity>;
    returnItems: Record<ReturnItemEntity['id'], ReturnItemEntity>;
    returns: Record<ReturnEntity['id'], ReturnEntity>;
    returnOptions: Record<ReturnOptionEntity['id'], ReturnOptionEntity>;
    returnPickupCapabilities: Record<string, ReturnPickupCapabilityEntity>;
    sizeScales: Record<SizeScale['sizeScaleId'], SizeScale>;
    sharedWishlists: Record<SharedWishlistEntity['id'], SharedWishlistEntity>;
    sharedWishlistItems: Record<
      SharedWishlistItemEntity['id'],
      SharedWishlistItemEntity
    >;
    statements: Record<StatementEntity['id'], StatementEntity>;
    states: Record<StateEntity['id'], StateEntity>;
    subscriptionPackages: Record<
      SubscriptionPackageEntity['id'],
      SubscriptionPackageEntity
    >;
    titles: Record<TitleEntity['id'], TitleEntity>;
    user: UserEntity;
    wishlistItems: Record<WishlistItemEntity['id'], WishlistItemEntity>;
    wishlistSets: Record<WishlistSetEntity['id'], WishlistSetEntity>;
    // Keep adding/changing here as we migrate chunks
  }>;
  addresses: AddressesState;
  bag: BagsState;
  brands: BrandsState;
  categories: CategoriesState;
  checkout: CheckoutState;
  contents: ContentsState;
  forms: FormsState;
  locale: LocaleState;
  loyalty: LoyaltyState;
  merchantsLocations: MerchantsLocationsState;
  orders: OrdersState;
  payments: PaymentsState;
  products: ProductsState;
  promotionEvaluations: PromotionEvaluationsState;
  returns: ReturnsState;
  sharedWishlist: SharedWishlistState;
  search: SearchState;
  settings: SettingsState;
  sizeGuides: SizeGuidesState;
  sizeScales: SizeScalesState;
  staffMembers: StaffMembersState;
  subscriptions: SubscriptionsState;
  users: UsersState;
  wishlist: WishlistsState;
  // Keep adding here as we migrate chunks
}>;
