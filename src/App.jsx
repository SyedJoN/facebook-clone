import React, { useState, useEffect } from 'react';
import { Header, Footer, MobileMenu } from './Components/index';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const writePost = useSelector(state => state.showMenu.writePost);


  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div className={`${writePost ? 'w-full h-full fixed inset-0' : 'relative h-fit '} mainScroll`}>
          
          <Header />
          <div className='relative box-border'>
          <main className='bg-[#18191A] flex flex-col '>
            <Outlet />
          </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
