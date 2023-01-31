import { getIntent } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getIntent.fixtures';
import moxios from 'moxios';

describe('getIntent', () => {
  const intentId = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${intentId}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      lineItems: [],
    };

    fixtures.success({ intentId, response });

    expect.assertions(2);
    await expect(getIntent(intentId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ intentId });

    expect.assertions(2);

    await expect(getIntent(intentId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
