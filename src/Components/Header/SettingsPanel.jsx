import React, { useState, useEffect, useRef } from "react";

function SettingsPanel() {
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
  const [searchQuery, setSearchQuery] = useState("");

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);

  const resources = [
    {
      category: "Social",
      items: [
        {
          name: "Events",
          description:
            "Organize or find events and other things to do online and nearby.",
          imgSrc: "/settings_event.png",
          bgPos: null,
        },
        {
          name: "Friends",
          description: "Search for friends or people you may know.",
          imgSrc: "/iconBar.png",
          bgPos: "0 -296px",
        },
        {
          name: "Groups",
          description: "Connect with people who share your interests.",
          imgSrc: "/settings_group.png",
          bgPos: null,
        },
        {
          name: "News Feed",
          description: "See relevant posts from people and Pages you follow.",
          imgSrc: "/settings_news.png",
          bgPos: null,
        },
        {
          name: "Feeds",
          description:
            "See the most recent posts from your friends, groups, Pages and more.",
          imgSrc: "/settings_feed.png",
          bgPos: null,
        },
        {
          name: "Pages",
          description: "Discover and connect with businesses on Facebook.",
          imgSrc: "/settings_pages.png",
          bgPos: null,
        },
      ],
    },
    {
      category: "Entertainment",
      items: [
        {
          name: "Gaming Video",
          description:
            "Watch and connect with your favorite games and streamers.",
          imgSrc: "/settings_gamingvideo.png",
          bgPos: null,
        },
        {
          name: "Play games",
          description: "Play your favorite games.",
          imgSrc: "/settings_playgames.png",
          bgPos: null,
        },
        {
          name: "Video",
          description:
            "A video destination personalized to your interests and connections.",
          imgSrc: "/settings_video.png",
          bgPos: null,
        },
      ],
    },
    {
      category: "Shopping",
      items: [
        {
          name: "Recent ad activity",
          description: "See all the ads you interacted with on Facebook.",
          imgSrc: "/settings_ad.png",
          bgPos: null,
        },
        {
          name: "Memories",
          description: "Browse your old photos, videos and posts on Facebook.",
          imgSrc: "/settings_memories.png",
          bgPos: null,
        },
        {
          name: "Saved",
          description:
            "Find posts, photos and videos that you saved for later.",
          imgSrc: "/settings_saved.png",
          bgPos: null,
        },
      ],
    },
    {
      category: "Professional",
      items: [
        {
          name: "Ads Manager",
          description: "Create, manage and track the performance of your ads.",
          imgSrc: "/settings_admanager.png",
          bgPos: null,
        },
      ],
    },
    {
      category: "Community Resources",
      items: [
        {
          name: "Climate Science Center",
          description: "Learn about climate change and its effects.",
          imgSrc: "/settings_climate.png",
          bgPos: null,
        },
        {
          name: "Crisis response",
          description:
            "Find the latest updates for recent crises happening around the world.",
          imgSrc: "/settings_crises.png",
          bgPos: null,
        },
        {
          name: "Fundraisers",
          description:
            "Donate and raise money for nonprofits and personal causes.",
          imgSrc: "/settings_funds.png",
          bgPos: null,
        },
      ],
    },
    {
      category: "More from Meta",
      items: [
        {
          name: "Messenger Kids",
          description: "Let kids message with close friends and family.",
          imgSrc: "/settings_messenger.png",
          bgPos: null,
        },
        {
          name: "WhatsApp",
          description: "Message and call people privately on your computer.",
          imgSrc: "/settings_whatsapp.png",
          bgPos: null,
        },
      ],
    },
  ];
  const filteredItems = resources.flatMap(
    (res) =>
      res.items?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
  );
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

      if (containerHeight !== contentHeight) {
        setThumbHeight(newThumbHeight);
        setScrollOpacity(1);
      } else {
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
  }, [searchQuery]);

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
    if (containerRef.current.clientHeight !== contentRef.current.scrollHeight) {
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
      className="settings-container flex flex-col absolute right-0 top-2 shadow-[#141414] max-w-[650px]"
      style={{ transform: "translate(-16px, 45px)" }}
    >
      <div
        className="flex flex-col bg-[#323436] rounded-lg select-none"
        style={{
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100vh - 56px - 16px)",
        }}
      >
        <div className="flex flex-col justify-center">
          <div className="flex flex-col text-[#E4E6EB] text-2xl py-[17px] font-bold">
            <div className="flex flex-col -my-[2px] min-h-0 px-4">
              <span className="relative bottom-[1px] ba_1 block max-w-full leading-[1.1667] cursor-text">
                Menu
              </span>
            </div>
          </div>
        </div>
        <div></div>
        <div
          onMouseEnter={enterHandler}
          onMouseLeave={LeaveHandler}
          ref={containerRef}
          className="overscroll-y-contain relative flex flex-col flex-grow shrink min-h-0 overflow-x-hidden overflow-y-auto px-4 basis-full"
          style={{
            willChange: "transform, scroll-position",
            perspective: "1px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "top right",
            overflowAnchor: "none",
          }}
        >
          <div className="flex flex-col min-h-0 flex-grow">
            <div ref={contentRef} className="relative flex -m-2">
              <div className="max-w-full min-w-0 m-2 basis-0 shrink flex-grow overflow-hidden">
                <div
                  className="flex flex-col basis-0 bg-[#242526] rounded-lg customShadow-3"
                  style={{ minHeight: "calc(100vh - 118px)" }}
                >
                  <div className="relative flex flex-col w-[360px]">
                    <div className="search-container flex flex-col p-4">
                      <div className="flex flex-col">
                        <label className="search w-[328px] relative bg-[#3A3B3C] rounded-full flex items-center ">
                          <span className="flex pl-[10px] items-center whitespace-nowrap pointer-events-none ">
                            <i
                              data-visualcompletion="css-img"
                              className="align-[-0.25em] text-[#B0B3B8]"
                              style={{
                                filter:
                                  "invert(59%) sepia(11%) saturate(200%) saturate(135%) hue-rotate(175deg) brightness(96%) contrast(94%)",
                                backgroundImage: "url(/iconBar_2.png)",
                                backgroundPosition: "0px -689px",
                                backgroundSize: "auto",
                                width: "16px",
                                height: "16px",
                                backgroundRepeat: "no-repeat",
                                display: "inline-block",
                              }}
                            ></i>
                          </span>
                          <input
                            id="settings-search"
                            name="settings-search"
                            aria-label="Search menu"
                            className="flex justify-center text-left flex-grow pt-[6px] pb-[8px] items-center flex-shrink w-full xl:placeholder-[#B0B3B8] focus:placeholder-[#8A8D91] text-[#E4E6EB] bg-transparent h-[36px] px-[0.38rem] rounded-full md:text-[.9375rem] placeholder-transparent outline-zero"
                            type="text"
                            placeholder="Search menu"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <span className="flex absolute left-3 text-[#B0B3B8]"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col max-w-full min-w-0">
                      {filteredItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center w-full p-6">
                            <div className="block mb-5">
                              <svg
                                viewBox="0 0 112 112"
                                width="112"
                                height="112"
                                className="block svgClass"
                                style={{ color: "#E4E6EB" }}
                              >
                                <defs>
                                  <clipPath id="a">
                                    <path
                                      fill="none"
                                      d="m88.53 98.17-9.01-27.9 13.12-4.24 10.38 32.14H88.53z"
                                    ></path>
                                  </clipPath>
                                  <clipPath id="b">
                                    <circle
                                      fill="none"
                                      cx="77.06"
                                      cy="23.51"
                                      r="5.17"
                                    ></circle>
                                  </clipPath>
                                  <clipPath id="c">
                                    <path
                                      fill="none"
                                      d="M67.5 43.87 32.16 60.84 17.99 38.21 48.7 13.84l18.8 30.03z"
                                    ></path>
                                  </clipPath>
                                </defs>
                                <g>
                                  <path
                                    fill="#90c3ff"
                                    d="M74 12.26h6.69a1.55 1.55 0 0 1 1.55 1.55v9.71h-9.8V13.8A1.55 1.55 0 0 1 74 12.26z"
                                  ></path>
                                  <path
                                    strokeWidth="3.45"
                                    stroke-miterlimit="10"
                                    strokeLinecap="round"
                                    stroke="#90c3ff"
                                    fill="none"
                                    d="m42.74 52.62-17.71 49.09"
                                  ></path>
                                  <path
                                    stroke="#7a7d81"
                                    strokeWidth="3.45"
                                    stroke-miterlimit="10"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="m40.2 50.53 16.22 56.04"
                                  ></path>
                                  <g clipPath="url(#a)">
                                    <path d="m88.53 98.17-9.01-27.9 13.12-4.24 9.64 29.85-13.75 2.29z"></path>
                                    <ellipse
                                      fill="#1876f2"
                                      cx="83.8"
                                      cy="89.48"
                                      rx="11.42"
                                      ry="17.96"
                                      transform="rotate(-14.08 83.78 89.474)"
                                    ></ellipse>
                                  </g>
                                  <path
                                    fill="#7a7d81"
                                    d="M83.35 98.17H92l-4.86-4.27-3.79 4.27zm0 0h18.66v1.41H83.35zm7.7-58.39-13.3 32.06H98.1l7.21-30.15-14.26-1.91z"
                                  ></path>
                                  <path
                                    fill="#7a7d81"
                                    transform="rotate(-32.88 11.202 56.798)"
                                    d="M4.33 52.73h13.74v8.09H4.33z"
                                  ></path>
                                  <circle
                                    fill="#90c3ff"
                                    cx="5.9"
                                    cy="60.22"
                                    r="4.14"
                                  ></circle>
                                  <circle
                                    fill="#bcc0c4"
                                    cx="25.29"
                                    cy="49.4"
                                    r="13.35"
                                  ></circle>
                                  <g clipPath="url(#b)">
                                    <circle
                                      fill="#1876f2"
                                      cx="77.06"
                                      cy="23.51"
                                      r="5.17"
                                    ></circle>
                                    <path
                                      fill="#90c3ff"
                                      d="M70.4 19.67c.23.16 14.33 9 14.33 9l.42-11S71.5 13.45 71.42 13.7s-1.02 5.97-1.02 5.97z"
                                    ></path>
                                  </g>
                                  <g clipPath="url(#c)">
                                    <path
                                      fill="#bcc0c4"
                                      d="M67.5 43.87 32.16 60.84 17.99 38.21 48.7 13.84l18.8 30.03z"
                                    ></path>
                                  </g>
                                  <rect
                                    fill="#bcc0c4"
                                    x="48.9"
                                    y="7.6"
                                    width="20.37"
                                    height="40.75"
                                    rx="1.39"
                                    transform="rotate(-32.88 59.09 27.972)"
                                  ></rect>
                                  <path
                                    stroke-linejoin="round"
                                    strokeWidth="8.62"
                                    stroke="#1877f2"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="m82.23 36.33-4.16 9.8-11.9-6.06"
                                  ></path>
                                  <path
                                    strokeWidth="13.78"
                                    stroke="#1877f2"
                                    fill="#1876f2"
                                    stroke-miterlimit="10"
                                    d="M102.17 63.5v37.51"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="m92.41 32.72-4.5 10.96-10.82-6.54 4.01-9.23 11.31 4.81z"
                                  ></path>
                                  <path
                                    fill="#bcc0c4"
                                    d="m108.9 37.81-19.36 7 2.63 30.75h17.15V39.87a5.3 5.3 0 0 0-.42-2.06z"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="m106.64 35.29-10.92-6.13-7.21-3.89a5.08 5.08 0 0 0-7.11 2.06L80.54 29a9.16 9.16 0 0 0 3.06 11.79l5.94 4L109 38a5.17 5.17 0 0 0-2.36-2.71zm-15.11 65.72h8.65l-4.87-4.27-3.78 4.27zm0 0h18.66v1.41H91.53z"
                                  ></path>
                                  <circle
                                    fill="#1876f2"
                                    cx="72.63"
                                    cy="25.97"
                                    r="1.22"
                                  ></circle>
                                  <circle
                                    fill="#1876f2"
                                    cx="77.74"
                                    cy="23.74"
                                    r="1.88"
                                  ></circle>
                                </g>
                              </svg>
                            </div>
                            <div className="flex flex-col items-center justify-center -my-1.5">
                              <div className="my-1.5">
                                <h2>
                                  <span
                                    className="ba_6 block text-[#B0B3B8] font-bold leading-[1.2] text-[1.25rem] textProps max-w-full min-w-0 text-center"
                                    dir="auto"
                                  >
                                    We didn't find anything
                                  </span>
                                </h2>
                              </div>
                              <div className="my-1.5">
                                <span
                                  className="ba_4 block text-[#B0B3B8] font-normal leading-[1.1765] text-[1rem] textProps max-w-full min-w-0 text-center"
                                  dir="auto"
                                >
                                  Try different keywords or make sure everything
                                  is spelled correctly.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        resources.map((res, index) => {
                          const categoryFilteredItems =
                            res.items?.filter((item) =>
                              item.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            ) || [];

                          if (categoryFilteredItems.length === 0) return null;

                          return (
                            <div
                              key={index}
                              className={`${res.category} pb-[11px]`}
                            >
                              <div className="flex flex-col">
                                <div className="flex flex-col px-2 pb-2 pt-0">
                                  <div className="relative flex flex-col max-w-full z-0">
                                    <div className="flex flex-col min-w-0 max-w-full pt-2 pb-[4px]">
                                      <div className="flex flex-col flex-grow min-h-0 px-2">
                                        <div className="flex flex-col">
                                          <div className="flex flex-col -my-[5px]">
                                            <div className="ba_1 my-[5px]">
                                              <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                                {res.category}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {categoryFilteredItems.map(
                                  (item, itemIndex) => (
                                    <div key={itemIndex} className="px-2">
                                      <ul className="flex flex-col flex-1">
                                        <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                          <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                            <div className="flex items-center justify-between">
                                              <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                                {item.bgPos ? (
                                                  <i
                                                    data-visualcompletion="css-img"
                                                    style={{
                                                      backgroundImage: `url(${item.imgSrc})`,
                                                      backgroundPosition:
                                                        item.bgPos,
                                                      backgroundSize: "auto",
                                                      width: "36px",
                                                      height: "36px",
                                                      backgroundRepeat:
                                                        "no-repeat",
                                                      display: "inline-block",
                                                    }}
                                                  />
                                                ) : (
                                                  <img
                                                    src={item.imgSrc}
                                                    alt={item.name}
                                                    style={{
                                                      width: "36px",
                                                      height: "36px",
                                                    }}
                                                  />
                                                )}
                                              </div>

                                              <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                                <div className="flex flex-col -my-[5px]">
                                                  <div className="title my-[5px]">
                                                    <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                                      {item.name}
                                                    </span>
                                                  </div>
                                                  <div className="desc my-[5px]">
                                                    <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                                      {item.description}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                        </a>
                                      </ul>
                                    </div>
                                  )
                                )}
                                {res.category !== "More from Meta" &&
                                  !searchQuery && (
                                    <div
                                      className="ml-[1rem] mt-[20px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                                      role="separator"
                                    ></div>
                                  )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* <div className="flex flex-col max-w-full min-w-0">
                      <div className="Social pb-[20px]">
                        <div className="relative flex flex-col flex-grow min-h-0">
                          <div className="flex flex-col">
                            <div className="relative flex flex-col px-2 pb-2 max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-2 pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0">
                                  <div className="flex flex-col px-2">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          Social
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="relative flex flex-col shrink-0 px-2">
                              <ul className="flex flex-col">
                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_event.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Events
                                            </span>
                                          </div>

                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Organize or find events and other
                                              things to do online and nearby.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <i
                                          data-visualcompletion="css-img"
                                          style={{
                                            backgroundImage:
                                              "url(/iconBar.png)",
                                            backgroundPosition: "0 -296px",
                                            backgroundSize: "auto",
                                            width: "36px",
                                            height: "36px",
                                            backgroundRepeat: "no-repeat",
                                            display: "inline-block",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Friends
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Search for friends or people you
                                              may know.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="settings_group.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Groups
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Connect with people who share your
                                              interests.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_news.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              News Feed
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              See relevant posts from people and
                                              Pages you follow.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_feed.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Feeds
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              See the most recent posts from
                                              your friends, groups, Pages and
                                              more.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_pages.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Pages
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Discover and connect with
                                              businesses on Facebook.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>
                      <div className="Entertainment pb-[20px]">
                        <div className="flex flex-col">
                          <div className="flex flex-col px-2 pb-2 pt-0">
                            <div className="relative flex flex-col max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0 px-2">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          Entertainment
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <ul className="flex flex-col flex-1">
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_gamingvideo.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Gaming Video
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Watch and connect with your favorite
                                            games and streamers.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>

                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_playgames.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Play games
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Play your favorite games.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>

                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_video.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Video
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            A video destination personalized to
                                            your interests and connections.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>

                      <div className="Shopping pb-[20px]">
                        <div className="flex flex-col px-2 pb-2 pt-0">
                          <div className="relative flex flex-col max-w-full z-0">
                            <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                              <div className="flex flex-col flex-grow min-h-0 px-2">
                                <div className="flex flex-col">
                                  <div className="flex flex-col -my-[5px]">
                                    <div className="ba_1 my-[5px]">
                                      <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                        Shopping
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-2">
                          <ul className="flex flex-col flex-1">
                            <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                              <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                <div className="flex items-center justify-between">
                                  <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                    <img
                                      src="/settings_payments.png"
                                      alt=""
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                      }}
                                    />
                                  </div>
                                  <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="title my-[5px]">
                                        <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps ">
                                          Orders and payments
                                        </span>
                                      </div>
                                      <div className="desc my-[5px]">
                                        <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                          A seamless, secure way to pay on the
                                          apps you already use.
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                            </a>

                            <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                              <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                <div className="flex items-center justify-between">
                                  <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                    <img
                                      src="/settings_marketplace.png"
                                      alt=""
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                      }}
                                    />
                                  </div>
                                  <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="title my-[5px]">
                                        <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                          Marketplace
                                        </span>
                                      </div>
                                      <div className="desc my-[5px]">
                                        <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                          Buy and sell in your community.
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                            </a>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>

                      <div className="Personal pb-[20px]">
                        <div className="flex flex-col">
                          <div className="flex flex-col px-2 pb-2 pt-0">
                            <div className="relative flex flex-col max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0 px-2">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          Personal
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <ul className="flex flex-col flex-1">
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_ad.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Recent ad activity
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            See all the ads you interacted with
                                            on Facebook.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>

                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_memories.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Memories
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Browse your old photos, vidoes and
                                            posts on Facebook.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>

                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_saved.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Saved
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Find posts, photos and videos that
                                            you saved for later.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>
                      <div className="Professional pb-[20px]">
                        <div className="flex flex-col">
                          <div className="flex flex-col px-2 pb-2 pt-0">
                            <div className="relative flex flex-col max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0 px-2">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          Professional
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <ul className="flex flex-col flex-1">
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_admanager.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Ads Manager
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Create, manage and track the
                                            performance of your ads.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>
                      <div className="CommunityResources pb-[20px]">
                        <div className="flex flex-col">
                          <div className="flex flex-col px-2 pb-2 pt-0">
                            <div className="relative flex flex-col max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0 px-2">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          Community Resources
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <ul className="flex flex-col flex-1">
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_climate.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Climate Science Center
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Learn about climate change and its
                                            effects.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>{" "}
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_crises.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Crisis response
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Find the latest updates for recent
                                            crises happening around the world.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>
                              <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                  <div className="relative flex items-center justify-between">
                                    <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                      <img
                                        src="/settings_funds.png"
                                        alt=""
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                        }}
                                      />
                                    </div>
                                    <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                      <div className="flex flex-col -my-[5px]">
                                        <div className="title my-[5px]">
                                          <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                            Fundraisers
                                          </span>
                                        </div>
                                        <div className="desc my-[5px]">
                                          <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                            Donate and raise money for
                                            nonprofits and personal causes.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                              </a>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div
                        className="ml-[1rem] -mb-[1px] border-b-[0.1rem] border-[#3e4042] w-[20.5rem]"
                        role="separator"
                      ></div>
                      <div className="More pb-[20px]">
                        <div className="flex flex-col">
                          <div className="flex flex-col px-2 pb-2 pt-0">
                            <div className="relative flex flex-col max-w-full z-0">
                              <div className="flex flex-col min-w-0 max-w-full pt-[20px] pb-[4px]">
                                <div className="flex flex-col flex-grow min-h-0 px-2">
                                  <div className="flex flex-col">
                                    <div className="flex flex-col -my-[5px]">
                                      <div className="ba_1 my-[5px]">
                                        <span className="block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold pb-[1px] overflow-hidden cursor-text">
                                          More from Meta
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <ul className="flex flex-col flex-1">
                              <div className="flex flex-col">
                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_messenger.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              Messenger Kids
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Let kids message with close
                                              friends and family.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>

                                <a className="relative block min-w-0 min-h-0 m-0 p-0 border-[rgba(0,0,0,0.4)] bg-non outline-zero no-underline z-0 cursor-pointer">
                                  <div className="relative flex flex-col items-stretch cursor-pointer min-h-[56px] -m-[6px] px-2 py-3">
                                    <div className="flex items-center justify-between">
                                      <div className="img shrink-0 flex flex-col relative min-w-0 max-w-full -mt-[4px] p-[6px]">
                                        <img
                                          src="/settings_whatsapp.png"
                                          alt=""
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        />
                                      </div>
                                      <div className="relative flex flex-col justify-between flex-grow basis-auto p-[6px]">
                                        <div className="flex flex-col -my-[5px]">
                                          <div className="title my-[5px]">
                                            <span className="relative ba_1 block leading-[1.3333] text-[#E4E6EB] text-[.875rem] font-semibold min-w-0 max-w-full textProps">
                                              WhatsApp
                                            </span>
                                          </div>
                                          <div className="desc my-[5px]">
                                            <span className="ba_3 mb-[-3px] block leading-[1.2308] text-[#E4E6EB] text-xs font-normal text-start min-w-0 max-w-full textProps">
                                              Message and call people privately
                                              on your computer.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded-lg absolute inset-0 opacity-0 bg-[rgba(255,255,255,0.1)] hover:opacity-100"></div>
                                </a>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="settings_post_mobile pt-4">
                  <div className="min-w-0 shrink flex-grow basis-0 max-w-full [overflow-anchor:none]">
                    <div className="sticky top-0 flex flex-col ">
                      <div className="basis-0 flex flex-col w-full shrink bg-[#242526] rounded-lg customShadow-3">
                        <div className="py-2 px-3">
                          <h1 className="text-xl text-[#E4E6EB] font-bold cursor-text">
                            Create
                          </h1>
                        </div>
                        <div className="settings-menu py-[6px]">
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist.png)",
                                  backgroundPosition: "0 -222px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Post
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist2.png)",
                                  backgroundPosition: "0 -275px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Story
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist.png)",
                                  backgroundPosition: "0 -96px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Reel
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist2.png)",
                                  backgroundPosition: "0 -191px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Life event
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div
                            className="mx-4 my-2 border-b-[0.1rem] border-[#3E4042]"
                            role="separator"
                          ></div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist3.png)",
                                  backgroundPosition: "0 -192px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Page
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist2.png)",
                                  backgroundPosition: "0 -212px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Ad{" "}
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist3.png)",
                                  backgroundPosition: "0 -171px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Group{" "}
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist4.png)",
                                  backgroundPosition: "0 -79px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                              <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                Event{" "}
                              </span>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                          <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px] bottom-[2px]">
                            <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start relative top-[2px]">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage:
                                    "url(/settings_iconlist.png)",
                                  backgroundPosition: "0 -348px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium">
                                <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                                  Marketplace listing{" "}
                                </span>
                              </div>
                            </div>
                            <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settingsMenu pt-4 hidden">
                  <div className="min-w-0 shrink flex-grow basis-0 max-w-full [overflow-anchor:none]">
                    <div className="sticky top-0 flex flex-col ">
                      <div className="basis-0 flex flex-col w-full shrink bg-[#242526] rounded-lg customShadow-3">
                        <div className="py-2 px-3">
                          <h1 className="text-xl text-[#E4E6EB] font-bold cursor-text">
                            Your shortcuts
                          </h1>
                        </div>
                        <div className="settings-menu flex flex-col py-[6px]">
                          <div className="relative flex flex-col cursor-pointer min-h-[44px]">
                            <ul className="flex flex-col">
                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg ">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
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
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
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
                                      </div>
                                    </div>
                                  </div>
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    PPG - Pakistani PC Gamers
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>
                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
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
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
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
                                      </div>
                                    </div>
                                  </div>

                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    NEDians Meme Posting
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>

                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
                                        >
                                          {/* Define a circular mask */}
                                          <mask id=":ss_3:">
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
                                            ></image>
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    Death Never Knocks
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>
                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
                                        >
                                          {/* Define a circular mask */}
                                          <mask id=":ss_4:">
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
                                            ></image>
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    JK Developers
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>
                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
                                        >
                                          {/* Define a circular mask */}
                                          <mask id=":ss_5:">
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
                                            ></image>
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    JoN - Productions
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>
                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
                                        >
                                          {/* Define a circular mask */}
                                          <mask id=":ss_5:">
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
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
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    Max Sweet
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>

                              <li>
                                <div className="relative flex flex-wrap items-center px-4 rounded-lg">
                                  <div className="flex flex-col mb-[6px] mt-[6px] mr-[12px] self-start relative">
                                    <div className="relative inline-block align-bottom">
                                      <div>
                                        <svg
                                          aria-hidden="true"
                                          className="align-bottom"
                                          data-visualcompletion="ignore-dynamic"
                                          role="none"
                                          style={{
                                            height: "36px",
                                            width: "36px",
                                          }}
                                        >
                                          {/* Define a circular mask */}
                                          <mask id=":ss_5:">
                                            <circle
                                              cx="18"
                                              cy="18"
                                              r="18"
                                              fill="white"
                                            />
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
                                              style={{
                                                height: "36px",
                                                width: "36px",
                                              }}
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
                                  <span className="before_a flex flex-grow items-center text-sm my-[0.4rem] font-[500] text-[#E4E6EB] pb-[0.1rem]">
                                    Toast Sweet
                                  </span>
                                  <div className="absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] mx-2"></div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings_post min-w-0 shrink flex-grow basis-0 m-2 max-w-[200px] [overflow-anchor:none]">
                <div className="sticky top-0 flex flex-col ">
                  <div className="basis-0 flex flex-col w-full shrink bg-[#242526] rounded-lg customShadow-3">
                    <div className="py-2 px-3">
                      <h1 className="text-xl text-[#E4E6EB] font-bold cursor-text">
                        Create
                      </h1>
                    </div>
                    <div className="settings-menu py-[6px]">
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist.png)",
                              backgroundPosition: "0 -222px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Post
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist2.png)",
                              backgroundPosition: "0 -275px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Story
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist.png)",
                              backgroundPosition: "0 -96px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Reel
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist2.png)",
                              backgroundPosition: "0 -191px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Life event
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div
                        className="mx-4 my-2 border-b-[0.1rem] border-[#3E4042]"
                        role="separator"
                      ></div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist3.png)",
                              backgroundPosition: "0 -192px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Page
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist2.png)",
                              backgroundPosition: "0 -212px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Ad{" "}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist3.png)",
                              backgroundPosition: "0 -171px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Group{" "}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist4.png)",
                              backgroundPosition: "0 -79px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium bottom-[1px]">
                          <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                            Event{" "}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
                      </div>
                      <div className="relative flex items-center px-4 py-[6px] cursor-pointer min-h-[44px] bottom-[2px]">
                        <div className="icon bg-[rgba(255,255,255,0.1)] inline-flex justify-center items-center h-[36px] w-[36px] mr-3 rounded-full self-start relative top-[2px]">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              filter:
                                "invert(89%) sepia(6%) hue-rotate(185deg)",
                              backgroundImage: "url(/settings_iconlist.png)",
                              backgroundPosition: "0 -348px",
                              backgroundSize: "auto",
                              width: "20px",
                              height: "20px",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="py-1 heading relative text-[#E4E6EB] text-sm font-medium">
                            <span className="max-w-full min-w-0 ba heading relative block text-[#E4E6EB] text-sm -mb-[3px] leading-[1.36] font-medium textProps">
                              Marketplace listing{" "}
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-lg mx-2 opacity-0 hover:opacity-100 bg-[rgba(255,255,255,0.1)]"></div>
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

export default SettingsPanel;
