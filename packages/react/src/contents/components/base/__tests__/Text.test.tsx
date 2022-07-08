import { render } from '@testing-library/react';
import React from 'react';
import Text from '../text/Text';

describe('<Text />', () => {
  const data = {
    value: 'foo',
  };

  it('should render properly', () => {
    const { getByText } = render(<Text data={data} />);

    expect(getByText('foo')).toBeInTheDocument();
  });
});
