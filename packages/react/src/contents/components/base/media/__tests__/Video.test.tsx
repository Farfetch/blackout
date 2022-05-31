import { cleanup, fireEvent, render } from '@testing-library/react';
import { mockImage, mockVideo } from 'tests/__fixtures__/contents';
import React from 'react';
import Video from '../components/video';

jest.mock('react-player', () => () => 'React Player');

describe('<Video />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Video data={{ ...mockImage, ...mockVideo }} hasVideo breakpoint="lg" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render react player when click on play', () => {
    const { getByTestId, getByText } = render(
      <Video data={{ ...mockImage, ...mockVideo }} hasVideo breakpoint="lg" />,
    );

    const playButton = getByTestId('play-button');

    fireEvent.click(playButton);

    expect(getByText('React Player')).toBeInTheDocument();
  });
});
