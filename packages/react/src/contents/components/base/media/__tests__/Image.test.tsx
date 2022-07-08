import { cleanup, render } from '@testing-library/react';
import { mockCta, mockImage } from 'tests/__fixtures__/contents';
import Image from '../components/image';
import React from 'react';

describe('<Image />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Image data={{ ...mockImage }} showAsThumbnail={false} />,
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
      />,
    );

    expect(getByTestId(`${dataTest}-link`)).toBeInTheDocument();
  });
});
