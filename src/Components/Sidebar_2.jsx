import React, { useRef, useEffect, useState } from "react";

function Sidebar_2() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const trackRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const prevYref = useRef(null);
  const clientXref = useRef(null);
  const scaleRef = useRef(null);
  const translateZRef = useRef(null);

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showSettings2, setShowSettings2] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(40);

  const handleShowSettings = () => {
    setShowSettings(true);
  };
  const handleHideSettings = () => {
    setShowSettings(false);
  };
  const handleShowSettings2 = () => {
    setShowSettings2(true);
  };
  const handleHideSettings2 = () => {
    setShowSettings2(false);
  };

  useEffect(() => {
    // console.log('scroll Height', contentRef.current?.scrollHeight);

    const updateScrollbar = () => {
      const contentHeight = contentRef.current?.scrollHeight;
      const containerHeight = containerRef.current?.clientHeight;

      const scaleValue = contentHeight / containerHeight;
      scaleRef.current = scaleValue;

      const translateZValue = scaleValue - 1;
      translateZRef.current = translateZValue;

      if (!containerRef.current || !scrollThumbRef.current) return;

      const newThumbHeight =
        (containerHeight / contentHeight) * containerHeight;
      if (thumbHeight === contentRef.current.scrollHeight) {
        setScrollOpacity(0);
      }
      setThumbHeight(newThumbHeight);
    };

    const handleResize = () => updateScrollbar();

    // Update scrollbar on initial render and window resize
    updateScrollbar();
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        console.log("move");
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
    if (thumbHeight !== contentRef.current.scrollHeight) setScrollOpacity(1);
  };

  const LeaveHandler = () => {
    leaveHandlerFnRef.current = true;
    !scrollRef.current && setScrollOpacity(0);
  };

  return (
    <div className="relative flex flex-col min-h-[inherit] max-h-[inherit] z-0">
      <div
        className="flex flex-col relative min-h-0 overscroll-y-contain overflow-y-scroll overflow-x-hidden shrink flex-grow basis-full"
        style={{
          willChange: "transform, scroll-position",
          perspective: "1px",
          transformStyle: "preserve-3d",
          perspectiveOrigin: "top right",
          overflowAnchor: "none",
        }}
        ref={containerRef}
        onMouseEnter={enterHandler}
        onMouseLeave={LeaveHandler}
      >
        <div className="relative flex flex-col flex-grow">
          <div className={`sidebar text-white pt-2 flex-grow`}>
            <div ref={contentRef} className="flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="ads-section relative">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="my-[5px]">
                        <h3
                          className="font-semibold px-4 pt-[15px] cursor-text "
                          dir="auto"
                        >
                          <span
                            className="text-left block text-[1rem] leading-[1.1765] textProps ba_1 text-[#B0B3B8] font-[600]"
                            dir="auto"
                          >
                            <span className="textClass">Sponsored</span>
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="group relative flex flex-col">
                      <a
                        aria-labelledby=":r9l:"
                        className="parent-hover relative block"
                        href="https://blue-games.net/product/grand-theft-auto-v?ns=cmfbclid=IwAR2cqsQtD1zt81eJ7OmMavaSNOVzoKr6mo3nJWVBsR1ABC4VStFuQdWdrRQ_aem_AUQMoN9zePL1T0mbTvHLRVVZ2Uw3kKuI3msXSrnGfx_L9_Zs9i4PDniWI9kug8a3tEYLqAvNuphlPFSnjsoSrwd6"
                        rel="nofollow noreferrer"
                        role="link"
                        tabIndex="0"
                        target="_blank"
                      >
                        <div className="relative flex text-left p-2 mx-2 rounded-[6px] cursor-pointer">
                          <div className="">
                            <div className="flex items-center">
                              <div className="w-[40%] self-center shrink-0">
                                <img
                                  className="block object-fill max-w-full min-h-[1px] rounded-[8px]"
                                  src="/ad3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="pl-3">
                                <div className="flex flex-col">
                                  <div className="my-[5px]">
                                    <span
                                      className="text-left block text-[.875rem] leading-[1.3333] textProps ba_1 text-[#E4E6EB] font-[500]"
                                      dir="auto"
                                    >
                                      <span className="relative overflow-hidden textClass ">
                                        What to Look for in an MFA Solution
                                      </span>
                                    </span>
                                  </div>
                                  <div className="my-[5px]">
                                    <span
                                      className="lowercase text-left block text-[.75rem] leading-[1.2308] textProps ba text-[#B0B3B8] font-[400]"
                                      dir="auto"
                                    >
                                      <span className="pb-[1px] textClass_1 relative overflow-hidden">
                                        <div className="lowercase">duo.com</div>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"
                            role="none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </a>
                      <div
                        aria-label="Options for this notification"
                        role="gridcell"
                      >
                        <div
                          className="flex absolute top-[16%] group-hover:[clip:unset] group-hover:right-[60px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
                        >
                          <div>
                            <div className="rounded-full customShadow">
                              <div
                                aria-label="Manage notification settings"
                                className="h-[40px] w-[40px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-none list-none"
                                role="button"
                                tabIndex="0"
                              >
                                <i
                                  data-visualcompletion="css-img"
                                  className="align-[-0.25em] text-[#B0B3B8]"
                                  style={{
                                    filter:
                                      "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                    backgroundImage: "url(/3dots.png)",
                                    backgroundPosition: "0px -494px",
                                    backgroundSize: "auto",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block",
                                  }}
                                ></i>
                                <div
                                  className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
                                  role="none"
                                  data-visualcompletion="ignore"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative flex flex-col">
                      <a
                        aria-labelledby=":r9l:"
                        className="parent-hover relative block"
                        href="https://blue-games.net/product/grand-theft-auto-v?ns=cmfbclid=IwAR2cqsQtD1zt81eJ7OmMavaSNOVzoKr6mo3nJWVBsR1ABC4VStFuQdWdrRQ_aem_AUQMoN9zePL1T0mbTvHLRVVZ2Uw3kKuI3msXSrnGfx_L9_Zs9i4PDniWI9kug8a3tEYLqAvNuphlPFSnjsoSrwd6"
                        rel="nofollow noreferrer"
                        role="link"
                        tabIndex="0"
                        target="_blank"
                      >
                        <div className="relative flex text-left p-2 mx-2 rounded-[6px] cursor-pointer">
                          <div className="">
                            <div className="flex items-center">
                              <div className="w-[40%] shrink-0 self-center">
                                <img
                                  className="block object-fill max-w-full min-h-[1px] rounded-[8px]"
                                  src="/ad4.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="pl-3">
                                <div className="flex flex-col">
                                  <div className="my-[5px]">
                                    <span
                                      className="text-left block text-[.875rem] leading-[1.3333] textProps ba_1 text-[#E4E6EB] font-[500]"
                                      dir="auto"
                                    >
                                      <span className="relative overflow-hidden textClass ">
                                        Your promocode #PLUSFIVE
                                      </span>
                                    </span>
                                  </div>
                                  <div className="my-[5px]">
                                    <span
                                      className="lowercase text-left block text-[.75rem] leading-[1.2308] textProps ba text-[#B0B3B8] font-[400]"
                                      dir="auto"
                                    >
                                      <span className="pb-[1px] textClass_1 relative overflow-hidden">
                                        <div className="lowercase">
                                          app-work.org
                                        </div>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </a>
                      <div
                        aria-label="Options for this notification"
                        role="gridcell"
                      >
                        <div
                          className="flex absolute top-[16%] group-hover:[clip:unset] group-hover:right-[60px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
                        >
                          <div>
                            <div className="rounded-full customShadow">
                              <div
                                aria-label="Manage notification settings"
                                className="h-[40px] w-[40px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-none list-none"
                                role="button"
                                tabIndex="0"
                              >
                                <i
                                  data-visualcompletion="css-img"
                                  className="align-[-0.25em] text-[#B0B3B8]"
                                  style={{
                                    filter:
                                      "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                    backgroundImage: "url(/3dots.png)",
                                    backgroundPosition: "0px -494px",
                                    backgroundSize: "auto",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block",
                                  }}
                                ></i>
                                <div
                                  className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
                                  role="none"
                                  data-visualcompletion="ignore"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
                    role="separator"
                  ></div>
                </div>
                <div className="page-section relative">
                  <div className="relative flex flex-col shrink-0 max-w-full z-0 pt-[20px] pb-[6px]">
                    <div className="flex flex-col min-w-0 max-w-full -my-[5px]">
                      <div className="flex flex-col flex-grow min-h-0 max-w-full px-4">
                        <div className="flex flex-col ">
                          <div className="ba_4 flex min-w-0 max-w-full -my-[5px]">
                            <h3 className="flex flex-col flex-grow my-[5px]">
                              <span className="block text-[1rem] text-[#B0B3B8] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                Your Pages and profiles
                              </span>
                            </h3>
                            <div className="relative flex flex-col max-w-full z-0 justify-center items-center self-center">
                              <div className="flex flex-col min-w-0 max-w-full">
                                <div className="flex flex-col flex-grow min-h-0 min-w-0 max-w-full">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col">
                                      <div className="flex flex-col">
                                        <div className="flex flex-col">
                                          <div className="rounded-full hover:bg-[#303031] text-[#B0B3B8] cursor-pointer">
                                            <svg
                                              viewBox="0 0 20 20"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                            >
                                              <g
                                                fillRule="evenodd"
                                                transform="translate(-446 -350)"
                                              >
                                                <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                                              </g>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  transitionProperty: "opacity",
                                  transitionDuration: "cubic-bezier(0,0,1,1",
                                }}
                                className="absolute inset-[-8px] duration-100 hover:opacity-100 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="px-2">
                      <a className="group relative no-underline cursor-pointer">
                        <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
                          <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                            <img
                              src="/jk.jpg"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50px",
                              }}
                              alt=""
                            />
                          </div>
                          <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-0">
                              <div className="flex flex-col min-w-0 max-w-full py-2">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col ">
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
                    <div className="px-4">
                      <a className="group relative inline-block w-full p-0 m-0 cursor-pointer">
                        <div className="flex flex-col">
                          <div className="flex flex-col py-2">
                            <div className="relative flex rounded-lg px-4 -m-1.5">
                              <div className="img-wrapper-icons-2 flex flex-col self-start p-1.5 rounded-full">
                                <i
                                  data-visualcompletion="css-img"
                                  style={{
                                    backgroundImage: "url(/switch.png)",
                                    filter:
                                      "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                    backgroundPosition: "0 0",
                                    backgroundSize: "auto",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block",
                                  }}
                                />
                              </div>
                              <div className="flex flex-col self-center min-w-0 max-w-full p-1.5 flex-grow">
                                <div className="flex flex-col justify-center flex-grow min-h-0">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_3 my-[5px]">
                                        <span className="block text-[.75rem] text-[#B0B3B8] leading-[1.2308] text-start font-semibold overflow-hidden textProps min-w-0 max-w-full">
                                          Switch to Page
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

                      <a className="group relative inline-block w-full p-0 m-0 cursor-pointer">
                        <div className="flex flex-col">
                          <div className="flex flex-col py-2">
                            <div className="relative flex rounded-lg px-4 -m-1.5">
                              <div className="img-wrapper-icons-2 flex flex-col self-start p-1.5 rounded-full">
                                <i
                                  data-visualcompletion="css-img"
                                  style={{
                                    backgroundImage: "url(/switch.png)",
                                    filter:
                                      "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                    backgroundPosition: "0 -126px",
                                    backgroundSize: "auto",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block",
                                  }}
                                />
                              </div>
                              <div className="flex flex-col self-center min-w-0 max-w-full p-1.5 flex-grow">
                                <div className="flex flex-col justify-center flex-grow min-h-0">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_3 my-[5px]">
                                        <span className="block text-[.75rem] text-[#B0B3B8] leading-[1.2308] text-start font-semibold overflow-hidden textProps min-w-0 max-w-full">
                                          Create promotion
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
                  </div>

                  <div
                    className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
                    role="separator"
                  ></div>
                </div>
                <div className="birthday-section relative">
                  <div className="flex flex-col pt-5 pb-1">
                    <div className="flex flex-col px-4">
                      <div className="flex flex-col -my-[5px]">
                        <div className="before_a flex flex-col my-[5px]">
                          <span className="text-[#B0B3B8] font-semibold cursor-text overflow-hidden pb-[1px] leading-[1.1765]">
                            {" "}
                            Birthdays
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-[0.39rem]">
                    <div className="px-2">
                      <a className="group relative block min-w-0 max-w-full rounded-lg margin-0 cursor-pointer">
                        <div className="relative py-2 w-full flex rounded-lg">
                          <div className="img-wrapper-icons relative flex flex-col self-start ml-[0.5rem] mr-[12px]">
                            <i
                              data-visualcompletion="css-img"
                              style={{
                                backgroundImage: "url(/birthday.png)",
                                backgroundPosition: "0 0",
                                backgroundSize: "auto",
                                width: "36px",
                                height: "36px",
                                backgroundRepeat: "no-repeat",
                                display: "inline-block",
                              }}
                            />
                          </div>
                          <div className="flex flex-col justify-center self-center my-[-5px] flex-grow">
                            <div className="flex flex-col my-[5px]">
                              <span
                                className="block text-[#E4E6EB] max-w-full min-w-0 text-[.875rem] font-[400] leading-[1.3333] textProps text-left mt-[-1px] text-ellipsis"
                                dir="auto"
                              >
                                <strong className="font-semibold">
                                  Muhammad Anas
                                </strong>{" "}
                                and{" "}
                                <strong className="inline-flex text-start font-semibold break-words leading-[1.3333] text-[.875rem]">
                                  <span className="inline-flex">
                                    <span className="font-semibold text-[#E4E6EB] break-words">
                                      3 others
                                    </span>
                                  </span>
                                </strong>{" "}
                                have birthdays today.
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
                    role="separator"
                  ></div>
                </div>
                <div className="contact-section relative">
                  <div
                    className={`sidebar flex flex-col text-white cursor-default`}
                  >
                    <div className="relative flex flex-col shrink-0 max-w-full z-0 pt-[20px] pb-[6px]">
                      <div className="flex flex-col min-w-0 max-w-full -my-[5px]">
                        <div className="flex flex-col flex-grow min-h-0 max-w-full px-4">
                          <div className="flex flex-col ">
                            <div className="ba_4 flex min-w-0 max-w-full -my-[5px]">
                              <h3 className="flex flex-col flex-grow my-[5px]">
                                <span className="block text-[1rem] text-[#B0B3B8] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                  Contacts
                                </span>
                              </h3>
                              <div className="flex items-center">
                                <div className="group relative top-[1px] rounded-full cursor-pointer">
                                  <svg
                                    className="w-4 h-4 text-[#B0B3B8]"
                                    viewBox="0 0 16 16"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                  >
                                    <g
                                      fillRule="evenodd"
                                      transform="translate(-448 -544)"
                                    >
                                      <g fillRule="nonzero">
                                        <path
                                          d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                                          transform="translate(448 544)"
                                        ></path>
                                        <path
                                          d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                                          transform="translate(448 544)"
                                        ></path>
                                        <path
                                          d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                                          transform="translate(448 544)"
                                        ></path>
                                        <path
                                          d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                                          transform="translate(448 544)"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                  <div className="absolute opacity-0 group-hover:opacity-100 -inset-2 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                                </div>
                                <div className="relative flex flex-col max-w-full z-0 justify-center items-center self-center ml-6">
                                  <div className="flex flex-col min-w-0 max-w-full">
                                    <div className="flex flex-col flex-grow min-h-0 min-w-0 max-w-full">
                                      <div className="flex flex-col">
                                        <div className="flex flex-col">
                                          <div className="flex flex-col">
                                            <div className="flex flex-col">
                                              <div className="rounded-full hover:bg-[#303031] text-[#B0B3B8] cursor-pointer">
                                                <svg
                                                  viewBox="0 0 20 20"
                                                  width="20"
                                                  height="20"
                                                  fill="currentColor"
                                                >
                                                  <g
                                                    fillRule="evenodd"
                                                    transform="translate(-446 -350)"
                                                  >
                                                    <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                                                  </g>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      transitionProperty: "opacity",
                                      transitionDuration:
                                        "cubic-bezier(0,0,1,1",
                                    }}
                                    className="absolute inset-[-8px] duration-100 hover:opacity-100 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_10:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      >
                                        {" "}
                                      </circle>
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_10:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="muneeb.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
                                      ></image>
                                      <circle
                                        className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                        cx="18"
                                        cy="18"
                                        r="18"
                                      ></circle>
                                      <circle
                                        className="fill-none stroke-2 stroke-[#0866FF]"
                                        cx="18"
                                        cy="18"
                                        fill="transparent"
                                        r="17"
                                        strokeWidth="2"
                                      ></circle>
                                    </g>
                                  </svg>
                                </div>

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Muhammad Adil
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

                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_2:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_2:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="zeeshan.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
                                      ></image>
                                      <circle
                                        style={{
                                          stroke: "rgba(255,255,255,0.05",
                                        }}
                                        className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                        cx="18"
                                        cy="18"
                                        r="18"
                                      ></circle>
                                    </g>
                                  </svg>
                                  <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Zeeshan Haider
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_3:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_3:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="khurram.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Syed Khurram Abbas
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_4:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_4:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="notifIcons/notif_image_2.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Sajid Hussain Khan
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_5:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_5:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="hasan.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Hasan Rizvi
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_6:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_6:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="muneeb.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Muneeb Rehman
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

                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_7:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_7:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="muneeb.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Muneeb Rehman
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_8:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_8:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="muneeb.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Muneeb Rehman
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
                      <div className="px-2">
                        <a className="group relative no-underline cursor-pointer">
                          <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
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
                                    <mask id=":chat_9:">
                                      <circle
                                        cx="18"
                                        cy="18"
                                        r="18"
                                        fill="white"
                                      />
                                      <circle
                                        cx="31"
                                        cy="31"
                                        data-visualcompletion="ignore"
                                        fill="black"
                                        r="6"
                                      ></circle>
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:chat_9:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="muneeb.jpg"
                                        style={{
                                          height: "36px",
                                          width: "36px",
                                        }}
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

                                <span className="absolute right-[1px] bottom-[1px] w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                              <div className="relative flex flex-col max-w-full flex-grow z-0">
                                <div className="flex flex-col min-w-0 max-w-full py-2">
                                  <div className="flex flex-col flex-grow min-h-0">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="ba_1 my-[5px]">
                                          <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                            Muneeb Rehman
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
                    </div>

                    <div
                      className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
                      role="separator"
                    ></div>
                  </div>
                </div>
                <div className="group-section relative">
                  <div className="relative flex flex-col shrink-0 max-w-full z-0 pt-[20px] pb-[6px]">
                    <div className="flex flex-col min-h-0 flex-grow max-w-full ">
                      <div className="flex flex-col max-w-full px-4">
                        <div className="flex flex-col -my-[5px]">
                          <div className="ba_4 my-[5px]">
                            <h3 className="min-w-0 max-w-full">
                              <span className="block text-[1rem] text-[#B0B3B8] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                Group chats
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="px-2">
                      <a className="group relative no-underline cursor-pointer">
                        <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
                          <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                            <div className="relative h-[36px] w-[36px]">
                              <div className="absolute top-0 right-0">
                                <div className="relative inline-block align-bottom z-0">
                                  <svg
                                    aria-hidden="true"
                                    className="align-bottom"
                                    data-visualcompletion="ignore-dynamic"
                                    role="none"
                                    style={{ height: "24px", width: "24px" }}
                                  >
                                    {/* Define a circular mask */}
                                    <mask id=":grp_chat_1:">
                                      <circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="white"
                                      />
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:grp_chat_1:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="/group_chats/grp_1.jpg"
                                        style={{
                                          height: "24px",
                                          width: "24px",
                                        }}
                                      ></image>
                                      <circle
                                        className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05]"
                                        cx="12"
                                        cy="12"
                                        r="12"
                                      ></circle>
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0">
                                <div className="relative inline-block align-bottom z-0">
                                  <svg
                                    aria-hidden="true"
                                    className="align-bottom"
                                    data-visualcompletion="ignore-dynamic"
                                    role="none"
                                    style={{ height: "24px", width: "24px" }}
                                  >
                                    {/* Define a circular mask */}
                                    <mask id=":grp_chat_2:">
                                      <circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="white"
                                      />
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#:grp_chat_2:)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="/group_chats/grp_2.jpg"
                                        style={{
                                          height: "24px",
                                          width: "24px",
                                        }}
                                      ></image>
                                      <circle
                                        className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                        cx="12"
                                        cy="12"
                                        r="12"
                                      ></circle>
                                    </g>
                                  </svg>
                                </div>
                              </div>

                              <div
                                style={{
                                  bottom: "5px",
                                  right: "5px",
                                  transform: "translate(50%, 50%)",
                                }}
                                className="absolute z-[2] rounded-[50%]"
                              >
                                <div className="relative flex overflow-hidden">
                                  <div className="inheritStyles inheritStylesFlex">
                                    <span className="inline-flex justify-center cursor-pointer items-center w-[8px] h-[8px] bg-[#31A24C] rounded-full"></span>
                                    <div className="absolute inset-0 opacity-0 fade pointer-events-none"></div>
                                  </div>
                                  <div className="clip-element_2 absolute z-0 w-[1px] h-[1px] text-[.0625rem] overflow-hidden">
                                    Active
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-0">
                              <div className="flex flex-col min-w-0 max-w-full py-2">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col ">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                          Hax Off
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
                    <div className="px-2">
                      <a className="group relative no-underline cursor-pointer">
                        <div className="relative flex flex-wrap px-2 rounded-lg items-center select-none">
                          <div className="img-wrapper-icons flex flex-col self-start my-1.5 mr-3 rounded-full">
                            <div
                              className="inline-flex rounded-full bg-[rgba(255,255,255,0.1)] 
                  justify-center items-center h-[36px] w-[36px] "
                            >
                              <i
                                className="align-[-0.25]"
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(98%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage: "url(/add_icon.png)",
                                  backgroundPosition: "0 -188px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center shrink self-stretch min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-0">
                              <div className="flex flex-col min-w-0 max-w-full py-2">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col ">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba my-[5px]">
                                        <span className="block text-sm text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
                                          Create group chat
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
                  </div>{" "}
                </div>
              </div>
            </div>

            <div
              className={`bg-[#3E4042] w-4 absolute top-0 ease-linear duration-500 h-full ${
                scrollOpacity ? "hover:opacity-30 block" : "hidden"
              } opacity-0`}
              data-visualcompletion="ignore"
              data-thumb="1"
              ref={trackRef}
              style={{
                height: `${contentRef.current?.scrollHeight}px`,
                right: "0px",
                transitionProperty: "opacity",
              }}
            ></div>
          </div>
        </div>
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

export default Sidebar_2;
