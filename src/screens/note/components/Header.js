const Header = ({ api, terminal, setTerminal, setSearch, save, deleteNote, permission }) => {

  return (
    <div className='w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40'>
      <div className='relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center'>
        <div className='relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0'>
          <div className='container relative left-0 z-50 flex w-3/4 h-auto h-full'>

          <div className='dropdown'>
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
              <a onClick={() => window.location.href = '/notes'}>Notas</a>
            </li>
            <li>
              <a onClick={() => {setTerminal('content')}}>Conteúdo</a>
            </li>
            {permission > 1 ? <li>
              <a onClick={() => {setTerminal('settings')}}>Configurações</a>
            </li> : false}
           {permission > 0 && terminal != 'members' ? <>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <li className="text-white bg-gradient-to-r from-green-400 to-blue-500">
              <a onClick={save}>Salvar</a>
            </li>
            <hr/>
            <hr/>
            <hr/>
            {permission > 1 ? <li className="text-white bg-gradient-to-r from-red-400 to-pink-500">
              <a onClick={deleteNote}>Deletar</a>
            </li>: false}</> : false}
          </ul>
        </div>
          {permission > 0 && terminal != 'members' ?
          <div className='hidden lg:flex relative flex items-center w-full lg:w-64 h-full group'>
          <div className='absolute z-50 flex items-center justify-center block w-auto h-10 text-sm text-gray-500 uppercase cursor-pointer sm:hidden'>
          </div>
          
            <button onClick={save} type="button" className="py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Salvar
            </button>

            {permission > 1 ? <button onClick={deleteNote} type="button" className="py-2 px-4  ml-10 bg-gradient-to-r from-red-400 to-pink-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Deletar
            </button> : false}
        </div> : false}
          </div>


          <div className='relative p-1 flex items-center justify-end w-1/2 ml-1 mr-4 sm:mr-0 sm:right-auto'>
            <div href='#' className='dropdown dropdown-end block relative'>
              <label tabIndex={0}>
                <img
                  alt='profile'
                  src={api.ENDPOINT + '/userPicture/' + api.user.id}
                  className='cursor mx-auto object-cover rounded-full h-10 w-10 '
                />
              </label>
              <ul tabIndex="0" className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
                <li><a href="/profile">{api.user.name}</a></li>
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

