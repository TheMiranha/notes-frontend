import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Settings from './terminals/Settings'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useEffect, useState } from 'react'
import Members from './terminals/Members'

const mdParser = new MarkdownIt()

const Note = ({ api }) => {

  const [value, setValue] = useState(``)
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [shareCodeStatus, setShareCodeStatus] = useState('');
  const [note_id, setNoteId] = useState(window.location.pathname.split('/')[2])
  const [terminal, setTerminal] = useState(`content`)

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async() => {
    api.getUserByToken().then(x => {
      if (x) {
        const note = x.notes.filter(a => a.id == note_id)[0]
        if (note != undefined) {
          setValue(note.content)
          setShareCodeStatus(note.shareCodeStatus);
          if (note.tags){
            setTags(note.tags.split(','));
          }
          if(note.priority){
            setPriority(`${note.priority}`);
          } else {
            setPriority('');
          }
        } else {
          window.location.href = '/notes'
        }
      } else {
        window.location.href = '/auth'
      }
    })
  }

  const handleEditorChange = ({ html, text }) => {
    setValue(text)
  }

  const deleteNote = async() => {
    await api.deleteNote(note_id).then(window.location.href = '/notes');
  }

  const save = async() => {
      await api.saveNote(value, note_id);
      await api.saveNoteTags(tags.join(','), note_id);
      await api.saveNotePriority(priority, note_id);
      await api.saveNoteStatus(status, note_id);
      await api.saveShareCodeStatus(shareCodeStatus, note_id);
      await loadData();
  }

  const getNote = () => {
    return api.user.notes.filter(x => x.id == note_id)[0];
  }

  if (!api.user) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <main className='bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative'>
        <div className='flex items-start justify-between'>
          <Sidebar api={api} note_id={getNote().id} permission={getNote().permission} terminal={terminal} setTerminal={setTerminal} note_title={api.user.notes.filter(x => x.id == note_id)[0].title} />
          <div className='flex flex-col w-full pl-0 md:p-4 md:space-y-4'>
            <Header permission={getNote().permission} terminal={terminal} setTerminal={setTerminal} deleteNote={deleteNote} save={save} api={api} />
            {
              terminal == 'content' ? 
              <MdEditor
              readOnly={getNote().permission == 1}
              style={{ width: '100%', height: '88vh' }}
              value={value}
              view={getNote().permission == 0 ? {menu: false, md: false, html: true} : {menu: true, md: true, html: true}}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
            /> : terminal == 'settings' && getNote().permission > 1 ?
            <Settings setShareCodeStatus={setShareCodeStatus} status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} tags={tags} setTags={setTags} api={api} note={getNote()}/> : terminal == 'members' ? <Members api={api} note={getNote()}/> : <div>Error</div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Note