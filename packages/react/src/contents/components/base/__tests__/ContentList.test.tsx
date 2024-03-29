import {
  contentListData,
  customContentType,
} from 'tests/__fixtures__/contents/index.mjs';
import { render } from '@testing-library/react';
import { sortContentType } from '../../../utils/index.js';
import { useContents } from '../../../hooks/index.js';
import ContentList from '../contentList/ContentList.js';
import React from 'react';

jest.mock('react-redux', () => ({
  useSelector: () => ({
    getCountryCode: () => 'US',
    getCountryCultureCode: () => 'en-US',
  }),
  useDispatch: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useContents: jest.fn(),
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
    (useContents as jest.Mock).mockImplementation(() => ({
      data: { entries: customContentType },
      isLoading: false,
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
    (useContents as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
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
    (useContents as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: true,
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
