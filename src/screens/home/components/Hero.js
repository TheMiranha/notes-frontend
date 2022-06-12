import Home_Notes from '../../../assets/home_notes.svg'

const Hero = ({api}) => {
  return (
    <div className='container px-6 py-16 mx-auto'>
      <div className='items-center lg:flex'>
        <div className='w-full lg:w-1/2'>
          <div className='lg:max-w-lg'>
            <h1 className='text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl'>
              Gerencie suas notas
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>
              Leia e escreva onde quiser, <br/>compartilhe com quem quiser
            </p>
            <button onClick={() => {window.location.href = api.user ? '/notes' : '/auth'}} className='w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
              {api.user ? 'Ver notas' : 'Começar'}
            </button>
          </div>
        </div>

        <div className='flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2'>
          <img
            className='w-full h-full lg:max-w-2xl'
            src={Home_Notes}
            alt='Catalogue-pana.svg'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
