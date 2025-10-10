"use client"
import React from 'react'
import Backgroundforregis from '../../components/Backgroundforregis'
import Navbar from '../../components/Navbar'

function Page() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Layout responsive */}
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* ฝั่งซ้าย = Background */}
        <div className="w-full md:w-1/2">
          <Backgroundforregis />
        </div>

        {/* ฝั่งขวา = Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-200 p-6 sm:p-10">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold text-center mb-6">
              CREATE ACCOUNT FOR ADMIN
            </h2>

            <form className="space-y-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  pattern="^[a-zA-Z0-9]{4,12}$"
                  required
                  className="w-full text-sm sm:text-base p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  pattern="^[a-zA-Z0-9]{4,ุ6}$"
                  required
                  className="w-full text-sm sm:text-base p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                  required
                  className="w-full text-sm sm:text-base p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  required
                  className="w-full text-sm sm:text-base p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white text-sm sm:text-base p-2 rounded hover:bg-green-600 transition"
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
