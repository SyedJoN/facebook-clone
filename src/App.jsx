import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Header, Footer, MobileMenu, WritePostCard, Search } from "./Components/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowPost } from "./store/showMenuSlice";
import { throttle } from "lodash";
import { setSearchFocus } from "./store/searchSlice";


function App() {
  const writePost = useSelector((state) => state.showMenu.writePost);
  const searchFocus = useSelector((state) => state.search.searchFocus);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const scrollYRef = useRef(0);
  const prevScrollRef = useRef(0);


  const handleArrowClick = () => {
    dispatch(setSearchFocus(false));
  };

  const handleClosePost = () => {
    dispatch(setShowPost(false));
  };

  useEffect(() => {
    const container = containerRef.current;

    if (writePost) {
      container.style.position = "fixed";
      container.style.left = "0";
      container.scrollTop = scrollYRef.current;
    } else {
      container.style.position = "relative";
      container.style.top = "";
      window.scrollTo(0, prevScrollRef.current);
    }
  }, [writePost, prevScrollRef.current]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!writePost) {
        const currentScrollY = window.scrollY;
        
        scrollYRef.current = currentScrollY;

        prevScrollRef.current = currentScrollY;
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [writePost]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative z-0 mainScroll">
          <div role="banner" className="h-0">
            <a 
            href="http://localhost:5173/"
            className={`fixed flex items-center top-0 flex-shrink-0 h-[56px] ml-4 ${searchFocus ? "opacity-0 z-0" : 'opacity-100 z-[3]'}`}>
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
            <div className="fixed flex top-0 left-0 h-[56px] items-center xl:w-[320px] w-[112px] max-w-[100vw] z-[2]">
        <div className="relative flex px-[16px] w-full">
          <div className="flex items-center w-full">
            <div className="flex w-9 items-center shrink-0">
              <div
                style={{
                  transform: !searchFocus
                    ? "translateX(24px) translateZ(0)"
                    : "translateX(0px) translateZ(0)",
                  transitionProperty: "opacity, transform",
                }}
                className={`${
                  searchFocus ? "opacity-100" : "opacity-0"
                } duration-100 ease-linear`}
              >
                <div className="w-9">
                  <div className="w-7">
                    <div
                      onMouseDown={() => handleArrowClick()}
                      className={`group relative flex items-stretch z-20 w-5 h-5 cursor-pointer`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="block text-[#B0B3B8] svgClass"
                        style={{ color: "#B0B3B8" }}
                      >
                        <g fillRule="evenodd" transform="translate(-446 -350)">
                          <g fillRule="nonzero">
                            <path
                              d="M100.249 201.999a1 1 0 0 0-1.415-1.415l-5.208 5.209a1 1 0 0 0 0 1.414l5.208 5.209A1 1 0 0 0 100.25 211l-4.501-4.501 4.5-4.501z"
                              transform="translate(355 153.5)"
                            ></path>
                            <path
                              d="M107.666 205.5H94.855a1 1 0 1 0 0 2h12.813a1 1 0 1 0 0-2z"
                              transform="translate(355 153.5)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <div className="absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer group-active:bg-[rgba(68,73,80,0.15)] duration-0 group-hover:opacity-100 fade pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
            style={{transitionProperty: "width"}}
            className={`flex shrink-0 ${!searchFocus ? "w-[12px]" : "w-0"} h-[56px] duration-100 ease-linear`}>
              &nbsp;
            </div>
            <Search className="" />
          </div>
        </div>
      </div>
            <Header />
       
          <div
            ref={containerRef}
            className={`${
              writePost ? "mainScroll overflow-y-auto w-full h-full" : "z-0"
            }`}
          >
            <main
              style={{ minHeight: "calc(100vh - 56px)" }}
              className="relative z-0 bg-[#18191A] flex flex-col"
            >
              <Outlet />
            </main>
          </div>
        </div>
        </div>
      )}

      {/* Use portal for the writePost modal */}
      {writePost && (
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
