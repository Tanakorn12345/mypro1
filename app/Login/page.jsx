"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"
import Selectlogin from '../components/Selectlogin'
import Footer from '../components/Footer'
import Logincustomer from './Logincustomerr/page'
import Background from '../components/Background'

function selectlogin() {

  return (
    
    <>
    <Navbar/>
    <Background/>
     <Selectlogin/>
     <Footer/>
    
    </>
  )
}


export default selectlogin