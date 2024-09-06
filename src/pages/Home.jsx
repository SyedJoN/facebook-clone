import React, { useEffect, useState } from "react";
import { Sidebar, Sidebar_2, Stories, Posts, MobileMenu } from "../Components";

import { useDispatch, useSelector } from "react-redux";

function Home() {
  const showMenu = useSelector((state) => state.showMenu.showMenu);

  return (
    <div
      className={`flex flex-col relative`}
      // style={{minHeight:"calc(100vh - 56px)"}}
    >
      <div
        className="relative z-0 flex flex-col flex-grow min-h-[inherit]"
        // style={{marginBottom:"calc(-100vh + 56px"}}
      >
        <div>{showMenu && <MobileMenu />}</div>
        <div
          className={`${
            showMenu ? "hidden" : "flex"
          } relative z-0 items-start justify-between flex-grow shrink basis-0 min-h-[inherit] max-w-none`}
        >
          <div
            style={{ minHeight: "calc(100vh - 56px)" }}
            className="main-section-container relative flex basis-0 min-w-0 shrink items-stretch justify-between flex-grow"
          >
            <div
              className="sidebar_1 sticky z-0 left-0 top-[56px] max-w-[360px] min-w-[280px] overflow-hidden basis-[360px] shrink-[9999] min-h-[inherit] max-h-0"
            >
              <Sidebar />
            </div>
            <div className="flex flex-grow justify-center min-w-0 md:px-[32px] items-stretch basis-[741px] shrink">
              <div className="min-w-0 max-w-full shrink-0 flex flex-col">
                <div className="flex flex-col mt-[8px] w-full">
                  <div className="stories max-w-full w-[590px] ">
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
