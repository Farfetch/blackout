import type { OrderItem } from './orderItem.types';

export type Order = {
  id: string;
  checkoutOrderId: number;
  userId: number;
  paymentId: string;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdDate: string;
  updatedDate: string;
  items: OrderItem[];
  totalQuantity: number;
  subTotalAmount: number;
  totalDiscount: number;
  totalShippingFee: number;
  totalTaxes: number;
  totalDomesticTaxes: number;
  grandTotal: number;
  credit: number;
  customerType: CustomerType[];
  FormattedCredit: number;
  FormattedGrandTotal: number;
  FormattedSubTotalAmount: number;
  FormattedTotalDiscount: number;
  FormattedTotalShippingFee: number;
  FormattedTotalTaxes: number;
  FormattedTotalDomesticTaxes: number;
  TaxType: number;
};

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  vatNumber?: string;
  city: City;
  state: State;
  country: Country;
  zipCode: string;
  phone: string;
  neighbourhood?: string;
  ddd?: string;
  continent?: Continent;
  addressType: AddressType;
  identityDocument?: string;
  customsClearanceCode?: string;
  title?: string;
  isCurrentShipping: boolean;
  isCurrentBilling: boolean;
  isCurrentPreferred: boolean;
  createdDate: string;
  updatedDate?: string;
};

type City = {
  id: number;
  name: string;
  stateId?: number;
  countryId: number;
};

type Country = {
  id: number;
  name: string;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  culture: string;
  region: string;
  continentId: number;
};

type Continent = {
  id: number;
  name: string;
  countries: Country[];
};

type State = {
  code?: string;
  countryId?: number;
  id: number;
  name: string;
};

enum AddressType {
  Any,
  Shipping,
  Billing,
}

enum CustomerType {
  Normal,
  PersonalShopper,
  VipBrazil,
}
