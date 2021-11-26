import {
  Address,
  Amounts,
  Country,
  CreditCardData,
  Payer,
  PayerAddressType,
  PostInstrumentsResponse,
  ShopperInteraction,
} from '../types';
import { postInstruments } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postInstruments.fixtures';
import moxios from 'moxios';

describe('postInstruments', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const country: Country = {
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
  const address: Address = {
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

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response: PostInstrumentsResponse = {
      data: {},
      headers: { location: '' },
    };

    fixtures.success({ id, data, response });

    expect.assertions(2);

    await expect(postInstruments(id, data)).resolves.toMatchObject(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id, data });

    expect.assertions(2);

    await expect(postInstruments(id, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
