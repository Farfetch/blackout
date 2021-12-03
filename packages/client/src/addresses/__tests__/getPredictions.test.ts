import { getPredictions } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getPredictions.fixtures';
import moxios from 'moxios';

describe('getPredictions', () => {
  const text = 'dummy%20text';
  const query = { countries: 'US', sampleSize: 10, sessionToken: '12132' };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const response = [
    {
      id: 'EiZSdWEgZGUgU2FudGEgQ2F0YXJpbmEsIFBvcnRvLCBQb3J0dWdhbCIuKiwKFAoSCVHmX236ZCQNEWtKUad5WOBGEhQKEgnBU-HEq2UkDRG8FLFAVtlIpg',
      text: 'Rua de Santa Catarina',
      description: 'Rua de Santa Catarina, Porto, Portugal',
      type: 'Address',
    },
    {
      id: 'Eh1SdWEgQXVndXN0YSwgTGlzYm9uLCBQb3J0dWdhbCIuKiwKFAoSCekeywN5NBkNEZNNGdb_qy0_EhQKEgk78-RhGjMZDRHQNpDkvesABA',
      text: 'Rua Augusta',
      description: 'Rua Augusta, Lisbon, Portugal',
      type: 'Address',
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully when receiving a query param', async () => {
    fixture.success({ text, query, response });

    expect.assertions(2);

    await expect(getPredictions(text, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully when not receiving a query param', async () => {
    fixture.success({ text, response });

    expect.assertions(2);

    await expect(getPredictions(text, null)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ text, query });

    expect.assertions(2);

    await expect(getPredictions(text, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });
});
