import { useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext.js';

const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export default useAuthentication;
