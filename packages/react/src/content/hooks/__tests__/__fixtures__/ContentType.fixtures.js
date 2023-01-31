import { params } from 'tests/__fixtures__/contents';
import React from 'react';
import useContentType from '../../useContentType';

export const ContentType = ({ codes }) => {
  const { contentType, isContentTypeLoading, contentTypeError } =
    useContentType(codes, 'careers', params);
  const title = contentType?.[0]?.components?.find(
    component => component.name === 'Title',
  );
  const description = contentType?.[0]?.components?.find(
    component => component.name === 'Description',
  );

  if (isContentTypeLoading) {
    return <span data-test="contentType-loading">Loading...</span>;
  }

  if (contentTypeError) {
    return <span data-test="contentType-error">Something went wrong!</span>;
  }

  return (
    <>
      {contentType && (
        <div data-test="contentType-container">
          <h1 data-test="contentType-title">{title.value}</h1>
          <div data-test="contentType-description">{description.content}</div>
        </div>
      )}
    </>
  );
};
