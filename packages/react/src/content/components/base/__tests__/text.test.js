import { render } from '@testing-library/react';
import React from 'react';
import Text from '../text/Text';

describe('<Text />', () => {
  const data = {
    value: 'foo',
  };

  it('should render properly', () => {
    const { container } = render(<Text data={data} />);

    expect(container).toMatchSnapshot();
  });
});
