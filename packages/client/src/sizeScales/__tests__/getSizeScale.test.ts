import { getSizeScale } from '../';
import { mockSizeScale } from 'tests/__fixtures__/sizeScales';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeScale.fixtures';
import mswServer from '../../../tests/mswServer';

describe('sizeScales client', () => {
  const scaleId = 117;
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSizeScale()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSizeScale;

      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(getSizeScale(scaleId)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${scaleId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(getSizeScale(scaleId)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${scaleId}`,
        expectedConfig,
      );
    });
  });
});
