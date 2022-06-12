import { useState } from "react";

const Header = ({ api, terminal, setTerminal, setSearch }) => {

  return (
    <div className='w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40'>
      <div className='relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center'>
        <div className='relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0'>
          <div className='container relative left-0 z-50 flex w-3/4 h-auto h-full'>
            <div className='relative flex items-center w-full lg:w-64 h-full group'>
              <div className='absolute z-50 flex items-center justify-center block w-auto h-10 text-sm text-gray-500 uppercase cursor-pointer sm:hidden'>
              </div>
            </div>
          </div>

          <div className='relative p-1 flex items-center justify-end w-1/2 ml-5 mr-4 sm:mr-0 sm:right-auto'>
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
                <li><a href="/notes" >Notas</a></li>
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

