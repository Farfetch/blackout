import { useContext } from 'react';
import UserProfileContext from '../contexts/UserProfileContext';

const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export default useUserProfile;
