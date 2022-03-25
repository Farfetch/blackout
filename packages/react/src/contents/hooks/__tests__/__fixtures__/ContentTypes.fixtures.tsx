import React from 'react';
import useContentType from '../../useContentType';

export const ContentTypes = ({ codes }) => {
  const { contentType } = useContentType(codes, 'careers');
  const title = contentType?.[0]?.components?.find(
    component => component.name === 'Title',
  );
  const description = contentType?.[0]?.components?.find(
    component => component.name === 'Description',
  );

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
