import { configure, shallow } from 'enzyme';
import { mockSeo, mockSeoInvalid } from '../__fixtures__/seo.fixtures';
import Adapter from 'enzyme-adapter-react-16';
import Head from '../Head';
import React from 'react';

configure({ adapter: new Adapter() });

jest.mock(
  'shared/media/favicon/apple-touch-icon.png',
  () => 'test-apple-touch-icon.png-stub',
  {
    virtual: true,
  },
);
jest.mock(
  'shared/media/favicon/favicon-32x32.png',
  () => 'test-favicon-32x32.png-stub',
  {
    virtual: true,
  },
);
jest.mock(
  'shared/media/favicon/favicon-16x16.png',
  () => 'test-favicon-16x16.png-stub',
  {
    virtual: true,
  },
);
jest.mock(
  'shared/media/favicon/manifest.json',
  () => 'test-manifest.json-stub',
  {
    virtual: true,
  },
);
jest.mock(
  'shared/media/favicon/safari-pinned-tab.svg',
  () => 'test-safari-pinned-tab.svg-stub',
  {
    virtual: true,
  },
);

describe('<Head />', () => {
  it('renders correctly with proper SEO data', () => {
    const manifest = 'manifest.json';
    const themeColor = '#000000';
    const tree = shallow(
      <Head seo={mockSeo} manifest={manifest} themeColor={themeColor} />,
    );
    const helmetWrapper = tree.find('HelmetWrapper');

    expect(helmetWrapper.props().defaultTitle).toBe(mockSeo.title);
    expect(helmetWrapper.props().htmlAttributes).toEqual(
      mockSeo.htmlAttributes,
    );
    expect(helmetWrapper.props().meta).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'description',
          content: 'FPS React Head component',
        }),
        expect.objectContaining({
          name: 'keywords',
          content: 'ecommerce, Fashion, Luxury, Shopping',
        }),
        expect.objectContaining({
          property: 'og:title',
          content: 'FPS React Head',
        }),
        expect.objectContaining({
          property: 'og:locale',
          content: 'en_US',
        }),
        expect.objectContaining({
          name: 'twitter:card',
          content: 'product',
        }),
        expect.objectContaining({
          name: 'theme-color',
          content: '#000000',
        }),
      ]),
    );
    expect(helmetWrapper.props().link[0]).toEqual(
      expect.objectContaining({ rel: 'manifest', href: manifest }),
    );
  });

  it('renders correctly with invalid or missing SEO data (mockSeoInvalid)', () => {
    const tree = shallow(<Head seo={mockSeoInvalid} />);
    const helmetWrapper = tree.find('HelmetWrapper');

    expect(mockSeoInvalid.description).toBeUndefined();
    expect(helmetWrapper.props().defaultTitle).toBe('');
    expect(helmetWrapper.props()).not.toHaveProperty('description');
  });

  it('should not render Helmet if there is no SEO data', () => {
    const tree = shallow(<Head />);
    const helmetWrapper = tree.find('HelmetWrapper');

    expect(helmetWrapper).toMatchSnapshot();
  });
});
