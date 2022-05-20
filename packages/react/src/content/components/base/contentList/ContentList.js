import {
  getCountryCode,
  getCultureCode,
} from '@farfetch/blackout-core/locale/redux';
import { renderContent } from '../../../helpers';
import { sortContentType } from '../../../utils';
import { useContentType } from '../../../hooks';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ContentList = ({ data, location }) => {
  const { pageSize, orderOption, contentTypes } = data.fields;
  const countryCode = useSelector(getCountryCode);
  const cultureCode = useSelector(getCultureCode);
  const { isContentTypeLoading, contentType } = useContentType(
    null,
    contentTypes?.components?.[0]?.fields?.key?.value,
    {
      countryCode,
      cultureCode,
      // We can't have target.preview so the default should be live
      environmentcode: 'live',
      channel: location.query?.['target.channel'],
    },
    pageSize?.value,
  );

  if (isContentTypeLoading) {
    return null;
  }

  return contentType && contentType.length > 0
    ? sortContentType(contentType, orderOption.value).map(content =>
        renderContent(content, location, 'active'),
      )
    : null;
};

ContentList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContentList;
