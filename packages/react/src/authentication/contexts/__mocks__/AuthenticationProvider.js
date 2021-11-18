import { mockDefaultActiveTokenData } from '../__fixtures__/AuthenticationProvider.fixtures';
import AuthenticationContext from '../AuthenticationContext';
import React from 'react';

const AuthenticationProvider = ({ children }) => {
  return (
    <AuthenticationContext.Provider
      value={{
        activeTokenData: mockDefaultActiveTokenData,
        tokenManager: {
          getActiveToken: jest.fn(() => mockDefaultActiveTokenData),
          setUserInfo: jest.fn(),
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
