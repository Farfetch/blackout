import { getSizeScale } from '../';
import { mockScaleId, mockSizeScale } from 'tests/__fixtures__/sizeScales';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSizeScale.fixtures';
import moxios from 'moxios';

describe('sizeScales client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSizeScale()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSizeScale;

      fixtures.success({
        id: mockScaleId,
        response,
      });

      await expect(getSizeScale(mockScaleId)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${mockScaleId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        id: mockScaleId,
      });

      await expect(getSizeScale(mockScaleId)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${mockScaleId}`,
        expectedConfig,
      );
    });
  });
});
