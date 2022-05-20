import { fireEvent, render } from '@testing-library/react';
import Boolean from '../boolean/Boolean';
import React from 'react';

describe('<Boolean />', () => {
  const data = {
    displayOptions: {
      displayName: 'Boolean',
    },
    value: true,
  };

  it('should render properly', async () => {
    const { container } = render(<Boolean data={data} />);

    expect(container).toMatchSnapshot();
  });

  it('should change checked to false on click checkbox', () => {
    const { getByLabelText } = render(<Boolean data={data} />);
    const checkbox = getByLabelText('Boolean');

    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(false);
  });
});
