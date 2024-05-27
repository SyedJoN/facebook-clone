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
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.showMenu.showMenu);
  const writePost = useSelector((state) => state.showMenu.writePost);



  return (
    <div className={`flex flex-col relative h-min mt-[56px]`}>
      <div className="flex flex-col relative">
        <div>{showMenu && <MobileMenu />}</div>
        <div
          className={`${
            showMenu ? "hidden" : "flex"
          } flex-col relative items-stretch justify-center shrink-0 flex-nowrap`}
        >
          <div className="flex max-w-[1464px] basis-0 md:max-w-none min-w-0 shrink items-stretch justify-between relative flex-grow ">
            <div className="sidebar_1 sticky left-0 h-fit top-[56px] lg:max-w-[360px] lg:min-w-[270px] overflow-hidden basis-[360px] shrink-[9999] min-h-0">
              <Sidebar />
            </div>
            <div className="flex flex-grow justify-center min-w-0 md:px-[32px] items-stretch md:basis-[900px] basis-[744px]">
              <div className="min-w-0 max-w-full  shrink-0 flex flex-col stories  ">
                <div className="flex flex-col mt-[8px] w-full">
                  <div className="w-full">
                    <Stories />
                  </div>

                  <Posts />
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:max-w-[360px] md:min-w-[297px] relative shrink-[9999]  ">
              <div className="sticky right-0 top-[3.6rem] h-min overflow-visible md:min-w-[297px] md:max-w-[400px]">
                <Sidebar_2 />
              </div>
            </div>
        
          </div>
     
        
        </div>
     
      </div>
   
    </div>
  );
}

export default Home;
