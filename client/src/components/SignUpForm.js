import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:5000/auth/register', formData);

      if (response.status === 201) {
        const data = response.data;
        console.log(data); // You can handle the response data here
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-900 text-white mt-4 rounded-md">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign up for an account</h2>

      <form className="mt-10 space-y-6" onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6">Name</label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              onChange={handleInputChange}
              value={formData.name}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

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
          <label htmlFor="phone" className="block text-sm font-medium leading-6">Phone Number</label>
          <div className="mt-2">
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              required
              onChange={handleInputChange}
              value={formData.phone}
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
              autoComplete="new-password"
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
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in</a>
      </p>
    </div>
  );
};

export default SignUpForm;
