import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);

      if (response.status === 200) {
        const data = response.data;
        console.log(data); // You can handle the response data here, e.g., set user authentication
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-900 text-white mt-4 rounded-md">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Log in to your account</h2>

      <form className="mt-10 space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              onChange={handleInputChange}
              value={formData.email}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6">Password</label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              onChange={handleInputChange}
              value={formData.password}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log In
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm">
        Not a member?
        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up now</a>
      </p>
    </div>
  );
};

export default LoginForm;
