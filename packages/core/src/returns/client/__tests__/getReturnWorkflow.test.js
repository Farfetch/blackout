import { getReturnWorkflow } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getReturnWorkflow.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnWorkflow', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success({ id, response });

    expect.assertions(2);
    await expect(getReturnWorkflow(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/workflow`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id });

    expect.assertions(2);
    await expect(getReturnWorkflow(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/workflow`),
      expectedConfig,
    );
  });
});
