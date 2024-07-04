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
        <div className="flex items-center justify-center w-2/3 bg-white p-4">
            <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative bg-white dark:bg-gray-700 rounded-md shadow-lg">
                <Input
                    type="text"
                    color='pink'
                    size="md"
                    placeholder="Send a message..."
                    value={search}
                    onChange={handleChange}
                />
                <div className='flex justify-center'>
                <Button
    style={{ background: '#f48fb1' }}
    size="sm"
    className="mt-2 w-1/6 flex justify-center items-center" 
    onClick={onClickSearch}
>
    <svg className='' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"> 
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
</Button>
                </div>
            </div>
        </div>
    );
};

export default SearchInput;