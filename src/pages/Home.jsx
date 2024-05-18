import React, { useEffect, useState } from 'react';
import { Sidebar, Sidebar_2, Stories, Posts, MobileMenu, WritePostCard } from '../Components';
import { setShowPost } from '../store/showMenuSlice';
import { useDispatch, useSelector } from 'react-redux';


function Home() {
  const dispatch = useDispatch();
  const showMenu = useSelector(state => state.showMenu.showMenu);
  const writePost = useSelector(state => state.showMenu.writePost);

  const handleClosePost = () => {
    dispatch(setShowPost(false))
  }

  return (
    
    <div className={`flex flex-col full_sidebar relative h-min mt-[56px]`}>
    
    <div className="flex flex-col relative">
      <div>
  {showMenu && <MobileMenu/>}

      </div>
    <div className={`${showMenu ? 'hidden' : 'flex'} flex-col relative items-stretch justify-center shrink-0 flex-nowrap`}>
    <div className="flex max-w-[1464px] basis-0 md:max-w-none min-w-0 shrink items-stretch justify-between relative flex-grow ">
      <div className="sticky left-0 h-fit top-[56px] lg:max-w-[360px] lg:min-w-[270px] overflow-hidden basis-[360px] shrink-[9999] min-h-0">
     
          <Sidebar />

      </div>
      <div className='flex flex-grow justify-center min-w-0 md:px-[32px] items-stretch md:basis-[900px] basis-[744px]'>
 
 
        <div className="min-w-0 max-w-full shrink-0 flex flex-col stories  ">
      <div className='mt-[8px] w-full'>
            <div className='w-full'>
          <Stories />
          </div>

          <Posts />
        
          </div>
    
          </div>

      </div>
      <div className="hidden md:flex md:max-w-[360px] md:min-w-[297px] relative shrink-[9999]  ">
        <div className="sticky right-0 top-[3.6rem] h-min overflow-visible md:min-w-[300px] md:max-w-[400px]   ">
          <Sidebar_2 />
        </div>
      </div>
    </div>
    </div>
    <div>
    <div className='fixed bg-[rgba(11,11,11,0.8)] '></div>
    <div onClick={() => handleClosePost()} className={` ${writePost ? 'flex' : 'hidden'} flex-col fixed overflow-auto bg-[rgba(11,11,11,0.8)] w-full h-full top-0 left-0 z-40`}>
      <div className='flex flex-col justify-center items-stretch min-h-[100vh] '>
      <div className="flex min-h-[500px] py-14 px-2 items-start justify-center max-w-full min-w-0">
        <div className='relative flex flex-col max-w-full overflow-hidden outline-none bg-[#242526] z-0 rounded-[8px] shadowStyle-1 box-content'>
  {writePost && <WritePostCard/>}
  </div>
  </div>
  </div>

</div>
      </div>
    </div>
 
    </div>
  );
}

export default Home;
