import { getCountryCode, getCountryCulture } from '@farfetch/blackout-redux';
import { sortContentType } from '../../../utils/index.js';
import { useContents } from '../../../hooks/index.js';
import { useSelector } from 'react-redux';
import React, { type ReactElement } from 'react';
import renderContent from '../../../helpers/renderContent.jsx';
import type { ContentListComponent } from '../../../types/index.js';

const ContentList = ({
  data,
  location,
  viewportBreakpoint,
}: ContentListComponent): ReactElement | null => {
  const { pageSize, orderOption, contentTypes } = data.fields;
  const countryCode = useSelector(getCountryCode);
  const cultureCode = useSelector(getCountryCulture);
  const isRoutePreview = !!location.query?.['target.preview'];
  const { isLoading: isContentTypeLoading, data: contentType } = useContents({
    contentTypeCode: contentTypes?.components?.[0]?.fields?.key?.value,
    target: {
      country: isRoutePreview
        ? location.query?.['target.country']
        : countryCode,
      language: isRoutePreview
        ? location.query?.['target.language']
        : cultureCode,
      contentzone: location.query?.['target.contentzone'],
      channel: location.query?.['target.channel'],
    },
    spaceCode: location.query?.['spacecode'],
    // We can't have target.preview so the default should be live
    environmentCode: 'live',
    pageSize: pageSize?.value,
  });

  if (isContentTypeLoading) {
    return null;
  }

  return contentType && contentType.entries.length > 0 ? (
    <>
      {sortContentType(contentType.entries, orderOption.value).map(content => {
        const component = renderContent(content, {
          location,
          viewportBreakpoint,
        });

        if (component.type === React.Fragment) {
          return component.props.children;
        }

        return component;
      })}
    </>
  ) : null;
};

export default ContentList;
