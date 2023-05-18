import { cleanup, render } from '@testing-library/react';
import { mockImage } from 'tests/__fixtures__/contents/index.mjs';
import React from 'react';
import Thumbnail from '../components/thumbnail/index.js';

describe('<Thumbnail />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Thumbnail image={mockImage.image} breakpoint={'Xs'} />,
    );

    expect(container).toMatchSnapshot();
  });
});
