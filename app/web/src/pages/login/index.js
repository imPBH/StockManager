import { useState, useEffect } from 'react';
import RegisterForm from '@/components/modal/RegisterForm';

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formJson)
    })
    .then(response => {
      if (response.ok) {
        // La requête a été réussie, on peut rediriger l'utilisateur vers la page d'accueil par exemple
        window.location.href = '/companies'
      } else {
        // La requête a échoué, on peut afficher un message d'erreur à l'utilisateur
        setLoginError('Invalid credentials')
        throw new Error('Invalid credentials')
      }
    })
    .catch(loginError => {
      // Gérer les erreurs de la requête
      console.error(loginError)
    })
  }

  function handleRegister(form) {
    return fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: form.username, password: form.password})
    })
    .then(response => {
      if (!response.ok) {
        // La requête a échoué, on peut afficher un message d'erreur à l'utilisateur
        setRegisterError("Username already taken")
        throw new Error("Username already taken")
      }
    })
  }

  useEffect(() => {
    setLoginError(null)
    setRegisterError(null)
  }, []);

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-red-600 text-sm mt-1">
                  {loginError}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <RegisterForm onSubmit={handleRegister} error={registerError} />
    </>
  )
}