import { cleanup, render } from '@testing-library/react';
import { mockCta, mockImage } from 'tests/__fixtures__/contents/index.mjs';
import Image from '../components/image/index.js';
import React from 'react';

describe('<Image />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Image
        data={{ ...mockImage }}
        showAsThumbnail={false}
        breakpoint={'Xs'}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render image with cta when data has link', () => {
    const dataTest = 'image';
    const { getByTestId } = render(
      <Image
        data-test={dataTest}
        data={{ ...mockImage, ...mockCta }}
        showAsThumbnail={false}
        breakpoint={'Xs'}
      />,
    );

    expect(getByTestId(`${dataTest}-link`)).toBeInTheDocument();
  });
});
