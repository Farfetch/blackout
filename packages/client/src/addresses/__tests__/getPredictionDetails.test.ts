import { getPredictionDetails } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPredictionDetails.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPredictionDetails', () => {
  const predictionId = '123456789';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { sessionToken: 'imatest' };
  const response = {
    id: 'EiZSdWEgZGUgU2FudGEgQ2F0YXJpbmEsIFBvcnRvLCBQb3J0dWdhbCIuKiwKFAoSCVHmX236ZCQNEWtKUad5WOBGEhQKEgnBU-HEq2UkDRG8FLFAVtlIpg',
    text: 'Rua de Santa Catarina',
    description: 'Rua de Santa Catarina, Porto, Portugal',
    type: 'Address',
  };

  beforeEach(() => jest.clearAllMocks());

  describe('with query params', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }, query),
      ).resolves.toStrictEqual(response);

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
      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(
        getPredictionDetails({ predictionId }),
      ).resolves.toStrictEqual(response);

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
