import { cleanup, fireEvent, render } from '@testing-library/react';
import { mockAudio, mockImage } from 'tests/__fixtures__/contents';
import Audio from '../components/audio';
import React from 'react';

jest.mock('react-player', () => () => 'React Player');

describe('<Audio />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(
      <Audio data={{ ...mockImage, ...mockAudio }} hasAudio breakpoint="lg" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render react player when click on play', () => {
    const { getByTestId, getByText } = render(
      <Audio data={{ ...mockImage, ...mockAudio }} hasAudio breakpoint="lg" />,
    );

    const playButton = getByTestId('play-button');

    fireEvent.click(playButton);

    expect(getByText('React Player')).toBeInTheDocument();
  });
});
