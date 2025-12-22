import React, { Component } from 'react'

export class Login extends Component {
  render() {
    return (
      <div>

        <div className="flex items-center justify-center min-h-screen bg-gray-100 bagraundimg">
        <form className="w-full max-w-sm p-8 rounded-lg shadow-md border-white border-2">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
                Login
            </button>
        </form>
    </div>
        
      </div>
    )
  }
}

export default Login
