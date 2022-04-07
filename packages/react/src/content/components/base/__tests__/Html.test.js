import { render } from '@testing-library/react';
import Html from '../html/Html';
import React from 'react';

describe('<Html />', () => {
  const data = {
    value: '<p>foo</p>',
  };

  it('should render properly', () => {
    const { container } = render(<Html data={data} />);

    expect(container).toMatchSnapshot();
  });
});
