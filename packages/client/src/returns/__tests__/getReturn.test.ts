import { getReturn } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturn.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturn', () => {
  const spy = jest.spyOn(client, 'get');
  const id = 123456;
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getReturn(id, query)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(getReturn(id, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      expectedConfig,
    );
  });
});
