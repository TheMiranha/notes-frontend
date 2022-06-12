import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ShareIcon from '@mui/icons-material/Share';
import { useEffect } from 'react';

const Settings = ({ note, api, setTags, tags, priority, setPriority, status, setStatus, setShareCodeStatus }) => {

  useEffect(() => {
    console.log(note);
  },[])

  const addTag = e => {
    if (e.key === 'Enter') {
      var tag = document.getElementById('tag_name').value
      if (tag.trim().length > 0 && tags.indexOf(tag) == -1) {
        setTags([...tags, tag])
        document.getElementById('tag_name').value = ''
      }
    }
  }

  const changePriority = () => {
    setPriority(document.getElementById('priority_input').value)
  }

  const removeTag = tag => {
    setTags(tags.filter(x => x != tag))
  }

  return (
    <div style={{height: '100vh', paddingBottom: 120, overflowY: 'scroll'}}>
      <div className='mb-2 max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='mt-2'>
          <p className='text-2xl font-bold text-gray-700'>Tags</p>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Fique atento(a) ao uso de tags, pois elas são usadas para organizar
            suas notas.
          </p>
        </div>

        <div className='flex relative mt-2' style={{ width: '50%' }}>
          <input
            onKeyPress={addTag}
            type='text'
            id='tag_name'
            className=' rounded-l-lg flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none '
            name='tag_name'
            placeholder='Tag'
          />
          <span className='rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
            <LocalOfferIcon />
          </span>
        </div>

        <div className='mt-2'>
          {tags.map((x, index) => (
            <TagItem name={x} first={index == 0} removeTag={removeTag} />
          ))}
        </div>
      </div>

      <div className='mt-5 max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='mt-2'>
          <p className='text-2xl font-bold text-gray-700'>Prioridade</p>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Grau de prioridade da nota
          </p>
        </div>

        <select
          defaultValue={priority}
          id='priority_input'
          onChange={changePriority}
          className='block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
          name='animals'
        >
          <option value=''>Selecione uma opção</option>
          <option value='0'>Baixa</option>
          <option value='1'>Média</option>
          <option value='2'>Alta</option>
        </select>

      </div>

      <div className='mt-5 max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='mt-2'>
          <p className='text-2xl font-bold text-gray-700'>Status</p>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Aqui você pode definir um curto texto que representa o status da nota
          </p>
        </div>

        <textarea style={{resize: 'none', marginTop: 10, width: '100%', height: 200}} onChange={(e) => setStatus(e.target.value.trim())} className="textarea textarea-info focus:border-none" placeholder="Status">{status}</textarea>

      </div>

      <div className='mt-5 max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='mt-2'>
          <p className='text-2xl font-bold text-gray-700'>Compartilhamento</p>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Sinta-se livre para compartilhar sua nota com outros usuários
          </p>
        </div>
        <div className='flex relative mt-2' style={{ width: '50%' }}>
          <input
          id="share_code_input"
            value={note.share_code ? note.share_code : 'Link ainda não gerado'}
            type='text'
            className=' rounded-l-lg flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none '
          />
          <select onChange={(e) => setShareCodeStatus(e.target.value)} className="select select-bordered" style={{borderLeft: 'none', borderRadius: 0}}>
      <option selected={note.share_code_status == 0} value='0'>Desativado</option>
      <option selected={note.share_code_status == 1} value='1'>Apenas ver</option>
      <option selected={note.share_code_status == 2} value='2'>Ver e editar</option>
      <option selected={note.share_code_status == 3} value='3'>Adiministrador</option>
    </select>
          <button onClick={() => {api.generateShareCode(note.id)}} className='rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
            <ShareIcon />
          </button>
        </div>
          <button onClick={() => {
            copyToClipboard(window.location.host + '/share_code/' + note.share_code)
            }}className="mt-2 text-green-500">Clique aqui para copiar o link</button>
      </div>

      <div className='mt-5 max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='mt-2'>
          <p className='text-2xl font-bold text-gray-700'>Desconectar</p>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Desconecta esta nota de sua conta (caso não haja outros administradores, a nota será deletada)
          </p>
          <button onClick={() => {
            api.leave(note.id).then(() => {
              window.location.href = '/notes'
            })
          }} className="btn btn-error mt-2 text-white">Desconectar</button>
        </div>
      </div>
    </div>

  )
}

const TagItem = ({ name, removeTag, first }) => {
  return (
    <div className={'badge badge-success gap-2' + (first ? '' : ' ml-2')}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        onClick={() => removeTag(name)}
        className=' cursor inline-block w-4 h-4 stroke-current'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M6 18L18 6M6 6l12 12'
        ></path>
      </svg>
      {name}
    </div>
  )
}

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return prompt("Copy to clipboard: Ctrl+C, Enter", text);
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
}

export default Settings
