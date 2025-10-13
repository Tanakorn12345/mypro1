"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function OrderSuccessPage() {
  return (
    <div>
      <Navbar />
      <div className="text-center py-20 min-h-screen">
        <svg className="mx-auto h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">The order was successful!</h1>
        <p className="mt-2 text-gray-600">Thank you for your order. We are preparing the food for you.</p>
        <Link href="/" className="mt-8 inline-block bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
        Return to home page
        </Link>
      </div>
      <Footer />
    </div>
  );
}