import React, { useRef, useEffect, useState } from 'react';

function Sidebar() {
  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarPosition, setScrollbarPosition] = useState(0);
  const containerRef = useRef(null);
  const [seeMore, setSeeMore] = useState(false)
  const [seeMore2, setSeeMore2] = useState(false)

  const [scrollOpacity, setScrollOpacity] = useState(0)

  const [trackOpacity, setTrackOpacity] = useState(0)

  const handleMouseOver = () => {
    if (seeMore) 
    setTrackOpacity(1)
  }
  const handleMouseOut = () => {
    setTrackOpacity(0)

  }

  const clickHandler = () => {

    setSeeMore(prev => !prev)
    if (scrollOpacity === 0) {
      setScrollOpacity(1)
    } else {
      setScrollOpacity(0)
      setTrackOpacity(0)
    }

  }
  const clickHandler2 = () => {

    setSeeMore2(prev => !prev)
  }

  useEffect(() => {
    if (containerRef.current && seeMore) {
      // Scroll to the top when seeMore is true

      setScrollbarPosition(0);
    }
  }, [seeMore])



  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = contentRef?.current?.scrollTop / (contentRef?.current?.scrollHeight - contentRef?.current?.clientHeight);
      const scrollbarPosition = scrollPercentage * (contentRef?.current?.clientHeight - scrollbarRef?.current?.clientHeight);
      setScrollbarPosition(scrollbarPosition);
    };

    contentRef?.current?.addEventListener('scroll', handleScroll);
    return () => {
      contentRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection while dragging
    const startY = e.clientY;
    const startScrollOffset = contentRef.current.scrollTop;

    const onMouseMove = (e) => {
      const deltaY = e.clientY - startY;
      const scrollY = startScrollOffset + deltaY * (contentRef?.current?.scrollHeight / contentRef?.current?.clientHeight);
      contentRef.current.scrollTop = scrollY;
    
    };
    if (seeMore) {
      setScrollOpacity(30);

    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setTimeout(() => {
        setScrollOpacity(0);
      }, 1000);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const scrollHandler = () => {
    setScrollOpacity(1)
  }
  const LeaveHandler = () => {
    setScrollOpacity(0)


  }

  return (
    <div className="scroll-container hidden lg:flex lg:flex-col relative" onMouseEnter={seeMore ? scrollHandler : null} onMouseLeave={seeMore ? LeaveHandler : null}>

      <div ref={contentRef} className="content">

        <div ref={containerRef} className={`content-item sidebar p-[0.6rem] text-[#E4E6EB] w-[360px] cursor-pointer  ${seeMore ? 'overflow-y-scroll overflow-x-hidden ' : 'overflow-hidden'}`}>

          <div className={`sidebar flex flex-col cursor-pointer mt-[0.4rem]`}>
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
          <div className='relative top-[-1px] ml-[0.5rem] mt-2 border-b-[0.05rem] border-[#3A3B3C] w-[21rem]' role='separator'></div>
          <div className={`sidebar flex flex-col text-white cursor-pointer w-[350px]`}>
            <h3 className=' mt-1 text-[#B0B3B8] font-semibold p-2 cursor-text'>
              Your shortcuts


            </h3>
            <div className='flex flex-wrap  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

              <img src="/anti.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


              <span className='text-sm my-2 ml-3 text-white'>Anti Babarsons Community 3.0™</span>

            </div>
            <div className='flex flex-wrap   hover:bg-[#303031] p-[0.35rem] rounded-lg '>

              <img src="/anti2.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


              <span className='text-sm my-2 ml-3 text-white'>Anti Babarsons Community 3.0™</span>

            </div>
            <div className='flex flex-wrap   hover:bg-[#303031] p-[0.35rem] rounded-lg '>

              <img src="/cs.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


              <span className='text-sm my-2 ml-3 text-white'>Communications Systems Lab</span>

            </div>
            <div className='flex flex-wrap    hover:bg-[#303031] p-[0.35rem] rounded-lg '>

              <img src="/death.png" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


              <span className='text-sm my-2 ml-3 text-white'>Death Never Knocks</span>

            </div>
            <div className='flex flex-wrap   hover:bg-[#303031] p-[0.35rem] rounded-lg '>

              <img src="/jk.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


              <span className='text-sm my-2 ml-3 text-white'>JK Developers</span>

            </div>

            {!seeMore2 && (
              <div
                onClick={() => clickHandler2()}
                className="flex flex-wrap p-[0.35rem] hover:bg-[#303031] rounded-lg group"
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
                <div className='flex flex-wrap  hover:bg-[#303031] p-[0.35rem] rounded-lg '>

                  <img src="/jp.png" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                  <span className='text-sm my-2 ml-3 text-white'>JoN - Productions</span>

                </div>
                <div className='flex flex-wrap   hover:bg-[#303031] rounded-lg p-[0.35rem]'>

                  <img src="/max.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                  <span className='text-sm my-2 ml-3 text-white'>Max Sweet</span>

                </div>

                <div className='flex flex-wrap   hover:bg-[#303031] rounded-lg p-[0.35rem]'>

                  <img src="/toast.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


                  <span className='text-sm my-2 ml-3 text-white'>Toast Sweet</span>

                </div>
              </div>
            )}
            {seeMore2 && (<div
              onClick={() => clickHandler2()}
              className="flex flex-wrap  p-[0.35rem] hover:bg-[#303031] rounded-lg group"
            >
              <div className='rounded-full bg-[#313233] px-2 py-2 relative'>
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor"><path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                </svg>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10"></div>
              </div>
              <span className='text-sm ml-3 mt-[0.4rem]'>See less</span>
            </div>)}

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

      >

      </div>





      <div
        className={`custom-scrollbar-track-1 ${trackOpacity ? 'opacity-30' : 'opacity-0'} bg-[#3E4042] opacity-0 transition-opacity duration-500 ease-in-out`}
      ></div>


    </div>
  );
}

export default Sidebar;
