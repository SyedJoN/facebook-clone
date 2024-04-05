import { Container, Logo, Search } from '../index'
import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Header() {

  const activeTabClassName = 'text-[#0866FF]';
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [seeMore, setSeeMore] = useState(false)
  const [seeMore2, setSeeMore2] = useState(false)
  const containerRef = useRef(null);

  const clickHandler = () => {

    setSeeMore((prev) => !prev)
  }
  const clickHandler2 = () => {

    setSeeMore2((prev) => !prev)
  }

  useEffect(() => {
    if (containerRef.current && !seeMore) {
      // Scroll to the top when seeMore is false
      containerRef.current.scrollTop = 0;
    }
  }, [seeMore]);
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
    setShowDropdown(false);

  };

  useEffect(() => {


    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1022); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
      icon: <svg viewBox="0 0 24 24" width="24" height="24" className='mr-[1px]' fill="currentColor"><path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path></svg>
    },
    {
      name: 'Reels',
      slug: '/reels',
      active: true,
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.996 8.132A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z"></path><path d="M14.573 2H9.427c-1.824 0-3.293 0-4.45.155-1.2.162-2.21.507-3.013 1.31C1.162 4.266.817 5.277.655 6.477.5 7.634.5 9.103.5 10.927v.146c0 1.824 0 3.293.155 4.45.162 1.2.507 2.21 1.31 3.012.802.803 1.813 1.148 3.013 1.31C6.134 20 7.603 20 9.427 20h5.146c1.824 0 3.293 0 4.45-.155 1.2-.162 2.21-.507 3.012-1.31.803-.802 1.148-1.813 1.31-3.013.155-1.156.155-2.625.155-4.449v-.146c0-1.824 0-3.293-.155-4.45-.162-1.2-.507-2.21-1.31-3.013-.802-.802-1.813-1.147-3.013-1.309C17.866 2 16.397 2 14.573 2zM3.38 4.879c.369-.37.887-.61 1.865-.741C6.251 4.002 7.586 4 9.5 4h5c1.914 0 3.249.002 4.256.138.978.131 1.496.372 1.865.74.37.37.61.888.742 1.866.135 1.007.137 2.342.137 4.256 0 1.914-.002 3.249-.137 4.256-.132.978-.373 1.496-.742 1.865-.369.37-.887.61-1.865.742-1.007.135-2.342.137-4.256.137h-5c-1.914 0-3.249-.002-4.256-.137-.978-.132-1.496-.373-1.865-.742-.37-.369-.61-.887-.741-1.865C2.502 14.249 2.5 12.914 2.5 11c0-1.914.002-3.249.138-4.256.131-.978.372-1.496.74-1.865zM8 21.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"></path></svg>,
    },
    {
      name: 'Marketplace',
      slug: '/marketplace',
      active: true,
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M1.588 3.227A3.125 3.125 0 0 1 4.58 1h14.84c1.38 0 2.597.905 2.993 2.227l.816 2.719a6.47 6.47 0 0 1 .272 1.854A5.183 5.183 0 0 1 22 11.455v4.615c0 1.355 0 2.471-.119 3.355-.125.928-.396 1.747-1.053 2.403-.656.657-1.475.928-2.403 1.053-.884.12-2 .119-3.354.119H8.929c-1.354 0-2.47 0-3.354-.119-.928-.125-1.747-.396-2.403-1.053-.657-.656-.929-1.475-1.053-2.403-.12-.884-.119-2-.119-3.354V11.5l.001-.045A5.184 5.184 0 0 1 .5 7.8c0-.628.092-1.252.272-1.854l.816-2.719zM10 21h4v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21zm6-.002c.918-.005 1.608-.025 2.159-.099.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.255.099-.735.101-1.716.101-3.159v-3.284a5.195 5.195 0 0 1-1.7.284 5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 12 13a5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 5.7 13a5.2 5.2 0 0 1-1.7-.284V16c0 1.442.002 2.424.1 3.159.096.706.263 1.033.486 1.255.222.223.55.39 1.255.485.551.074 1.24.094 2.159.1V17.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5v3.498zM4.581 3c-.497 0-.935.326-1.078.802l-.815 2.72A4.45 4.45 0 0 0 2.5 7.8a3.2 3.2 0 0 0 5.6 2.117 1 1 0 0 1 1.5 0A3.19 3.19 0 0 0 12 11a3.19 3.19 0 0 0 2.4-1.083 1 1 0 0 1 1.5 0A3.2 3.2 0 0 0 21.5 7.8c0-.434-.063-.865-.188-1.28l-.816-2.72A1.125 1.125 0 0 0 19.42 3H4.58z"></path></svg>
    },
    {
      name: 'Group',
      slug: '/group',
      active: true,
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path><path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12zm2.21-2a9.537 9.537 0 0 0 0 3.993l.3.007A2 2 0 0 0 3 10h-.29zm.663-1.983a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517zM21.5 12a9.55 9.55 0 0 0-.212-2.007l-.265.007H21a2 2 0 0 0-.01 4l.3-.007c.138-.643.21-1.31.21-1.993zM12 21.5a9.455 9.455 0 0 0 4.97-1.402A3 3 0 0 0 14 17.523h-4a3 3 0 0 0-2.97 2.575A9.456 9.456 0 0 0 12 21.5z"></path></svg>
    },
    {
      name: 'Games',
      slug: '/games',
      active: true,
      icon: <svg className='' viewBox="0 0 24 24" width="24" height="24" fill="currentColor" ><path d="M8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path><path d="M.5 11a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7h-9a7 7 0 0 1-7-7v-2zm7-5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5h-9z"></path></svg>
    },

    // Add more items as needed
  ]

  return (

    <header className='flex w-full fixed right-0 top-0 bg-[#242526] border-b-[0.5px] border-[#3A3B3C] h-[56px] z-30'>

      <div className='flex top-0 fixed left-0 h-[56px] items-end w-[320px] px-[16px]'>
        <div className='relative top-0 left-0 py-2 flex flex-wrap z-3 ml-[16px]'>
          <a className='flex-shrink-0 text-xs fixed left-[16px] top-[8px]'>
            <svg viewBox="0 0 36 36" style={{ color: "#0866FF" }} className='block' fill="currentColor" height="40" width="40"><path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path><path fill='white' d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"></path></svg>
          </a>
          <div className='w-[7px]'></div>
          <Search className='' />

        </div>
      </div>

      <nav className='flex justify-center h-[56px] w-full'>


      
          (
            <ul className='flex justify-center flex-grow w-full px-[110px] items-end'>

              {navItems.map((item) => (
                item.active ? (
                  <li key={item.name} className={`nav hidden md:block lg:max-w-[111.6px]  md:min-w-[7.75%] md:w-full min-w-[50px] ml-2 ${location.pathname === item.slug ? activeTabClassName : 'text-[#B0B3B8]'} ${item.name === 'Games' ? 'md:hidden lg:block' : ''} `}>
                    
                    <span className='h-[56px]  '>
                      <div className={`group rounded-xl flex flex-wrap relative h-[56px] right-1 cursor-pointer`}>
                        {location.pathname === item.slug && (
                          <div className={`absolute left-[2px] right-[2px] h-[3px] bottom-0 bg-[#0866FF]`}></div>
                        )}
                        <a className='flex flex-col outline-none h-full justify-center items-center w-full' onClick={() => navigate(item.slug)}>
                          <span className='relative flex justify-center items-center z-50'>{item.icon}
                         
                          </span>
                        </a>
                        <div className={`absolute ${location.pathname !== item.slug ? 'group-hover:bg-[#3A3B3C]' : ''} inset-0 rounded-xl h-[50px] mt-[0.2rem]`}></div>
                      </div>
                    </span>
                  </li>
                ) : null
              ))
              }
          {isMobile && (

<li aria-label='More' role='link' className={`relative bottom-[4px] left-[3px] md:block mr-auto md:mr-0 lg:max-w-[129.5px] lg:min-w-[7.75%] w-[calc(15vw - 55px)] min-w-[50px] ml-0 lg:ml-2 ${!showMenu ? 'hover:bg-white hover:bg-opacity-10' : ''} text-white  p-3 rounded-lg`} onClick={handleMenuToggle}>
  <span className='h-[56px]'>
<a className='flex flex-col outline-none h-full justify-center items-center w-full'>
<svg viewBox="0 0 24 24" width="24" height="24" fill={`${showMenu ? '#0866FF' : '#B0B3B8'} `}><path d="M3.25 2.75a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25zM2 12c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 13.25 2 12.69 2 12zm0 8c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 21.25 2 20.69 2 20z"></path></svg>
</a>
  </span>

 

  {showMenu && (
    <div className={`absolute left-[2px] right-[2px] top-[49px] h-[3px]  bg-[#0866FF]`}></div>
  )}
</li>

)}
    
            </ul>)
    
        {showMenu && (
          <div ref={containerRef} className={`sidebar top-14 fixed bg-[#18191A] text-white w-full z-50 h-full cursor-pointer overflow-y-scroll  ${seeMore ? 'overflow-y-scroll overflow-x-hidden max-h-[875px]' : 'overflow-hidden'}`}>

            <div className={`sidebar flex flex-col text-white p-2 cursor-pointer mt-[0.4rem]`}>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>
                <div className="img-wrapper w-9 h-9 rounded-full">
                  <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
                </div>
                <span className='text-sm my-2 ml-3'>Syed Muhammad Jon</span>
              </div>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                <i
                  data-visualcompletion="css-img"
                  style={{
                    backgroundImage: "url(/iconBar.png)",
                    backgroundPosition: '0 -296px',
                    backgroundSize: 'auto',
                    width: '36px',
                    height: '36px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
                <span className='text-sm my-2 ml-3'>Friends</span>
              </div>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                <img src="/adsManager.png" alt="" />


                <span className='text-sm my-2 ml-3'>Ads Manager</span>

              </div>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                <i
                  data-visualcompletion="css-img"
                  style={{
                    backgroundImage: "url(/iconBar.png)",
                    backgroundPosition: '0 -444px',
                    backgroundSize: 'auto',
                    width: '36px',
                    height: '36px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
                <span className='text-sm my-2 ml-3'>Memories</span>

              </div>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                <i
                  data-visualcompletion="css-img"
                  style={{
                    backgroundImage: "url(/iconBar.png)",
                    backgroundPosition: '0 -185px',
                    backgroundSize: 'auto',
                    width: '36px',
                    height: '36px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}
                />
                <span className='text-sm my-2 ml-3'>Saved</span>
              </div>
              <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                <i
                  data-visualcompletion="css-img"
                  style={{
                    backgroundImage: "url(/iconBar.png)",
                    backgroundPosition: '0 -37px',
                    backgroundSize: 'auto',
                    width: '36px',
                    height: '36px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
                <span className='text-sm my-2 ml-3'>Groups</span>

              </div>

              {!seeMore && (
                <div
                  onClick={() => clickHandler()}
                  className="flex flex-wrap ml-[0.1rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group"
                >
                  <div className='rounded-full bg-[#313233] px-2 py-2 relative'>
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

                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"></div>
                  </div>
                  <span className='text-sm ml-3 mt-[0.4rem]'>See more</span>
                </div>
              )}
              {seeMore && (
                <div>

                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/blood.png)",
                        backgroundPosition: '-722px -175px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Blood Donations</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <img src="/climate.png" alt="" />
                    <span className='text-sm my-2 ml-3'>Climate Science Center</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/events.png)",
                        backgroundPosition: '0 -37px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Events</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <img src="/feeds.png" alt="" />


                    <span className='text-sm my-2 ml-3'>Feeds</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: '0 -333px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Fundraisers</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <img src="/gaming.png" alt="" />


                    <span className='text-sm my-2 ml-3'>Gaming Video</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031 rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: '0 -407px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Marketplace</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/messenger.png)",
                        backgroundPosition: '0 0',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Messenger</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <img src="/mkids.png" alt="" />


                    <span className='text-sm my-2 ml-3'>Messenger Kids</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <img src="/orders.png" alt="" />


                    <span className='text-sm my-2 ml-3'>Orders and payments</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: '0 -111px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Pages</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] max-w-[350px] rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: '0 -74px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Play games</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031] max-w-[350px] rounded-lg '>

                    <img src="/activity.png" alt="" />


                    <span className='text-sm my-2 ml-3'>Recent ad activity</span>

                  </div>
                  <div className='flex flex-wrap p-[5px] m-[0.1rem] hover:bg-[#303031]  rounded-lg '>

                    <i
                      data-visualcompletion="css-img"
                      style={{
                        backgroundImage: "url(/iconBar.png)",
                        backgroundPosition: '0 -518px',
                        backgroundSize: 'auto',
                        width: '36px',
                        height: '36px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                      }}

                    />
                    <span className='text-sm my-2 ml-3'>Video</span>

                  </div>
                </div>
              )}

              {seeMore && (<div
                onClick={() => clickHandler()}
                className="flex flex-wrap ml-[0.1rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group"
              >
                <div className='rounded-full bg-[#313233] px-2 py-2 relative'>
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor"><path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                  </svg>
                  {/* Glow effect using pseudo-element */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"></div>
                </div>
                <span className='text-sm ml-3 mt-[0.4rem]'>See less</span>
              </div>)}



            </div >
            <div className='ml-[1rem] mt-1 border-b-[0.05rem] border-[#3A3B3C] w-[21rem]' role='separator'></div>
            <div className={`sidebar flex flex-col text-white cursor-pointer w-[350px]`}>
              <h3 className='ml-2 mt-1 text-[#B0B3B8] font-semibold p-2 cursor-text'>
                Your shortcuts


              </h3>
              <div className='flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                <img src="/anti.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                <span className='text-sm my-2 ml-3 text-white'>Anti Babarsons Community 3.0™</span>

              </div>
              <div className='flex flex-wrap  ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                <img src="/anti2.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                <span className='text-sm my-2 ml-3 text-white'>Anti Babarsons Community 3.0™</span>

              </div>
              <div className='flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                <img src="/cs.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                <span className='text-sm my-2 ml-3 text-white'>Communications Systems Lab</span>

              </div>
              <div className='flex flex-wrap  ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                <img src="/death.png" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                <span className='text-sm my-2 ml-3 text-white'>Death Never Knocks</span>

              </div>
              <div className='flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                <img src="/jk.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                <span className='text-sm my-2 ml-3 text-white'>JK Developers</span>

              </div>

              {!seeMore2 && (
                <div
                  onClick={() => clickHandler2()}
                  className="flex flex-wrap ml-[0.5rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group"
                >
                  <div className='rounded-full bg-[#313233] px-2 py-2 relative'>
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
                    {/* Glow effect using pseudo-element */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"></div>
                  </div>
                  <span className='text-sm ml-3 mt-[0.4rem]'>See more</span>
                </div>
              )}


              {seeMore2 && (
                <div >
                  <div className='flex flex-wrap ml-[0.5rem] hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                    <img src="/jp.png" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                    <span className='text-sm my-2 ml-3 text-white'>JoN - Productions</span>

                  </div>
                  <div className='flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] rounded-lg p-[0.35rem]'>

                    <img src="/max.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                    <span className='text-sm my-2 ml-3 text-white'>Max Sweet</span>

                  </div>

                  <div className='flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] rounded-lg p-[0.35rem]'>

                    <img src="/toast.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                    <span className='text-sm my-2 ml-3 text-white'>Toast Sweet</span>

                  </div>
                </div>
              )}
              {seeMore2 && (<div
                onClick={() => clickHandler2()}
                className="flex flex-wrap ml-[0.5rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group"
              >
                <div className='rounded-full bg-[#313233] px-2 py-2 relative'>
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor"><path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                  </svg>
                  {/* Glow effect using pseudo-element */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"></div>
                </div>
                <span className='text-sm ml-3 mt-[0.4rem]'>See less</span>
              </div>)}

            </div>
          </div>
        )}


        <div className='flex fixed right-0 text-white pl-[4px] h-[56px] w-[204px]'>
          <div className="relative py-2 flex flex-wrap">

            <div className='relative mr-[8px]'>
              <div aria-label='Create' className='flex justify-center items-center cursor-pointer hover:bg-opacity-20 w-[40px] h-[40px] bg-white bg-opacity-10 rounded-full ' onClick={() => navigate(item.slug)}>
                {!isMobile ? (<svg viewBox="0 0 24 24" width="20" height="20" fill="#E4E6EB"><path d="M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>) :
                  (<svg viewBox="0 0 24 24" width="20" height="20" fill="#E4E6EB"><path d="M11 19a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6z"></path></svg>)
                }
              </div>
            </div>
            <div className='relative mr-[8px]'>
              <div className='flex justify-center cursor-pointer hover:bg-opacity-20 items-center w-[40px] h-[40px] bg-white bg-opacity-10 rounded-full ' onClick={() => navigate(item.slug)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#E4E6EB"><path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z"></path></svg>
              </div>
            </div>
            <div className='relative mr-[8px]'>
              <div className='flex justify-center items-center cursor-pointer hover:bg-opacity-20 w-[40px] h-[40px] bg-white bg-opacity-10 rounded-full ' onClick={() => navigate(item.slug)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#E4E6EB"><path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path></svg>
              </div>
            </div>
            <div className='relative mr-[8px]'>
              <div className='flex justify-center items-center cursor-pointer w-[40px] h-[40px] bg-white bg-opacity-10 rounded-full ' onClick={() => navigate(item.slug)}>
                <img className='object-cover w-full h-full rounded-full cursor-pointer' src="/me.jpg" alt="" />
              </div>
            </div>

          </div>
        </div>
      </nav>

    </header>
  )
}

export default Header
