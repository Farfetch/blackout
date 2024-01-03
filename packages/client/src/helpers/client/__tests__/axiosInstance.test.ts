import client from '../index.js';

describe('AxiosInstance', () => {
  it('should get the right baseURL', () => {
    const baseURL = client.defaults.baseURL;

    expect(baseURL).toBe('/api');
  });
});
