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
  ContentEntity,
  ConvertEntity,
  CountryEntity,
  CourierEntity,
  DeliveryBundleEntity,
  FacetEntity,
  LabelTrackingEntity,
  MerchantEntity,
  OrderEntity,
  OrderItemEntity,
  OrderSummaryEntity,
  PaymentInstrumentEntity,
  PaymentTokenEntity,
  ProductEntity,
  ProductListingEntity,
  ProgramEntity,
  RaffleEntity,
  RaffleParticipationEntity,
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
} from '../entities/types/index.js';
import type { AddressesState } from '../addresses/types/index.js';
import type { BagsState } from '../bags/types/index.js';
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
import type { BrandsState } from '../brands/types/index.js';
import type { CategoriesState } from '../categories/types/index.js';
import type { CheckoutState } from '../checkout/types/index.js';
import type { ConfigurationEntity } from '../entities/types/configurations.types.js';
import type { ContentsState } from '../contents/types/index.js';
import type { ExchangesState } from '../exchanges/index.js';
import type { FormsState } from '../forms/types/index.js';
import type { LocaleState } from '../locale/types/index.js';
import type { LoyaltyState } from '../loyalty/types/index.js';
import type { MerchantsLocationsState } from '../merchantsLocations/types/index.js';
import type { OrdersState } from '../orders/types/index.js';
import type { PaymentsState } from '../payments/types/index.js';
import type { ProductsState } from '../products/types/index.js';
import type { PromotionEvaluationsState } from '../promotionEvaluations/types/index.js';
import type { RaffleEstimationEntity } from '../entities/types/raffleEstimation.types.js';
import type { RafflesState } from '../raffles/types/index.js';
import type { ReturnsState } from '../returns/types/index.js';
import type { SearchState } from '../search/types/index.js';
import type { SettingsState } from '../settings/types/index.js';
import type { SharedWishlistState } from '../sharedWishlists/types/index.js';
import type { SizeGuidesState } from '../sizeGuides/types/index.js';
import type { SizeScalesState } from '../sizeScales/types/index.js';
import type { StaffMembersState } from '../staffMembers/types/index.js';
import type { SubscriptionsState } from '../subscriptions/index.js';
import type { UsersState } from '../users/types/index.js';
import type { WishlistsState } from '../wishlists/types/index.js';

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
    contents: Record<ContentEntity['publicationId'], ContentEntity>;
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
    orderSummaries: Record<
      OrderSummaryEntity['merchantOrderCode'],
      OrderSummaryEntity
    >;
    paymentTokens: Record<PaymentTokenEntity['id'], PaymentTokenEntity>;
    preferences: Record<UserPreferenceEntity['code'], UserPreferenceEntity>;
    products: Record<ProductEntity['id'], ProductEntity>;
    productsLists: Record<ProductListingEntity['hash'], ProductListingEntity>;
    programs: Record<ProgramEntity['id'], ProgramEntity>;
    raffles: Record<RaffleEntity['id'], RaffleEntity>;
    raffleParticipations: Record<
      RaffleParticipationEntity['id'],
      RaffleParticipationEntity
    >;
    raffleEstimations: Record<RaffleEntity['id'], RaffleEstimationEntity>;
    replacements: Record<ReplacementEntity['id'], ReplacementEntity>;
    returnItems: Record<ReturnItemEntity['id'], ReturnItemEntity>;
    returns: Record<ReturnEntity['id'], ReturnEntity>;
    returnOptions: Record<
      ReturnOptionEntity['merchantOrderId'],
      ReturnOptionEntity
    >;
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
  exchanges: ExchangesState;
  forms: FormsState;
  locale: LocaleState;
  loyalty: LoyaltyState;
  merchantsLocations: MerchantsLocationsState;
  orders: OrdersState;
  payments: PaymentsState;
  products: ProductsState;
  promotionEvaluations: PromotionEvaluationsState;
  raffles: RafflesState;
  returns: ReturnsState;
  search: SearchState;
  settings: SettingsState;
  sharedWishlist: SharedWishlistState;
  sizeGuides: SizeGuidesState;
  sizeScales: SizeScalesState;
  staffMembers: StaffMembersState;
  subscriptions: SubscriptionsState;
  users: UsersState;
  wishlist: WishlistsState;
  // Keep adding here as we migrate chunks
}>;
