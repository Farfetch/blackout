import { buildLinks, buildMetas, getDefaultAppLinks } from '../utils';
import {
  fetchSEOMetadata,
  getSEOMetadataError,
  getSEOMetadataResult,
  isSEOMetadataFetched,
  isSEOMetadataLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import {
  GetSEOMetadataQuery,
  SeoPageType,
  SeoSubPageType,
} from '@farfetch/blackout-client';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { AppIconLinks, Link, Meta, UseSeoMetadataOptions } from '../types';

/**
 * Hook to return seo metadata to populate document head.
 *
 * @param data - object that receives SEO query, icon links, additional links, metas and options
 *
 * @returns - Returns actions and SEO metadata state for a given path.
 */
const useSeoMetadata = (
  {
    query,
    appIconLinks = getDefaultAppLinks(),
    links = [],
    metas = [],
  }: {
    query: GetSEOMetadataQuery;
    appIconLinks?: AppIconLinks;
    links?: Link[];
    metas?: Meta[];
  },
  options: UseSeoMetadataOptions = {},
) => {
  const { enableAutoFetch = true } = options;
  const error = useSelector((state: StoreState) =>
    getSEOMetadataError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    isSEOMetadataLoading(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    isSEOMetadataFetched(state, query),
  );
  const seo = useSelector((state: StoreState) =>
    getSEOMetadataResult(state, query),
  );
  const { path = '' } = query;
  const fetch = useAction(fetchSEOMetadata);

  const data = useMemo(
    () =>
      seo
        ? {
            title: seo.title,
            description: seo.description,
            canonical: seo.canonicalUrl,
            meta: buildMetas(seo, metas),
            link: buildLinks(seo, appIconLinks, links),
            seo,
          }
        : undefined,
    [seo, metas, appIconLinks, links],
  );

  const shouldLoadMetaTags =
    enableAutoFetch && !isLoading && !error && !isFetched;

  useEffect(() => {
    if (shouldLoadMetaTags) {
      fetch({
        ...query,
        pageType: query.pageType || SeoPageType.Pages,
        subPageType: query.subPageType || SeoSubPageType.Default,
        path,
      });
    }
  }, [fetch, shouldLoadMetaTags, path, query]);

  return {
    error,
    isLoading,
    isFetched,
    data,
    actions: {
      fetch,
    },
  };
};

export default useSeoMetadata;
