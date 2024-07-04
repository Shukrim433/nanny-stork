import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';

const SearchInput = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const onClickSearch = (e) => {
        e.preventDefault();
        console.log('search', search);
        onSearch(search);
    };

    return (
        <div className="flex items-center justify-center w-2/3 bg-gray-800">
            <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative bg-white dark:bg-gray-700 rounded-md shadow-lg">
                <Input
                    type="text"
                    color='pink'
                    size="md"
                    placeholder="Send a message..."
                    value={search}
                    onChange={handleChange}
                />
                <Button
                    style={{ background: '#f48fb1' }}
                    size="sm"
                    className="absolute bottom-1.5 md:bottom-2.5 right-1 md:right-2 mb-1"
                    onClick={onClickSearch}
                >
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </Button>
            </div>
        </div>
    );
};

export default SearchInput;