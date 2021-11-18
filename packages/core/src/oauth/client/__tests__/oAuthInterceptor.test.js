import { oAuthInterceptor } from '..';

describe('oAuthInterceptor()', () => {
  const mockToken1 = 'token1';

  it('should successfully obtain the authorization headers', async () => {
    const fetchToken = jest.fn().mockResolvedValueOnce({
      access_token: mockToken1,
      expires_in: 50,
    });
    const interceptor = oAuthInterceptor(fetchToken);

    expect.assertions(1);

    await interceptor({ headers: {} }).then(config => {
      expect(config).toEqual({
        headers: {
          Authorization: `Bearer ${mockToken1}`,
        },
      });
    });
  });
});
