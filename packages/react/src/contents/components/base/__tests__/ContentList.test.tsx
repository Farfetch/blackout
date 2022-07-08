import {
  contentListData,
  customContentType,
} from 'tests/__fixtures__/contents';
import { render } from '@testing-library/react';
import { sortContentType } from '../../../utils';
import { useContentType } from '../../../hooks';
import ContentList from '../contentList/ContentList';
import React from 'react';

jest.mock('react-redux', () => ({
  useSelector: () => ({
    getCountryCode: () => 'US',
    getCountryCultureCode: () => 'en-US',
  }),
  useDispatch: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useContentType: jest.fn(),
}));

jest.mock('../../../helpers', () => ({
  renderContent: () => <div>This is Content type</div>,
}));

jest.mock('../../../utils', () => ({
  sortContentType: jest.fn(),
}));

const location = {
  query: {
    'target.channel': 'Web',
  },
};

describe('<ContentList />', () => {
  it('should render properly', () => {
    (useContentType as jest.Mock).mockImplementation(() => ({
      contentType: customContentType,
      isContentTypeLoading: false,
    }));
    (sortContentType as jest.Mock).mockImplementation(() => customContentType);
    const { getByText } = render(
      <ContentList
        data={contentListData}
        location={location}
        viewportBreakpoint={'lg'}
      />,
    );

    expect(getByText('This is Content type')).toBeInTheDocument();
  });

  it('should render null if no contentType is returned', () => {
    (useContentType as jest.Mock).mockImplementation(() => ({
      contentType: undefined,
      isContentTypeLoading: false,
    }));
    (sortContentType as jest.Mock).mockImplementation(() => []);
    const { container } = render(
      <ContentList
        data={contentListData}
        location={location}
        viewportBreakpoint={'lg'}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render null if loading is true', () => {
    (useContentType as jest.Mock).mockImplementation(() => ({
      contentType: undefined,
      isContentTypeLoading: true,
    }));
    (sortContentType as jest.Mock).mockImplementation(() => []);
    const { container } = render(
      <ContentList
        data={contentListData}
        location={location}
        viewportBreakpoint={'lg'}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
