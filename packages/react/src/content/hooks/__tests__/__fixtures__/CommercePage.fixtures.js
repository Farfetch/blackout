import { commercePagesQuery, slug } from 'tests/__fixtures__/contents';
import React from 'react';
import useCommercePage from '../../useCommercePage';

export const CommercePage = () => {
  const { commercePage, isLoading, error, resetContent, fetchCommerce } =
    useCommercePage(slug, commercePagesQuery);

  const commercePageTitle = commercePage?.[0]?.components?.[0]?.fields?.title;

  if (isLoading) {
    return <span data-test="commerce-page-loading">Loading...</span>;
  }

  if (error) {
    return <span data-test="commerce-page-error">Something went wrong!</span>;
  }

  return (
    <>
      {commercePage && (
        <span data-test="commerce-page-data">{commercePageTitle.value}</span>
      )}
      <button data-test="commerce-page-reset" onClick={resetContent} />
      <button
        data-test="commerce-page-fetchContent"
        onClick={() => fetchCommerce(commercePagesQuery, slug)}
      />
    </>
  );
};
