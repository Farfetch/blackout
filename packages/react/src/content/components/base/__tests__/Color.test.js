import { render } from '@testing-library/react';
import Color from '../color/Color';
import React from 'react';

describe('<Color />', () => {
  const data = {
    displayOptions: {
      displayName: 'Color',
    },
    hex: '#000',
  };

  it('should render properly', () => {
    const { container } = render(<Color data={data} />);

    expect(container).toMatchSnapshot();
  });

  it('should not render text if it is not a display name', () => {
    const { queryByText } = render(<Color data={data} />);

    expect(queryByText('Color')).not.toBeInTheDocument();
  });
});
