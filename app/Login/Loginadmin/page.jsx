import Footer from '../../components/Footer'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'
import React from 'react'
import Logincus from '../../components/Logincus'
import Loginadmin from '../../components/Loginadmin'

function page() {
  return (
    <>
    <Navbar/>
    <Background/>
   <Loginadmin/>
     
  <Footer/>
      
    </>
  )
}

export default page