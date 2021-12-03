import * as usersClient from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBenefits.fixtures';
import moxios from 'moxios';

describe('getBenefits', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response });

    expect.assertions(2);

    await expect(usersClient.getBenefits()).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith('/legacy/v1/userbenefits', expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);

    await expect(usersClient.getBenefits()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith('/legacy/v1/userbenefits', expectedConfig);
  });
});
