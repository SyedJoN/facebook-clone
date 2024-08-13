import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Sidebar_2,
  Stories,
  Posts,
  MobileMenu
} from "../Components";

import { useDispatch, useSelector } from "react-redux";

function Home() {

  const showMenu = useSelector((state) => state.showMenu.showMenu);


  return (
    <div 
    className={`flex flex-col relative top-[56px]`}
    style={{minHeight:"calc(100vh - 56px)"}}
    >
      <div className="relative z-0 flex flex-col flex-grow min-h-[inherit]"
      style={{marginBottom:"calc(-100vh + 56px"}}>
        <div>{showMenu && <MobileMenu />}</div>
        <div
          className={`${
            showMenu ? "hidden" : "flex"
          } relative z-0 items-start justify-between flex-grow shrink basis-0 min-h-[inherit] max-w-none`}
        >
          <div className="relative flex basis-0 min-w-0 shrink items-stretch justify-between flex-grow min-h-[inherit]">
            <div 
            style={{overflowAnchor:"none"}}
            className="sidebar_1 sticky z-0 left-0 top-[56px] lg:max-w-[360px] lg:min-w-[270px] overflow-hidden basis-[360px] shrink-[9999] min-h-[inherit] max-h-0">
              <Sidebar />
            </div>
            <div className="flex flex-grow justify-center min-w-0 md:px-[32px] items-stretch md:basis-[900px] basis-[744px]">
              <div className="min-w-0 max-w-full shrink-0 flex flex-col stories">
                <div className="flex flex-col mt-[8px] w-full">
                  <div className="w-full">
                    <Stories />
                  </div>

                  <Posts />
                </div>
              </div>
            </div>
           
              <div className="sidebar_2 sticky right-0 top-[56px] basis-[360px] max-w-[360px] min-w-[280px] max-h-0 overflow-hidden min-h-[inherit]">
                <Sidebar_2 />
    
              </div>
           
        
          </div>
     
        
        </div>
     
      </div>
   
    </div>
  );
}

export default Home;
