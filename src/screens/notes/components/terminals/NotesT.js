import React, { useState } from "react";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: 'none',
  },
}));

const NotesT = ({ api, search }) => {

  return (
    <div className='overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0'>
      <div className='flex flex-col flex-wrap sm:flex-row '>
        <div className='w-full sm:w-1/2 xl:w-1/3'>
          {api.user.notes.map(note => {
            if (note.title.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div className='mb-4' key={note.id}>
                  <div className='shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full'>
                    <div className='flex items-center justify-between mb-6'>
                      <div onClick={() => {window.location.href = '/note/' + note.id}} className='cursor flex items-center'>
                        <span className='rounded-xl relative p-1 bg-blue-100'>
                          <img
                            className='rounded-xl'
                            src={api.ENDPOINT + '/notePicture/' + note.id}
                            style={{ height: 40, width: 40 }}
                          />
                        </span>
                        <div className='flex flex-col'>
                          <span className='font-bold text-md text-black dark:text-white ml-2'>
                            {note.title}
                          </span>
                          <span className='text-sm text-gray-500 dark:text-white ml-2'>
                            {note.description}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div className='dropdown dropdown-end'>
                          <ul
                            tabIndex='0'
                            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
                          >
                            {note.permission == 2 ? <li>
                              <a onClick={() => {api.deleteNote(note.id)}} className="bg-red-400 text-white hover:text-red-700">Deletar nota</a>
                            </li> : false}
                          </ul>
                          <label tabIndex='0'>
                            <button className='text-gray-200'>
                              <svg
                                width='25'
                                height='25'
                                fill='currentColor'
                                viewBox='0 0 1792 1792'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z'></path>
                              </svg>
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between mb-4 space-x-12'>
                      {note.priority  == undefined? (
                        false
                      ) : (
                        <span className={`px-2 py-1 flex items-center font-semibold text-xs rounded-md text-${note.priority == '0' ? 'green' : note.priority == '1' ? 'orange' : 'red'}-400 border border-${note.priority == '0' ? 'green' : note.priority == '1' ? 'orange' : 'red'}-400  bg-white`}>
                          Prioridade: {note.priority == '0' ? 'Baixa' : note.priority == '1' ? 'Média' : 'Alta'}
                        </span>
                      )}
                    </div>
                    {note.status ? (
                      <div className='block m-auto'>
                        <div>
                          <span className='text-sm inline-block text-gray-500 dark:text-gray-100'>
                            {note.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      false
                    )}
                    <div
                      className={
                        note.status
                          ? 'flex items-center justify-start my-4 space-x-4'
                          : 'flex items-center justify-start space-x-4'
                      }
                    >
                      {note.tags
                        ? note.tags.map((tag, index) => {
                            if (index % 2 == 0) {
                              return (
                                <span key={'tags-' + index} className='px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50'>
                                  {tag}
                                </span>
                              )
                            }
                            return (
                              <span key={'tags-' + index} className='px-2 py-1 flex items-center text-xs rounded-md text-blue-500 font-semibold bg-blue-100'>
                                {tag}
                              </span>
                            )
                          })
                        : false}
                      {/*
                       */}
                    </div>
                    <hr className="mt-2"/>
                    <div className='flex -space-x-2 mt-2'>
                      {note.contributors.map(contributor => {
                        return (
                          <HtmlTooltip
                          key={'contributor-' + contributor.id}
                          title={
                            <User_Card api={api} data={contributor}/>
                          }
                        >
                          <a href='#' className=''>
                            <img
                              className='inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white'
                              src={
                                api.ENDPOINT + '/userPicture/' + contributor.id
                              }
                              alt={contributor.name}
                              />
                          </a>
                              </HtmlTooltip>
                        )
                      })}
                    </div>
                    <span className='px-2 py-1 flex w-36 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100'>
                      {new Date(note.updated_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            } else {
              return false;
            }
          })}
        </div>
      </div>
    </div>
  )
}

const User_Card = ({data, api}) => {
  return (
    
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <img className="object-cover object-center w-full h-56" src={api.ENDPOINT + '/userPicture/' + data.id} alt="avatar" />

    <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{data.name}</h1>

        {data.description ? <p className="py-2 text-gray-700 dark:text-gray-400">{data.description}</p> : false}
        
        {data.work ? <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11H10V13H14V11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"/>
            </svg>

            <h1 className="px-2 text-sm">{data.work}</h1>
        </div>: false}

        {data.location ? <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
            </svg>

            <h1 className="px-2 text-sm">{data.location}</h1>
        </div> : false}
    </div>
</div>
  )
}

export default NotesT
