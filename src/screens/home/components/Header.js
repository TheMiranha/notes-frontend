import AnchorLink from 'react-anchor-link-smooth-scroll'
import SaveIcon from '@mui/icons-material/Save'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useEffect } from 'react'

const Header = ({ api }) => {

  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
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
              <AnchorLink href='#home'>Home</AnchorLink>
            </li>
            <li>
              <AnchorLink href='#features'>Features</AnchorLink>
            </li>
            <li>
              <AnchorLink href='#team'>Equipe</AnchorLink>
            </li>
            {!api.user ? <li>
              <a href="/auth" className="bg-blue-600" style={{color: 'white'}}>Entrar</a>
            </li> : false}
          </ul>
        </div>
        <a className='btn btn-ghost normal-case text-xl'>Notes</a>
      </div>
      <div className={api.user ? 'navbar-center hidden lg:flex' : 'navbar-end hidden lg:flex'}>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <AnchorLink href='#home'>Home</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#features'>Features</AnchorLink>
          </li>
          <li>
              <AnchorLink href='#team'>Equipe</AnchorLink>
            </li>
            {!api.user ? <li>
              <a href="/auth" className="bg-blue-600" style={{color: 'white'}}>Entrar</a>
            </li> : false}
        </ul>
      </div>
      {api.user ? <div className='navbar-end'>
        <div className='flex-none'>
          

          <div className='dropdown dropdown-end'>
            <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={api.ENDPOINT + '/userPicture/' + (api.user ? api.user.id : 'default')} />
              </div>
            </label>
            <ul
              tabIndex='0'
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
                <li>
                <a href="/profile">{api.user.name}</a>
              </li>
              <hr />
              <li>
                <a className='justify-between' href="/notes">Notas</a>
              </li>
              <li>
                <a onClick={() => {
                  api.logout();
                }}>Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </div> : false}
    </div>
  )
}

export default Header
