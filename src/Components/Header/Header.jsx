import { Container, Logo, Search, MobileMenu } from "../index";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch } from "react-redux";
import { setShowMenu } from "../../store/showMenuSlice";



function Header() {
  const activeTabClassName = "text-[#0866FF]";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenuLocally] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);
  const containerRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSettings2, setShowSettings2] = useState(false);
  const [showSettings3, setShowSettings3] = useState(false);

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
  const handleShowSettings3 = () => {
    setShowSettings3(true);
  };
  const handleHideSettings3 = () => {
    setShowSettings3(false);
  };

  const handleNotif = () => {
    setShowNotif((prev) => !prev);
    setShowMessenger(false);
    setShowUser(false);
    setShowSettings(false);
  };
  const handleMessenger = () => {
    setShowMessenger((prev) => !prev);
    setShowNotif(false);
    setShowUser(false);
    setShowSettingsMenu(false);
  };

  const handleSettings = () => {
    setShowSettingsMenu((prev) => !prev);
    setShowMessenger(false);
    setShowNotif(false);
    setShowUser(false);
  };
  const handleUser = () => {
    setShowUser((prev) => !prev);
    setShowMessenger(false);
    setShowNotif(false);
    setShowSettingsMenu(false);
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
    if (containerRef.current && !seeMore) {
      // Scroll to the top when seeMore is false
      containerRef.current.scrollTop = 0;
    }
  }, [seeMore]);

  const handleMenuToggle = () => {
    setShowMenuLocally(!showMenu);
    dispatch(setShowMenu(!showMenu));
    setShowDropdown(false);
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
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="mr-[1px]"
          fill="currentColor"
        >
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
    <header className="flex w-full fixed right-0 top-0 bg-[#242526] border-b-[0.5px] border-[#3A3B3C] h-[56px] z-[1]">
      <div className="flex top-0 fixed left-0 h-[56px] items-end w-[320px] px-[16px]">
        <div className="relative top-0 left-0 py-2 flex flex-wrap z-3 ml-[16px]">
          <a className="flex-shrink-0 text-xs fixed left-[16px] top-[8px]">
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
          <div className="w-[7px]"></div>
          <Search className="" />
        </div>
      </div>

      <nav className="flex justify-center h-[56px] w-full">
       
        <ul className="flex justify-center flex-grow w-full px-[110px] items-end">
          {navItems.map((item) =>
            item.active ? (
              <li
                key={item.name}
                className={`nav hidden shrink md:block md:min-w-[50px] md:w-full min-w-[50px] ml-2 ${
                  location.pathname === item.slug
                    ? activeTabClassName
                    : "text-[#B0B3B8]"
                } ${item.name === "Games" ? "md:hidden xl:block" : ""} `}
              >
                <span className="h-[56px]  ">
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
                    </a>
                    <div
                      className={`absolute ${
                        location.pathname !== item.slug
                          ? "group-hover:bg-[#3A3B3C]"
                          : ""
                      } inset-0 rounded-xl h-[50px] mt-[0.2rem]`}
                    ></div>
                  </div>
                </span>
              </li>
            ) : null
          )}
          {isMobile && (
            <li
              aria-label="More"
              role="link"
              className={`relative bottom-[4px] left-[8px] md:block mr-auto md:mr-0 lg:max-w-[129.5px] lg:min-w-[7.75%] w-[calc(15vw - 55px)] min-w-[50px] ml-0 lg:ml-2 transition-opacity duration-100  ${
                !showMenu ? "hover:bg-white hover:bg-opacity-10 " : ""
              } text-white  p-3 rounded-lg`}
              onClick={handleMenuToggle}
            >
              <span className="h-[56px]">
                <a className="flex flex-col outline-none h-full justify-center items-center w-full">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={`${showMenu ? "#0866FF" : "#B0B3B8"} `}
                  >
                    <path d="M3.25 2.75a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25zM2 12c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 13.25 2 12.69 2 12zm0 8c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 21.25 2 20.69 2 20z"></path>
                  </svg>
                </a>
              </span>

              {showMenu && (
                <div
                  className={`absolute left-[2px] right-[2px] top-[49px] h-[3px] bg-[#0866FF]`}
                ></div>
              )}
            </li>
          )}
        </ul>
      
   
     
        <div className="flex fixed right-0 text-white pl-[4px] h-[56px] w-[204px]">
          <div className="relative py-2 flex flex-wrap">
            <div className="settings relative mr-[8px]">
              <div
                aria-label="Create"
                className={`flex justify-center items-center cursor-pointer w-[40px] h-[40px] ${
                  showSettingsMenu ? "bg-[#1D85FC]" : "bg-[#E4E6EB]"
                } bg-opacity-10 rounded-full `}
                onClick={() => navigate(item.slug)}
              >
                {!isMobile ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill={`${showSettingsMenu ? "#0866FF" : "#E4E6EB"}`}
                  >
                    <path d="M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="#E4E6EB"
                  >
                    <path d="M11 19a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6z"></path>
                  </svg>
                )}
              </div>
              <div
                onMouseDown={() => handleSettings()}
                className="absolute inset-0 rounded-full transition-opacity duration-100 bg-opacity-0 cursor-pointer bg-white hover:bg-opacity-10"
              ></div>
            </div>
            <div className="messenger relative mr-[8px]">
              <div
                className={`flex justify-center cursor-pointer items-center w-[40px] h-[40px] ${
                  showMessenger ? "bg-[#1D85FC33]" : "bg-[#E4E6EB]"
                }  bg-opacity-10 rounded-full`}
                onClick={() => navigate(item.slug)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill={`${showMessenger ? "#0866FF" : "#E4E6EB"}`}
                >
                  <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z"></path>
                </svg>
              </div>
              <div
                onMouseDown={() => handleMessenger()}
                className="absolute inset-0 rounded-full transition-opacity duration-100  bg-opacity-0 cursor-pointer bg-white hover:bg-opacity-10"
              ></div>
            </div>
            <div className="notification relative mr-[8px]">
              <div
                className={`flex justify-center items-center cursor-pointer w-[40px] h-[40px]  bg-opacity-10 ${
                  showNotif ? "bg-[#1D85FC33]" : "bg-[#E4E6EB]"
                } rounded-full`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill={`${showNotif ? "#0866FF" : "#E4E6EB"}`}
                >
                  <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
                </svg>
              </div>
              <div
                onMouseDown={() => handleNotif()}
                className="absolute inset-0 rounded-full transition-opacity duration-100 bg-opacity-0 cursor-pointer bg-white hover:bg-opacity-10"
              ></div>
            </div>
            <div className="user relative mr-[8px]">
              <div
                className={`flex justify-center items-center cursor-pointer w-[40px] h-[40px] bg-opacity-10 ${
                  showUser ? "bg-[#1D85FC33]" : "bg-[#E4E6EB]"
                } rounded-full`}
                onClick={() => navigate(item.slug)}
              >
                <img
                  className="object-cover w-full h-full rounded-full cursor-pointer select-none"
                  src="/me.jpg"
                  alt=""
                />
              </div>
              <div
                onMouseDown={() => handleUser()}
                className="absolute inset-0 rounded-full bg-opacity-0 transition-opacity duration-100 cursor-pointer bg-white hover:bg-opacity-10"
              ></div>
            </div>
          </div>
        </div>
      </nav>
      {showNotif && (
        <div
          className="notif-container flex flex-col fixed right-0 shadow-xl shadow-[#141414]"
          style={{ transform: "translate(-16px, 48px)" }}
        >
          <div className="flex flex-col w-[360px] h-[600px] bg-[#242526] rounded-lg">
            <div className="flex justify-between ">
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

            <div className="flex pl-4">
              <div className="pr-2 ">
                <div
                  className={`relative h-[36px] flex flex-wrap ${
                    showAll ? "bg-[#1D85FC33]" : "bg-transparent"
                  } rounded-[18px] justify-center items-center px-3 mt-[0.1rem] outline-none w-full`}
                  role="button"
                  onMouseDown={() => handleShowAll()}
                >
                  <span
                    className={`${
                      showAll ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                    }`}
                  >
                    <span className="text-[.875rem] font-medium leading-[2.3333]">
                      All
                    </span>
                  </span>
                  <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 hover:bg-opacity-10 bg-white bg-opacity-0 "></div>
                </div>
              </div>

              <div>
                <div
                  className={`relative h-[36px] flex flex-wrap rounded-[18px] ${
                    showUnread ? "bg-[#1D85FC33]" : "bg-transparent"
                  } justify-center items-center px-3 mt-[0.1rem] outline-none w-full `}
                  role="button"
                  onClick={() => handleShowUnread()}
                >
                  <span
                    className={`${
                      showUnread ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                    }`}
                  >
                    <span className="text-[.875rem] font-medium leading-[2.3333]">
                      Unread
                    </span>
                  </span>
                  <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 hover:bg-opacity-10 bg-white bg-opacity-0 "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex mt-[0.5rem] mx-4 flex-1 ">
                <div className="flex flex-col flex-1">
                  <div className="flex pb-[4px]">
                    <span className="text-[#E4E6EB] text-base font-medium">
                      Earlier
                    </span>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center">
                  <div className="flex pb-[4px]">
                    <span className="text-[#5AA7FF] text-[.875rem] leading-[1.5555]">
                      See all
                    </span>
                    <div className="overlay absolute inset-[-4px] bg-white bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-100 rounded-[4px] cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onMouseOver={handleShowSettings}
              onMouseLeave={handleHideSettings}
              className="relative"
              role="row"
            >
              <div
                data-visualcompletion="ignore-dynamic"
                role="none"
                className="px-[8px]"
              >
                <div role="grid-cell">
                  <a
                    className="block relative rounded-[8px] bg-transparent"
                    href=""
                  >
                    <div className="flex px-[8px] justify-between items-center">
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
                                  className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative"
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

                      <div className="notif-text flex justify-between relative items-center self-stretch">
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
                                    <span className="max-w-full font-normal text-[#8A8D91] text-[.75rem] break-words">
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
                        <div className="relative ml-[12px] left-[2px] my-[8px] self-center ">
                          <div className="flex items-center">
                            <div className="">
                              <div
                                className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-none items-center"
                                role="presentation"
                                tabIndex="0"
                              >
                                <span
                                  className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                  data-visualcompletion="ignore"
                                ></span>
                              </div>
                              <div
                                className="absolute duration-100 ease-in-out inset-0 opacity-0 transition-opacity "
                                role="presentation"
                                tabIndex="0"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] select-none"
                      data-visualcompletion="ignore"
                    ></div>
                  </a>
                </div>
              </div>
              <div aria-label="Options for this notification" role="gridcell">
                <div
                  className={`flex absolute top-[24%] ${
                    showSettings
                      ? "[clip:unset] right-[36px]"
                      : "clip-element h-[1px] overflow-hidden w-[1px]"
                  }`}
                >
                  <div>
                    <div className="rounded-full customShadow">
                      <div
                        aria-label="Manage notification settings"
                        className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                        role="button"
                        tabIndex="0"
                      >
                        <i
                          data-visualcompletion="css-img"
                          className="align-[-0.25em] text-[#B0B3B8]"
                          style={{
                            filter:
                              "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                            backgroundImage:
                              'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                            backgroundPosition: "0px -494px",
                            backgroundSize: "auto",
                            width: "20px",
                            height: "20px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        ></i>
                        <div
                          className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
                          role="none"
                          data-visualcompletion="ignore"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onMouseOver={handleShowSettings2}
              onMouseLeave={handleHideSettings2}
              className="relative"
              role="row"
            >
              <div
                data-visualcompletion="ignore-dynamic"
                role="none"
                className="px-[8px]"
              >
                <div role="grid-cell">
                  <a
                    className="block relative rounded-[8px] bg-transparent"
                    href=""
                  >
                    <div className="flex px-[8px] justify-between items-center">
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
                                  className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative"
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

                      <div className="notif-text flex justify-between relative items-center self-stretch">
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
                                    <span className="max-w-full font-normal text-[#0866FF] text-[.75rem] break-words">
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
                        <div className="relative ml-[12px] left-[2px] my-[8px] self-center ">
                          <div className="flex items-center">
                            <div className="">
                              <div
                                className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-none items-center"
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
                    <div
                      className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] "
                      data-visualcompletion="ignore"
                    ></div>
                  </a>
                </div>
              </div>
              <div aria-label="Options for this notification" role="gridcell">
                <div
                  className={`flex absolute top-[24%] ${
                    showSettings2
                      ? "[clip:unset] right-[36px] "
                      : "clip-element h-[1px] overflow-hidden w-[1px]"
                  }`}
                >
                  <div>
                    <div className="rounded-full customShadow">
                      <div
                        aria-label="Manage notification settings"
                        className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                        role="button"
                        tabIndex="0"
                      >
                        <i
                          data-visualcompletion="css-img"
                          className="align-[-0.25em] text-[#B0B3B8]"
                          style={{
                            filter:
                              "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                            backgroundImage:
                              'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                            backgroundPosition: "0px -494px",
                            backgroundSize: "auto",
                            width: "20px",
                            height: "20px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        ></i>
                        <div
                          className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
                          role="none"
                          data-visualcompletion="ignore"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onMouseOver={handleShowSettings3}
              onMouseLeave={handleHideSettings3}
              className="relative"
              role="row"
            >
              <div
                data-visualcompletion="ignore-dynamic"
                role="none"
                className="px-[8px]"
              >
                <div role="grid-cell">
                  <a
                    className="block relative rounded-[8px] bg-transparent"
                    href=""
                  >
                    <div className="flex px-[8px] justify-between items-center">
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
                                  className="bg-transparent min-w-0 overflow-hidden flex flex-col justify-center items-center relative"
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

                      <div className="notif-text flex justify-between relative items-center self-stretch">
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
                                    <span className="max-w-full font-normal text-[#B0B3B8] text-[.75rem] break-words">
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
                        <div className="relative ml-[12px] left-[2px] my-[8px] self-center ">
                          <div className="flex items-center">
                            <div className="">
                              <div
                                className="relative flex w-[20px] h-[48px] bg-transparent pl-[4px] outline-none items-center"
                                role="presentation"
                                tabIndex="0"
                              >
                                <span
                                  className="inline-flex w-[12px] h-[12px] rounded-full justify-center items-center bg-[#0866FF] cursor-pointer"
                                  data-visualcompletion="ignore"
                                ></span>
                              </div>
                              <div
                                className="absolute duration-100 ease-in-out inset-0 opacity-0 transition-opacity "
                                role="presentation"
                                tabIndex="0"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px]"
                      data-visualcompletion="ignore"
                    ></div>
                  </a>
                </div>
              </div>
              <div aria-label="Options for this notification" role="gridcell">
                <div
                  className={`flex absolute top-[24%] ${
                    showSettings3
                      ? "[clip:unset] right-[36px] "
                      : "clip-element h-[1px] overflow-hidden w-[1px]"
                  }`}
                >
                  <div>
                    <div className="rounded-full customShadow">
                      <div
                        aria-label="Manage notification settings"
                        className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                        role="button"
                        tabIndex="0"
                      >
                        <i
                          data-visualcompletion="css-img"
                          className="align-[-0.25em] text-[#B0B3B8]"
                          style={{
                            filter:
                              "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                            backgroundImage:
                              'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                            backgroundPosition: "0px -494px",
                            backgroundSize: "auto",
                            width: "20px",
                            height: "20px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        ></i>
                        <div
                          className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
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
        </div>
      )}
      {showMessenger && (
        <div
          className="msg-container messenger flex flex-col fixed right-0 shadow-xl shadow-[#141414]"
          style={{ transform: "translate(-16px, 53px)" }}
        >
          <div className="flex messenger flex-col w-[360px] h-[478px] bg-[#242526] rounded-lg overflow-x-hidden">
            <div className="">
              <div className="flex relative mt-[0.7rem] mx-4 flex-1 ">
                <div className="flex flex-1">
                  <span className="text-[#E4E6EB] text-2xl font-bold">
                    Chats
                  </span>
                </div>
                <div className="flex pb-[4px]">
                  <div className="flex flex-col justify-center items-center max-w-full min-w-0 rounded-full pl-[24px] pr-[16px] pt-[7px] pb-[6px] hover:bg-[#393939] text-[#B0B3B8] cursor-pointer w-[32px] h-[32px] bg-transparent">
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
                  <div className="flex flex-col justify-center items-center max-w-full min-w-0 rounded-full pl-[24px] pr-[16px] pt-[7px] pb-[6px] hover:bg-[#393939] text-[#B0B3B8] cursor-pointer w-[32px] h-[32px] bg-transparent">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(messengerIcons/icons.png)",
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundPosition: "0 -481px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center max-w-full min-w-0 rounded-full pl-[24px] pr-[16px] pt-[7px] pb-[6px] hover:bg-[#393939] text-[#B0B3B8] cursor-pointer w-[32px] h-[32px] bg-transparent">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(messengerIcons/icons.png)",
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundPosition: "-17px -523px",
                        backgroundSize: "auto",
                        width: "16px",
                        height: "16px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex justify-center items-center py-[0.55rem]">
                    <label className="search w-[328px] relative bg-[#3A3B3C] rounded-full flex items-center ">
                      <span className="flex pl-[10px] items-center whitespace-nowrap pointer-events-none ">
                        <svg
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="block text-[#B0B3B8] ease-in transition-all duration-200"
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
                      </span>
                      <input
                        aria-label="Search Messenger"
                        className="flex justify-center text-left flex-grow pt-[6px] pb-[8px] items-center flex-shrink w-full xl:placeholder-[#B0B3B8] bg-[#3A3B3C] h-[36px] px-[0.38rem] rounded-full md:text-[.9375rem] placeholder-transparent outline-none"
                        type="text"
                        placeholder="Search Messenger"
                      />
                      <span className="flex absolute left-3 text-[#B0B3B8]"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex pl-4 pt-[7px] pb-[8px]">
                <div className="pr-2 ">
                  <div
                    className={`relative h-[36px] flex flex-wrap ${
                      showAll ? "bg-[#1D85FC33]" : "bg-transparent"
                    } rounded-[18px] justify-center items-center px-3 outline-none w-full`}
                    role="button"
                    onMouseDown={() => handleShowAll()}
                  >
                    <span
                      className={`${
                        showAll ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                      }`}
                    >
                      <span className="text-[.875rem] font-medium leading-[2.3333]">
                        Inbox
                      </span>
                    </span>
                    <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 hover:bg-opacity-10 bg-white bg-opacity-0 "></div>
                  </div>
                </div>

                <div>
                  <div
                    className={`relative h-[36px] flex flex-wrap rounded-[18px] ${
                      showUnread ? "bg-[#1D85FC33]" : "bg-transparent"
                    } justify-center items-center px-3 outline-none w-full `}
                    role="button"
                    onClick={() => handleShowUnread()}
                  >
                    <span
                      className={`${
                        showUnread ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                      }`}
                    >
                      <span className="text-[.875rem] font-medium leading-[2.3333]">
                        Communities
                      </span>
                    </span>
                    <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 hover:bg-opacity-10 bg-white bg-opacity-0 "></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chats">
              <div
                onMouseOver={handleShowSettings}
                onMouseLeave={handleHideSettings}
                className="relative flex flex-col px-[8px]"
                role="row"
              >
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="flex flex-col justify-center items-stretch "
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-center items-stretch m-[-6px] p-[8px]">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col self-start relative p-[6px]">
                              <div className="relative inline-block align-bottom">
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
                                      <circle
                                        cx="28"
                                        cy="28"
                                        r="28"
                                        fill="white"
                                      />
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#circleMask)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="hasan.jpg"
                                        style={{
                                          height: "56px",
                                          width: "56px",
                                        }}
                                      ></image>
                                    </g>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-end inset-0 justify-end absolute z-0 pointer-events-none">
                                  <span className="w-[18px] h-[18px] border-2 border-[#242526] bg-[#31A24C] rounded-full"></span>
                                </div>
                              </div>
                            </div>

                            <div className="notif-text flex justify-between relative items-center min-w-0 flex-grow">
                              <div className="flex items-stretch justify-between relative w-full p-[6px]">
                                <div className="pb-[3px] w-full">
                                  <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                    <div className="mb-[3px] mt-[3px]">
                                      <span
                                        className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                        dir="auto"
                                      >
                                        <span className="flex relative overflow-hidden textClass">
                                          <div
                                            className="absolute"
                                            style={{
                                              clip: "rect(0,0,0,0",
                                              clipPath:
                                                "polygon(0 0,0 0,0 0,0 0)",
                                            }}
                                          >
                                            Unread
                                          </div>
                                          <strong style={{ fontWeight: "600" }}>
                                            Hasan Rizvi{" "}
                                          </strong>
                                        </span>
                                      </span>
                                    </div>
                                    <div className="mb-[3px] min-h-[16px]">
                                      <span
                                        className="block max-w-full font-medium text-left text-[.75rem] text-[#8A8D91]"
                                        dir="auto"
                                      >
                                        <span className="flex min-w-0 items-center">
                                          <span className="block min-w-0 [word-wrap:break-word] [word-break:break-word] text-[.75rem] leading-[1.3333]">
                                            <span className="block text-[#E4E6EB] overflow-ellipsis min-w-0 overflow-y-hidden [white-space:nowrap] pr-[2px] mb-[2px]">
                                              Hasan sent an attachment.{" "}
                                            </span>
                                          </span>
                                          <span
                                            className="dot text-[#B0B3B8] font-normal block text-[.75rem] [word-wrap:break-word] [word-break:break-word] min-w-0 max-w-full"
                                            dir="auto"
                                          >
                                            <span className="block [white-space:nowrap] overflow-ellipsis relative pb-[1px]">
                                              <span>
                                                <span
                                                  style={{
                                                    clip: "rect(0,0,0,0)",
                                                  }}
                                                  className="absolute h-[1px] w-[1px] overflow-x-hidden pb-[3px]"
                                                >
                                                  &nbsp;
                                                </span>
                                                <span aria-hidden="true">
                                                  {" "}
                                                  ·{" "}
                                                </span>
                                              </span>
                                            </span>
                                          </span>

                                          <span className="ba flex flex-col max-w-full items-center font-normal text-[#B0B3B8] text-[.75rem] pl-[2px] pb-[2px]">
                                            <span>12h</span>
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
                            </div>
                            <div className="flex items-center">
                              <div className="inline-flex ">
                                <span className="w-[12px] h-[12px] bg-[#0866FF] rounded-full"></span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] select-none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </div>
                    </a>
                    <div
                      aria-label="Options for this notification"
                      role="gridcell"
                    >
                      <div
                        className={`flex absolute top-[28%] ${
                          showSettings
                            ? "[clip:unset] right-[36px]"
                            : "clip-element h-[1px] overflow-hidden w-[1px]"
                        }`}
                      >
                        <div>
                          <div className="rounded-full customShadow">
                            <div
                              aria-label="Manage notification settings"
                              className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                              role="button"
                              tabIndex="0"
                            >
                              <i
                                data-visualcompletion="css-img"
                                className="align-[-0.25em] text-[#B0B3B8]"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                                  backgroundPosition: "0px -494px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              ></i>
                              <div
                                className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
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
              </div>{" "}
              <div
                onMouseOver={handleShowSettings}
                onMouseLeave={handleHideSettings}
                className="relative flex flex-col px-[8px]"
                role="row"
              >
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="flex flex-col justify-center items-stretch "
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-center items-stretch m-[-6px] p-[8px]">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col self-start relative p-[6px]">
                              <div className="relative inline-block align-bottom">
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
                                      <circle
                                        cx="28"
                                        cy="28"
                                        r="28"
                                        fill="white"
                                      />
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#circleMask)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="salar.jpg"
                                        style={{
                                          height: "56px",
                                          width: "56px",
                                        }}
                                      ></image>
                                    </g>
                                  </svg>
                                </div>

                                <div className="flex flex-col items-end inset-0 justify-end absolute z-0 pointer-events-none">
                                  <span className="w-[18px] h-[18px] border-2 border-[#242526] bg-[#31A24C] rounded-full"></span>
                                </div>
                              </div>
                            </div>

                            <div className="notif-text flex justify-between relative items-center min-w-0 flex-grow">
                              <div className="flex items-stretch justify-between relative w-full p-[6px]">
                                <div className="pb-[3px] w-full">
                                  <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                    <div className="mb-[3px] mt-[3px]">
                                      <span
                                        className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                        dir="auto"
                                      >
                                        <span className="flex relative overflow-hidden textClass">
                                          <div
                                            className="absolute"
                                            style={{
                                              clip: "rect(0,0,0,0",
                                              clipPath:
                                                "polygon(0 0,0 0,0 0,0 0)",
                                            }}
                                          >
                                            Unread
                                          </div>
                                          <strong style={{ fontWeight: "600" }}>
                                            Muhammad Salar{" "}
                                          </strong>
                                        </span>
                                      </span>
                                    </div>
                                    <div className="mb-[3px] min-h-[16px]">
                                      <span
                                        className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91]"
                                        dir="auto"
                                      >
                                        <span className="flex min-w-0 items-center">
                                          <span className="block min-w-0 [word-wrap:break-word] [word-break:break-word] text-[.75rem] leading-[1.3333]">
                                            <span className="block text-[#B0B3B8] min-w-0 overflow-y-hidden [text-overflow:ellipsis] [white-space:nowrap] mb-[2px]">
                                              Messages and calls are secured
                                              with end-to-end encryption.
                                            </span>
                                          </span>
                                          <span
                                            className="ba text-[#385898] font-normal block text-[.75rem] [word-wrap:break-word] [word-break:break-word] min-w-0 max-w-full leading-[1.2308]"
                                            dir="auto"
                                          >
                                            <span className="block [white-space:nowrap] overflow-ellipsis relative pb-[1px]">
                                              <span>
                                                <span
                                                  style={{
                                                    clip: "rect(0,0,0,0)",
                                                  }}
                                                  className="absolute h-[1px] w-[1px] overflow-x-hidden pb-[3px]"
                                                >
                                                  &nbsp;
                                                </span>
                                                <span aria-hidden="true">
                                                  {" "}
                                                  ·{" "}
                                                </span>
                                              </span>
                                            </span>
                                          </span>

                                          <span className="ba flex flex-col max-w-full items-center font-normal text-[#B0B3B8] text-[.75rem] pl-[2px] pb-[2px]">
                                            <span>4d</span>
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
                            </div>
                            <div className="flex flex-col shrink-0 min-w-0 max-w-full ">
                              <div className="flex flex-col relative p-[6px] min-w-0 max-w-full">
                                <div className="flex items-center">
                                  <div
                                    aria-label="Seen by Muhammad Salar"
                                    className="flex items-center justify-start"
                                    role="img"
                                  >
                                    <div aria-hidden="true" className="">
                                      <div
                                        className="relative flex flex-wrap overflow-hidden rounded-full"
                                        role="row"
                                        data-visualcompletion="ignore-dynamic"
                                        style={{ height: "16px" }}
                                      >
                                        <div
                                          className="relative shrink-0"
                                          style={{
                                            maxWidth: "100%",
                                            minWidth: "0px",
                                            width: "calc(-999900% + 158984px)",
                                          }}
                                        ></div>
                                        <div
                                          className="relative mb-[20px]"
                                          role="cell"
                                        >
                                          <div className="relative inline-block">
                                            <img
                                              height="100%"
                                              width="100%"
                                              src="/salar.jpg"
                                              style={{
                                                height: "19px",
                                                width: "16px",
                                              }}
                                            ></img>
                                          </div>
                                        </div>
                                        {/* <div className="flex absolute inset-0">
                                      <div
                                        className="relative flex-shrink-0"
                                        style={{
                                          maxWidth: "100%",
                                          minWidth: "0",
                                          width: "calc(-999900% + 158984px)",
                                        }}
                                      ></div>
                                      <div
                                        aria-label="Link to see everyone"
                                        className="relative w-[16px] touch-manipulation flex items-center h-[16px] min-h-0 min-w-0 rounded-[50%] bg-transparent basis-auto outline-none"
                                        role="button"
                                        tabindex="0"
                                      >
                                        <svg
                                          className="absolute inset-0"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          width="16"
                                        >
                                          <circle
                                            className="fill-[rgba(0,0,0,0.4)]"
                                            cx="8"
                                            cy="8"
                                            r="8"
                                            role="cell"
                                          ></circle>
                                          <circle
                                            className="opacity-0 transition-opacity duration-100 
                                            [transition-timing-function: cubic-bezier(0,0,1,1)]"
                                            cx="8"
                                            cy="8"
                                            r="8"
                                            role="cell"
                                          ></circle>
                                        </svg>
                                        <div className="overflow-hidden w-[10px] ml-[6px]">
                                          <div className="flex justify-center items-center ml-[-6px]">
                                            <svg
                                              viewBox="0 0 24 24"
                                              width="12"
                                              height="12"
                                              fill="currentColor"
                                              aria-hidden="true"
                                              className="block transition-all duration-200 transition-timing-function: cubic-bezier(0.8,.52,.52,1)"
                                              style={{ color: "white" }}
                                            >
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="2.5"
                                              ></circle>
                                              <circle
                                                cx="19.5"
                                                cy="12"
                                                r="2.5"
                                              ></circle>
                                              <circle
                                                cx="4.5"
                                                cy="12"
                                                r="2.5"
                                              ></circle>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] select-none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </div>
                    </a>
                    <div
                      aria-label="Options for this notification"
                      role="gridcell"
                    >
                      <div
                        className={`flex absolute top-[28%] ${
                          showSettings
                            ? "[clip:unset] right-[36px]"
                            : "clip-element h-[1px] overflow-hidden w-[1px]"
                        }`}
                      >
                        <div>
                          <div className="rounded-full customShadow">
                            <div
                              aria-label="Manage notification settings"
                              className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                              role="button"
                              tabIndex="0"
                            >
                              <i
                                data-visualcompletion="css-img"
                                className="align-[-0.25em] text-[#B0B3B8]"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                                  backgroundPosition: "0px -494px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              ></i>
                              <div
                                className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
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
              </div>
              <div
                onMouseOver={handleShowSettings}
                onMouseLeave={handleHideSettings}
                className="relative flex flex-col px-[8px]"
                role="row"
              >
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="flex flex-col justify-center items-stretch "
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-center items-stretch m-[-6px] p-[8px]">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col self-start relative p-[6px]">
                              <div className="relative inline-block align-bottom">
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
                                      <circle
                                        cx="28"
                                        cy="28"
                                        r="28"
                                        fill="white"
                                      />
                                    </mask>

                                    {/* Apply the mask to the image */}
                                    <g mask="url(#circleMask)">
                                      <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-1/438652510_7939446242745604_4942007167733713700_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=G48kx52L4AAQ7kNvgGV-69p&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfCTZ0oZpSss96VciuSCyrUk3pLDyQO51gw8sUK1_5mBcA&oe=66353B53"
                                        style={{
                                          height: "56px",
                                          width: "56px",
                                        }}
                                      ></image>
                                    </g>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-end inset-0 justify-end absolute z-0 pointer-events-none">
                                  <span className="w-[18px] h-[18px] border-2 border-[#242526] bg-[#31A24C] rounded-full"></span>
                                </div>
                              </div>
                            </div>

                            <div className="notif-text flex justify-between relative items-center min-w-0 flex-grow">
                              <div className="flex items-stretch justify-between relative w-full p-[6px]">
                                <div className="pb-[3px] w-full">
                                  <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                    <div className="mb-[3px] mt-[3px]">
                                      <span
                                        className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                        dir="auto"
                                      >
                                        <strong style={{ fontWeight: "600" }}>
                                          Syed Khurram Abbas{" "}
                                        </strong>
                                      </span>
                                    </div>
                                    <div className="mb-[3px] min-h-[16px]">
                                      <span
                                        className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91]"
                                        dir="auto"
                                      >
                                        <span className="flex min-w-0 items-center">
                                          <span className="block min-w-0 [word-wrap:break-word] text-[.75rem] leading-[1.3333]">
                                            <span className="block text-[#B0B3B8] min-w-0 overflow-y-hidden [text-overflow:ellipsis] [white-space:nowrap] mb-[2px]">
                                              Messages and calls are secured
                                              with end-to-end encryption.
                                            </span>
                                          </span>
                                          <span
                                            className="ba text-[#385898] font-normal block text-[.75rem] [word-wrap:break-word] [word-break:break-word] min-w-0 max-w-full leading-[1.2308]"
                                            dir="auto"
                                          >
                                            <span className="block [white-space:nowrap] overflow-ellipsis relative pb-[1px]">
                                              <span>
                                                <span
                                                  style={{
                                                    clip: "rect(0,0,0,0)",
                                                  }}
                                                  className="absolute h-[1px] w-[1px] overflow-x-hidden pb-[3px] "
                                                >
                                                  &nbsp;
                                                </span>
                                                <span aria-hidden="true">
                                                  {" "}
                                                  ·{" "}
                                                </span>
                                              </span>
                                            </span>
                                          </span>

                                          <span className="ba flex flex-col max-w-full items-center font-normal text-[#B0B3B8] text-[.75rem] pl-[2px] pb-[2px]">
                                            <span>6d</span>
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
                            </div>
                            <div className="flex flex-col shrink-0 min-w-0 max-w-full ">
                              <div className="flex flex-col relative p-[6px] min-w-0 max-w-full">
                                <div className="flex items-center">
                                  <div
                                    aria-label="Seen by Muhammad Salar"
                                    className="flex items-center justify-start"
                                    role="img"
                                  >
                                    <div aria-hidden="true" className="">
                                      <div
                                        className="relative flex flex-wrap overflow-hidden rounded-full"
                                        role="row"
                                        data-visualcompletion="ignore-dynamic"
                                        style={{ height: "16px" }}
                                      >
                                        <div
                                          className="relative shrink-0"
                                          style={{
                                            maxWidth: "100%",
                                            minWidth: "0px",
                                            width: "calc(-999900% + 158984px)",
                                          }}
                                        ></div>
                                        <div
                                          className="relative mb-[20px]"
                                          role="cell"
                                        >
                                          <div className="relative inline-block">
                                            <img
                                              height="100%"
                                              width="100%"
                                              src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-1/438652510_7939446242745604_4942007167733713700_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=G48kx52L4AAQ7kNvgGV-69p&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfCTZ0oZpSss96VciuSCyrUk3pLDyQO51gw8sUK1_5mBcA&oe=66353B53"
                                              style={{
                                                height: "19px",
                                                width: "16px",
                                              }}
                                            ></img>
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
                            className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] select-none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </div>
                    </a>
                    <div
                      aria-label="Options for this notification"
                      role="gridcell"
                    >
                      <div
                        className={`flex absolute top-[28%] ${
                          showSettings
                            ? "[clip:unset] right-[36px]"
                            : "clip-element h-[1px] overflow-hidden w-[1px]"
                        }`}
                      >
                        <div>
                          <div className="rounded-full customShadow">
                            <div
                              aria-label="Manage notification settings"
                              className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                              role="button"
                              tabIndex="0"
                            >
                              <i
                                data-visualcompletion="css-img"
                                className="align-[-0.25em] text-[#B0B3B8]"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                                  backgroundPosition: "0px -494px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              ></i>
                              <div
                                className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
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
              </div>{" "}
              <div
                onMouseOver={handleShowSettings}
                onMouseLeave={handleHideSettings}
                className="relative flex flex-col px-[8px]"
                role="row"
              >
                <div
                  data-visualcompletion="ignore-dynamic"
                  role="none"
                  className="flex flex-col justify-center items-stretch "
                >
                  <div role="grid-cell">
                    <a
                      className="block relative rounded-[8px] min-w-0 min-h-0"
                      href=""
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-center items-stretch m-[-6px] p-[8px]">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col self-start relative p-[6px]">
                              <div className="relative inline-block align-bottom">
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
                                      <circle
                                        cx="28"
                                        cy="28"
                                        r="28"
                                        fill="white"
                                      />
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
                                        style={{
                                          height: "56px",
                                          width: "56px",
                                        }}
                                      ></image>
                                    </g>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-end inset-0 justify-end absolute z-0 pointer-events-none">
                                  <span className="w-[18px] h-[18px] border-2 border-[#242526] bg-[#31A24C] rounded-full"></span>
                                </div>
                              </div>
                            </div>

                            <div className="notif-text flex justify-between relative items-center min-w-0 flex-grow">
                              <div className="flex items-stretch justify-between relative w-full p-[6px]">
                                <div className="pb-[3px] w-full">
                                  <div className="flex flex-col mb-[-5px] mt-[-5px]">
                                    <div className="mb-[3px] mt-[3px]">
                                      <span
                                        className="text-[#E4E6EB] font-normal block text-left text-[.875rem] leading-[1.3333]"
                                        dir="auto"
                                      >
                                        <strong style={{ fontWeight: "600" }}>
                                          Sajid Hussain Khan{" "}
                                        </strong>
                                      </span>
                                    </div>
                                    <div className="mb-[3px] min-h-[16px]">
                                      <span
                                        className="block max-w-full font-normal text-left text-[.75rem] text-[#8A8D91]"
                                        dir="auto"
                                      >
                                        <span className="flex min-w-0 items-center">
                                          <span className="block min-w-0 [word-wrap:break-word] text-[.75rem] leading-[1.3333]">
                                            <span className="block text-[#B0B3B8] min-w-0 overflow-y-hidden [text-overflow:ellipsis] [white-space:nowrap] mb-[2px]">
                                              Messages and calls are secured
                                              with end-to-end encryption.
                                            </span>
                                          </span>
                                          <span
                                            className="ba text-[#385898] font-normal block text-[.75rem] [word-wrap:break-word] [word-break:break-word] min-w-0 max-w-full leading-[1.2308]"
                                            dir="auto"
                                          >
                                            <span className="block [white-space:nowrap] overflow-ellipsis relative pb-[1px]">
                                              <span>
                                                <span
                                                  style={{
                                                    clip: "rect(0,0,0,0)",
                                                  }}
                                                  className="absolute h-[1px] w-[1px] overflow-x-hidden pb-[3px]"
                                                >
                                                  &nbsp;
                                                </span>
                                                <span aria-hidden="true">
                                                  {" "}
                                                  ·{" "}
                                                </span>
                                              </span>
                                            </span>
                                          </span>

                                          <span className="ba flex flex-col max-w-full items-center font-normal text-[#B0B3B8] text-[.75rem] pl-[2px] pb-[2px]">
                                            <span>12h</span>
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
                            </div>
                            <div className="flex flex-col shrink-0 min-w-0 max-w-full ">
                              <div className="flex flex-col relative p-[6px] min-w-0 max-w-full">
                                <div className="flex items-center">
                                  <div
                                    aria-label="Seen by Muhammad Salar"
                                    className="flex items-center justify-start"
                                    role="img"
                                  >
                                    <div aria-hidden="true" className="">
                                      <div
                                        className="relative flex flex-wrap overflow-hidden rounded-full"
                                        role="row"
                                        data-visualcompletion="ignore-dynamic"
                                        style={{ height: "16px" }}
                                      >
                                        <div
                                          className="relative shrink-0"
                                          style={{
                                            maxWidth: "100%",
                                            minWidth: "0px",
                                            width: "calc(-999900% + 158984px)",
                                          }}
                                        ></div>
                                        <div
                                          className="relative mb-[20px]"
                                          role="cell"
                                        >
                                          <div className="relative inline-block">
                                            <img
                                              height="100%"
                                              width="100%"
                                              src="/notifIcons/notif_image_2.jpg"
                                              style={{
                                                height: "19px",
                                                width: "16px",
                                              }}
                                            ></img>
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
                            className="opacity-0 hover:opacity-10 bg-white absolute inset-0 transition-opacity ease-in-out rounded-[8px] select-none"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </div>
                    </a>
                    <div
                      aria-label="Options for this notification"
                      role="gridcell"
                    >
                      <div
                        className={`flex absolute top-[28%] ${
                          showSettings
                            ? "[clip:unset] right-[36px]"
                            : "clip-element h-[1px] overflow-hidden w-[1px]"
                        }`}
                      >
                        <div>
                          <div className="rounded-full customShadow">
                            <div
                              aria-label="Manage notification settings"
                              className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 outline-none list-none"
                              role="button"
                              tabIndex="0"
                            >
                              <i
                                data-visualcompletion="css-img"
                                className="align-[-0.25em] text-[#B0B3B8]"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/o2KCW4cFG6l.png?_nc_eui2=AeF_WZG5lSf7vExjmY6cyCGUxh0ziHQFXU_GHTOIdAVdTySwi35FrTHV07dyj10FvW3P86X58Jc72VTH86yfemU9")',
                                  backgroundPosition: "0px -494px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              ></i>
                              <div
                                className="inset-0 rounded-full opacity-100 transition-opacity absolute ease-in-out duration-100"
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
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
