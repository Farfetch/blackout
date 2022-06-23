import { getPaymentTokens } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentTokens.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetPaymentTokensQuery,
  PaymentToken,
  PaymentTokens,
} from '../types';

describe('getPaymentTokens', () => {
  const query: GetPaymentTokensQuery = { orderId: 1, showExpiredCards: false };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedUrl = join('/payment/v1/tokens', { query });

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const paymentToken: PaymentToken = {
      id: 'string',
      paymentMethodId: 'string',
      userId: 'string',
      cardLast4Numbers: 'string',
      expiryYear: 0,
      expiryMonth: 0,
      holderName: 'string',
      forceCvvRequest: true,
      billingAddress: {
        addressLine1: 'string',
        addressLine2: 'string',
        addressLine3: 'string',
        city: {
          countryId: 0,
          id: 0,
          name: 'string',
          stateId: 0,
        },
        country: {
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
        },
        ddd: 'string',
        firstName: 'string',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        lastName: 'string',
        neighbourhood: 'string',
        phone: 'string',
        state: {
          code: 'string',
          countryId: 0,
          id: 0,
          name: 'string',
        },
        vatNumber: 'string',
        zipCode: 'string',
        userId: 0,
        isDefaultBillingAddress: true,
        isDefaultShippingAddress: true,
      },
      tokenExpired: true,
      usedDate: '2021-07-08T14:21:50.755Z',
      createdDate: '2021-07-08T14:21:50.755Z',
      paymentOption: 'string',
    };

    const response: PaymentTokens = [paymentToken, paymentToken];

    fixtures.success({ query, response });

    expect.assertions(2);

    await expect(getPaymentTokens(query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ query });

    expect.assertions(2);

    await expect(getPaymentTokens(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
