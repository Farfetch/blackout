import { data, response } from '../__fixtures__/contentList.fixtures';
import { render } from '@testing-library/react';
import { sortContentType } from '../../../utils';
import { useContentType } from '../../../hooks';
import ContentList from '../contentList/ContentList';
import React from 'react';

jest.mock('react-redux', () => ({
  useSelector: () => ({
    getCountryCode: () => 'US',
    getCultureCode: () => 'en-US',
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
    useContentType.mockImplementation(() => ({
      contentType: response,
      isContentTypeLoading: false,
    }));
    sortContentType.mockImplementation(() => response);
    const { getByText } = render(
      <ContentList data={data} location={location} />,
    );

    expect(getByText('This is Content type')).toBeInTheDocument();
  });

  it('should render null if no contentType is returned', () => {
    useContentType.mockImplementation(() => ({
      contentType: undefined,
      isContentTypeLoading: false,
    }));
    sortContentType.mockImplementation(() => []);
    const { container } = render(
      <ContentList data={data} location={location} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render null if loading is true', () => {
    useContentType.mockImplementation(() => ({
      contentType: undefined,
      isContentTypeLoading: true,
    }));
    sortContentType.mockImplementation(() => []);
    const { container } = render(
      <ContentList data={data} location={location} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
