import { useContext } from 'react';
import UserProfileContext from '../contexts/UserProfileContext.js';

const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export default useUserProfile;
