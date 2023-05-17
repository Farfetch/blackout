import { mockDefaultActiveTokenData } from '../__fixtures__/AuthenticationProvider.fixtures.js';
import AuthenticationContext from '../AuthenticationContext.js';
import React from 'react';
import type { AuthenticationTokenManager } from '@farfetch/blackout-client';

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthenticationContext.Provider
      value={{
        activeTokenData: mockDefaultActiveTokenData,
        tokenManager: {
          getActiveToken: jest.fn(() => mockDefaultActiveTokenData),
          setUserInfo: jest.fn(),
        } as unknown as AuthenticationTokenManager,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
