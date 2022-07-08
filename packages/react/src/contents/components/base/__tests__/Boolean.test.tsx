import { render } from '@testing-library/react';
import Boolean from '../boolean/Boolean';
import React from 'react';

describe('<Boolean />', () => {
  it('should render properly', () => {
    const { getByText } = render(<Boolean data={{ value: false }} />);

    expect(getByText('false')).toBeInTheDocument();
  });

  it('should not render if value is null', () => {
    const { container } = render(<Boolean data={{ value: null }} />);

    expect(container.firstChild).toBeNull();
  });
});
