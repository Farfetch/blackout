import { cleanup, render } from '@testing-library/react';
import { mockCta, mockImage } from '../__tests__/__mocks__/MediaMocks.js';
import Image from '../components/image';
import React from 'react';

describe('<Image />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Image data={{ ...mockImage }} breakpoint="lg" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render image with cta when data has link', () => {
    const dataTest = 'image';
    const { getByTestId } = render(
      <Image
        data-test={dataTest}
        data={{ ...mockImage, ...mockCta }}
        breakpoint="lg"
      />,
    );

    expect(getByTestId(`${dataTest}-link`)).toBeInTheDocument();
  });
});
