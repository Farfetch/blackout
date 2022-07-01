import {
  AddressPayment,
  Amounts,
  CreditCardData,
  Payer,
  PayerAddressType,
  PostPaymentIntentInstrumentResponse,
  ShopperInteraction,
} from '../types';
import { id } from 'tests/__fixtures__/payments';
import { postPaymentIntentInstrument } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPaymentIntentInstrument.fixtures';
import mswServer from '../../../tests/mswServer';
import type { CountryAddress } from '../../users';

describe('postInstruments', () => {
  const expectedConfig = undefined;
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
  const data = {
    method: 'string',
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
    const response: PostPaymentIntentInstrumentResponse = {
      data: {},
      headers: { location: 'https://somelocation.com' },
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postPaymentIntentInstrument(id, data)).resolves.toMatchObject(
      response,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      postPaymentIntentInstrument(id, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
