import React, { useState, useEffect } from 'react';
import { Header, Footer } from './Components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div  className='h-min relative mainScroll'>
          
          <Header />
          <div className='wrapper relative box-border'>
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
