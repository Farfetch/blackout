import type {
  AddressEntity,
  AvailableTimeSlotsEntity,
  BagItemEntity,
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  CheckoutOrderItemProductEntity,
  CheckoutOrderOperationEntity,
  CityEntity,
  ContentsEntity,
  ConvertEntity,
  CountriesEntity,
  CountryAddressSchemasEntity,
  CourierEntity,
  DeliveryBundlesEntity,
  DeliveryBundleUpgradesEntity,
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
  ReturnItemsEntity,
  ReturnOptionsEntity,
  ReturnsEntity,
  StatementEntity,
  StatesEntity,
  SubscriptionPackagesEntity,
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
  Category,
  MerchantLocation,
  ProgramMembership,
  SizeScale,
} from '@farfetch/blackout-client';
import type { BrandsState } from '../brands/types';
import type { CategoriesState } from '../categories/types';
import type { CheckoutState } from '../checkout/types';
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
    countryAddressSchemas: CountryAddressSchemasEntity;
    availableTimeSlots: Record<string, AvailableTimeSlotsEntity>;
    bagItems: Record<BagItemEntity['id'], BagItemEntity>;
    benefits: Record<UserBenefitEntity['id'], UserBenefitEntity>;
    brands: Record<Brand['id'], Brand>;
    categories: Record<Category['id'], Category>;
    checkout: Record<CheckoutEntity['id'], CheckoutEntity>;
    checkoutDetails: Record<CheckoutDetailsEntity['id'], CheckoutDetailsEntity>;
    checkoutOrderItems: Record<
      CheckoutOrderItemEntity['id'],
      CheckoutOrderItemEntity
    >;
    checkoutOrderItemProducts: Record<
      CheckoutOrderItemProductEntity['id'],
      CheckoutOrderItemProductEntity
    >;
    checkoutOrderOperations: Record<string, CheckoutOrderOperationEntity>;
    checkoutOrders: Record<CheckoutOrderEntity['id'], CheckoutOrderEntity>;
    cities: Record<CityEntity['id'], CityEntity>;
    contacts: Record<UserContactEntity['id'], UserContactEntity>;
    contents: Record<string, ContentsEntity>;
    converts: Record<ConvertEntity['id'], ConvertEntity>;
    countries: Record<string, CountriesEntity>;
    courier: Record<CourierEntity['id'], CourierEntity>;
    deliveryBundles: Record<DeliveryBundlesEntity['id'], DeliveryBundlesEntity>;
    deliveryBundleUpgrades: DeliveryBundleUpgradesEntity;
    facets: Record<FacetEntity['id'], FacetEntity>;
    paymentInstruments: Record<
      PaymentInstrumentEntity['id'],
      PaymentInstrumentEntity
    >;
    labelTracking: Record<
      LabelTrackingEntity['trackingNumber'],
      LabelTrackingEntity
    >;
    membership: Record<ProgramMembership['id'], ProgramMembership>;
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
    returnItems: Record<ReturnItemsEntity['id'], ReturnItemsEntity>;
    returns: Record<ReturnsEntity['id'], ReturnsEntity>;
    returnOptions: Record<ReturnOptionsEntity['id'], ReturnOptionsEntity>;
    sizeScales: Record<SizeScale['sizeScaleId'], SizeScale>;
    statements: Record<StatementEntity['id'], StatementEntity>;
    states: Record<StatesEntity['id'], StatesEntity>;
    subscriptionPackages: SubscriptionPackagesEntity;
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
  search: SearchState;
  sizeGuides: SizeGuidesState;
  sizeScales: SizeScalesState;
  staffMembers: StaffMembersState;
  subscriptions: SubscriptionsState;
  users: UsersState;
  wishlist: WishlistsState;
  // Keep adding here as we migrate chunks
}>;
