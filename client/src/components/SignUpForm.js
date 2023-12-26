// src/components/SignUpForm.js

import React from 'react';

const SignUpForm = ({ onSubmit }) => {
  const handleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    onSubmit(formDataObject);
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-xs mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your Phone Number"
          className="input input-bordered w-full max-w-xs" 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
