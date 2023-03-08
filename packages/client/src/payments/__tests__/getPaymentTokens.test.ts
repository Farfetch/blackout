import { getPaymentTokens } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPaymentTokens.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';
import type {
  GetPaymentTokensQuery,
  PaymentToken,
  PaymentTokens,
} from '../types/index.js';

describe('getPaymentTokens', () => {
  const query: GetPaymentTokensQuery = { orderId: 1, showExpiredCards: false };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedUrl = join('/payment/v1/tokens', { query });

  beforeEach(() => jest.clearAllMocks());

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
          continentId: 0,
        },
        ddd: 'string',
        firstName: 'string',
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
      },
      tokenExpired: true,
      usedDate: '2021-07-08T14:21:50.755Z',
      createdDate: '2021-07-08T14:21:50.755Z',
      paymentOption: 'string',
    };

    const response: PaymentTokens = [paymentToken, paymentToken];

    mswServer.use(fixtures.success(response));

    await expect(getPaymentTokens(query)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getPaymentTokens(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
