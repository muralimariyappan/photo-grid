import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from '../SearchComponent';

describe('SearchComponent', () => {
    it('renders correctly with placeholder', () => {
        const { getByPlaceholderText } = render(
            <SearchComponent onSearch={jest.fn()} placeholder="Search..." />
        );
        expect(getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('calls onSearch with the correct query', () => {
        const onSearchMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <SearchComponent onSearch={onSearchMock} placeholder="Search..." />
        );

        const input = getByPlaceholderText('Search...');
        const button = getByText('Search');

        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(button);

        expect(onSearchMock).toHaveBeenCalledWith('test query');
    });

    it('updates input value on change', () => {
        const { getByPlaceholderText } = render(
            <SearchComponent onSearch={jest.fn()} placeholder="Search..." />
        );

        const input = getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'new query' } });

        expect(input).toHaveValue('new query');
    });

    it('does not call onSearch if input is empty', () => {
        const onSearchMock = jest.fn();
        const { getByText } = render(
            <SearchComponent onSearch={onSearchMock} placeholder="Search..." />
        );

        const button = getByText('Search');
        fireEvent.click(button);

        expect(onSearchMock).not.toHaveBeenCalled();
    });
});