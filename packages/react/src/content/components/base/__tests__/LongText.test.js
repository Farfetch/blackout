import { render } from '@testing-library/react';
import LongText from '../longText/LongText';
import React from 'react';

describe('<LongText />', () => {
  const data = {
    value: 'foo',
  };

  it('should render properly', () => {
    const { getByText } = render(<LongText data={data} />);

    expect(getByText('foo')).toBeInTheDocument();
  });
});
