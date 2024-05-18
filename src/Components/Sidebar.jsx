import React, { useRef, useEffect, useState } from "react";

function Sidebar() {
  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarPosition, setScrollbarPosition] = useState(0);
  const containerRef = useRef(null);
  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);

  const [scrollOpacity, setScrollOpacity] = useState(0);

  const [trackOpacity, setTrackOpacity] = useState(0);

  const handleMouseOver = () => {
    if (seeMore) setTrackOpacity(1);
  };
  const handleMouseOut = () => {
    setTrackOpacity(0);
  };

  const clickHandler = () => {
    setSeeMore((prev) => !prev);
    if (scrollOpacity === 0) {
      setScrollOpacity(1);
    } else {
      setScrollOpacity(0);
      setTrackOpacity(0);
    }
  };
  const clickHandler2 = () => {
    setSeeMore2((prev) => !prev);
  };

  useEffect(() => {
    if (containerRef.current && seeMore) {
      // Scroll to the top when seeMore is true

      setScrollbarPosition(0);
    }
  }, [seeMore]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        contentRef?.current?.scrollTop /
        (contentRef?.current?.scrollHeight - contentRef?.current?.clientHeight);
      const scrollbarPosition =
        scrollPercentage *
        (contentRef?.current?.clientHeight -
          scrollbarRef?.current?.clientHeight);
      setScrollbarPosition(scrollbarPosition);
    };

    contentRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      contentRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection while dragging
    const startY = e.clientY;
    const startScrollOffset = contentRef.current.scrollTop;

    const onMouseMove = (e) => {
      const deltaY = e.clientY - startY;
      const scrollY =
        startScrollOffset +
        deltaY *
          (contentRef?.current?.scrollHeight /
            contentRef?.current?.clientHeight);
      contentRef.current.scrollTop = scrollY;
    };
    if (seeMore) {
      setScrollOpacity(30);
    }
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setTimeout(() => {
        setScrollOpacity(0);
      }, 1000);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const scrollHandler = () => {
    setScrollOpacity(1);
  };
  const LeaveHandler = () => {
    setScrollOpacity(0);
  };

  return (
    <div
      className="scroll-container hidden lg:flex lg:flex-col relative"
      onMouseEnter={seeMore ? scrollHandler : null}
      onMouseLeave={seeMore ? LeaveHandler : null}
    >
      <div ref={contentRef} className="content">
        <div
          ref={containerRef}
          className={`content-item sidebar p-[0.6rem] text-[#E4E6EB] w-[360px] cursor-pointer  ${
            seeMore ? "overflow-y-scroll overflow-x-hidden " : "overflow-hidden"
          }`}
        >
          <div className={`sidebar flex flex-col cursor-pointer mt-[0.35rem]`}>
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
              <img src="/adsManager.png" alt="" />

              <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                Ads Manager
              </span>
              <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
            </div>
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
            
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
            <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/climate.png" alt="" />
                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Climate Science Center
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/feeds.png" alt="" />

                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Feeds
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/gaming.png" alt="" />

                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Gaming Video
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/mkids.png" alt="" />

                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Messenger Kids
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/orders.png" alt="" />

                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Orders and payments
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
                  <img src="/activity.png" alt="" />

                  <span className="ba_1 text-sm ml-[0.74rem] font-[500]">
                    Recent ad activity
                  </span>
                  <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
                </div>
                <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
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
          <div
            className="relative top-[-2px] left-[-2px] ml-[0.5rem] mt-2 border-b-[0.1rem] border-[#3A3B3C] w-[20.5rem]"
            role="separator"
          ></div>
          <div
            className={`sidebar flex flex-col text-white cursor-pointer w-[350px]`}
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
                      <rect cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
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
                          xlinkHref="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/439839290_7674432612650955_7641392389557855885_n.jpg?stp=c41.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DOusUMj9s-4Q7kNvgHiS0s-&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfB8ktPVdjK7Kne4E2rVMKNAwrLT4cLeW-SL8aiTghIfsw&oe=663DA35B"
                          style={{ height: "36px", width: "36px" }}
                        ></image>
                            <rect className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]" cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
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
                  <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
                      <rect cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
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
                          xlinkHref="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.18169-9/252731_1666266870985_2489456_n.jpg?stp=c9.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GjJ5RCYrb7QQ7kNvgGqPhrl&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfC8Oeu90T5sqsiq0j2o6F2svdRDUdlhMEGuuyKx5b0NfA&oe=665F3E58"
                          style={{ height: "36px", width: "36px" }}
                        ></image>
                            <rect className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]" cy="18" fill="white" height="36" rx="8" ry="8" width="36" x="0" y="0"></rect>
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
              ..SiR IsHaQuE BaRbEr..
                  </span>
                  <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
                  <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
              <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
              <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
                <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
              <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
              <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
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
                <div className="ml-[-2px] mr-2 absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
              </div>
            )}
          </div>
          <div>
            
          </div>
        </div>
      </div>

      <div
        ref={scrollbarRef}
        className="custom-scrollbar duration-300 transition-opacity"
        style={{ top: `${scrollbarPosition}px`, opacity: scrollOpacity }}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      ></div>

      <div
        className={`custom-scrollbar-track-1 ${
          trackOpacity ? "opacity-30" : "opacity-0"
        } bg-[#3E4042] opacity-0 transition-opacity duration-500 ease-in-out`}
      ></div>
    </div>
  );
}

export default Sidebar;
