import { useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export default useAuthentication;
