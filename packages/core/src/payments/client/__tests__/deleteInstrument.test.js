import { deleteInstrument } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteInstrument.fixtures';
import moxios from 'moxios';

describe('deleteInstrument', () => {
  const intentId = '123456';
  const instrumentId = '654321';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
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
    await expect(deleteInstrument(intentId, instrumentId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ intentId, instrumentId });

    expect.assertions(2);

    await expect(
      deleteInstrument(intentId, instrumentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
