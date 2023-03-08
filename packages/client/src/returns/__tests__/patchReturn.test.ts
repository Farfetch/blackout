import {
  id,
  mockPatchData,
  responses,
} from 'tests/__fixtures__/returns/index.mjs';
import { patchReturn } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchReturn.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('patchReturn', () => {
  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    await expect(patchReturn(id, mockPatchData)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      mockPatchData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(patchReturn(id, mockPatchData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      mockPatchData,
      expectedConfig,
    );
  });
});
