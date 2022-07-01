import {
  AddressPayment,
  Amounts,
  CreditCardData,
  Payer,
  PaymentInstrument,
  PaymentInstrumentStatus,
  ShopperInteraction,
} from '../types';
import { getPaymentIntentInstrument } from '..';
import { id, instrumentId } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentIntentInstrument.fixtures';
import mswServer from '../../../tests/mswServer';
import type { CountryAddress } from '../../users';

describe('getPaymentIntentInstrument', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments/${instrumentId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const country: CountryAddress = {
      alpha2Code: 'string',
      alpha3Code: 'string',
      culture: 'string',
      id: 0,
      name: 'string',
      nativeName: 'string',
      region: 'string',
      subRegion: 'string',
      regionId: 0,
      subfolder: 'string',
      continentId: 0,
    };
    const address: AddressPayment = {
      addressLine1: 'string',
      addressLine2: 'string',
      addressLine3: 'string',
      vatNumber: 'string',
      zipCode: 'string',
      phone: 'string',
      neighbourhood: 'string',
      ddd: 'string',
      city: {
        countryId: 0,
        id: 0,
        name: 'string',
        stateId: 0,
      },
      state: {
        code: 'string',
        countryId: 0,
        id: 0,
        name: 'string',
      },
      country,
      continent: {
        id: 0,
        name: 'string',
        countries: [country],
      },
    };
    const payer: Payer = {
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      address: address,
    };
    const amounts: Amounts = {
      value: 0,
      settledValue: 0,
      refundedValue: 0,
    };
    const ccData: CreditCardData = {
      cardHolderName: 'string',
      cardNumber: 'string',
      cardExpiryMonth: 0,
      cardExpiryYear: 0,
      cardCvv: 'string',
      giftCardNumber: 'string',
      giftCardCsc: 'string',
      creditUserId: 'string',
    };
    const response: PaymentInstrument = {
      id: '00000000-0000-0000-0000-000000000000',
      method: 'string',
      option: 'string',
      amounts: [amounts, amounts],
      status: PaymentInstrumentStatus.Created,
      payer: payer,
      data: ccData,
      installments: {
        quantity: 0,
      },
      shopperInteraction: ShopperInteraction.Ecommerce,
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(
      getPaymentIntentInstrument(id, instrumentId),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getPaymentIntentInstrument(id, instrumentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
