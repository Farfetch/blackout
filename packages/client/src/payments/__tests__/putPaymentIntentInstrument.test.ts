import {
  AddressPayment,
  Amounts,
  Payer,
  PayerAddressType,
  ShopperInteraction,
} from '../types';
import { id, instrumentId } from 'tests/__fixtures__/payments';
import { putPaymentIntentInstrument } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putPaymentIntentInstrument.fixtures';
import mswServer from '../../../tests/mswServer';
import type { CountryAddress } from '../../users';

describe('putPaymentIntentInstrument', () => {
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
  const data = {
    createToken: true,
    payer: payer,
    amounts: [amounts],
    shopperInteraction: ShopperInteraction.Ecommerce,
    payerAddressType: PayerAddressType.Provided,
  };
  const spy = jest.spyOn(client, 'put');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments/${instrumentId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(
      putPaymentIntentInstrument(id, instrumentId, data),
    ).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      putPaymentIntentInstrument(id, instrumentId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
