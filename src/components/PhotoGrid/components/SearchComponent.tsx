import styled from '@emotion/styled';
import React, { useState } from 'react';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
`;

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    valid: boolean;
}

const SearchInput = styled.input<SearchInputProps>`
    padding: 8px;    
    margin-right: 0px;
    border: ${(props) => props.valid ? '1px solid #ccc' : '1px solid #f00'};
`;

const Button = styled.button`
    padding: 10px;    
    background-color: #333;
    color: white;
    border: none;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;    
`;

interface SearchComponentProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, placeholder }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query.trim() === '') {
            setError('Please enter a search query');
            return;
        }
        onSearch(query);
    };

    return (
        <Container>
            <SearchInput
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}       
                valid={!error}
            />
            <Button onClick={handleSearch}>Search</Button>                    
        </Container>
    );
};

export default SearchComponent;