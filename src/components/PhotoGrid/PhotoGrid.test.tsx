import React from 'react';
import { render, screen } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';
import useFetchPhotos from '../apis/useFetchPhotos';


jest.mock('../apis/useFetchPhotos');

describe('PhotoGrid', () => {
  it('should render photos correctly', () => {
    const mockPhotos = [
      { id: '1', src: { medium: 'photo1.jpg' }, alt: 'Photo 1' },
      { id: '2', src: { medium: 'photo2.jpg' }, alt: 'Photo 2' },
    ];
    (useFetchPhotos as jest.Mock).mockReturnValue({ photos: mockPhotos });

    render(<PhotoGrid />);

    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 2')).toBeInTheDocument();
  });

  it('should show loading text correctly', () => {
    (useFetchPhotos as jest.Mock).mockReturnValue({ photos: [] });

    render(<PhotoGrid />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});