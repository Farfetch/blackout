import { cleanup, render } from '@testing-library/react';
import {
  mockAudio,
  mockImage,
  mockVideo,
} from '../media/__tests__/__mocks__/MediaMocks.js';
import Media from '../media/Media';
import React from 'react';

jest.mock('../media/components/audio', () => () => 'Audio');
jest.mock('../media/components/video', () => () => 'Video');
jest.mock('../media/components/image', () => () => 'Image');

describe('<Media />', () => {
  afterEach(cleanup);

  it('should render correctly with image', () => {
    const { queryByTestId } = render(
      <Media data={{ fields: { ...mockImage } }} />,
    );
    const element = queryByTestId('media');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Image');
  });

  it('should render correctly with video', () => {
    const { queryByTestId } = render(
      <Media data={{ fields: { ...mockImage, ...mockVideo } }} />,
    );
    const element = queryByTestId('media');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Video');
  });

  it('should render correctly with audio', () => {
    const { queryByTestId } = render(
      <Media data={{ fields: { ...mockImage, ...mockAudio } }} />,
    );
    const element = queryByTestId('media');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Audio');
  });

  it('should render null when no image, audio or video', () => {
    const { container } = render(<Media data={{ fields: {} }} />);

    expect(container.firstChild).toBeNull();
  });
});
