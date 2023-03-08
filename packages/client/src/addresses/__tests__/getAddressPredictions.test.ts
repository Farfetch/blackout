import { getAddressPredictions } from '../index.js';
import { mockAddressPredictionsResponse } from 'tests/__fixtures__/addresses/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getAddressPredictions.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getPredictions', () => {
  const text = 'dummy%20text';
  const query = { countries: 'US', sampleSize: 10, sessionToken: '12132' };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully when receiving a query param', async () => {
    mswServer.use(fixtures.success(mockAddressPredictionsResponse));

    await expect(getAddressPredictions(text, query)).resolves.toStrictEqual(
      mockAddressPredictionsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully when not receiving a query param', async () => {
    mswServer.use(fixtures.success(mockAddressPredictionsResponse));

    await expect(getAddressPredictions(text)).resolves.toStrictEqual(
      mockAddressPredictionsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getAddressPredictions(text, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });
});
