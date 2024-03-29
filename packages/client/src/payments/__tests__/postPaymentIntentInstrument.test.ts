import {
  address,
  id,
  mockPaymentIntentInstrumentResponse as response,
} from 'tests/__fixtures__/payments/index.mjs';
import {
  type Amounts,
  type CreatePaymentInstrumentData,
  type Payer,
  PayerAddressType,
  PaymentMethod,
  ShopperInteraction,
} from '../types/index.js';
import { postPaymentIntentInstrument } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPaymentIntentInstrument.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { AxiosResponse } from 'axios';

describe('postPaymentIntentInstrument', () => {
  const expectedConfig = undefined;

  const payer: Payer = {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    address,
  };
  const amounts: Amounts = {
    value: 0,
    settledValue: 0,
    refundedValue: 0,
  };
  const ccData: CreatePaymentInstrumentData = {
    cardHolderName: 'Joao Baptista',
    cardNumber: '1111111111111111',
    cardExpiryMonth: 10,
    cardExpiryYear: 2020,
    creditUserId: '0',
    cardCvv: '123',
    giftCardNumber: '1232211',
    giftCardCsc: '111212',
  };
  const data = {
    method: PaymentMethod.CreditCard,
    option: 'string',
    token: 'string',
    createToken: true,
    payerAddressType: PayerAddressType.Provided,
    payer: payer,
    amounts: [amounts, amounts],
    data: ccData,
    shopperInteraction: ShopperInteraction.Ecommerce,
  };

  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response as unknown as AxiosResponse));

    await expect(postPaymentIntentInstrument(id, data)).resolves.toMatchObject(
      response,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postPaymentIntentInstrument(id, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
