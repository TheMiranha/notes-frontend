import { useState } from "react";

const Header = ({ api, terminal, setTerminal, setSearch }) => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const create = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    const title = document.getElementById('note_title').value;
    const description = document.getElementById('note_description').value;
    formData.append('title', title);
    formData.append('description', description)
    await api.createNote(formData);
    setFile(null);
    setFileName("");
    document.getElementById('note_title').value = '';
    document.getElementById('note_description').value = '';
    document.getElementById('my-modal-4').checked = false;
  }

  return (
    <div className='w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40'>
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <h3 className='font-bold text-lg'>
            Preencha os campos para criar uma nota
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              create()
            }}
          >
            <p className='py-4'>
              <a className='relative'>
                <input
                  type='text'
                  autoComplete='off'
                  id='note_title'
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                  placeholder='Título'
                />
              </a>
              <a className='mt-2 relative'>
                <input
                  type='text'
                  autoComplete='off'
                  id='note_description'
                  className='mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                  placeholder='Descrição'
                />
                <input accept="image/png, image/gif, image/jpeg" type="file" id="note_image" onChange={saveFile} name="file" className="inputfile" />
                <label htmlFor="note_image">{fileName.trim().length == 0 ? 'Quer colocar uma foto para sua nota?' : fileName}</label>
              </a>
            </p>
            <div className='modal-action' style={{marginTop: -15}}>
              <button
                htmlFor='my-modal-6'
                className='btn bg-blue-600 hover:bg-blue-700'
                style={{ border: 'none' }}
              >
                Criar
              </button>
            </div>
          </form>
        </label>
      </label>

      <div className='relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center'>
        <div className='relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0'>
          <div className='container relative left-0 z-50 flex w-3/4 h-auto h-full'>
            <div className='relative flex items-center w-full lg:w-64 h-full group'>
              <div className='absolute z-50 flex items-center justify-center block w-auto h-10 text-sm text-gray-500 uppercase cursor-pointer sm:hidden'>
              </div>
              <svg
                className='absolute left-0 z-20 w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
              </svg>
              <input
                type='text'
                className='block w-full py-1.5 pl-10 pr-10 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input'
                placeholder='Pesquisa...'
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{marginRight: 10, position: 'absolute', right: 0, border: '1px solid', borderRadius: 100, height: 25, width: 25, display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="border-gray-300 text-gray-400">
                <label htmlFor="my-modal-4" className="cursor modal-button">
                    +
                </label>
              </div>
            </div>
          </div>

          <div className='relative p-1 flex items-center justify-end w-1/2 ml-5 mr-4 sm:mr-0 sm:right-auto'>
            <div className='dropdown dropdown-end' style={{ marginRight: 5 }}>
              <label tabIndex='0' className='btn btn-ghost lg:hidden'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h8m-8 6h16'
                  />
                </svg>
              </label>
              <ul
                tabIndex='0'
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  {terminal == 'notes' ? (
                    <a href="/profile" className='bg-blue-600' style={{ color: 'white' }}>
                      Notas
                    </a>
                  ) : (
                    <a>Notas</a>
                  )}
                </li>
                <li>
                  {terminal == 'settings' ? (
                    <a className='bg-blue-600' style={{ color: 'white' }}>
                      Configurações
                    </a>
                  ) : (
                    <a>Configurações</a>
                  )}
                </li>
              </ul>
            </div>
            <div href='#' className='dropdown dropdown-end block relative'>
              <label tabIndex={0}>
                <img
                  alt='profile'
                  src={api.ENDPOINT + '/userPicture/' + api.user.id}
                  className='cursor mx-auto object-cover rounded-full h-10 w-10 '
                />
              </label>
              <ul tabIndex="0" className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
                <li><a href="/profile" >{api.user.name}</a></li>
                <hr/>
              <li><a onClick={() => {api.logout()}}>Sair</a></li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

