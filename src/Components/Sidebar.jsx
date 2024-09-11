import React, { useRef, useEffect, useState } from "react";

function Sidebar() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const trackRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const prevYref = useRef(null);
  const clientXref = useRef(null);
  const scaleRef = useRef(null);
  const translateZRef = useRef(null);

  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);


const handleEditMenu = () => {
  setShowEdit(true);
}

const handleEditMenuStop = () => {
  setShowEdit(false);

}

  const clickHandler = () => {
    setSeeMore((prev) => !prev);
  };
  const clickHandler2 = () => {
    setSeeMore2((prev) => !prev);
  };

  useEffect(() => {
    if (!seeMore && !seeMore2) {
      scrollRef.current = false;      
    } 
  
  }, [seeMore, seeMore2]);


  useEffect(() => {
    const updateScrollbar = () => {
      const containerHeight = containerRef.current?.clientHeight;
      const contentHeight = contentRef.current?.scrollHeight;

      const scaleValue = contentHeight / containerHeight;
      scaleRef.current = scaleValue;

      const translateZValue = scaleValue - 1;
      translateZRef.current = translateZValue;

      if (!containerRef.current || !scrollThumbRef.current) return;

      const newThumbHeight =
        (containerHeight / contentHeight) * containerHeight;

      if (
        containerHeight !== contentHeight
      ) {
        setThumbHeight(newThumbHeight);
        setScrollOpacity(1);
      }
    else {
        setScrollOpacity(0);
        setThumbHeight(0);
      }
   
    };

    const handleResize = () => updateScrollbar();
    // Update scrollbar on initial render and window resize
    updateScrollbar();
 
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [seeMore, seeMore2]);



  const startScroll = (direction) => {
    const scrollAmount = 1; // Amount to scroll each frame
    const scrollSpeed = 5; // Speed of scrolling in pixels per frame
    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();

    const scroll = () => {
      if (!containerRef.current) return;

      const maxScrollHeight =
        contentRef.current.scrollHeight - containerRef.current.clientHeight;

      if (
        direction === "up" &&
        containerRef.current.scrollTop > 0 &&
        clientXref.current > trackRect.left &&
        trackRect.right > clientXref.current
      ) {
        containerRef.current.scrollTop -= scrollAmount * scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      } else if (
        direction === "down" &&
        containerRef.current.scrollTop < maxScrollHeight &&
        clientXref.current > trackRect.left &&
        trackRect.right > clientXref.current
      ) {
        containerRef.current.scrollTop += scrollAmount * scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      } else {
        console.log("hogiya return");
        return;
      }
    };
    scrollIntervalRef.current = requestAnimationFrame(scroll);
    scrollRef.current = true;

    return () => {
      stopScroll();
    };
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const trackElement = trackRef.current;

    // Define event handlers
    const onMouseDown = (e) => {
      clientXref.current = e.clientX;

      console.log("onMouseDown");

      e.preventDefault(); // Prevent text selection while dragging
      const clickY = e.clientY;
      const startScrollOffset = containerRef.current.scrollTop;
      const thumb = scrollThumbRef.current;
      const thumbRect = thumb.getBoundingClientRect();

      if (clickY < thumbRect.top) {
        startScroll("up");
      } else if (clickY > thumbRect.bottom) {
        startScroll("down");
      }

      const onMouseMove = (e) => {
        stopScroll();
        const clientY = e.clientY;
        clientXref.current = e.clientX;

        const maxScrollHeight =
          contentRef.current.scrollHeight - containerRef.current.clientHeight;

        if (
          (containerRef.current.scrollTop === 0 &&
            clientY < prevYref.current) ||
          (containerRef.current.scrollTop === maxScrollHeight &&
            clientY > prevYref.current)
        ) {
          prevYref.current = clientY;
          return;
        }

        if (thumbRect.top <= clickY && clickY <= thumbRect.bottom) {
          const deltaY = e.clientY - clickY;
          const scrollY =
            startScrollOffset +
            deltaY *
              (contentRef.current.scrollHeight /
                containerRef.current.clientHeight);

          containerRef.current.scrollTop = scrollY;
          setScrollOpacity(1);
          prevYref.current = clientY;
        } else {
          if (clickY < thumbRect.top) {
            startScroll("up");
            return;
          } else if (clickY > thumbRect.bottom) {
            startScroll("down");
            return;
          }

          prevYref.current = clientY;
          return;
        }

        mouseMoveRef.current = true;
        scrollRef.current = false;

        return;
      };

      setScrollOpacity(1);
      mouseMoveRef.current = false;

      const onMouseUp = (e) => {
        clientXref.current = null;
        prevYref.current = null;
        stopScroll();
        console.log("onMouseUp");
        e.preventDefault();
        mouseUpRef.current = true;
        setTimeout(() => {
          if (
            mouseUpRef.current &&
            mouseMoveRef.current &&
            leaveHandlerFnRef.current
          ) {
            setScrollOpacity(0);
          }
        }, 1000);

        // Cleanup event listeners
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      // Attach event listeners
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    // Attach mousedown event listener to trackElement
    if (trackElement) {
      trackElement.addEventListener("mousedown", onMouseDown);
    }

    // Cleanup function
    return () => {
      if (trackElement) {
        trackElement.removeEventListener("mousedown", onMouseDown);
      }
      stopScroll();
    };
  }, []);

  const enterHandler = () => {
    leaveHandlerFnRef.current = false;
    if (containerRef.current.clientHeight !== contentRef.current.scrollHeight) 
      setScrollOpacity(1);
  };

  const LeaveHandler = () => {
    leaveHandlerFnRef.current = true;
    const isScrollable = containerRef.current?.clientHeight !== contentRef.current?.scrollHeight;
    !scrollRef.current && isScrollable && setScrollOpacity(0);
  };

  return (
    <div className="relative flex flex-col min-h-[inherit] max-h-[inherit] z-0">
      <div
        style={{
          willChange: "transform, scroll-position",
          perspective: "1px",
          transformStyle: "preserve-3d",
          perspectiveOrigin: "top right",
          overflowAnchor: "none"
        }}
        className={`overflow-y-auto
        overflow-x-hidden overscroll-y-contain relative hidden lg:flex lg:flex-col flex-grow shrink basis-[100%]`}
        onMouseEnter={enterHandler}
        onMouseLeave={LeaveHandler}
        ref={containerRef}
      >
        <div 
        ref={contentRef}
        className="relative flex flex-col flex-grow">
        <div
          className={`content-item flex flex-col sidebar flex-grow mt-4 text-[#E4E6EB] w-full cursor-pointer`}
        >
          <div 
          className="flex flex-col flex-grow">
            <div className="flex-grow">
          <div>
            <div className="px-2">
              <a 
              role="link"
              className="group relative no-underline cursor-pointer"
              href="https://www.facebook.com/muhammad.jon.12">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src="/me.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full flex-grow z-[2]">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Syed Muhammad Jon
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>
            <div className="px-2">
              <a className="group relative no-underline cursor-pointer">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: "0 -296px",
                        backgroundSize: "auto",
                        width: "36px",
                        height: "36px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>
                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full z-0 flex-grow">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Friends
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>
            <div className="px-2">
              <a className="group relative no-underline cursor-pointer">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <img src="/adsManager.png" alt="" />
                  </div>

                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full z-0 flex-grow">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Ads Manager
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>
            <div className="px-2">
              <a className="group relative no-underline cursor-pointer">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: "0 -444px",
                        backgroundSize: "auto",
                        width: "36px",
                        height: "34px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>

                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full z-0 flex-grow">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Memories
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>
            <div className="px-2">
              <a className="group relative no-underline cursor-pointer">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: "0 -185px",
                        backgroundSize: "auto",
                        width: "36px",
                        height: "34px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>

                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full z-0 flex-grow">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Saved
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>
            <div className="px-2">
              <a className="group relative no-underline cursor-pointer">
                <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                  <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: "0 -37px",
                        backgroundSize: "auto",
                        width: "36px",
                        height: "34px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>

                  <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                    <div className="relative flex flex-col max-w-full z-0 flex-grow">
                      <div className="flex flex-col min-w-0 max-w-full py-2">
                        <div className="flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="flex flex-col -my-[5px]">
                              <div className="ba_1 my-[5px]">
                                <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                  Groups
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                </div>
              </a>
            </div>

            {!seeMore && (
              <div onClick={() => clickHandler()} className="px-2">
                <a className="group relative no-underline cursor-pointer">
                  <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                    <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none bg-[rgba(255,255,255,0.1)] px-2 py-2">
                      <svg
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <g fillRule="evenodd" transform="translate(-448 -544)">
                          <path
                            fillRule="nonzero"
                            d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                      <div className="relative flex flex-col max-w-full z-0 flex-grow">
                        <div className="flex flex-col min-w-0 max-w-full py-2">
                          <div className="flex flex-col flex-grow min-h-0">
                            <div className="flex flex-col">
                              <div className="flex flex-col -my-[5px]">
                                <div className="ba_1 my-[5px]">
                                  <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                    See more
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </div>
                </a>
              </div>
            )}
            {seeMore && (
              <div>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/blood.png)",
                            backgroundPosition: "-722px -175px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Blood Donations
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/climate.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Climate Science Center
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/events.png)",
                            backgroundPosition: "0 -37px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Events
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/feeds.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Feeds
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/iconBar.png)",
                            backgroundPosition: "0 -333px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Friends
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/gaming.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Friends
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/iconBar.png)",
                            backgroundPosition: "0 -407px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Marketplace
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/messenger.png)",
                            backgroundPosition: "0 0",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Messenger
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/mkids.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Messenger Kids
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/orders.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Orders and payments
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/iconBar.png)",
                            backgroundPosition: "0 -111px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "34px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Pages
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/iconBar.png)",
                            backgroundPosition: "0 -74px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "36px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Play games
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <img src="/activity.png" alt="" />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Recent ad activity
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>

                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/iconBar.png)",
                            backgroundPosition: "0 -518px",
                            backgroundSize: "auto",
                            width: "36px",
                            height: "36px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>

                      <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                        <div className="relative flex flex-col max-w-full z-0 flex-grow">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Video
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {seeMore && (
              <div onClick={() => clickHandler()} className="px-2">
                <a className="group relative no-underline cursor-pointer">
                  <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                    <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none bg-[rgba(255,255,255,0.1)] px-2 py-2">
                      <svg
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                      </svg>
                    </div>
                    <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                      <div className="relative flex flex-col max-w-full z-0 flex-grow">
                        <div className="flex flex-col min-w-0 max-w-full py-2">
                          <div className="flex flex-col flex-grow min-h-0">
                            <div className="flex flex-col">
                              <div className="flex flex-col -my-[5px]">
                                <div className="ba_1 my-[5px]">
                                  <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                    See less
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </div>
                </a>
              </div>
            )}

            <div
              className="relative mx-4 mt-2 border-b-[1px] border-[#3A3B3C]"
              role="separator"
            ></div>
          </div>

          <div 
          onMouseOver={handleEditMenu}
          onMouseLeave={handleEditMenuStop}
         >
            <div className="pb-2">
              <div className="relative flex flex-col max-w-full z-0 flex-grow min-h-0 pt-[20px] pb-[4px]">
                <div className="flex flex-col min-w-0 max-w-full">
                  <div className="flex flex-col flex-grow min-h-0 max-w-full px-4 -my-[5px]">
                    <div className="flex flex-col">
                      <div className="ba_4 flex min-w-0 max-w-full">
                        <h3 className="flex-grow">
                          <span className="block text-[1rem] text-[#B0B3B8] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                            Your shortcuts
                          </span>
                        </h3>
                        <div className="relative flex max-w-full z-0 justify-center items-center self-start ml-2">
                          <div className="flex flex-col min-w-0 max-w-full">
                            <div className="flex flex-col self-start flex-grow min-h-0 min-w-0 max-w-full">
                              <div className="flex flex-col">
                                <div className="flex flex-col">
                                  <div className="flex flex-col">
                                    <span className={`block text-[.875rem] text-[#5AA7FF] leading-[1.3333] text-start font-normal overflow-hidden ${showEdit  ? 'opacity-100' : ''} opacity-0`}>
                                      Edit
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      transitionProperty: "opacity",
                                      transitionDuration:
                                        "cubic-bezier(0,0,1,1",
                                    }}
                                    className="absolute inset-[-8px] duration-100 rounded-[4px] hover:opacity-100 opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="">
              <li>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                        <div className="relative inline-block align-bottom">
                          <div>
                            <svg
                              aria-hidden="true"
                              className="align-bottom"
                              data-visualcompletion="ignore-dynamic"
                              role="none"
                              style={{ height: "36px", width: "36px" }}
                            >
                              
                              {/* Define a circular mask */}
                              <mask id=":shortcut_1:">
                              <rect cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
                                   
                              </mask>

                              {/* Apply the mask to the image */}
                              <g mask="url(#:shortcut_1:)">
                                <image
                                  x="0"
                                  y="0"
                                  height="100%"
                                  preserveAspectRatio="xMidYMid slice"
                                  width="100%"
                                  xlinkHref="ppg.jpg"
                                  style={{ height: "36px", width: "36px" }}
                                ></image>
                                <rect className="stroke-2 stroke-[rgba(255,255,255,0.3)]" cy="18" fill="none" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
                              </g>
                            </svg>
                            <div
                              className="absolute z-[2] rounded-[50%]"
                              data-visualcompletion="ignore"
                              style={{
                                bottom: "8px",
                                right: "8px",
                                transform: "translate(50%, 50%)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                        <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      PPG - Pakistani PC Gamers
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </a>
                </div>
              </li>
              <li>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                        <div className="relative inline-block align-bottom">
                          <div>
                            <svg
                              aria-hidden="true"
                              className="align-bottom"
                              data-visualcompletion="ignore-dynamic"
                              role="none"
                              style={{ height: "36px", width: "36px" }}
                            >
                              {/* Define a circular mask */}
                              <mask id=":shortcut_2:">
                              <rect cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
                              </mask>

                              {/* Apply the mask to the image */}
                              <g mask="url(#:shortcut_2:)">
                                <image
                                  x="0"
                                  y="0"
                                  height="100%"
                                  preserveAspectRatio="xMidYMid slice"
                                  width="100%"
                                  xlinkHref="ned.jpg"
                                  style={{ height: "36px", width: "36px" }}
                                ></image>
                       
                                
                                     <rect className="stroke-2 stroke-[rgba(255,255,255,0.3)]" cy="18" fill="none" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
                              </g>
                            </svg>
                            <div
                              className="absolute z-[2] rounded-[50%]"
                              data-visualcompletion="ignore"
                              style={{
                                bottom: "8px",
                                right: "8px",
                                transform: "translate(50%, 50%)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                        <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      NEDians News Posting
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </a>
                </div>
              </li>

              <li>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                        <div className="relative inline-block align-bottom">
                          <div>
                            <svg
                              aria-hidden="true"
                              className="align-bottom"
                              data-visualcompletion="ignore-dynamic"
                              role="none"
                              style={{ height: "36px", width: "36px" }}
                            >
                              {/* Define a circular mask */}
                              <mask id=":shortcut_3:">
                                <circle cx="18" cy="18" r="18" fill="white" />
                              </mask>

                              {/* Apply the mask to the image */}
                              <g mask="url(#:shortcut_3:)">
                                <image
                                  x="0"
                                  y="0"
                                  height="100%"
                                  preserveAspectRatio="xMidYMid slice"
                                  width="100%"
                                  xlinkHref="death.png"
                                  style={{ height: "36px", width: "36px" }}
                                ></image>
                                <circle
                                  className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                  cx="18"
                                  cy="18"
                                  r="18"
                                ></circle>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                        <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      Death Never Knocks
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </a>
                </div>
              </li>
              <li>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                        <div className="relative inline-block align-bottom">
                          <div>
                            <svg
                              aria-hidden="true"
                              className="align-bottom"
                              data-visualcompletion="ignore-dynamic"
                              role="none"
                              style={{ height: "36px", width: "36px" }}
                            >
                              {/* Define a circular mask */}
                              <mask id=":shortcut_4:">
                                <circle cx="18" cy="18" r="18" fill="white" />
                              </mask>

                              {/* Apply the mask to the image */}
                              <g mask="url(#:shortcut_4:)">
                                <image
                                  x="0"
                                  y="0"
                                  height="100%"
                                  preserveAspectRatio="xMidYMid slice"
                                  width="100%"
                                  xlinkHref="jk.jpg"
                                  style={{ height: "36px", width: "36px" }}
                                ></image>
                                <circle
                                  className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                  cx="18"
                                  cy="18"
                                  r="18"
                                ></circle>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                        <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      JK Developers
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </a>
                </div>
              </li>
              <li>
                <div className="px-2">
                  <a className="group relative no-underline cursor-pointer">
                    <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                      <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                        <div className="relative inline-block align-bottom">
                          <div>
                            <svg
                              aria-hidden="true"
                              className="align-bottom"
                              data-visualcompletion="ignore-dynamic"
                              role="none"
                              style={{ height: "36px", width: "36px" }}
                            >
                              {/* Define a circular mask */}
                              <mask id=":shortcut_5:">
                                <circle cx="18" cy="18" r="18" fill="white" />
                              </mask>

                              {/* Apply the mask to the image */}
                              <g mask="url(#:shortcut_5:)">
                                <image
                                  x="0"
                                  y="0"
                                  height="100%"
                                  preserveAspectRatio="xMidYMid slice"
                                  width="100%"
                                  xlinkHref="jp.png"
                                  style={{ height: "36px", width: "36px" }}
                                ></image>
                                <circle
                                  className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                  cx="18"
                                  cy="18"
                                  r="18"
                                ></circle>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                        <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                          <div className="flex flex-col min-w-0 max-w-full py-2">
                            <div className="flex flex-col flex-grow min-h-0">
                              <div className="flex flex-col">
                                <div className="flex flex-col -my-[5px]">
                                  <div className="ba_1 my-[5px]">
                                    <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                      JoN - Productions
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </a>
                </div>
              </li>
              {seeMore2 && (
            <>
                
                  <li>
                    <div className="px-2">
                      <a className="group relative no-underline cursor-pointer">
                        <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                          <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                            <div className="relative inline-block align-bottom">
                              <div>
                                <svg
                                  aria-hidden="true"
                                  className="align-bottom"
                                  data-visualcompletion="ignore-dynamic"
                                  role="none"
                                  style={{ height: "36px", width: "36px" }}
                                >
                                  {/* Define a circular mask */}
                                  <mask id=":shortcut_6:">
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="18"
                                      fill="white"
                                    />
                                  </mask>

                                  {/* Apply the mask to the image */}
                                  <g mask="url(#:shortcut_6:)">
                                    <image
                                      x="0"
                                      y="0"
                                      height="100%"
                                      preserveAspectRatio="xMidYMid slice"
                                      width="100%"
                                      xlinkHref="max.jpg"
                                      style={{ height: "36px", width: "36px" }}
                                    ></image>
                                    <circle
                                      className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                      cx="18"
                                      cy="18"
                                      r="18"
                                    ></circle>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                              <div className="flex flex-col min-w-0 max-w-full py-2">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                          Max Sweet
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                      </a>
                    </div>
                  </li>

                  <li>
                    <div className="px-2">
                      <a className="group relative no-underline cursor-pointer">
                        <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                          <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                            <div className="relative inline-block align-bottom">
                              <div>
                                <svg
                                  aria-hidden="true"
                                  className="align-bottom"
                                  data-visualcompletion="ignore-dynamic"
                                  role="none"
                                  style={{ height: "36px", width: "36px" }}
                                >
                                  {/* Define a circular mask */}
                                  <mask id=":shortcut_7:">
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="18"
                                      fill="white"
                                    />
                                  </mask>

                                  {/* Apply the mask to the image */}
                                  <g mask="url(#:shortcut_7:)">
                                    <image
                                      x="0"
                                      y="0"
                                      height="100%"
                                      preserveAspectRatio="xMidYMid slice"
                                      width="100%"
                                      xlinkHref="toast.jpg"
                                      style={{ height: "36px", width: "36px" }}
                                    ></image>
                                    <circle
                                      className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                      cx="18"
                                      cy="18"
                                      r="18"
                                    ></circle>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-[2]z-0">
                              <div className="flex flex-col min-w-0 max-w-full py-2">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                          Toast Sweet
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                      </a>
                    </div>
                  </li>
                  
                </>
          
            )}
              </ul>
         
            {!seeMore2 && (
              <div onClick={() => clickHandler2()} className="px-2">
                <a className="group relative no-underline cursor-pointer">
                  <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                    <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none bg-[rgba(255,255,255,0.1)] px-2 py-2">
                      <svg
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <g fillRule="evenodd" transform="translate(-448 -544)">
                          <path
                            fillRule="nonzero"
                            d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                      <div className="relative flex flex-col max-w-full z-0 flex-grow">
                        <div className="flex flex-col min-w-0 max-w-full py-2">
                          <div className="flex flex-col flex-grow min-h-0">
                            <div className="flex flex-col">
                              <div className="flex flex-col -my-[5px]">
                                <div className="ba_1 my-[5px]">
                                  <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                    See more
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </div>
                </a>
              </div>
            )}

         

            {seeMore2 && (
              <div onClick={() => clickHandler2()} className="px-2">
                <a className="group relative no-underline cursor-pointer">
                  <div className="flex justify-between px-2 rounded-lg items-center min-h-[44px] select-none">
                    <div className="img-wrapper-icons flex flex-col self-center w-9 h-9 my-[6px] mr-[12px] rounded-full pointer-events-none bg-[rgba(255,255,255,0.1)] px-2 py-2">
                      <svg
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                      </svg>
                    </div>
                    <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
                      <div className="relative flex flex-col max-w-full z-0 flex-grow">
                        <div className="flex flex-col min-w-0 max-w-full py-2">
                          <div className="flex flex-col flex-grow min-h-0">
                            <div className="flex flex-col">
                              <div className="flex flex-col -my-[5px]">
                                <div className="ba_1 my-[5px]">
                                  <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                    See less
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      
        </div>
        </div>
        </div>

        <div
          className={`bg-[#3E4042] w-4 absolute top-0 ease-linear duration-500 h-full
    ${scrollOpacity && 'hover:opacity-30'} 
                  opacity-0 `}
          data-visualcompletion="ignore"
          data-thumb="1"
          ref={trackRef}
          style={{
            height: `${(contentRef.current?.scrollHeight)}px`,
            right: "0px",
            transitionProperty: "opacity",
          }}
        ></div>
        <div
          className="absolute top-0 w-4 origin-top-right ease-linear duration-300 px-[4px] py-0 m-0
                pointer-events-none"
          data-visualcompletion="ignore"
          data-thumb="1"
          ref={scrollThumbRef}
          style={{
            display: "block",
            opacity: `${scrollOpacity}`,
            height: `${thumbHeight}px`,
            right: "0px",
            transitionProperty: "opacity",
            transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(${
              scaleRef.current
            }) translateZ(${-translateZRef.current}px) translateZ(-2px)`,
          }}
        >
          <div className="w-full h-full rounded-[4px] pointer-events-none bg-[rgba(255,255,255,0.3)]"></div>
        </div>
      </div>
   
    
    </div>
  );
}

export default Sidebar;
