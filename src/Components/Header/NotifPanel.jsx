import React, { useState, useEffect, useRef } from "react";

function NotifPanel() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const trackRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const prevYref = useRef(null);
  const clientXref = useRef(null);
  const scaleRef = useRef(null);
  const translateZRef = useRef(null);

  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(40);

  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);
  const [rightClick, setrightClick] = useState(false);

  const handleRightClick = (e) => {
    if (e.button === 0) {
      setrightClick(false);
      e.currentTarget.classList.add("notifIconScale");
    } else if (e.button === 2) {
      e.currentTarget.classList.remove("notifIconScale");

      setrightClick(true);
    }
  };

  const handleMouseEnter = (e, menu) => {
    if (!rightClick) {
      e.currentTarget.classList.add("notifIconScale");
    } else {
      e.currentTarget.classList.remove("notifIconScale");
    }
  };
  const handleMouseLeave = (e, menu) => {
    e.currentTarget.classList.remove("notifIconScale");
  };

  const handleShowAll = () => {
    setShowAll(true);
    setShowUnread(false);
  };
  const handleShowUnread = () => {
    setShowUnread(true);
    setShowAll(false);
  };

  useEffect(() => {
    const updateScrollbar = () => {
      const contentHeight = contentRef.current?.scrollHeight;
      const containerHeight = containerRef.current?.clientHeight;

      const scaleValue = contentHeight / containerHeight;
      scaleRef.current = scaleValue;

      const translateZValue = scaleValue - 1;
      translateZRef.current = translateZValue;

      if (!containerRef.current || !scrollThumbRef.current) return;

      console.log("containerHeight", containerHeight);
      console.log("contentHeight", contentHeight);

      const newThumbHeight =
        (containerHeight / contentHeight) * containerHeight;

      
      console.log(thumbHeight)
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

    // Attach scroll listener

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
    if (containerRef.current.clientHeight !== contentRef.current.scrollHeight)  {
      setScrollOpacity(1);
    } else {
      setScrollOpacity(0);
    }
  };

  const LeaveHandler = () => {
    leaveHandlerFnRef.current = true;
    !scrollRef.current && setScrollOpacity(0);
  };
  return (
    <div
      onMouseEnter={enterHandler}
      onMouseLeave={LeaveHandler}
      style={{ transform: "translate(-16px, 48px)" }}
      className="notif-container fixed right-0 shadow-xl shadow-[#141414]"
    >
      <div
        style={{
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100vh - 56px - 16px)",
        }}
        className="flex flex-col w-[360px] bg-[#242526] min-h-[inherit]"
      >
        <div
          style={{
            willChange: "transform, scroll-position",
            perspective: "1px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "top right",
            overflowAnchor: "none",
          }}
          onMouseEnter={enterHandler}
          onMouseLeave={LeaveHandler}
          ref={containerRef}
          className="notif-container relative flex flex-col overflow-y-auto
    overflow-x-hidden overscroll-y-contain flex-grow shrink basis-full"
        >
          <div
            ref={contentRef}
            className="relative flex flex-col flex-grow rounded-lg"
          >
            <div className="flex justify-between">
              <div className="flex relative mt-[1rem] mx-4 flex-1 ">
                <div className="flex flex-1">
                  <span className="text-[#E4E6EB] text-2xl font-bold">
                    Notifications
                  </span>
                </div>

                <div className="flex rounded-full p-2 -mr-[2px] hover:bg-[#393939] text-[#B0B3B8] cursor-pointer">
                  <i
                    data-visualcompletion="css-img"
                    style={{
                      backgroundImage: "url(/3dots.png)",
                      filter:
                        "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                      backgroundPosition: "0 -494px",
                      backgroundSize: "auto",
                      width: "20px",
                      height: "20px",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex pl-4">
                <div className="pr-2 ">
                  <div
                    onMouseDown={(e) => handleRightClick(e)}
                    className={`group relative h-[36px] flex flex-wrap ${
                      showAll ? "bg-[#1D85FC33]" : "bg-transparent"
                    } rounded-[18px] justify-center items-center px-3 mt-[0.1rem] outline-zero w-full`}
                    role="button"
                    onMouseUp={() => handleShowAll()}
                  >
                    <span
                      className={`${
                        showAll ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                      }`}
                    >
                      <span className="text-[.875rem] font-medium leading-[2.3333] select-none">
                        All
                      </span>
                    </span>
                    <div
                                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                    !rightClick
                                      ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                      : ""
                                  } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                                ></div>
                  </div>
                </div>

                <div>
                  <div
                    onMouseDown={(e) => handleRightClick(e)}
                    onMouseUp={() => handleShowUnread()}    
                    className={`group relative h-[36px] flex flex-wrap rounded-[18px] ${
                      showUnread ? "bg-[#1D85FC33]" : "bg-transparent"
                    } justify-center items-center px-3 mt-[0.1rem] outline-zero w-full `}
                    role="button"
                  >
                    <span
                      className={`${
                        showUnread ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                      }`}
                    >
                      <span className="text-[.875rem] font-medium leading-[2.3333] select-none">
                        Unread
                      </span>
                    </span>
                    <div
                                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                    !rightClick
                                      ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                      : ""
                                  } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                                ></div>
                  </div>
                </div>
              </div>
              <div role="row" className="-mt-[4px]">
                <div className="flex flex-col pt-[20px] pb-[4px]">
                  <div className="flex flex-col flex-grow px-4">
                    <div className="flex flex-col ">
                      <div className="flex flex-col -my-[5px]">
                        <div className="my-[5px]">
                          <span
                            className="ba_4 block text-[1rem] font-semibold textProps leading-[1.1765]"
                            dir="auto"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col flex-grow shrink-0">
                                <h2>
                                  <span className="text-[1rem] text-[#E4E6EB] textProps font-semibold leading-[1.1765]">
                                    <span className="relative block select-none cursor-text pb-[1px]">
                                      Earlier
                                    </span>
                                  </span>
                                </h2>
                              </div>
                              <div className="relative flex justify-center ml-2 min-w-0 max-w-full shrink-0 self-start">
                                <div className="relative flex flex-col w-0 min-w-0 max-w-full ">
                                  &nbsp;
                                </div>
                                <div className="relative flex justify-between items-center shrink-0">
                                  <div className="relative flex flex-col shrink-0">
                                    <div className="relative flex justify-between items-stretch shrink-0">
                                      <a
                                onMouseDown={(e) => handleRightClick(e)}

                                        className="group relative p-0 m-0 min-h-0"
                                        href=""
                                      >
                                        <div className="flex flex-col">
                                          <div className="flex flex-col">
                                            <div className="flex flex-col">
                                              <span className="text-[.875rem] leading-[1.3333] textProps font-normal">
                                                <span className="block text-[#5AA7FF] cursor-pointer overflow-hidden whitespace-nowrap">
                                                  See all
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                  className={`absolute -inset-2 opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-[4px] ${
                                    !rightClick
                                      ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                      : ""
                                  } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                                ></div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_2.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <i
                                      data-visualcompletion="css-img"
                                      style={{
                                        backgroundImage:
                                          "url(/notifIcons/notif_msg.png)",
                                        backgroundPosition: "0 -986px",
                                        backgroundSize: "auto",
                                        width: "28px",
                                        height: "28px",
                                        backgroundRepeat: "no-repeat",
                                        display: "inline-block",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Sajid Hussain Khan{" "}
                                      </strong>{" "}
                                      commented on the status you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#8A8D91] text-[.75rem] textProps">
                                        <span className="">
                                          about an hour ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Hamza Sohail{" "}
                                      </strong>
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#0866FF] text-[.75rem] textProps">
                                        <span className="">8 hours ago</span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-[8px]" role="row">
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="parent-hover relative flex flex-col justify-center items-stretch"
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex px-[8px] justify-between items-center hover:bg-[rgba(255,255,255,0.1)] rounded-lg">
                        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
                          <div className="inline-block align-bottom">
                            <div>
                              <svg
                                aria-hidden="true"
                                className="align-bottom"
                                data-visualcompletion="ignore-dynamic"
                                role="none"
                                style={{ height: "56px", width: "56px" }}
                              >
                                {/* Define a circular mask */}
                                <mask id="circleMask">
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    data-visualcompletion="ignore"
                                    fill="black"
                                    r="9"
                                  ></circle>
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="/notifIcons/notif_image_1.jpg"
                                    style={{ height: "56px", width: "56px" }}
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
                              >
                                <div className="relative cursor-pointer">
                                  <div
                                    className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative select-none"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    <img
                                      className="object-cover align-[-.25em]"
                                      src="/notifIcons/heart-react.svg"
                                      alt=""
                                      aria-hidden="true"
                                      style={{ height: "28px", width: "28px" }}
                                    />
                                  </div>
                                  <div
                                    className="rounded-full transition-opacity"
                                    role="none"
                                    data-visualcompletion="ignore"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="notif-text flex justify-between relative items-center self-stretch select-none">
                          <div className="flex flex-col items-stretch justify-between relative  ">
                            <div className="py-[5px]">
                              <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                <div className="mb-[3px] mt-[3px]">
                                  <span
                                    className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                    dir="auto"
                                  >
                                    <span className="relative overflow-hidden textClass">
                                      <div
                                        className="absolute"
                                        style={{
                                          clip: "rect(0,0,0,0",
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
                                        }}
                                      >
                                        Unread
                                      </div>
                                      <strong style={{ fontWeight: "600" }}>
                                        Omer Anzar
                                      </strong>
                                      ,{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        Mohammad Ismail Zabi
                                      </strong>{" "}
                                      and{" "}
                                      <strong style={{ fontWeight: "600" }}>
                                        4 other people
                                      </strong>{" "}
                                      reacted to a video you shared.
                                    </span>
                                  </span>
                                </div>
                                <div className="mb-[3px] mt-[-3px]">
                                  <span
                                    className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91] leading-[1.2308]"
                                    dir="auto"
                                  >
                                    <span className="pb-[1px] overflow-ellipsis relative block overflow-hidden whitespace-nowrap">
                                      <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] textProps">
                                        <span className="">
                                          a few seconds ago
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col -mx-[12px]">
                              <div className="max-w-full"></div>
                            </div>
                          </div>
                          <div className="relative ml-[12px] left-[2px] my-[8px] self-center">
                            <div className="flex items-center">
                              <div className="">
                                <div
                                  className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-zero items-center"
                                  role="presentation"
                                  tabIndex="0"
                                >
                                  <span
                                    className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                    data-visualcompletion="ignore"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    aria-label="Options for this notification"
                    role="gridcell"
                  >
                    <div className="flex absolute top-[23%] h-[1px] clip-hidden w-[1px] overlay -translate-y-1/2">
                      <div>
                        <div className="rounded-full customShadow">
                          <div
                            onMouseDown={(e) => handleRightClick(e)}
                            onMouseEnter={(e) => handleMouseEnter(e)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                            aria-label="Manage notification settings"
                            className="relative group h-[36px] w-[36px] rounded-full bg-[#3E4042] flex justify-center items-center customShadow-2 outline-zero list-none"
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
                              className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                !rightClick
                                  ? "group-active:bg-[rgba(68,73,80,0.15)]"
                                  : ""
                              } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
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
          <div
            className={`bg-[#3E4042] w-4 absolute top-0 ease-linear duration-500 h-full opacity-0
              ${scrollOpacity ? "hover:opacity-30" : "pointer-events-none"}`}
            data-visualcompletion="ignore"
            data-thumb="1"
            ref={trackRef}
            style={{
              display: "block",
              height: `${contentRef.current?.scrollHeight}px`,
              right: "0px",
              transitionProperty: "opacity",
            }}
          ></div>
          <div
            className="absolute top-0 w-4 origin-top-right ease-linear duration-300 px-[4px] py-0 m-0 pointer-events-none"
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
    </div>
  );
}

export default NotifPanel;
