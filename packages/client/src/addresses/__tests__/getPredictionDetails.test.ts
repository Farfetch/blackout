import { getPredictionDetails } from '..';
import { mockPredictionResponse } from 'tests/__fixtures__/addresses';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPredictionDetails.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPredictionDetails', () => {
  const predictionId = '123456789';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { sessionToken: 'imatest' };

  beforeEach(() => jest.clearAllMocks());

  describe('with query params', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockPredictionResponse));

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }, query),
      ).resolves.toStrictEqual(mockPredictionResponse);

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }, query),
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

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }),
      ).resolves.toStrictEqual(mockPredictionResponse);

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address`,
        expectedConfig,
      );
    });
  });
});
