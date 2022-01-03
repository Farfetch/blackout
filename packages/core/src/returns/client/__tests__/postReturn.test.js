import { postReturn } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postReturn.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postReturn()', () => {
  const data = {};
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success({ response, query });

    expect.assertions(2);
    await expect(postReturn(data, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ query });

    expect.assertions(2);
    await expect(postReturn(data, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      data,
      expectedConfig,
    );
  });
});
