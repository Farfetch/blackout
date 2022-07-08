import {
  getCountryCode,
  getCountryCultureCode,
} from '@farfetch/blackout-redux/locale';
import { sortContentType } from '../../../utils';
import { useContentType } from '../../../hooks';
import { useSelector } from 'react-redux';
import renderContent from '../../../helpers/renderContent';
import type { ContentListComponent } from '../../../types';
import type { ReactElement } from 'react';

const ContentList = ({
  data,
  location,
  viewportBreakpoint,
}: ContentListComponent): ReactElement[] | null => {
  const { pageSize, orderOption, contentTypes } = data.fields;
  const countryCode = useSelector(getCountryCode);
  const cultureCode = useSelector(getCountryCultureCode);
  const isRoutePreview = !!location.query?.['target.preview'];
  const { isContentTypeLoading, contentType } = useContentType(
    null,
    contentTypes?.components?.[0]?.fields?.key?.value,
    {
      countryCode: isRoutePreview
        ? location.query?.['target.country']
        : countryCode,
      cultureCode: isRoutePreview
        ? location.query?.['target.language']
        : cultureCode,
      contentzone: location.query?.['target.contentzone'],
      spacecode: location.query?.['spacecode'],
      channel: location.query?.['target.channel'],
      // We can't have target.preview so the default should be live
      environmentcode: 'live',
    },
    pageSize?.value,
  );

  if (isContentTypeLoading) {
    return null;
  }

  return contentType && contentType.length > 0
    ? sortContentType(contentType, orderOption.value).map(content =>
        renderContent(content, location, viewportBreakpoint),
      )
    : null;
};

export default ContentList;
