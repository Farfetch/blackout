import { patchReturn } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/patchReturn.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('patchReturn', () => {
  const data = {};
  const spy = jest.spyOn(client, 'patch');
  const id = '123456';
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success({ id, response, query });

    expect.assertions(2);
    await expect(patchReturn(id, data, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, query });

    expect.assertions(2);
    await expect(patchReturn(id, data, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      data,
      expectedConfig,
    );
  });
});
