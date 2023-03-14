import { postExchangeBookRequest } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postExchangeBookRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postExchangeBookRequest()', () => {
  const data = {
    exchangeReturnAssociations: [
      {
        exchangeReturnItemId: '123456',
        returnId: 123456,
      },
    ],
  };
  const id = '123456';
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success(id, response);

    expect.assertions(2);

    await expect(postExchangeBookRequest(id, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}/bookRequests`),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id);

    expect.assertions(2);

    await expect(postExchangeBookRequest(id, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}/bookRequests`),
      data,
      expectedConfig,
    );
  });
});
