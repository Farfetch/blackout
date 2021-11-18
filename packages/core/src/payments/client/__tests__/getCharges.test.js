import { getCharges } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCharges.fixtures';
import moxios from 'moxios';

describe('getCharges', () => {
  const intentId = '123456';
  const chargeId = '98776';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${intentId}/charges/${chargeId}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      status: 'Processing',
      returnUrl: 'string',
      cancelUrl: 'string',
    };

    fixtures.success({ intentId, chargeId, response });

    expect.assertions(2);
    await expect(getCharges(intentId, chargeId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ intentId, chargeId });

    expect.assertions(2);

    await expect(getCharges(intentId, chargeId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
