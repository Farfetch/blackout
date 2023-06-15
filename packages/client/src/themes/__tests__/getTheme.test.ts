import { getTheme } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/theme.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('Themes client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTheme()', () => {
    const spy = jest.spyOn(client, 'get');
    const code = 'foo';
    const query = {
      version: 1.0,
    };
    const response = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      code: 'global',
      version: 1,
      dependencies: [
        {
          id: '9994daea-2929-4d4e-8874-88f6dc2e9fa8',
          code: 'navbar',
          version: 1,
          dependencies: [],
          style: {
            color: 'red',
            border: '1px',
            font: 'Verdana',
          },
          createdDate: '2023-01-04T13:28:30.824Z',
        },
        {
          id: 'd2389415-b9a1-406a-9a93-70a0fafcf76f',
          code: 'checkout',
          version: 1,
          dependencies: [],
          style: {
            color: 'blue',
            border: '2px',
            font: 'Arial',
          },
          createdDate: '2023-02-04T13:28:30.824Z',
        },
      ],
      style: {
        color: 'black',
        border: '1px',
        font: 'Verdana',
      },
      createdDate: '2023-06-09T13:56:22.069Z',
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(response));

      await expect(getTheme(code, query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/themes/foo?version=1',
        expectedConfig,
      );
    });

    it('should handle a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      await expect(getTheme(code, query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/themes/foo?version=1',
        expectedConfig,
      );
    });
  });
});
