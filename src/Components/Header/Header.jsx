import { Search, NotifPanel, MessagePanel, SettingsPanel } from "../index";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

function Header() {
  const activeTabClassName = "text-[#0866FF]";
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const iconRef = useRef(null);

  const [isLeaveMenu, setIsLeaveMenu] = useState({
    Settings: false,
    Messenger: false,
    Notif: false,
    User: false,
  });

  const [showMenu, setShowMenu] = useState({
    Settings: false,
    Messenger: false,
    Notif: false,
    User: false,
  });
  const [holdMenu, setHoldMenu] = useState({
    Settings: false,
    Messenger: false,
    Notif: false,
    User: false,
  });

  const resetState = {
    Settings: false,
    Messenger: false,
    Notif: false,
    User: false,
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      console.log("Mouse move while down");
    };

    const handleMouseUp = () => {
      console.log("Mouse up");

      setIsLeaveMenu(resetState);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (Object.values(isLeaveMenu).includes(true)) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isLeaveMenu]);

  const handleHoldMenu = (e, menu) => {
    console.log("hold");
    if (e.button !== 0) return;
    setHoldMenu((prev) => ({
      ...prev,
      [menu]: true,
    }));
  };

  const getIconStyle = (menu) => ({
    transform: holdMenu[menu] && "scale(0.96)",
  });

  const toggleMenu = (e, menu) => {
    console.log("mouseupp");
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

    setHoldMenu((prev) => ({
      ...prev,
      [menu]: false,
    }));
  };

  const handleEnterMenu = (e, menu) => {
    setHoldMenu((prev) => ({
      ...prev,
      [menu]: true,
    }));
  };
  const handleLeaveMenu = (e, menu) => {
    console.log("leave");
    setHoldMenu((prev) => ({
      ...prev,
      [menu]: false,
    }));

    setIsLeaveMenu((prev) => ({
      ...prev,
      [menu]: true,
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1099); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
          <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12zm2.21-2a9.537 9.537 0 0 0 0 3.993l.3.007A2 2 0 0 0 3 10h-.29zm.663-1.983a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517zM21.5 12a9.55 9.55 0 0 0-.212-2.007l-.265.007H21a2 2 0 0 0-.01 4l.3-.007c.138-.643.21-1.31.21-1.993zM12 21.5a9.455 9.455 0 0 0 4.97-1.402A3 3 0 0 0 14 17.523h-4a3 3 0 0 0-2.97 2.575A9.456 9.456 0 0 0 12 21.5z"></path>
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
    <header className="flex flex-col w-full h-[56px] fixed right-0 top-0 bg-[#242526] border-b-[0.5px] border-[#3A3B3C] z-[1]">
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
                      className="flex flex-col outline-none h-full justify-center items-center w-full"
                      onClick={() => navigate(item.slug)}
                    >
                      <span className="relative flex justify-center items-center z-50">
                        {item.icon}
                      </span>
                      <div
                        style={{ inset: "2px 0px" }}
                        className={`absolute ${
                          location.pathname !== item.slug
                            ? "group-hover:bg-[#3A3B3C]"
                            : ""
                        } rounded-lg h-[50px]`}
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
              draggable="false"
                onMouseEnter={
                  isLeaveMenu.Settings
                    ? (e) => handleEnterMenu(e, "Settings")
                    : undefined
                }
                onMouseDown={(e) => handleHoldMenu(e, "Settings")}
                onMouseUp={(e) => toggleMenu(e, "Settings")}
                onMouseLeave={
                  holdMenu.Settings
                    ? (e) => handleLeaveMenu(e, "Settings")
                    : undefined
                }
                style={getIconStyle("Settings")}
                aria-label="Create"
                className={`group relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] ${
                  showMenu.Settings ? "bg-[#1D85FC33]" : "bg-[#E4E6EB]"
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
                  className={`absolute inset-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    holdMenu.Settings
                      ? "bg-[rgba(68,73,80,0.15)] group-hover:opacity-100 duration-0"
                      : "group-hover:opacity-100 fade"
                  } pointer-events-none`}
                ></div>
              </div>
            </div>
            <div
             
              className="messenger relative flex justify-center items-center mr-[8px] h-[56px]"
            >
              <div
               onMouseEnter={
                isLeaveMenu.Messenger
                  ? (e) => handleEnterMenu(e, "Messenger")
                  : undefined
              }
              onMouseDown={(e) => handleHoldMenu(e, "Messenger")}
              onMouseUp={(e) => toggleMenu(e, "Messenger")}
              onMouseLeave={
                holdMenu.Messenger
                  ? (e) => handleLeaveMenu(e, "Messenger")
                  : undefined
              }
                style={getIconStyle("Messenger")}
                className={`group relative flex justify-center cursor-pointer items-center w-[40px] h-[40px] ${
                  showMenu.Messenger
                    ? "bg-[#1D85FC33]"
                    : "bg-[rgba(255,255,255,0.1)]"
                }  bg-opacity-10 rounded-full border-[rgba(0,0,0,.4)] select-none`}
                // onClick={() => navigate(item.slug)}
              >
                <svg
                  className="svgClass"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill={`${showMenu.Messenger ? "#0866FF" : "#E4E6EB"}`}
                >
                  <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z"></path>
                </svg>
                <div
                  className={`absolute inset-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    holdMenu.Messenger
                      ? "bg-[rgba(68,73,80,0.15)] group-hover:opacity-100 duration-0"
                      : "group-hover:opacity-100 fade"
                  } pointer-events-none`}
                ></div>
              </div>
            </div>
            <div
             
              className="notification relative flex justify-center items-center mr-[8px] h-[56px]"
            >
              <div
               onMouseEnter={
                isLeaveMenu.Notif
                  ? (e) => handleEnterMenu(e, "Notif")
                  : undefined
              }
              onMouseDown={(e) => handleHoldMenu(e, "Notif")}
              onMouseUp={(e) => toggleMenu(e, "Notif")}
              onMouseLeave={
                holdMenu.Notif ? (e) => handleLeaveMenu(e, "Notif") : undefined
              }
                style={getIconStyle("Notif")}
                className={`group relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] bg-opacity-10 ${
                  showMenu.Notif
                    ? "bg-[#1D85FC33]"
                    : "bg-[rgba(255,255,255,0.1)]"
                } rounded-full border-[rgba(0,0,0,.4)] select-none`}
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
                  className={`absolute inset-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    holdMenu.Notif
                      ? "bg-[rgba(68,73,80,0.15)] group-hover:opacity-100 duration-0"
                      : "group-hover:opacity-100 fade"
                  } pointer-events-none`}
                ></div>
              </div>
            </div>
            <div
             
              className="user relative flex justify-center items-center mr-[8px] h-[56px]"
            >
              <div
               onMouseEnter={
                isLeaveMenu.User ? (e) => handleEnterMenu(e, "User") : undefined
              }
              onMouseDown={(e) => handleHoldMenu(e, "User")}
              onMouseUp={(e) => toggleMenu(e, "User")}
              onMouseLeave={
                holdMenu.User ? (e) => handleLeaveMenu(e, "User") : undefined
              }
                style={getIconStyle("User")}
                className={`group relative inline-block cursor-pointer w-[40px] h-[40px] rounded-full select-none`}
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
                  className={`absolute inset-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    holdMenu.User
                      ? "bg-[rgba(68,73,80,0.35)] group-hover:opacity-100 duration-0"
                      : "group-hover:opacity-100 fade"
                  } pointer-events-none`}
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
                    <div className="flex flex-col justify-center items-center flex-grow overflow-hidden bg-[rgba(255,255,255,.1)]">
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
      {showMenu.Notif && <NotifPanel />}

      {showMenu.Messenger && <MessagePanel />}

      {showMenu.Settings && <SettingsPanel />}
    </header>
  );
}

export default Header;
