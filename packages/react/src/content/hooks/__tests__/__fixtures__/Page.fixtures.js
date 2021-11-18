import { contentQuery, params } from 'tests/__fixtures__/contents';
import React from 'react';
import usePage from '../../usePage';

const slug = ['cttpage,boutiques'];

export const Page = () => {
  const { page, isLoading, error, resetContent, fetchContent } = usePage(
    slug,
    params,
  );
  const pageTitle = page?.[1]?.components?.[0]?.components?.[0]?.fields?.title;

  if (isLoading) {
    return <span data-test="page-loading">Loading...</span>;
  }

  if (error) {
    return <span data-test="page-error">Something went wrong!</span>;
  }

  return (
    <>
      {page && <span data-test="page-data">{pageTitle.value}</span>}
      <button data-test="page-reset" onClick={resetContent} />
      <button
        data-test="page-fetchContent"
        onClick={() => fetchContent(contentQuery)}
      />
    </>
  );
};
