import { getPredictions } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPredictions.fixtures';
import moxios from 'moxios';

describe('getPredictions', () => {
  const text = 'dummy%20text';
  const query = { countries: 'US' };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully when receiving a query param', async () => {
    const response = {};

    fixture.success({ text, query, response });

    expect.assertions(2);

    await expect(getPredictions(text, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully when not receiving a query param', async () => {
    const response = {};

    fixture.success({ text, response });

    expect.assertions(2);

    await expect(getPredictions(text, null)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ text, query });

    expect.assertions(2);

    await expect(getPredictions(text, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US`,
      expectedConfig,
    );
  });
});
