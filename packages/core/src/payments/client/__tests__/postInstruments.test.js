import { postInstruments } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postInstruments.fixtures';
import moxios from 'moxios';

describe('postInstruments', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const data = {};
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      data: {},
      headers: { location: '' },
    };

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(postInstruments(id, data)).resolves.toMatchObject(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(postInstruments(id, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
