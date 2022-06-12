import Sidebar from './components/Sidebar'
import Header from './components/Header'
import NotesT from './components/terminals/NotesT'
import './Notes.css'
import { useEffect, useState } from 'react'

const Notes = ({ api }) => {

  const [terminal, setTerminal] = useState('notes')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getUserByToken().then(x => {
      if (x == false) {
        window.location.href = '/'
      }
    });
  }, [])

  if (!api.user) {
    return <></>
  }
  return (
    <div>
      <main className='bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative'>
        <div className='flex items-start justify-between'>
          <Sidebar terminal={terminal} setTerminal={setTerminal} />
          <div className='flex flex-col w-full pl-0 md:p-4 md:space-y-4'>
            <Header setSearch={setSearch} terminal={terminal} setTerminal={setTerminal} api={api} />
            {terminal == 'notes' ? <NotesT search={search} api={api} /> : false}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Notes
