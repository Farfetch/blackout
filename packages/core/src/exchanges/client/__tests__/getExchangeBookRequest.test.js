import { getExchangeBookRequest } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getExchangeBookRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getExchangeBookRequest', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const bookRequestId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success(id, bookRequestId, response);

    expect.assertions(2);

    await expect(getExchangeBookRequest(id, bookRequestId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}/bookRequests/${bookRequestId}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id, bookRequestId);

    expect.assertions(2);

    await expect(
      getExchangeBookRequest(id, bookRequestId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}/bookRequests/${bookRequestId}`),
      expectedConfig,
    );
  });
});
