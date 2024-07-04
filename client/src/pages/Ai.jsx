import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import Credits from '../components/Credits';
import HomeOptions from '../components/HomeOptions';
import TypeWriterText from '../components/TypeWriterTextEffect';

import answers from '../utils/answers.json';

export default function Ai() {

  const [search, setSearch] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [responses, setResponses] = useState([]);

  const onSearch = (searchText) => {
    const searchTextLower = searchText.toLowerCase();
    const keyword = Object.keys(answers.keywords).find(key =>
      searchTextLower.includes(key.toLowerCase())
    );
    const response = keyword ? answers.keywords[keyword] : answers.default;
    setResponses(prevResponses => [...prevResponses, { query: searchText, response }]);
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
          responses.map((item, index) => (
            <div key={index} className='flex flex-col items-center justify-center w-full mt-10'>
              <p className="text-white">{item.query}</p>
              <TypeWriterText text={item.response} onTextCompleted={() => setShowMore(true)} />
            </div>
          ))
        }
        <div className='flex items-center justify-center w-full mt-10'>
          <SearchInput onSearch={onSearch} />
        </div>
      </section>
      <footer className="flex items-center justify-center w-1/2 py-6 text-white bg-gray-900">
        <Credits />
      </footer>
    </main>
  );
}