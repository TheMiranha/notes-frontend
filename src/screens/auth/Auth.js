import { useEffect, useState } from 'react'
import Auth_Welcome from '../../assets/auth_welcome.svg'
import Auth_Login from '../../assets/auth_login.svg'

const Auth = ({ api }) => {
  const [registrando, setRegistrando] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.checkToken().then(x => {
      if (x) {
        window.location.href = '/profile'
      }
    });
  },[])

  const submit = async () => {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    if (!registrando) {
      var res = await api.login(email, password)
      if (res.response) {
        window.location.href = '/notes'
      } else {
        setError('Credenciais inválidas')
      }
    } else {
      var name = document.getElementById('name').value
      var confirm_password = document.getElementById('confirm_password').value
      if (confirm_password != password) {
        setError('As senhas digitadas não são iguais')
      } else {
        var res = await api.register(email, password, name)
        if (res.response) {
          window.location.href = '/notes'
        } else {
          setError('Email já cadastrado')
        }
      }
    }
  }

  return (
    <div>
      {error ? <ErrorPop message={error} /> : false}
      <div className='bg-white dark:bg-gray-900'>
        <div className='flex justify-center h-screen'>
          <div
            className='hidden bg-cover lg:block lg:w-2/3'
            style={{
              backgroundImage: `url(${
                registrando ? Auth_Welcome : Auth_Login
              })`,
              backgroundPosition: 'center',
              backgroundSize: 'auto',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
              <div>
                <h2
                  onClick={() => {
                    window.location.href = '/'
                  }}
                  style={{ width: 100 }}
                  className='cursor text-4xl font-bold text-white'
                >
                  Notes
                </h2>

                <p className='max-w-xl mt-3 text-gray-300'>
                  Escreva e leia onde quiser, com quem quiser.
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
            <div className='flex-1'>
              <div className='text-center'>
                <h2
                  onClick={() => {
                    window.location.href = '/'
                  }}
                  className='cursor text-4xl font-bold text-center text-gray-700 dark:text-white'
                >
                  Notes
                </h2>

                <p className='mt-3 text-gray-500 dark:text-gray-300'>
                  {registrando
                    ? 'Digite seus dados para continuar'
                    : 'Digite suas credenciais para acessar sua conta'}
                </p>
              </div>

              <div className='mt-8'>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    submit()
                  }}
                >
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm text-gray-600 dark:text-gray-200'
                    >
                      Email
                    </label>
                    <input
                      required
                      type='email'
                      name='email'
                      id='email'
                      placeholder='nome@email.com'
                      className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </div>

                  {registrando ? (
                    <div className='mt-6'>
                      <label
                        htmlFor='nome'
                        className='block mb-2 text-sm text-gray-600 dark:text-gray-200'
                      >
                        Nome
                      </label>
                      <input
                        required
                        name='name'
                        id='name'
                        placeholder='Nome'
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                  ) : (
                    false
                  )}

                  <div className='mt-6'>
                    <div className='flex justify-between mb-2'>
                      <label
                        htmlFor='password'
                        className='text-sm text-gray-600 dark:text-gray-200'
                      >
                        Senha
                      </label>
                      {registrando ? (
                        false
                      ) : (
                        <a
                          href='/reset-password'
                          className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'
                        >
                          Esqueceu sua senha?
                        </a>
                      )}
                    </div>

                    <input
                    minLength={8}
                      required
                      type='password'
                      name='password'
                      id='password'
                      placeholder='********'
                      className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </div>

                  {registrando ? (
                    <div className='mt-6'>
                      <div className='flex justify-between mb-2'>
                        <label
                          htmlFor='password'
                          className='text-sm text-gray-600 dark:text-gray-200'
                        >
                          Repita sua senha
                        </label>
                      </div>

                      <input
                        required
                        type='password'
                        name='password'
                        id='confirm_password'
                        placeholder='********'
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                  ) : (
                    false
                  )}

                  <div className='mt-6'>
                    <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400'>
                      Entrar
                    </button>
                  </div>
                </form>

                <p className='mt-6 text-sm text-center text-gray-400'>
                  {registrando ? 'Já tem uma conta' : 'Não tem uma conta ainda'}
                  ?{' '}
                  <button
                    onClick={() => {
                      setRegistrando(!registrando)
                    }}
                    className='text-blue-500 focus:outline-none focus:underline hover:underline'
                  >
                    {registrando ? 'Faça o login' : 'Registre-se'}
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ErrorPop = ({ message }) => {
  return (
    <div
      style={{ position: 'absolute', right: 0 }}
      className='w-full max-w-md mx-auto lg:w-2/6 flex mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
    >
      <div className='flex items-center justify-center w-12 bg-red-500'>
        <svg
          className='w-6 h-6 text-white fill-current'
          viewBox='0 0 40 40'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z' />
        </svg>
      </div>

      <div className='px-4 py-2 -mx-3'>
        <div className='mx-3'>
          <span className='font-semibold text-red-500 dark:text-red-400'>Erro</span>
          <p className='text-sm text-gray-600 dark:text-gray-200'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Auth
