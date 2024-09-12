import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Header, Footer, MobileMenu, WritePostCard } from "./Components/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowPost } from "./store/showMenuSlice";
import { throttle } from "lodash"; 

function App() {
  const writePost = useSelector((state) => state.showMenu.writePost);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [prevScroll, setPrevScroll] = useState(0);


  const handleClosePost = () => {
 
      dispatch(setShowPost(false));
  };

  useEffect(() => {
    const container = containerRef.current;

    if (writePost) {
      // Capture and store the current scroll position
      setPrevScroll(window.scrollY); // Store the current scroll position before locking
      console.log('setting, prev scroll', window.scrollY)
      container.style.position = "fixed";// Adjust top to prevent jump
      container.style.left = "0";
      container.scrollTop = scrollY;
    } else {
      // Restore the scroll position when unlocking
      container.style.position = "relative";
      container.style.top = ""; // Reset any fixed styles
      window.scrollTo(0, prevScroll); // Restore the scroll position
    }
  }, [writePost, prevScroll]);

  useEffect(() => {
    // Throttle the scroll event for better performance
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (currentScrollY > 0)
        setPrevScroll(currentScrollY);
        console.log('scrollll')
      
    }, 300); // Adjust throttle delay based on your performance needs

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative z-0 mainScroll">
          <div role="banner">
            <a className="fixed flex items-center top-0 flex-shrink-0 h-[56px] ml-4 z-[3]">
              <svg
                viewBox="0 0 36 36"
                style={{ color: "#0866FF" }}
                className="block"
                fill="currentColor"
                height="40"
                width="40"
              >
                <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path>
                <path
                  fill="white"
                  d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
                ></path>
              </svg>
            </a>
            <Header />
          </div>
          <div
            ref={containerRef}
            className={`${
              writePost ? "mainScroll overflow-y-auto w-full h-full" : "z-0"
            }`}
          >
            <main
              style={{ minHeight: "calc(100vh - 56px)" }}
              className="relative z-0 bg-[#18191A] flex flex-col top-[56px]"
            >
              <Outlet />
            </main>
          </div>
        </div>
      )}

      {/* Use portal for the writePost modal */}
      {writePost &&
       (
          <div className="relative z-[3]">
            <div className="relative z-0">
              <div className="postCard flex flex-col justify-center relative min-h-[100vh]">
                <div
                  onClick={() => handleClosePost()}
                  className="fixed inset-0 bg-[rgba(11,11,11,0.8)]"
                ></div>
                <div className="relative flex-shrink-[inherit] flex-grow-[inherit] flex-direction-[inherit] justify-content-[inherit] align-items-[inherit] h-[inherit] max-h-[inherit] min-h-[inherit]">
                  <div className="flex flex-col justify-center items-stretch flex-grow-0 min-h-[100vh]">
                    <div className="flex min-h-[500px] py-14 px-2 items-start justify-center min-w-0 pointer-events-none overflow-hidden z-0">
                      <div className="relative flex flex-col max-w-full overflow-hidden outline-none bg-[#242526] z-0 rounded-[8px] shadowStyle-1 box-content">
                        {writePost && <WritePostCard />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default App;
