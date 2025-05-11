import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return <footer className='bg-gray-950 py-6 mt-12'>
    <p className='container mx-auto text-center text-gray-600 dark:text-gray-400'>
        &copy;2025_UMC_8th_FE_돌려돌려돌림판.All
    </p>
    <div className='flex justify-center space-x-4 mt-4 text-gray-600 dark:text-gray-400'>
        <Link to={"#"}>Privacy Policy</Link>
        <Link to={"#"}>Terms of Service</Link>
        <Link to={"#"}>Contact</Link>
    </div>
  </footer>
}

export default Footer
