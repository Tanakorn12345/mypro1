import React from 'react'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Logincus from '../../components/Logincus'
import Background from '../../components/Background'
import Loginres from '../../components/Loginres'
function page() {
  return (
    <div>
            <Navbar/>
    <Background/>
     <Loginres/>
     <Footer/>
    </div>
  )
}

export default page