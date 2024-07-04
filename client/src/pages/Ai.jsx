import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import Credits from '../components/Credits';
import HomeOptions from '../components/HomeOptions';
import TypeWriterText from '../components/TypeWriterTextEffect';

import answers from '../utils/answers.json';

export default function Ai() {

  const [search, setSearch] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [responseText, setResponseText] = useState('');

  const onSearch = (searchText) => {
    const response = answers[searchText] || answers.default;
    setResponseText(response);
    setSearch(searchText);
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
      <header className="flex items-center justify-center w-1/2 py-6 text-white bg-gray-900">
        <h1 className="text-4xl font-bold">Nanny Stork</h1>
      </header>
      <section className="flex flex-col items-center justify-center w-1/2 py-6 text-white bg-gray-900">
        {search.length === 0 ?
          <HomeOptions />
          :
          <>
            <div className='flex items-center justify-center w-full mt-10'>
              <TypeWriterText text={responseText} onTextCompleted={setShowMore} />
            </div>
            {showMore &&
              <div className='flex items-center justify-center w-full mt-10'>
                {/* Optionally, handle additional responses or actions when 'showMore' is true */}
              </div>
            }
          </>}
        <div className='flex items-center justify-center w-full mt-10'>
          <SearchInput onSearch={onSearch} />
        </div>
      </section>
      <footer className="flex items-center justify-center w-1/2 py-6 text-white bg-gray-900">
        <Credits />
      </footer>
    </main>
  )
}