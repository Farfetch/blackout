import { adaptDate } from '../../../helpers/adapters';

// This file is temporary it will be removed in the next version (2.0), this was only done
// to enable older tenants to migrate to the new account service.
export const adaptGender = value => {
  switch (value) {
    case 'Woman':
      return 0;
    case 'Man':
      return 1;
    case 'Unisex':
      return 2;
    case 'Kid':
      return 3;
    default:
      return null;
  }
};

export const adaptAttributeType = type => {
  switch (type) {
    case 'Size':
      return 0;
    case 'SizeDescription':
      return 1;
    case 'Scale':
      return 2;
    case 'ScaleDescription':
      return 3;
    case 'ScaleAbbreviation':
      return 4;
    default:
      return null;
  }
};

export const adaptAddress = address => ({
  ...address,
  isDefaultBillingAddress: address?.isCurrentBilling,
  isDefaultShippingAddress: address?.isCurrentShipping,
  isPreferredAddress: address?.isCurrentPreferred,
});

export const adaptOrderItemStatus = orderItemStatus => {
  switch (orderItemStatus) {
    case 'None':
      return 0;
    case 'OutOfStock':
      return 1;
    case 'WithStock':
      return 2;
    case 'SuggestAlternative':
      return 5;
    case 'ReturnWithShippinCost':
      return 3;
    case 'ReturnWithoutShippinCost':
      return 4;
    case 'Canceled':
      return 10;
    default:
      return null;
  }
};

export const adaptOrderStatus = orderStatus => {
  switch (orderStatus) {
    case 'CheckingStock':
      return 1;
    case 'ProcessingPayment':
      return 2;
    case 'Packaging':
      return 3;
    case 'Awb':
      return 4;
    case 'PreparingToDispatch':
      return 5;
    case 'InTransit':
      return 6;
    case 'CollectInStore':
      return 7;
    case 'ReadyToCollect':
      return 8;
    case 'Delivered':
      return 100;
    case 'Cancelled':
      return 97;
    case 'Returned':
      return 98;
    default:
      return null;
  }
};

export const adaptDateFormat = value => `/Date(${adaptDate(value)})/`;

export const adaptProductType = productType => {
  switch (productType) {
    case 'Standard':
      return 0;
    case 'BundleProduct':
      return 1;
    case 'BundleVariant':
      return 2;
    case 'ProductGroup':
      return 3;
    case 'Sample':
      return 4;
    default:
      return null;
  }
};

export const adaptCreationChannel = creationChannel => {
  switch (creationChannel) {
    case 'Catalog':
      return 0;
    case 'Mail':
      return 1;
    case 'Phone':
      return 2;
    default:
      return null;
  }
};

export const adaptCustomerType = customerType => {
  switch (customerType) {
    case 'Normal':
      return 0;
    case 'PersonalShopper':
      return 1;
    case 'VipBrazil':
      return 2;
    default:
      return null;
  }
};

export default response => ({
  ...response,
  billingAddress: adaptAddress(response?.billingAddress),
  shippingAddress: adaptAddress(response?.shippingAddress),
  createdDate: adaptDateFormat(response?.createdDate),
  updatedDate: adaptDateFormat(response?.updatedDate),
  customerType: adaptCustomerType(response?.customerType),
  items: response?.items.map(item => ({
    ...item,
    attributes: item?.attributes.map(attribute => ({
      ...attribute,
      type: adaptAttributeType(attribute?.type),
    })),
    categories: item?.categories.map(category => ({
      ...category,
      gender: adaptGender(category?.gender),
    })),
    orderItemStatus: adaptOrderItemStatus(item?.orderItemStatus),
    orderStatus: adaptOrderStatus(item?.orderStatus),
    productType: adaptProductType(item?.productType),
    creationChannel: adaptCreationChannel(item?.creationChannel),
  })),
});
