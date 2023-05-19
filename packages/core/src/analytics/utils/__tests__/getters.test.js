import * as getters from '../getters';

describe('getters', () => {
  describe('getCheckoutOrderIdentificationProperties', () => {
    it('Should retrieve order data with multiple test cases', () => {
      const checkoutOrderId = 123;

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: null,
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: undefined,
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: 0,
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: '0',
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: 12345,
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: '12345',
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: 'A12345',
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: 'A12345',
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: NaN,
          checkoutOrderId: checkoutOrderId,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: checkoutOrderId,
      });

      expect(
        getters.getCheckoutOrderIdentificationProperties({
          orderId: 123,
          checkoutOrderId: undefined,
        }),
      ).toEqual({
        orderCode: undefined,
        orderId: 123,
      });
    });
  });
});
