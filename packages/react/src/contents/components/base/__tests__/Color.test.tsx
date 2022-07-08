import { render } from '@testing-library/react';
import Color from '../color/Color';
import React from 'react';

describe('<Color />', () => {
  it('should render properly', () => {
    const { getByText } = render(<Color data={{ hex: '#000000' }} />);

    expect(getByText('#000000')).toBeInTheDocument();
  });

  it('should not render if hex is null', () => {
    const { container } = render(<Color data={{ hex: null }} />);

    expect(container.firstChild).toBeNull();
  });
});
