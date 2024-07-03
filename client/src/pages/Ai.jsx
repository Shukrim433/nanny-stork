import { useState } from 'react'
import SearchInput from '../components/SearchInput'
import Credits from '../components/Credits'
import HomeOptions from '../components/HomeOptions'
import TypeWriterText from '../components/TypeWriterTextEffect'

//import answers from './answers/fl1.json'

export default function Ai() {

  const [search, setSearch] = useState('')
  const [showMore, setShowMore] = useState(false)

  const onSearch = (searchText) => {
    setSearch(searchText);
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">
      <header className="flex items-center justify-center w-1/2 p-10 text-gray-800 bg-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold">Chat GPT</h1>
      </header>
      <section className="flex flex-col items-center justify-center w-1/2 p-10 text-gray-800 bg-gray-800 dark:text-gray-100">

        {search.length === 0 ?
          <HomeOptions />
          :
          <>
            <div className='flex items-center justify-center w-full mt-20'>
              <TypeWriterText text={answers.answer1} onTextCompleted={setShowMore} />
            </div>
            {showMore &&
              <div className='flex items-center justify-center w-full mt-20'>
                <TypeWriterText text={answers.answer2} onTextCompleted={setShowMore} />
              </div>
            }
          </>}
        <div className='flex items-center justify-center w-full mt-20'>
          <SearchInput onSearch={onSearch} />
        </div>

      </section>
      <footer className="flex items-center justify-center w-1/2 p-10 text-gray-800 bg-gray-800 dark:text-gray-100">
        <Credits />
      </footer>
    </main>
  )
}