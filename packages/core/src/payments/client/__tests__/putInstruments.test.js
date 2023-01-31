import { putInstruments } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putInstruments.fixtures';
import moxios from 'moxios';

describe('putInstruments', () => {
  const intentId = '123456';
  const instrumentId = '654321';
  const expectedConfig = undefined;
  const data = {};
  const spy = jest.spyOn(client, 'put');
  const urlToBeCalled = `/payment/v1/intents/${intentId}/instruments/${instrumentId}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ intentId, instrumentId, response });

    expect.assertions(2);

    await expect(putInstruments(intentId, instrumentId, data)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ intentId, instrumentId });

    expect.assertions(2);

    await expect(
      putInstruments(intentId, instrumentId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
