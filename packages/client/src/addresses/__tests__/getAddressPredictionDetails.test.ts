import { getAddressPredictionDetails } from '../index.js';
import { mockPredictionResponse } from 'tests/__fixtures__/addresses/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getAddressPredictionDetails.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getAddressPredictionDetails', () => {
  const predictionId = '123456789';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { sessionToken: 'imatest' };

  beforeEach(() => jest.clearAllMocks());

  describe('with query params', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockPredictionResponse));

      await expect(
        getAddressPredictionDetails({ predictionId }, query),
      ).resolves.toStrictEqual(mockPredictionResponse);

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getAddressPredictionDetails({ predictionId }, query),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        expectedConfig,
      );
    });
  });

  describe('without query params', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockPredictionResponse));

      await expect(
        getAddressPredictionDetails({ predictionId }),
      ).resolves.toStrictEqual(mockPredictionResponse);

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getAddressPredictionDetails({ predictionId }),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address`,
        expectedConfig,
      );
    });
  });
});
