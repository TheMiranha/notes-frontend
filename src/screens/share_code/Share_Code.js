import { useEffect, useState } from 'react'

const Share_Code = ({ api }) => {

  const [note, setNote] = useState('false')
  const [share_code] = useState(window.location.pathname.split('/')[2])

  useEffect(() => {
    var share_code = window.location.pathname.split('/')[2]
    api.getNoteByShareCode(share_code).then(x => {
      if (x.response == false) {
        setNote('invalid')
      } else {
        setNote(x.response);
      }
    })
  }, [])

  if (note == 'false') {
    return <>Loading</>
  }

  if (note == 'invalid') {
    return (
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className='dark:bg-gray-800 bg-white relative overflow-hidden h-screen'
      >
        <div className='flex relative z-20 items-center'>
          <div className='container mx-auto px-6 flex flex-col justify-between items-center relative'>
            <div className='flex flex-col'>
              <p className='text-3xl my-6 text-center dark:text-white'>
                Convite inválido
              </p>
              <button
                onClick={() => {
                  window.location.href = '/notes'
                }}
                className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'
              >
                Voltar para suas notas
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (note.contributors.filter(x => x.id == api.user.id).length > 0) {
    return (
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className='dark:bg-gray-800 bg-white relative overflow-hidden h-screen'
      >
        <div className='flex relative z-20 items-center'>
          <div className='container mx-auto px-6 flex flex-col justify-between items-center relative'>
            <div className='flex flex-col'>
              <img
                src={api.ENDPOINT + '/notePicture/' + note.id}
                className='rounded-full w-28 mx-auto'
              />
              <p className='text-3xl my-6 text-center dark:text-white'>
                {note.title}
              </p>
              {note.description || note.status ? (
                <h2 className='max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2'>
                  Você já tem acesso a esta nota
                </h2>
              ) : (
                false
              )}
              <div className='flex items-center justify-center mt-4'>
                <button
                  onClick={() => {
                      window.location.href = '/note/' + note.id
                  }}
                  className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'
                >
                  Ver nota
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className='dark:bg-gray-800 bg-white relative overflow-hidden h-screen'
    >
      <div className='flex relative z-20 items-center'>
        <div className='container mx-auto px-6 flex flex-col justify-between items-center relative'>
          <div className='flex flex-col'>
            <img
              src={api.ENDPOINT + '/notePicture/' + note.id}
              className='rounded-full w-28 mx-auto'
            />
            <p className='text-3xl my-6 text-center dark:text-white'>
              {note.contributors.filter(x => x.permission == 2)[0].name} te
              convidou para participar de {note.title}
            </p>
            {note.description || note.status ? (
              <h2 className='max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2'>
                {note.description || note.status}
              </h2>
            ) : (
              false
            )}
            <div className='flex items-center justify-center mt-4'>
              <button
                onClick={() => {
                  api.acceptShareCode(share_code).then(x => {
                    window.location.href = '/note/' + note.id
                  })
                }}
                className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'
              >
                Aceitar convite
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Share_Code
