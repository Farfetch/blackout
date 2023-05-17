import { cleanup, fireEvent, render } from '@testing-library/react';
import { mockImage, mockVideo } from 'tests/__fixtures__/contents/index.mjs';
import React from 'react';
import Video from '../components/video/index.js';

jest.mock('react-player', () => ({ default: () => 'React Player' }));

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
