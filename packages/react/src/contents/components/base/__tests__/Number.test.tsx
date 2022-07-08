import { render } from '@testing-library/react';
import Number from '../number/Number';
import React from 'react';

describe('<Number />', () => {
  it('should render properly', () => {
    const { getByText } = render(<Number data={{ value: 12.0 }} />);

    expect(getByText(12)).toHaveTextContent(12);
  });

  it('should not render if it is not a number', () => {
    const { container } = render(<Number data={{ value: 'foo' }} />);

    expect(container.firstChild).toBeNull();
  });
});
