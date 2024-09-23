import { throttle } from "lodash";
import { Search, NotifPanel, MessagePanel, SettingsPanel } from "../index";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

function Header() {
  const activeTabClassName = "text-[#0866FF]";
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isChecked, setIsChecked] = useState("dark");
  const [isCheckedFont, setIsCheckedFont] = useState("true");
  const [rightClick, setrightClick] = useState(false)

  useEffect(() => {
    console.log(rightClick);
  }, [rightClick]);

  const [showMenu, setShowMenu] = useState({
    Settings: false,
    Messenger: false,
    Notif: false,
    User: false,
  });

  const toggleMenu = (e, menu) => {
    
    if (e.button !== 0) return;
  

    setShowMenu((prev) => {
      const newState = {
        Settings: false,
        Messenger: false,
        Notif: false,
        User: false,
      };
      newState[menu] = !prev[menu];
      return newState;
    });
  };

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
    if (!rightClick)  {
      e.currentTarget.classList.add("notifIconScale");

    } else {
      e.currentTarget.classList.remove("notifIconScale");

    }
 
    // scaleIconRefs.current[menu].current?.classList.add("notifIconScale");
  };
  const handleMouseLeave = (e, menu) => {
    e.currentTarget.classList.remove("notifIconScale");

    // scaleIconRefs.current[menu].current?.classList.remove("notifIconScale");
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1099); // Adjust breakpoint as needed
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
        </svg>
      ),
    },
    {
      name: "Reels",
      slug: "/reels",
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10.996 8.132A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z"></path>
          <path d="M14.573 2H9.427c-1.824 0-3.293 0-4.45.155-1.2.162-2.21.507-3.013 1.31C1.162 4.266.817 5.277.655 6.477.5 7.634.5 9.103.5 10.927v.146c0 1.824 0 3.293.155 4.45.162 1.2.507 2.21 1.31 3.012.802.803 1.813 1.148 3.013 1.31C6.134 20 7.603 20 9.427 20h5.146c1.824 0 3.293 0 4.45-.155 1.2-.162 2.21-.507 3.012-1.31.803-.802 1.148-1.813 1.31-3.013.155-1.156.155-2.625.155-4.449v-.146c0-1.824 0-3.293-.155-4.45-.162-1.2-.507-2.21-1.31-3.013-.802-.802-1.813-1.147-3.013-1.309C17.866 2 16.397 2 14.573 2zM3.38 4.879c.369-.37.887-.61 1.865-.741C6.251 4.002 7.586 4 9.5 4h5c1.914 0 3.249.002 4.256.138.978.131 1.496.372 1.865.74.37.37.61.888.742 1.866.135 1.007.137 2.342.137 4.256 0 1.914-.002 3.249-.137 4.256-.132.978-.373 1.496-.742 1.865-.369.37-.887.61-1.865.742-1.007.135-2.342.137-4.256.137h-5c-1.914 0-3.249-.002-4.256-.137-.978-.132-1.496-.373-1.865-.742-.37-.369-.61-.887-.741-1.865C2.502 14.249 2.5 12.914 2.5 11c0-1.914.002-3.249.138-4.256.131-.978.372-1.496.74-1.865zM8 21.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"></path>
        </svg>
      ),
    },
    {
      name: "Marketplace",
      slug: "/marketplace",
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M1.588 3.227A3.125 3.125 0 0 1 4.58 1h14.84c1.38 0 2.597.905 2.993 2.227l.816 2.719a6.47 6.47 0 0 1 .272 1.854A5.183 5.183 0 0 1 22 11.455v4.615c0 1.355 0 2.471-.119 3.355-.125.928-.396 1.747-1.053 2.403-.656.657-1.475.928-2.403 1.053-.884.12-2 .119-3.354.119H8.929c-1.354 0-2.47 0-3.354-.119-.928-.125-1.747-.396-2.403-1.053-.657-.656-.929-1.475-1.053-2.403-.12-.884-.119-2-.119-3.354V11.5l.001-.045A5.184 5.184 0 0 1 .5 7.8c0-.628.092-1.252.272-1.854l.816-2.719zM10 21h4v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21zm6-.002c.918-.005 1.608-.025 2.159-.099.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.255.099-.735.101-1.716.101-3.159v-3.284a5.195 5.195 0 0 1-1.7.284 5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 12 13a5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 5.7 13a5.2 5.2 0 0 1-1.7-.284V16c0 1.442.002 2.424.1 3.159.096.706.263 1.033.486 1.255.222.223.55.39 1.255.485.551.074 1.24.094 2.159.1V17.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5v3.498zM4.581 3c-.497 0-.935.326-1.078.802l-.815 2.72A4.45 4.45 0 0 0 2.5 7.8a3.2 3.2 0 0 0 5.6 2.117 1 1 0 0 1 1.5 0A3.19 3.19 0 0 0 12 11a3.19 3.19 0 0 0 2.4-1.083 1 1 0 0 1 1.5 0A3.2 3.2 0 0 0 21.5 7.8c0-.434-.063-.865-.188-1.28l-.816-2.72A1.125 1.125 0 0 0 19.42 3H4.58z"></path>
        </svg>
      ),
    },
    {
      name: "Group",
      slug: "/group",
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
          <path d="M12 .5C5.649.5.5 5.649.5 12S5.649 23.5 12 23.5 23.5 18.351 23.5 12 18.351.5 12 .5zM2.5 12c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm4 0a4.001 4.001 0 0 0-3.16-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613A4.001 4.001 0 0 0 6.5 12zm13 0a2 2 0 0 1 1.791-1.99 9.538 9.538 0 0 1 0 3.98A2 2 0 0 1 19.5 12zm-2.51 8.086A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z"></path>
        </svg>
      ),
    },
    {
      name: "Games",
      slug: "/games",
      active: true,
      icon: (
        <svg
          className=""
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
          <path d="M.5 11a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7h-9a7 7 0 0 1-7-7v-2zm7-5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5h-9z"></path>
        </svg>
      ),
    },

    // Add more items as needed
  ];

  return (
    <header className="flex flex-col w-full h-[56px] fixed right-0 top-0 bg-[#242526] z-[1]">
      <div className="flex top-0 left-0 h-[56px] items-center xl:w-[320px] w-[112px] max-w-[100vw]">
        <div className="relative flex px-[16px] w-full">
          <div className="relative flex z-3 w-full">
            <div className="flex items-center w-[36px] shrink-0"></div>

            <div className="flex shrink-0 w-[12px] h-[56px]">&nbsp;</div>
            <Search className="" />
          </div>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 flex justify-center h-[56px] w-full">
        <ul className="flex justify-center flex-grow w-full px-[110px] items-end">
          {navItems.map((item) =>
            item.active ? (
              <li
                key={item.name}
                className={`nav hidden shrink md:flex md:w-[111.6px] lg:w-[129.6px] min-w-[50px] ml-2 ${
                  location.pathname === item.slug
                    ? activeTabClassName
                    : "text-[#B0B3B8]"
                } ${item.name === "Games" ? "hidden md:block" : ""} `}
              >
                <span className="h-[56px] flex-grow">
                  <div
                    className={`group rounded-xl flex flex-wrap relative h-[56px] right-1 cursor-pointer`}
                  >
                    {location.pathname === item.slug && (
                      <div
                        className={`absolute left-[2px] right-[2px] h-[3px] bottom-0 bg-[#0866FF]`}
                      ></div>
                    )}
                    <a
                      className="group relative flex flex-col outline-zero h-full justify-center items-center w-full cursor-pointer"
                      onClick={() => navigate(item.slug)}
                    >
                      <span className="relative flex justify-center items-center z-50">
                        {item.icon}
                      </span>
                      <div
                        style={{ inset: "4px 0px" }}
                        className={`absolute opacity-0 pointer-events-none fade ${
                          location.pathname !== item.slug
                            ? "group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] group-hover:bg-[rgba(255,255,255,0.1)]"
                            : ""
                        } rounded-lg`}
                      ></div>
                    </a>
                  </div>
                </span>
              </li>
            ) : null
          )}
        </ul>

        <div className="flex fixed right-0 text-white pl-[4px] h-[56px] w-[204px]">
          <div className="relative flex justify-center items-center">
            <div className="settings relative flex justify-center items-center mr-[8px] h-[56px]">
              <div
                onMouseUp={(e) => toggleMenu(e, "Settings")}
                onMouseDown={(e) => handleRightClick(e)}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                aria-label="Create"
                className={`group relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] ${
                  showMenu.Settings
                    ? "bg-[#1D85FC33]"
                    : "bg-[#E4E6EB]"
                } bg-opacity-10 rounded-full border-[rgba(0,0,0,.4)] select-none`}
                // onClick={() => navigate(item.slug)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="select-none"
                  fill={`${showMenu.Settings ? "#0866FF" : "#E4E6EB"}`}
                >
                  <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
                </svg>
                <div
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${!rightClick ? 'group-active:bg-[rgba(68,73,80,0.15)]' : ''} duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>

            <div className="messenger relative flex justify-center items-center mr-[8px] h-[56px]">
              <div
                onMouseUp={(e) => toggleMenu(e, "Messenger")}
                onMouseDown={(e) => handleRightClick(e)}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                className={`group relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] ${
                  showMenu.Messenger
                    ? "bg-[#1D85FC33] notifIconScale"
                    : "bg-[#E4E6EB]"
                } bg-opacity-10 rounded-full border-[rgba(0,0,0,.4)] select-none`}
                // onClick={() => navigate(item.slug)}
              >
                <svg
                  viewBox="0 0 12 13"
                  width="20"
                  height="20"
                  fill={`${showMenu.Messenger ? "#0866FF" : "#E4E6EB"}`}
                  style={{ color: "#E4E6EB" }}
                >
                  <g fillRule="evenodd" transform="translate(-450 -1073)">
                    <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82"></path>
                  </g>
                </svg>
                <div
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${!rightClick ? 'group-active:bg-[rgba(68,73,80,0.15)]' : ''} duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>

            <div className="notification relative flex justify-center items-center mr-[8px] h-[56px]">
              <div
                onMouseUp={(e) => toggleMenu(e, "Notif")}
                onMouseDown={(e) => handleRightClick(e)}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                className={`group relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] ${
                  showMenu.Notif
                    ? "bg-[#1D85FC33] notifIconScale"
                    : "bg-[#E4E6EB]"
                } bg-opacity-10 rounded-full border-[rgba(0,0,0,.4)] select-none`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill={`${showMenu.Notif ? "#0866FF" : "#E4E6EB"}`}
                >
                  <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
                </svg>
                <div
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${!rightClick ? 'group-active:bg-[rgba(68,73,80,0.15)]' : ''} duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>
            <div className="user relative flex justify-center items-center mr-[8px] h-[56px]">
              <div
                onMouseUp={(e) => toggleMenu(e, "User")}
                onMouseDown={(e) => handleRightClick(e)}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                className={`relative group cursor-pointer ${
                  showMenu.User ? "notifIconScale" : ""
                }`}

                // onClick={() => navigate(item.slug)}
              >
                <svg
                  aria-hidden="true"
                  className="align-bottom"
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  style={{ height: "40px", width: "40px" }}
                >
                  {/* Define a circular mask */}
                  <mask id=":userProfile:">
                    <circle cx="20" cy="20" fill="white" r="20">
                      {" "}
                    </circle>
                    <circle
                      cx="34"
                      cy="34"
                      data-visualcompletion="ignore"
                      fill="black"
                      r="8"
                    ></circle>
                  </mask>

                  {/* Apply the mask to the image */}
                  <g mask="url(#:userProfile:)">
                    <image
                      x="0"
                      y="0"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                      width="100%"
                      xlinkHref="me.jpg"
                      style={{ height: "40px", width: "40px" }}
                    ></image>
                    <circle
                      className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                      cx="20"
                      cy="20"
                      r="20"
                    ></circle>
                  </g>
                </svg>
                {/* <img
                  className="object-cover w-full h-full rounded-full cursor-pointer select-none pointer-events-none"
                  src="/me.jpg"
                  alt=""
                /> */}
                 <div
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${!rightClick ? 'group-active:bg-[rgba(68,73,80,0.35)]' : ''} duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
                <div
                  style={{
                    bottom: "6px",
                    right: "6px",
                    transform: "translate(50%, 50%)",
                  }}
                  className="absolute z-[2] rounded-[50%]"
                >
                  <div className="inheritStyles">
                    <div className="flex flex-col justify-center items-center flex-grow overflow-hidden bg-[rgba(255,255,255,.1)] rounded-[50%]">
                      <svg
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="block svgClass fade
        "
                        style={{ color: "#E4E6EB" }}
                      >
                        <g fillRule="evenodd" transform="translate(-448 -544)">
                          <path
                            fillRule="nonzero"
                            d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="absolute inset-0 opacity-0 fade pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="absolute -bottom-[6px] right-0 left-0 h-[7px] headerAfter pointer-events-none"></div>
      {showMenu.Notif && <NotifPanel />}

      {showMenu.Messenger && <MessagePanel />}

      {showMenu.Settings && <SettingsPanel />}

      {showMenu.User && (
        // <>
        //   <div
        //     style={{
        //       transform: "translate(344px, 53px) translate(-100%, 0px)",
        //     }}
        //     className="user absolute top-0 right-0 bg-[#242526] max-w-full min-w-0 rounded-lg shadowStyle-1"
        //   >
        //     <div className="pt-2 bg-[#242526] max-w-[400px] w-[360px] h-[556.766px] rounded-lg">
        //       <div
        //         style={{
        //           transform: "translateX(0%) translateZ(1px)",
        //           maxWidth: "calc(100vw - 24px)",
        //           maxHeight: "calc(100vh - 60px)",
        //         }}
        //         className="flex flex-col overscroll-contain overflow-auto"
        //       >
        //         <div className="flex flex-col ">
        //           <div
        //             style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        //             className="1 section max-w-[350px] shadow-xl rounded-lg mb-3 mt-1 mx-4"
        //           >
        //             <a
        //               role="link"
        //               className="group relative block no-underline cursor-pointer my-2 mx-1"
        //               href="https://www.facebook.com/muhammad.jon.12"
        //             >
        //               <div className="flex justify-between rounded-lg items-center min-h-[44px] select-none p-2 -m-[4px]">
        //                 <div className="img-wrapper-icons flex flex-col self-center min-w-0 max-w-full shrink-0 p-1 rounded-full w-11 h-11 pointer-events-none">
        //                   <img
        //                     className="object-cover w-full h-full rounded-full"
        //                     src="/me.jpg"
        //                     alt=""
        //                   />
        //                 </div>
        //                 <div className="flex self-stretch justify-between items-center min-h-0 p-0 flex-grow shrink">
        //                   <div className="relative flex flex-col max-w-full flex-grow z-[2]">
        //                     <div className="flex flex-col min-w-0 max-w-full py-2">
        //                       <div className="flex flex-col flex-grow min-h-0 p-[4px]">
        //                         <div className="flex flex-col">
        //                           <div className="flex flex-col -my-[5px] select-none">
        //                             <div className="ba_1 my-[5px]">
        //                               <span className="block text-[1rem] text-[#E4E6EB] leading-[1.3333] text-start font-medium pb-[1px] overflow-hidden">
        //                                 Syed Muhammad Jon
        //                               </span>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //             </a>
        //             <hr
        //               className="mx-4 h-[1px] border-[#3E4042]"
        //               role="separator"
        //             ></hr>
        //             <div className="py-1 mx-1">
        //               <div className="group relative flex flex-col justify-between">
        //                 <a className="flex flex-col justify-center items-stretch min-h-[56px] no-underline cursor-pointer p-3 -m-1.5">
        //                   <div className="relative flex justify-between rounded-lg items-center select-none min-h-[40px]">
        //                     <div className="relative flex flex-col self-start">
        //                       <div className="img-wrapper-icons flex flex-col p-1.5 -m-1 rounded-full">
        //                         <div className="relative flex justify-center items-center">
        //                           <div className="rotate">
        //                             <svg
        //                               viewBox="0 0 20 20"
        //                               width="32"
        //                               height="32"
        //                               fill="currentColor"
        //                               aria-hidden="true"
        //                               className="block duration-200 fade"
        //                               style={{ color: "#8A8D91" }}
        //                             >
        //                               <g
        //                                 filLRule="evenodd"
        //                                 transform="translate(-446 -398)"
        //                               >
        //                                 <g fill-rule="nonzero">
        //                                   <path
        //                                     d="M96.628 206.613A7.97 7.97 0 0 1 96 203.5a7.967 7.967 0 0 1 2.343-5.657A7.978 7.978 0 0 1 104 195.5a7.978 7.978 0 0 1 5.129 1.86.75.75 0 0 0 .962-1.15A9.479 9.479 0 0 0 104 194a9.478 9.478 0 0 0-6.717 2.783A9.467 9.467 0 0 0 94.5 203.5a9.47 9.47 0 0 0 .747 3.698.75.75 0 1 0 1.381-.585zm14.744-6.226A7.97 7.97 0 0 1 112 203.5a7.967 7.967 0 0 1-2.343 5.657A7.978 7.978 0 0 1 104 211.5a7.978 7.978 0 0 1-5.128-1.86.75.75 0 0 0-.962 1.152A9.479 9.479 0 0 0 104 213a9.478 9.478 0 0 0 6.717-2.783 9.467 9.467 0 0 0 2.783-6.717 9.47 9.47 0 0 0-.747-3.698.75.75 0 1 0-1.381.585z"
        //                                     transform="translate(352 204.5)"
        //                                   ></path>
        //                                   <path
        //                                     d="M109.5 197h-2.25a.75.75 0 1 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 1 0-1.5 0V197zm-11 13h2.25a.75.75 0 1 0 0-1.5h-3a.75.75 0 0 0-.75.75v3a.75.75 0 1 0 1.5 0V210z"
        //                                     transform="translate(352 204.5)"
        //                                   ></path>
        //                                 </g>
        //                               </g>
        //                             </svg>
        //                           </div>
        //                           <div className="absolute flex flex-col items-center justify-center p-[3px] bg-[#242526] rounded-[24px] pointer-events-none">
        //                             <div className="relative inline-block align-bottom">
        //                               <svg
        //                                 aria-hidden="true"
        //                                 className="align-bottom"
        //                                 data-visualcompletion="ignore-dynamic"
        //                                 role="none"
        //                                 style={{
        //                                   height: "20px",
        //                                   width: "20px",
        //                                 }}
        //                               >
        //                                 {/* Define a circular mask */}
        //                                 <mask id=":user_page_1:">
        //                                   <circle
        //                                     cx="10"
        //                                     cy="10"
        //                                     r="10"
        //                                     fill="white"
        //                                   />
        //                                 </mask>

        //                                 {/* Apply the mask to the image */}
        //                                 <g mask="url(#:user_page_1:)">
        //                                   <image
        //                                     x="0"
        //                                     y="0"
        //                                     height="100%"
        //                                     preserveAspectRatio="xMidYMid slice"
        //                                     width="100%"
        //                                     xlinkHref="jk.jpg"
        //                                     style={{
        //                                       height: "20px",
        //                                       width: "20px",
        //                                     }}
        //                                   ></image>
        //                                   <circle
        //                                     className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
        //                                     cx="10"
        //                                     cy="10"
        //                                     r="10"
        //                                   ></circle>
        //                                 </g>
        //                               </svg>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="flex flex-wrap justify-between items-center shrink min-h-0 p-0 flex-grow">
        //                       <div className="relative flex flex-col max-w-full flex-grow z-0">
        //                         <div className="flex flex-col min-w-0 max-w-full">
        //                           <div className="flex flex-col flex-grow min-h-0 p-1.5 ml-1">
        //                             <span className="ba_4 block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold">
        //                               JK Developers
        //                             </span>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </a>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //               <div className="group relative flex flex-col justify-between">
        //                 <a className="flex flex-col justify-center items-stretch min-h-[56px] no-underline cursor-pointer p-3 -m-1.5">
        //                   <div className="relative flex justify-between rounded-lg items-center select-none min-h-[40px]">
        //                     <div className="relative flex flex-col self-start">
        //                       <div className="img-wrapper-icons flex flex-col p-1.5 -m-1 rounded-full">
        //                         <div className="relative flex justify-center items-center">
        //                           <div className="rotate">
        //                             <svg
        //                               viewBox="0 0 20 20"
        //                               width="32"
        //                               height="32"
        //                               fill="currentColor"
        //                               aria-hidden="true"
        //                               className="block duration-200 fade"
        //                               style={{ color: "#8A8D91" }}
        //                             >
        //                               <g
        //                                 filLRule="evenodd"
        //                                 transform="translate(-446 -398)"
        //                               >
        //                                 <g fill-rule="nonzero">
        //                                   <path
        //                                     d="M96.628 206.613A7.97 7.97 0 0 1 96 203.5a7.967 7.967 0 0 1 2.343-5.657A7.978 7.978 0 0 1 104 195.5a7.978 7.978 0 0 1 5.129 1.86.75.75 0 0 0 .962-1.15A9.479 9.479 0 0 0 104 194a9.478 9.478 0 0 0-6.717 2.783A9.467 9.467 0 0 0 94.5 203.5a9.47 9.47 0 0 0 .747 3.698.75.75 0 1 0 1.381-.585zm14.744-6.226A7.97 7.97 0 0 1 112 203.5a7.967 7.967 0 0 1-2.343 5.657A7.978 7.978 0 0 1 104 211.5a7.978 7.978 0 0 1-5.128-1.86.75.75 0 0 0-.962 1.152A9.479 9.479 0 0 0 104 213a9.478 9.478 0 0 0 6.717-2.783 9.467 9.467 0 0 0 2.783-6.717 9.47 9.47 0 0 0-.747-3.698.75.75 0 1 0-1.381.585z"
        //                                     transform="translate(352 204.5)"
        //                                   ></path>
        //                                   <path
        //                                     d="M109.5 197h-2.25a.75.75 0 1 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 1 0-1.5 0V197zm-11 13h2.25a.75.75 0 1 0 0-1.5h-3a.75.75 0 0 0-.75.75v3a.75.75 0 1 0 1.5 0V210z"
        //                                     transform="translate(352 204.5)"
        //                                   ></path>
        //                                 </g>
        //                               </g>
        //                             </svg>
        //                           </div>
        //                           <div className="absolute flex flex-col items-center justify-center p-[3px] bg-[#242526] rounded-[24px] pointer-events-none">
        //                             <div className="relative inline-block align-bottom">
        //                               <svg
        //                                 aria-hidden="true"
        //                                 className="align-bottom"
        //                                 data-visualcompletion="ignore-dynamic"
        //                                 role="none"
        //                                 style={{
        //                                   height: "20px",
        //                                   width: "20px",
        //                                 }}
        //                               >
        //                                 {/* Define a circular mask */}
        //                                 <mask id=":user_page_2:">
        //                                   <circle
        //                                     cx="10"
        //                                     cy="10"
        //                                     r="10"
        //                                     fill="white"
        //                                   />
        //                                 </mask>

        //                                 {/* Apply the mask to the image */}
        //                                 <g mask="url(#:user_page_2:)">
        //                                   <image
        //                                     x="0"
        //                                     y="0"
        //                                     height="100%"
        //                                     preserveAspectRatio="xMidYMid slice"
        //                                     width="100%"
        //                                     xlinkHref="toast.jpg"
        //                                     style={{
        //                                       height: "20px",
        //                                       width: "20px",
        //                                     }}
        //                                   ></image>
        //                                   <circle
        //                                     className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
        //                                     cx="10"
        //                                     cy="10"
        //                                     r="10"
        //                                   ></circle>
        //                                 </g>
        //                               </svg>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="flex flex-wrap justify-between items-center shrink min-h-0 p-0 flex-grow">
        //                       <div className="relative flex flex-col max-w-full flex-grow z-0">
        //                         <div className="flex flex-col min-w-0 max-w-full">
        //                           <div className="flex flex-col flex-grow min-h-0 p-1.5 ml-1">
        //                             <span className="ba_4 block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold">
        //                               Toast Sweet
        //                             </span>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </a>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //             </div>
        //             <hr
        //               className="mx-4 h-[1px] border-[#3E4042]"
        //               role="separator"
        //             ></hr>
        //             <div
        //               className="flex btn p-3 justify-between items-stretch"
        //               role="button"
        //             >
        //               <div className="group relative flex flex-col basis-0 h-9 rounded-md p-1 flex-grow shrink bg-[rgba(255,255,255,.1)]">
        //                 <div className="flex items-center justify-center flex-grow rounded-lg bg-transparent  px-2">
        //                   <div
        //                     style={{
        //                       width: "calc(100% + 6px)",
        //                       marginLeft: "calc(-1* 3px)",
        //                       marginRight: "calc(-1* 3px)",
        //                     }}
        //                     className="flex justify-center items-center"
        //                   >
        //                     <div className="flex flex-col w-4 h-4 items-center justify-center mx-[3px]">
        //                       <i
        //                         data-visualcompletion="css-img"
        //                         style={{
        //                           filter:
        //                             "invert(89%) sepia(6%) hue-rotate(185deg)",
        //                           backgroundImage: "url(/iconBar_3.png)",
        //                           backgroundPosition: "0 -298px",
        //                           backgroundSize: "auto",
        //                           width: "16px",
        //                           height: "16px",
        //                           backgroundRepeat: "no-repeat",
        //                           display: "inline-block",
        //                         }}
        //                       />
        //                     </div>
        //                     <span className="text-[#E4E6EB] leading-[1.3333] text-[.875rem] mx-[3px]">
        //                       <span className="ba_1 block textProps text-[#E4E6EB] leading-[1.3333] text-[.875rem] font-semibold select-none ">
        //                         See all profiles
        //                       </span>
        //                     </span>
        //                   </div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //             </div>
        //           </div>

        //           <div className="second section pt-1 pb-2">
        //             <div className="px-2">
        //               <div className="group relative flex items-center min-h-[44px] justify-between px-2 cursor-pointer">
        //                 <div className="wrapper inline-flex items-center justify-center w-9 h-9 bg-[rgba(255,255,255,.1)] rounded-[50%] my-[6px] mr-[12px]">
        //                   <i
        //                     data-visualcompletion="css-img"
        //                     style={{
        //                       filter:
        //                         "invert(89%) sepia(6%)  hue-rotate(185deg)",
        //                       backgroundImage: "url(/iconBar_2.png)",
        //                       backgroundPosition: "0 -482px",
        //                       backgroundSize: "auto",
        //                       width: "20px",
        //                       height: "20px",
        //                       backgroundRepeat: "no-repeat",
        //                       display: "inline-block",
        //                       verticalAlign: "-0.25em",
        //                     }}
        //                   />
        //                 </div>
        //                 <div className="flex justify-between items-center self-stretch flex-grow min-h-[inherit]">
        //                   <div className="flex flex-col items-stretch justify-between basis-0 flex-grow py-2">
        //                     <div className="flex flex-col -my-[5px] select-none">
        //                       <div className="my-[5px]">
        //                         <span
        //                           className="before_a block text-[.875rem] font-[500] textProps textClass whitespace-nowrap leading-[1.3333] text-start text-[#E4E6EB]"
        //                           dir="auto"
        //                         >
        //                           Settings & privacy
        //                         </span>
        //                       </div>
        //                     </div>
        //                   </div>
        //                   <div>
        //                     <div className="wrapper flex flex-col items-center justify-center w-6 h-6 ml-[12px] my-[12px]">
        //                       <i
        //                         data-visualcompletion="css-img"
        //                         style={{
        //                           filter:
        //                             "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
        //                           backgroundImage: "url(/iconBar_4.png)",
        //                           backgroundPosition: "0 -50px",
        //                           backgroundSize: "auto",
        //                           width: "24px",
        //                           height: "24px",
        //                           backgroundRepeat: "no-repeat",
        //                           display: "inline-block",
        //                           verticalAlign: "-0.25em",
        //                         }}
        //                       />
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //               <div className="group relative flex items-center min-h-[44px] justify-between px-2 cursor-pointer">
        //                 <div className="wrapper inline-flex items-center justify-center w-9 h-9 bg-[rgba(255,255,255,.1)] rounded-[50%] my-[6px] mr-[12px]">
        //                   <i
        //                     data-visualcompletion="css-img"
        //                     style={{
        //                       filter:
        //                         "invert(89%) sepia(6%)  hue-rotate(185deg)",
        //                       backgroundImage: "url(/iconBar_3.png)",
        //                       backgroundPosition: "0 -193px",
        //                       backgroundSize: "auto",
        //                       width: "20px",
        //                       height: "20px",
        //                       backgroundRepeat: "no-repeat",
        //                       display: "inline-block",
        //                       verticalAlign: "-0.25em",
        //                     }}
        //                   />
        //                 </div>
        //                 <div className="flex justify-between items-center self-stretch flex-grow min-h-[inherit]">
        //                   <div className="flex flex-col items-stretch justify-between basis-0 flex-grow py-2">
        //                     <div className="flex flex-col -my-[5px] select-none">
        //                       <div className="my-[5px]">
        //                         <span
        //                           className="before_a block text-[.875rem] font-[500] textProps textClass whitespace-nowrap leading-[1.3333] text-start text-[#E4E6EB]"
        //                           dir="auto"
        //                         >
        //                           Help & support
        //                         </span>
        //                       </div>
        //                     </div>
        //                   </div>
        //                   <div>
        //                     <div className="wrapper flex flex-col items-center justify-center w-6 h-6 ml-[12px] my-[12px]">
        //                       <i
        //                         data-visualcompletion="css-img"
        //                         style={{
        //                           filter:
        //                             "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
        //                           backgroundImage: "url(/iconBar_4.png)",
        //                           backgroundPosition: "0 -50px",
        //                           backgroundSize: "auto",
        //                           width: "24px",
        //                           height: "24px",
        //                           backgroundRepeat: "no-repeat",
        //                           display: "inline-block",
        //                           verticalAlign: "-0.25em",
        //                         }}
        //                       />
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //               <div className="group relative flex items-center min-h-[44px] justify-between px-2 cursor-pointer">
        //                 <div className="wrapper inline-flex items-center justify-center w-9 h-9 bg-[rgba(255,255,255,.1)] rounded-[50%] my-[6px] mr-[12px]">
        //                   <i
        //                     data-visualcompletion="css-img"
        //                     style={{
        //                       filter:
        //                         "invert(89%) sepia(6%)  hue-rotate(185deg)",
        //                       backgroundImage: "url(/iconBar_4.png)",
        //                       backgroundPosition: "0 -205px",
        //                       backgroundSize: "auto",
        //                       width: "20px",
        //                       height: "20px",
        //                       backgroundRepeat: "no-repeat",
        //                       display: "inline-block",
        //                       verticalAlign: "-0.25em",
        //                     }}
        //                   />
        //                 </div>
        //                 <div className="flex justify-between items-center self-stretch flex-grow min-h-[inherit]">
        //                   <div className="flex flex-col items-stretch justify-between basis-0 flex-grow py-2">
        //                     <div className="flex flex-col -my-[5px] select-none">
        //                       <div className="my-[5px]">
        //                         <span
        //                           className="before_a block text-[.875rem] font-[500] textProps textClass whitespace-nowrap leading-[1.3333] text-start text-[#E4E6EB]"
        //                           dir="auto"
        //                         >
        //                           Display & accessibility
        //                         </span>
        //                       </div>
        //                     </div>
        //                   </div>
        //                   <div>
        //                     <div className="wrapper flex flex-col items-center justify-center w-6 h-6 ml-[12px] my-[12px]">
        //                       <i
        //                         data-visualcompletion="css-img"
        //                         style={{
        //                           filter:
        //                             "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
        //                           backgroundImage: "url(/iconBar_4.png)",
        //                           backgroundPosition: "0 -50px",
        //                           backgroundSize: "auto",
        //                           width: "24px",
        //                           height: "24px",
        //                           backgroundRepeat: "no-repeat",
        //                           display: "inline-block",
        //                           verticalAlign: "-0.25em",
        //                         }}
        //                       />
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //               <div className="group relative flex items-center min-h-[44px] justify-between px-2 cursor-pointer">
        //                 <div className="wrapper inline-flex items-center justify-center w-9 h-9 bg-[rgba(255,255,255,.1)] rounded-[50%] my-[6px] mr-[12px]">
        //                   <i
        //                     data-visualcompletion="css-img"
        //                     style={{
        //                       filter:
        //                         "invert(89%) sepia(6%)  hue-rotate(185deg)",
        //                       backgroundImage: "url(/iconBar_3.png)",
        //                       backgroundPosition: "0 -67px",
        //                       backgroundSize: "auto",
        //                       width: "20px",
        //                       height: "20px",
        //                       backgroundRepeat: "no-repeat",
        //                       display: "inline-block",
        //                       verticalAlign: "-0.25em",
        //                     }}
        //                   />
        //                 </div>

        //                 <div className="flex items-stretch flex-grow">
        //                   <div className="flex flex-col items-stretch justify-between flex-grow">
        //                     <div className="flex flex-col">
        //                       <span
        //                         className="before_a block text-[.875rem] font-[500] textProps textClass whitespace-nowrap leading-[1.3333] text-start text-[#E4E6EB]"
        //                         dir="auto"
        //                       >
        //                         Give feedback
        //                       </span>
        //                     </div>
        //                   </div>
        //                   <div></div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>

        //               <div className="group relative flex items-center min-h-[44px] justify-between px-2 cursor-pointer">
        //                 <div className="wrapper inline-flex items-center justify-center w-9 h-9 bg-[rgba(255,255,255,.1)] rounded-[50%] my-[6px] mr-[12px]">
        //                   <i
        //                     data-visualcompletion="css-img"
        //                     style={{
        //                       filter:
        //                         "invert(89%) sepia(6%)  hue-rotate(185deg)",
        //                       backgroundImage: "url(/extendedIconList.png)",
        //                       backgroundPosition: "0 -591px",
        //                       backgroundSize: "auto",
        //                       width: "20px",
        //                       height: "20px",
        //                       backgroundRepeat: "no-repeat",
        //                       display: "inline-block",
        //                       verticalAlign: "-0.25em",
        //                     }}
        //                   />
        //                 </div>

        //                 <div className="flex items-stretch flex-grow">
        //                   <div className="flex flex-col items-stretch justify-between flex-grow">
        //                     <div className="flex flex-col">
        //                       <span
        //                         className="before_a block text-[.875rem] font-[500] textProps textClass whitespace-nowrap leading-[1.3333] text-start text-[#E4E6EB]"
        //                         dir="auto"
        //                       >
        //                         Log Out
        //                       </span>
        //                     </div>
        //                   </div>
        //                   <div></div>
        //                 </div>
        //                 <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <div
        //       className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
        //       role="separator"
        //     ></div>
        //   </div>
        // </>
        <>
          <div
            style={{
              transform: "translate(344px, 53px) translate(-100%, 0px)",
            }}
            className="user absolute top-0 right-0 bg-[#242526] max-w-full min-w-0 rounded-lg shadowStyle-1"
          >
            <div className="bg-[#242526] max-w-[400px] w-[360px] h-[522.875px] rounded-lg">
              <div
                style={{
                  transform: "translateX(0%) translateZ(1px)",
                  maxWidth: "calc(100vw - 24px)",
                  maxHeight: "calc(100vh - 60px)",
                }}
                className="flex flex-col overscroll-contain overflow-auto"
              >
                <div className="flex items-center pb-2 px-4 pt-4">
                  <div className="group flex flex-col items-center justify-between p-2 cursor-pointer">
                    <div className="relative flex flex-col items-center justify-center align-bottom border-[rgba(0,0,0,0.4)] bg-[#242526] rounded-full">
                      <i
                        data-visualcompletion="css-img"
                        style={{
                          filter: "invert(89%) sepia(6%) hue-rotate(185deg)",
                          backgroundImage: "url(/iconBar_2.png)",
                          backgroundPosition: "0 -125px",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                          verticalAlign: "-0.25em",
                        }}
                      />
                      <div className="absolute opacity-0 group-hover:opacity-100 -inset-2 bg-[rgba(255,255,255,0.1)] rounded-full pointer-events-none fade"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-stretch pl-2.5">
                    <div className="flex flex-col items-stretch justify-between">
                      <h2 className="min-w-0 max-w-full">
                        <span
                          className="ba_5 block text-[1.5rem] textProps textClass text-[#E4E6EB] font-[700] leading-[1.1667]"
                          dir="auto"
                        >
                          Display & accessibility
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative mx-2 mt-1 mb-2">
                    <div className="flex flex-col justify-center items-stretch -m-1.5 py-3 px-2 min-h-[56px]">
                      <div className="relative flex justify-between rounded-lg items-center select-none flex-grow">
                        <div className="relative flex flex-col self-start shrink-0">
                          <div className="relative flex justify-center items-center p-1.5 -mt-1">
                            <div className="flex justify-center items-center h-9 w-9 bg-[rgba(255,255,255,.1)] rounded-full">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage: "url(/DarkModeIcon.png)",
                                  backgroundPosition: "0 -210px",
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
                        <div className="flex flex-wrap justify-between items-center shrink min-h-0 p-0 flex-grow">
                          <div className="relative flex flex-col max-w-full flex-grow z-0">
                            <div className="flex flex-col min-w-0 max-w-full">
                              <div className="flex flex-col flex-grow min-h-0 p-1.5 -my-[5px]">
                                <div className="my-[5px]">
                                  <span className="ba_4 block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold">
                                    Dark mode
                                  </span>
                                </div>

                                <div className="my-[5px]">
                                  <span className="ba_1 block text-sm text-[#B0B3B8] leading-[1.3333] text-start font-[400] textClass">
                                    Adjust the appearance of Facebook to reduce
                                    glare and give your eyes a break.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="darkmode-options">
                      <div className="flex flex-col items-stretch justify-center">
                        <div className="group relative 1 flex flex-col justify-center ml-[48px] shrink-0 cursor-pointer">
                          <div className="min-h-[56px] px-2 py-3 -m-1.5">
                            <div className="flex justify-between items-stretch">
                              <div className="flex items-center min-w-0 max-w-full flex-grow">
                                <div className="flex flex-col flex-grow p-1.5">
                                  <div className="flex flex-col -my-[5px] select-none">
                                    <label className="my-[5px] before_a block text-[#E4E6EB] text-sm font-medium leading-[1.3333] textProps pointer-events-none">
                                      Off
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-1.5 cursor-pointer self-center">
                                <div className="relative flex justify-center items-center">
                                  <i
                                    data-visualcompletion="css-img"
                                    style={{
                                      filter: `${
                                        isChecked === "light"
                                          ? "invert(74%) sepia(14%) saturate(7129%) hue-rotate(185deg) brightness(102%) contrast(101%)"
                                          : "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
                                      }`,
                                      backgroundImage: "url(/iconBar_2.png)",
                                      backgroundPosition: `0 ${
                                        isChecked === "light"
                                          ? "-356px"
                                          : "-377px"
                                      }`,
                                      backgroundSize: "auto",
                                      width: "20px",
                                      height: "20px",
                                      backgroundRepeat: "no-repeat",
                                      display: "inline-block",
                                    }}
                                  />

                                  <input
                                    className="absolute inset-0 opacity-[.001] w-full h-full cursor-pointer"
                                    value={`${
                                      isChecked === "light"
                                        ? "DISABLED"
                                        : "ENABLED"
                                    }`}
                                    checked={isChecked === "light"}
                                    onChange={() => {
                                      setIsChecked("light");
                                    }}
                                    type="radio"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch justify-center">
                        <div className="group relative 2 ml-[48px] shrink-0 cursor-pointer">
                          <div className="min-h-[56px] px-2 py-3 -m-1.5">
                            <div className="flex justify-between items-stretch">
                              <div className="flex items-center min-w-0 max-w-full flex-grow">
                                <div className="flex flex-col flex-grow p-1.5">
                                  <div className="flex flex-col -my-[5px] select-none">
                                    <label className="my-[5px] before_a block text-[#E4E6EB] text-sm font-medium leading-[1.3333] textProps pointer-events-none">
                                      On
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-1.5 cursor-pointer self-center">
                                <div className="relative flex justify-center items-center">
                                  <i
                                    data-visualcompletion="css-img"
                                    style={{
                                      filter: `${
                                        isChecked === "dark"
                                          ? "invert(74%) sepia(14%) saturate(7129%) hue-rotate(185deg) brightness(102%) contrast(101%)"
                                          : "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
                                      }`,
                                      backgroundImage: "url(/iconBar_2.png)",
                                      backgroundPosition: `0 ${
                                        isChecked === "dark"
                                          ? "-356px"
                                          : "-377px"
                                      }`,
                                      backgroundSize: "auto",
                                      width: "20px",
                                      height: "20px",
                                      backgroundRepeat: "no-repeat",
                                      display: "inline-block",
                                    }}
                                  />

                                  <input
                                    className="absolute inset-0 opacity-[.001] w-full h-full cursor-pointer"
                                    value={`${
                                      isChecked === "dark"
                                        ? "DISABLED"
                                        : "ENABLED"
                                    }`}
                                    checked={isChecked === "dark"}
                                    onChange={() => {
                                      setIsChecked("dark");
                                    }}
                                    type="radio"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="group relative 3 ml-[48px] shrink-0 cursor-pointer">
                          <div className="min-h-[56px] px-2 py-3 -m-1.5">
                            <div className="flex justify-between items-stretch">
                              <div className="flex items-center min-w-0 max-w-full flex-grow">
                                <div className="flex flex-col flex-grow p-1.5">
                                  <div className="flex flex-col -my-[5px] select-none">
                                    <label className="my-[5px] before_a block text-[#E4E6EB] text-sm font-medium leading-[1.3333] textProps pointer-events-none">
                                      Automatic
                                    </label>
                                    <div className="my-[5px]">
                                      <span className="ba_3 block text-[#8A8D91] text-xs textClass textProps leading-[1.3333] font-[400]">
                                        We'll automatically adjust the display
                                        based on your device's system settings.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-1.5 cursor-pointer self-center">
                                <div className="relative flex justify-center items-center">
                                  <i
                                    data-visualcompletion="css-img"
                                    style={{
                                      filter: `${
                                        isChecked === "automatic"
                                          ? "invert(74%) sepia(14%) saturate(7129%) hue-rotate(185deg) brightness(102%) contrast(101%)"
                                          : "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
                                      }`,
                                      backgroundImage: "url(/iconBar_2.png)",
                                      backgroundPosition: `0 ${
                                        isChecked === "automatic"
                                          ? "-356px"
                                          : "-377px"
                                      }`,
                                      backgroundSize: "auto",
                                      width: "20px",
                                      height: "20px",
                                      backgroundRepeat: "no-repeat",
                                      display: "inline-block",
                                    }}
                                  />

                                  <input
                                    className="absolute inset-0 opacity-[.001] w-full h-full cursor-pointer"
                                    value={`${
                                      isChecked === "automatic"
                                        ? "DISABLED"
                                        : "ENABLED"
                                    }`}
                                    checked={isChecked === "automatic"}
                                    onChange={() => {
                                      setIsChecked("automatic");
                                    }}
                                    type="radio"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-stretch -m-1.5 py-3 px-2 min-h-[56px]">
                      <div className="relative flex justify-between rounded-lg items-center select-none flex-grow">
                        <div className="relative flex flex-col self-start shrink-0">
                          <div className="relative flex justify-center items-center p-1.5 -mt-1">
                            <div className="flex justify-center items-center h-9 w-9 bg-[rgba(255,255,255,.1)] rounded-full">
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(89%) sepia(6%) hue-rotate(185deg)",
                                  backgroundImage: "url(/iconBar_3.png)",
                                  backgroundPosition: "0 -256px",
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
                        <div className="flex flex-wrap justify-between items-center shrink min-h-0 p-0 flex-grow">
                          <div className="relative flex flex-col max-w-full flex-grow z-0">
                            <div className="flex flex-col min-w-0 max-w-full">
                              <div className="flex flex-col flex-grow min-h-0 p-1.5 -my-[5px]">
                                <div className="my-[5px]">
                                  <span className="ba_4 block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold">
                                    Compact Mode
                                  </span>
                                </div>

                                <div className="my-[5px]">
                                  <span className="ba_1 block text-sm text-[#B0B3B8] leading-[1.3333] text-start font-[400] textClass">
                                    Make your font size smaller so more content
                                    can fit on the screen.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="darkmode-options">
                      <div className="flex flex-col items-stretch justify-center">
                        <div className="group relative 1 ml-[48px] shrink-0 cursor-pointer">
                          <div className="min-h-[56px] px-2 py-3 -m-1.5">
                            <div className="flex justify-between items-stretch">
                              <div className="flex items-center min-w-0 max-w-full flex-grow">
                                <div className="flex flex-col flex-grow p-1.5">
                                  <div className="flex flex-col -my-[5px] select-none">
                                    <label className="my-[5px] before_a block text-[#E4E6EB] text-sm font-medium leading-[1.3333] textProps pointer-events-none">
                                      Off
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-1.5 cursor-pointer self-center">
                                <div className="relative flex justify-center items-center">
                                  <i
                                    data-visualcompletion="css-img"
                                    style={{
                                      filter: `${
                                        isCheckedFont === "false"
                                          ? "invert(74%) sepia(14%) saturate(7129%) hue-rotate(185deg) brightness(102%) contrast(101%)"
                                          : "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
                                      }`,
                                      backgroundImage: "url(/iconBar_2.png)",
                                      backgroundPosition: `0 ${
                                        isCheckedFont === "false"
                                          ? "-356px"
                                          : "-377px"
                                      }`,
                                      backgroundSize: "auto",
                                      width: "20px",
                                      height: "20px",
                                      backgroundRepeat: "no-repeat",
                                      display: "inline-block",
                                    }}
                                  />

                                  <input
                                    className="absolute inset-0 opacity-[.001] w-full h-full cursor-pointer"
                                    value={`${
                                      isCheckedFont === "false"
                                        ? "DISABLED"
                                        : "ENABLED"
                                    }`}
                                    checked={isCheckedFont === "false"}
                                    onChange={() => {
                                      setIsCheckedFont("false");
                                    }}
                                    type="radio"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch justify-center">
                        <div className="group relative 2 ml-[48px] shrink-0 cursor-pointer">
                          <div className="min-h-[56px] px-2 py-3 -m-1.5">
                            <div className="flex justify-between items-stretch">
                              <div className="flex items-center min-w-0 max-w-full flex-grow">
                                <div className="flex flex-col flex-grow p-1.5">
                                  <div className="flex flex-col -my-[5px] select-none">
                                    <label className="my-[5px] before_a block text-[#E4E6EB] text-sm font-medium leading-[1.3333] textProps pointer-events-none">
                                      On
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-1.5 cursor-pointer self-center">
                                <div className="relative flex justify-center items-center">
                                  <i
                                    data-visualcompletion="css-img"
                                    style={{
                                      filter: `${
                                        isCheckedFont === "true"
                                          ? "invert(74%) sepia(14%) saturate(7129%) hue-rotate(185deg) brightness(102%) contrast(101%)"
                                          : "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
                                      }`,
                                      backgroundImage: "url(/iconBar_2.png)",
                                      backgroundPosition: `0 ${
                                        isCheckedFont === "true"
                                          ? "-356px"
                                          : "-377px"
                                      }`,
                                      backgroundSize: "auto",
                                      width: "20px",
                                      height: "20px",
                                      backgroundRepeat: "no-repeat",
                                      display: "inline-block",
                                    }}
                                  />

                                  <input
                                    className="absolute inset-0 opacity-[.001] w-full h-full cursor-pointer"
                                    value={`${
                                      isCheckedFont === "true"
                                        ? "DISABLED"
                                        : "ENABLED"
                                    }`}
                                    checked={isCheckedFont === "true"}
                                    onChange={() => {
                                      setIsCheckedFont("true");
                                    }}
                                    type="radio"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                    </div>
                    <div className="relative group flex flex-col justify-center items-stretch cursor-pointer">
                      <div className="flex flex-col justify-center items-stretch -m-1.5 py-3 px-2 min-h-[56px]">
                        <div className="flex justify-between rounded-lg items-center select-none flex-grow">
                          <div className="relative flex flex-col self-end shrink-0">
                            <div className="relative flex justify-center items-center p-1.5 -mt-1">
                              <div className="flex justify-center items-center h-9 w-9 bg-[rgba(255,255,255,.1)] rounded-full">
                                <i
                                  data-visualcompletion="css-img"
                                  style={{
                                    filter:
                                      "invert(89%) sepia(6%) hue-rotate(185deg)",
                                    backgroundImage: "url(/iconBar_3.png)",
                                    backgroundPosition: "0 -130px",
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
                          <div className="flex flex-wrap justify-between items-center shrink min-h-0 p-0 flex-grow">
                            <div className="relative flex flex-col max-w-full flex-grow z-0">
                              <div className="flex flex-col min-w-0 max-w-full">
                                <div className="flex flex-col flex-grow min-h-0 p-1.5 -my-[5px]">
                                  <div className="my-[5px]">
                                    <span className="ba_4 block text-[1rem] text-[#E4E6EB] leading-[1.1765] text-start font-semibold">
                                      Keyboard
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="wrapper flex flex-col items-center justify-center w-6 h-6 mr-1.5 my-[12px]">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="block svgClass fade"
                                  style={{ color: "#B0B3B8" }}
                                >
                                  <path d="M8.293 3.293a1 1 0 0 1 1.414 0c.887.887 1.778 1.775 2.669 2.663 1.428 1.424 2.859 2.85 4.281 4.28a2.497 2.497 0 0 1-.004 3.526 7797.1 7797.1 0 0 1-4.265 4.266c-.894.893-1.788 1.786-2.68 2.68a1 1 0 0 1-1.415-1.415l2.682-2.68c1.421-1.422 2.843-2.842 4.263-4.264a.497.497 0 0 0 .002-.702c-1.42-1.428-2.845-2.848-4.271-4.27-.892-.888-1.784-1.778-2.676-2.67a1 1 0 0 1 0-1.414z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute opacity-0 group-hover:opacity-100 group-active:bg-[rgba(255,255,255,0.2)] inset-0 group-hover:bg-[rgba(255,255,255,0.1)] rounded-[8px] pointer-events-none fade"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div
              className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-[#3e4042]"
              role="separator"
            ></div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
