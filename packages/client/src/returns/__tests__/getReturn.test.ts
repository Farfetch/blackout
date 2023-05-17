import { getReturn } from '../index.js';
import { id, responses } from 'tests/__fixtures__/returns/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getReturn.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getReturn', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    await expect(getReturn(id)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getReturn(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      expectedConfig,
    );
  });
});
