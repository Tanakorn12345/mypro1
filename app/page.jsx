"use client"
import React from "react"
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import Footer from "./components/Footer"
import Background from "./components/Background"
import category from "./components/Category"
import Category from "./components/Category"
import dynamic from "next/dynamic";


export default function Home() {
  const Background = dynamic(() => import("./components/Background"), {
    ssr: false,
  });
  return (
    <div>
      <Navbar/>

      {/* Hero Image */}
      

      <Background/>

      {/* Title */}
      <h2 className="text-center mt-9 font-bold text-xl sm:text-2xl">
        RECOMMENDATION RESTAURANTS
      </h2>

      {/* Card Section */}
      <div className="flex flex-wrap p-6 justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        
     
      </div>


      
        <Category/>
       <Footer/>
    </div>
  )
}

