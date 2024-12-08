import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between p-4 h-[60px]' >
      <div className="container mx-auto flex  gap-3 md:w-[70vw] text-lg justify-between">
          
          <div className="logo text-2xl"><span className='text-purple-700'>&lt;</span>PassCode<span className='text-purple-700'>/&gt;</span></div>
        <div ><a href="https://github.com/codershivam45" target="_blank " className='flex items-center gap-1'><img src="github.png" width="35" alt="" />Github</a></div>
        </div>
    </nav>
  )
}

export default Navbar
