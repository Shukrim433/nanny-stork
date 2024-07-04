import React, { useState } from 'react'

const SearchInput = ({ onSearch }) => {

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const onClickSearch = (e) => {
        e.preventDefault()

        console.log('search', search)
        onSearch(search)

    }

    return (
        <div class="flex items-center justify-center w-2/3  bg-gray-800">
            <div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea tabindex="0" data-id="root" rows="1" placeholder="Send a message..." value={search} className="w-full p-0 pl-2 m-0 bg-transparent border-0 outline-none resize-none pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0" onChange={handleChange} ></textarea>
                <button disabled="" class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40" onClick={onClickSearch}>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    )
}

export default SearchInput