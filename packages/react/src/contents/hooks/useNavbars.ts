import {
  fetchContents as fetchContentsAction,
  getContentError,
  getContents,
  isContentLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Params } from '../types';

/**
 * Hook to return actions and selectors for content navigation data. The action to
 * fetch content will be automatically called so there is no need to refetch.
 *
 * @param navKey   - Key name to query for a Navbar.
 * @param params   - The target parameters that a content page is configured.
 * @param pageSize - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns - Returns actions and selectors for content navigation data.
 */
const useNavbars = (
  navKey: string,
  spaceCode: string,
  params?: Params,
  pageSize?: number,
) => {
  const query = {
    codes: navKey,
    contentTypeCode: 'navbars',
    spaceCode,
    // @ts-ignore
    // dotenv does´t exist in this BOX and typing `process` will generate an error in tests.
    environmentCode: process.env.WEB_APP_CONTENT_ENV || '',
    target: {
      country: params?.countryCode,
      language: params?.cultureCode,
      benefits: params?.benefits,
      contentzone: params?.contentzone,
    },
    pageSize,
  };
  const isNavigationLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const navigationError = useSelector((state: StoreState) =>
    getContentError(state, query),
  );
  const navigation = useSelector((state: StoreState) =>
    getContents(state, query),
  );
  const action = useAction(fetchContentsAction);
  const fetchNavbars = () => action(query);

  useEffect(() => {
    !navigation && fetchNavbars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, navKey]);

  return {
    /**
     * Get the result for a specific Navigation content.
     */
    navigation,
    /**
     * Loading state for a specific Navigation content.
     */
    isNavigationLoading,
    /**
     * Error state for a specific Navigation content.
     */
    navigationError,
    /**
     * Fetch Navigation content for a specific nav key.
     */
    fetchNavbars,
  };
};

export default useNavbars;
