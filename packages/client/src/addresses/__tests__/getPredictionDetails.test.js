import { getPredictionDetails } from '../';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getPredictionDetails.fixtures';
import moxios from 'moxios';

describe('getPredictionDetails', () => {
  const predictionId = '123456789';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { sessionToken: 'imatest' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('with query params', () => {
    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.withQuery.success({ predictionId, query, response });

      expect.assertions(2);

      await expect(getPredictionDetails({ predictionId }, query)).resolves.toBe(
        response,
      );

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.withQuery.failure({ predictionId, query });

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
      const response = {};

      fixture.withoutQuery.success({ predictionId, response });

      expect.assertions(2);

      await expect(getPredictionDetails({ predictionId })).resolves.toBe(
        response,
      );

      expect(spy).toHaveBeenCalledWith(
        `/account/v1/addressesprediction/${predictionId}/address`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.withoutQuery.failure({ predictionId });

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
