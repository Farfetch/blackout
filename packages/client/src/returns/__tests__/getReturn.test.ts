import { getReturn } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturn.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturn', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    fixture.success({ id, query, response });

    expect.assertions(2);
    await expect(getReturn(id, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, query });

    expect.assertions(2);
    await expect(getReturn(id, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      expectedConfig,
    );
  });
});
