import React, { useRef, useEffect, useState } from "react";

function Sidebar() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const trackRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const prevYref = useRef(null);
  const clientXref = useRef(null);

  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);


  const clickHandler = () => {
    setSeeMore((prev) => !prev);
    if (seeMore) {
      setScrollOpacity(0);
    }
  };
  const clickHandler2 = () => {
    setSeeMore2((prev) => !prev);
    if (seeMore2) {
      setScrollOpacity(0);
    }
  };

  useEffect(() => {
    if ((containerRef.current && !seeMore) || (!seeMore2 && !seeMore)) {
      containerRef.current.scrollTop = 0;
    }
    if (!seeMore && !seeMore2) {
      scrollRef.current = false;
    }
 
  }, [seeMore, seeMore2]);



  useEffect(() => {

    const updateScrollbar = () => {
      if (!containerRef.current || !scrollThumbRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const contentHeight = contentRef.current.scrollHeight;

      const newThumbHeight = (containerHeight / contentHeight) * containerHeight;

if ((seeMore || seeMore2) && (containerRef.current.clientHeight !== contentRef.current.scrollHeight)) {
 
  setThumbHeight(Math.max(newThumbHeight, 40));

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
        containerRef.current.scrollHeight - containerRef.current.clientHeight;

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
          containerRef.current.scrollHeight - containerRef.current.clientHeight;

        if (
          (containerRef.current.scrollTop === 0 && clientY < prevYref.current) ||
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
              (containerRef.current.scrollHeight /
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
    if(containerRef.current.clientHeight !== contentRef.current.scrollHeight)
    setScrollOpacity(1);
  };

  const LeaveHandler = () => {
    leaveHandlerFnRef.current = true;
    !scrollRef.current && setScrollOpacity(0);
  };

  return (
    <div 
    className="relative flex flex-col min-h-[inherit] max-h-[inherit] z-0">
      <div
        style={{
          willChange: "transform, scroll-position",
          perspective: "1px",
          transformStyle: "preserve-3d",
          perspectiveOrigin: "top right",
        }}
        className={`${
          seeMore || seeMore2 ? "overflow-y-auto" : "overflow-y-hidden"
        } overflow-x-hidden overscroll-y-contain relative hidden lg:flex lg:flex-col flex-grow shrink min-h-0 basis-[100%]`}
        onMouseEnter={seeMore || seeMore2 ? enterHandler : null}
        onMouseLeave={seeMore || seeMore2 ? LeaveHandler : null}
        ref={containerRef}
      >
        <div
          ref={contentRef}
          className={`content-item sidebar flex-grow p-[0.6rem] text-[#E4E6EB] w-full cursor-pointer`}
        >
          <div>
            <div
              className={`sidebar flex flex-col cursor-pointer mt-[0.35rem]`}
            >
              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                <div className="img-wrapper w-9 h-9 rounded-full">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src="/me.jpg"
                    alt=""
                  />
                </div>
                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Syed Muhammad Jon
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>
              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                <i
                  data-visualcompletion="css-img"
                  style={{
                    backgroundImage: "url(/iconBar.png)",
                    backgroundPosition: "0 -297px",
                    backgroundSize: "auto",
                    width: "36px",
                    height: "34px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                />
                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Friends
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>
              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                <img src="/adsManager.png" alt="" />

                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Ads Manager
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>
              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Memories
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>

              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Saved
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>
              <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                  Groups
                </span>
                <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>

              {!seeMore && (
                <div
                  onClick={() => clickHandler()}
                  className="relative flex flex-wrap ml-[0.1rem] pl-[0.3rem] py-[0.5rem] rounded-lg"
                >
                  <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
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
                  <span className="text-sm ml-3 mt-[0.4rem] text-[#E4E6EB] font-[500]">
                    See more
                  </span>
                  <div className="ml-[-3px] mr-[-2px] my-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
              )}
              {seeMore && (
                <div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Blood Donations
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/climate.png" alt="" />
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Climate Science Center
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Events
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/feeds.png" alt="" />

                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Feeds
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Fundraisers
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/gaming.png" alt="" />

                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Gaming Video
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Marketplace
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Messenger
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/mkids.png" alt="" />

                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Messenger Kids
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/orders.png" alt="" />

                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Orders and payments
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Pages
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Play games
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
                    <img src="/activity.png" alt="" />

                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Recent ad activity
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                  <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center select-none">
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
                    <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                      Video
                    </span>
                    <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </div>
              )}

              {seeMore && (
                <div
                  onClick={() => clickHandler()}
                  className="relative flex flex-wrap ml-[0.1rem] pl-[0.3rem] py-[0.5rem] rounded-lg"
                >
                  <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                    </svg>
                  </div>
                  <span className="text-[#E4E6EB] text-sm ml-3 mt-[0.4rem] font-[500]">
                    See less
                  </span>
                  <div className="ml-[-3px] mr-[-2px] my-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
              )}
            </div>
          </div>
          <div
            className="relative top-[-2px] left-[-2px] ml-[0.5rem] mt-2 border-b-[0.1rem] border-[#3A3B3C] w-full"
            role="separator"
          ></div>
          <div>
            <div
              className={`sidebar flex flex-col text-white cursor-pointer w-full`}
            >
              <h3 className=" mt-1 text-[#B0B3B8] font-semibold px-[0.4rem] py-[0.35rem] cursor-text">
                Your shortcuts
              </h3>
              <ul className="mt-[0.15rem]">
                <li>
                  <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg ">
                    <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                            <mask id=":ss_1:">
                              <rect
                                cy="18"
                                fill="white"
                                height="36"
                                rx="8"
                                ry="8"
                                width="36"
                                x="0"
                                y="0"
                              ></rect>
                              <circle cx="18" cy="18" r="18" fill="white" />
                            </mask>

                            {/* Apply the mask to the image */}
                            <g mask="url(#:ss_1:)">
                              <image
                                x="0"
                                y="0"
                                height="100%"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                xlinkHref="ppg.jpg"
                                style={{ height: "36px", width: "36px" }}
                              ></image>
                              <rect
                                className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                cy="18"
                                fill="white"
                                height="36"
                                rx="8"
                                ry="8"
                                width="36"
                                x="0"
                                y="0"
                              ></rect>
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
                    <span className="ba_1 py-[8px] text-sm font-[500] text-[#E4E6EB]">
                      PPG - Pakistani PC Gamers
                    </span>
                    <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </li>
                <li>
                  <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                    <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                            <mask id=":ss_2:">
                              <rect
                                cy="18"
                                fill="white"
                                height="36"
                                rx="8"
                                ry="8"
                                width="36"
                                x="0"
                                y="0"
                              ></rect>
                              <circle cx="18" cy="18" r="18" fill="white" />
                            </mask>

                            {/* Apply the mask to the image */}
                            <g mask="url(#:ss_2:)">
                              <image
                                x="0"
                                y="0"
                                height="100%"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                xlinkHref="ned.jpg"
                                style={{ height: "36px", width: "36px" }}
                              ></image>
                              <rect
                                className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                cy="18"
                                fill="white"
                                height="36"
                                rx="8"
                                ry="8"
                                width="36"
                                x="0"
                                y="0"
                              ></rect>
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

                    <span className="ba_1 py-[8px] text-sm font-[500] text-[#E4E6EB]">
                      NEDians Meme Posting
                    </span>
                    <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </li>

                <li>
                  <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                    <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                            <mask id=":ss_3:">
                              <circle cx="18" cy="18" r="18" fill="white" />
                            </mask>

                            {/* Apply the mask to the image */}
                            <g mask="url(#:ss_3:)">
                              <image
                                x="0"
                                y="0"
                                height="100%"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                xlinkHref="death.png"
                                style={{ height: "36px", width: "36px" }}
                              ></image>
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
                    <span className="ba_1 py-[8px] text-sm font-[500] text-[#E4E6EB]">
                      Death Never Knocks
                    </span>
                    <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </li>
                <li>
                  <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                    <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                            <mask id=":ss_4:">
                              <circle cx="18" cy="18" r="18" fill="white" />
                            </mask>

                            {/* Apply the mask to the image */}
                            <g mask="url(#:ss_4:)">
                              <image
                                x="0"
                                y="0"
                                height="100%"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                xlinkHref="jk.jpg"
                                style={{ height: "36px", width: "36px" }}
                              ></image>
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
                    <span className="flex items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                      JK Developers
                    </span>
                    <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </li>
                <li>
                  <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                    <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                            <mask id=":ss_5:">
                              <circle cx="18" cy="18" r="18" fill="white" />
                            </mask>

                            {/* Apply the mask to the image */}
                            <g mask="url(#:ss_5:)">
                              <image
                                x="0"
                                y="0"
                                height="100%"
                                preserveAspectRatio="xMidYMid slice"
                                width="100%"
                                xlinkHref="jp.png"
                                style={{ height: "36px", width: "36px" }}
                              ></image>
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
                    <span className="flex items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                      JoN - Productions
                    </span>
                    <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                  </div>
                </li>
              </ul>
              {!seeMore2 && (
                <div
                  onClick={() => clickHandler2()}
                  className="relative flex flex-wrap ml-[0.1rem] pl-[0.3rem] py-[0.4rem] rounded-lg"
                >
                  <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
                    <svg
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="filter drop-shadow-md transition-transform transform hover:scale-105"
                    >
                      <g fillRule="evenodd" transform="translate(-448 -544)">
                        <path
                          fillRule="nonzero"
                          d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <span className="text-[#E4E6EB] text-sm ml-3 mt-[0.4rem] font-[500]">
                    See more
                  </span>
                  <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
              )}

              {seeMore2 && (
                <div>
                  <ul>
                    <li>
                      <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                                <mask id=":ss_5:">
                                  <circle cx="18" cy="18" r="18" fill="white" />
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#:ss_5:)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="max.jpg"
                                    style={{ height: "36px", width: "36px" }}
                                  ></image>
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
                        <span className="flex items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                          Max Sweet
                        </span>
                        <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                      </div>
                    </li>

                    <li>
                      <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
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
                                <mask id=":ss_5:">
                                  <circle cx="18" cy="18" r="18" fill="white" />
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#:ss_5:)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="toast.jpg"
                                    style={{ height: "36px", width: "36px" }}
                                  ></image>
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
                        <span className="flex items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                          Toast Sweet
                        </span>
                        <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {seeMore2 && (
                <div
                  onClick={() => clickHandler2()}
                  className="relative flex flex-wrap ml-[0.1rem] pl-[0.3rem] py-[0.4rem] rounded-lg group"
                >
                  <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                    </svg>
                  </div>
                  <span className="text-[#E4E6EB] text-sm ml-3 mt-[0.4rem] font-[500]">
                    See less
                  </span>
                  <div className="-mx-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>

        <div
          className={`bg-[#3E4042] w-4 absolute top-0 ease-linear duration-500 h-full
    ${
      (seeMore || seeMore2) && scrollOpacity
        ? "hover:opacity-30 block"
        : "hidden"
    }  
                  opacity-0 `}
          data-visualcompletion="ignore"
          data-thumb="1"
          ref={trackRef}
          style={{
            height: `${contentRef.current?.scrollHeight}px`,
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
            transform:
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(1.6095) translateZ(-0.609502px) translateZ(-2px)",
          }}
        >
          <div className="w-full h-full rounded-[4px] pointer-events-none bg-[rgba(255,255,255,0.3)]"></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
