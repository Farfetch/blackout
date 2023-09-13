import { cleanup, renderHook } from '@testing-library/react';
import {
  mockInitialState,
  mockResponse,
} from 'tests/__fixtures__/authentication/index.mjs';
import { mockStore } from '../../../../tests/helpers/index.js';
import { postAccountLink, postSocialLogin } from '@farfetch/blackout-client';
import { Provider } from 'react-redux';
import { useSocialLogin } from '../index.js';

const mockConfig = {};

const mockLoginData = {
  provider: 'Google',
  socialAccessToken: 'xxx-xxx-xxx-xxx',
  rememberMe: true,
  countryCode: 'PT',
};

const mockAccountLinkData = {
  username: 'xxxxxxxx',
  password: 'xxxxxxxx',
};

jest.mock('@farfetch/blackout-client', () => {
  const original = jest.requireActual('@farfetch/blackout-client');

  return {
    ...original,
    postSocialLogin: jest.fn(() => Promise.resolve(mockResponse)),
    postAccountLink: jest.fn(() => Promise.resolve(mockResponse)),
  };
});

const genericMock = {
  actions: {
    createAccountLink: expect.any(Function),
    socialLogin: expect.any(Function),
  },
};

const getRenderedHook = (state = mockInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useSocialLogin(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useSocialLogin', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const current = getRenderedHook(mockInitialState);

    expect(current).toStrictEqual(genericMock);

    expect(postSocialLogin).not.toHaveBeenCalled();
    expect(postAccountLink).not.toHaveBeenCalled();
  });

  describe('actions', () => {
    describe('socialLogin', () => {
      it('should call `useSocialLogin` socialLogin action with config', async () => {
        const current = getRenderedHook(mockInitialState);

        await current.actions.socialLogin(mockLoginData, mockConfig);

        expect(postSocialLogin).toHaveBeenCalledWith(mockLoginData, mockConfig);
      });

      it('should call `useSocialLogin` socialLogin action without config', async () => {
        const current = getRenderedHook(mockInitialState);

        await current.actions.socialLogin(mockLoginData);

        expect(postSocialLogin).toHaveBeenCalledWith(mockLoginData, undefined);
      });
    });

    describe('createAccountLink', () => {
      it('should call `useSocialLogin` accountLink action', async () => {
        const current = getRenderedHook(mockInitialState);

        await current.actions.createAccountLink(
          mockAccountLinkData,
          mockConfig,
        );

        expect(postAccountLink).toHaveBeenCalledWith(
          mockAccountLinkData,
          mockConfig,
        );
      });

      it('should call `useSocialLogin` accountLink action without config', async () => {
        const current = getRenderedHook(mockInitialState);

        await current.actions.createAccountLink(mockAccountLinkData);

        expect(postAccountLink).toHaveBeenCalledWith(
          mockAccountLinkData,
          undefined,
        );
      });
    });
  });
});
