import React from 'react';
import { render } from '@testing-library/react';
import PhotoGridItem from '../PhotoGridItem';
import { Photo } from '@/interfaces';

const mockPhoto: Photo = {
    id: 1,
    src: {
        medium: 'https://via.placeholder.com/200',
        original: '',
        large2x: '',
        large: '',
        small: '',
        portrait: '',
        landscape: '',
        tiny: ''
    },
    alt: 'Test Photo',
    width: 0,
    height: 0,
    url: '',
    photographer: '',
    photographer_url: ''
};

describe('PhotoGridItem', () => {
    it('renders without crashing', () => {
        const { getByAltText } = render(            
            <PhotoGridItem photo={mockPhoto} />            
        );
        expect(getByAltText('Test Photo')).toBeInTheDocument();
    });

    it('renders the image with correct src and alt attributes', () => {
        const { getByAltText } = render(
            
                <PhotoGridItem photo={mockPhoto} />
            
        );
        const imgElement = getByAltText('Test Photo');        
        expect(imgElement).toHaveAttribute('alt', 'Test Photo');
    });

    it('renders the link with correct href attribute', () => {
        const { container } = render(
            
                <PhotoGridItem photo={mockPhoto} />
            
        );
        const linkElement = container.querySelector('a');
        expect(linkElement).toHaveAttribute('href', '/photo/1');
    });
});