import {
  adaptAttributeType,
  adaptCreationChannel,
  adaptCustomerType,
  adaptGender,
  adaptOrderItemStatus,
  adaptOrderStatus,
  adaptProductType,
} from '../adaptOrderDetails';

it('should adapt genders correctly', async () => {
  expect(adaptGender(undefined)).toBeNull();
  expect(adaptGender('Woman')).toEqual(0);
  expect(adaptGender('Man')).toEqual(1);
  expect(adaptGender('Unisex')).toEqual(2);
  expect(adaptGender('Kid')).toEqual(3);
});

it('should adapt attribute types correctly', async () => {
  expect(adaptAttributeType(undefined)).toBeNull();
  expect(adaptAttributeType('Size')).toEqual(0);
  expect(adaptAttributeType('SizeDescription')).toEqual(1);
  expect(adaptAttributeType('Scale')).toEqual(2);
  expect(adaptAttributeType('ScaleDescription')).toEqual(3);
  expect(adaptAttributeType('ScaleAbbreviation')).toEqual(4);
});

it('should adapt order item status correctly', async () => {
  expect(adaptOrderItemStatus(undefined)).toBeNull();
  expect(adaptOrderItemStatus('None')).toEqual(0);
  expect(adaptOrderItemStatus('OutOfStock')).toEqual(1);
  expect(adaptOrderItemStatus('WithStock')).toEqual(2);
  expect(adaptOrderItemStatus('SuggestAlternative')).toEqual(5);
  expect(adaptOrderItemStatus('ReturnWithShippinCost')).toEqual(3);
  expect(adaptOrderItemStatus('ReturnWithoutShippinCost')).toEqual(4);
  expect(adaptOrderItemStatus('Canceled')).toEqual(10);
});

it('should adapt order status correctly', async () => {
  expect(adaptOrderStatus(undefined)).toBeNull();
  expect(adaptOrderStatus('CheckingStock')).toEqual(1);
  expect(adaptOrderStatus('ProcessingPayment')).toEqual(2);
  expect(adaptOrderStatus('Packaging')).toEqual(3);
  expect(adaptOrderStatus('Awb')).toEqual(4);
  expect(adaptOrderStatus('PreparingToDispatch')).toEqual(5);
  expect(adaptOrderStatus('InTransit')).toEqual(6);
  expect(adaptOrderStatus('CollectInStore')).toEqual(7);
  expect(adaptOrderStatus('ReadyToCollect')).toEqual(8);
  expect(adaptOrderStatus('Delivered')).toEqual(100);
  expect(adaptOrderStatus('Cancelled')).toEqual(97);
  expect(adaptOrderStatus('Returned')).toEqual(98);
});

it('should adapt creation channel correctly', async () => {
  expect(adaptCreationChannel(undefined)).toBeNull();
  expect(adaptCreationChannel('Catalog')).toEqual(0);
  expect(adaptCreationChannel('Mail')).toEqual(1);
  expect(adaptCreationChannel('Phone')).toEqual(2);
});

it('should adapt product type correctly', async () => {
  expect(adaptProductType(undefined)).toBeNull();
  expect(adaptProductType('Standard')).toEqual(0);
  expect(adaptProductType('BundleProduct')).toEqual(1);
  expect(adaptProductType('BundleVariant')).toEqual(2);
  expect(adaptProductType('ProductGroup')).toEqual(3);
  expect(adaptProductType('Sample')).toEqual(4);
});

it('should adapt creation channel correctly', async () => {
  expect(adaptCreationChannel(undefined)).toBeNull();
  expect(adaptCreationChannel('Catalog')).toEqual(0);
  expect(adaptCreationChannel('Mail')).toEqual(1);
  expect(adaptCreationChannel('Phone')).toEqual(2);
});

it('should adapt customer type correctly', async () => {
  expect(adaptCustomerType(undefined)).toBeNull();
  expect(adaptCustomerType('Normal')).toEqual(0);
  expect(adaptCustomerType('PersonalShopper')).toEqual(1);
  expect(adaptCustomerType('VipBrazil')).toEqual(2);
});
