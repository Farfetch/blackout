import { getAddressPredictionDetails } from '..';
import { mockPredictionResponse } from 'tests/__fixtures__/addresses';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getAddressPredictionDetails.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getAddressPredictionDetails', () => {
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
        getAddressPredictionDetails({ predictionId }, query),
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

      expect.assertions(2);

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

      expect.assertions(2);

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
