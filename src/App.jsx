import React, { useState, useEffect } from "react";
import { Header, Footer, MobileMenu, WritePostCard } from "./Components/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowPost } from "./store/showMenuSlice";

function App() {
  const writePost = useSelector((state) => state.showMenu.writePost);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleClosePost = () => {
    console.log("triggered");
    dispatch(setShowPost(false));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={`${
            writePost ? "fixed w-full h-full" : "relative z-0"
          } mainScroll`}
        >
          <Header />

          <div className="relative z-0 box-border">
            <main className="relative z-0 bg-[#18191A] flex flex-col">
              <Outlet />
            </main>
          </div>
        </div>
      )}
      <div>
        {writePost && (
          <div className="relative z-3">
            <div className="relative z-0">
              <div className="flex flex-col justify-center relative min-h-[100vh]">
                <div
                  onClick={() => handleClosePost()}
                  className="fixed inset-0 bg-[rgba(11,11,11,0.8)]"
                ></div>
                <div className="flex min-h-[500px] py-14 px-2 items-stretch justify-center max-w-full min-w-0 pointer-events-none overflow-hidden z-0">
                  <div className="relative flex flex-col max-w-full overflow-hidden outline-none bg-[#242526] z-0 rounded-[8px] shadowStyle-1 box-content">
                    {writePost && <WritePostCard />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
