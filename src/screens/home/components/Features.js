import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import Home_Features from '../../../assets/home_features.svg';

const Features = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container px-6 py-10 mx-auto'>
        <div className='lg:flex lg:items-center'>
          <div className='w-full space-y-12 lg:w-1/2 '>
            <div>
              <h1 className='text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white'>
                explore <br /> nossos recursos
              </h1>

              <div className='mt-2'>
                <span className='inline-block w-40 h-1 rounded-full bg-blue-500'></span>
                <span className='inline-block w-3 h-1 ml-1 rounded-full bg-blue-500'></span>
                <span className='inline-block w-1 h-1 ml-1 rounded-full bg-blue-500'></span>
              </div>
            </div>

            <div className='md:flex md:items-start md:-mx-4'>
              <span className='inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500'>
                <BusinessCenterIcon/>
              </span>

              <div className='mt-4 md:mx-4 md:mt-0'>
                <h1 className='text-2xl font-semibold text-gray-700 capitalize dark:text-white'>
                  Escreva/Leia em qualquer lugar
                </h1>

                <p className='mt-3 text-gray-500 dark:text-gray-300'>
                  Não está em um equipamento de alto desempenho? Não se preocupe,
                  nosso sistema é compatível com qualquer dispositivo.
                </p>
              </div>
            </div>

            <div className='md:flex md:items-start md:-mx-4'>
              <span className='inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500'>
                <PeopleIcon/>
              </span>

              <div className='mt-4 md:mx-4 md:mt-0'>
                <h1 className='text-2xl font-semibold text-gray-700 capitalize dark:text-white'>
                  Compartilhe suas notas
                </h1>

                <p className='mt-3 text-gray-500 dark:text-gray-300'>
                  Sinta-se livre para compartilhar suas notas com seus amigos ou colegas da corporação.
                </p>
              </div>
            </div>

            <div className='md:flex md:items-start md:-mx-4'>
              <span className='inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500'>
                <CreateIcon/>
              </span>

              <div className='mt-4 md:mx-4 md:mt-0'>
                <h1 className='text-2xl font-semibold text-gray-700 capitalize dark:text-white'>
                  Deixe com que outras pessoas consigam utiliza-las
                </h1>

                <p className='mt-3 text-gray-500 dark:text-gray-300'>
                  Tem uma equipe e precisa que todos consigam atualizar suas notas? Não se preocupe, cuidamos disso para você.
                </p>
              </div>
            </div>
          </div>

          <div className='hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center'>
            <img
              className='w-[28rem] h-[28rem]  xl:w-[34rem] xl:h-[34rem]'
              src={Home_Features}
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
