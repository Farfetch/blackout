import { render } from '@testing-library/react';
import Html from '../html/Html';
import React from 'react';

describe('<Html />', () => {
  const data = {
    value: '<p>foo</p>',
  };

  it('should render properly', () => {
    const { container } = render(<Html data={data} />);
    const element = container.querySelector('p');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('foo');
  });
});
