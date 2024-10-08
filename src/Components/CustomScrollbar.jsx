import React, { useRef, useEffect, useState } from 'react';

function CustomScrollbar() {
  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarPosition, setScrollbarPosition] = useState(0);
  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const [seeMore, setSeeMore] = useState(false)
  const [seeMore2, setSeeMore2] = useState(false)

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
  }, [seeMore])



  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = contentRef.current.scrollTop / (contentRef.current.scrollHeight - contentRef.current.clientHeight);
      const scrollbarPosition = scrollPercentage * (contentRef.current.clientHeight - scrollbarRef.current.clientHeight);
      setScrollbarPosition(scrollbarPosition);
    };

    contentRef.current.addEventListener('scroll', handleScroll);
    return () => {
      contentRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection while dragging
    const startY = e.clientY;
    const startScrollOffset = contentRef.current.scrollTop;

    const onMouseMove = (e) => {
      const deltaY = e.clientY - startY;
      const scrollY = startScrollOffset + deltaY * (contentRef.current.scrollHeight / contentRef.current.clientHeight);
      contentRef.current.scrollTop = scrollY;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="scroll-container">
      <div ref={contentRef} className="content">
      <div ref={containerRef} className={`content-item sidebar text-white w-full pl-5 cursor-pointer overflow-y-scroll overflow-x-hidden max-h-[800px]`}>
      <div className={`sidebar flex flex-col text-white p-2 mt-[0.4rem] `}>
        <h3 className=' text-[#B0B3B8] font-semibold p-2 cursor-text '>
          Sponsored


        </h3>
        
        <div className='group relative flex rounded-xl overflow-hidden w-full cursor-pointer'>
     <a className='flex hover:bg-[#303031] p-[10px] w-full'>
     <img className='w-[130px] h-[130px] rounded-lg' src="/ad.jpg" alt="" />
 
        
          
          <span className='flex flex-col text-sm my-2 ml-3 justify-center uppercase hover:bg-[#303031]'>Your Style Statement<br/><span className='text-sm text-gray-500 lowercase hover:bg-[#303031]'>svestonwatches.com</span></span>
          </a>
        
     
       
        <div className='flex-row-reverse flex absolute right-[16px] h-[150.2px] top-[0px] w-0'>
        <div className='absolute h-[1px] w-[1px] z-[1] top-[5px] right-[-15px] clip-element group-hover:[clip:unset] group-hover:w-[40px]'>
          <span>
             <div className='flex relative items-center justify-center flex-wrap right-2 h-[40px] w-[40px] rounded-full bg-[#3E4042] hover:bg-[#525455] text-[#B0B3B8]'>
      <svg className='block' viewBox="0 0 20 20" width="20" height="20" fill="currentColor" ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
      </div>
          </span>
       
        </div>
        </div>

        </div>
    
     
 
        <div className='group relative flex rounded-xl overflow-hidden w-full '>
        <a className='flex hover:bg-[#303031] p-[10px] w-full'>
          <img className='w-[130px] h-[130px] rounded-lg' src="/ad_2.jpg" alt="" />
          <span className='flex flex-col text-sm my-2 ml-3 justify-center uppercase'>new year sale<br/><span className='text-sm text-gray-500 lowercase'>svestonwatches.com</span></span>
          </a>


        <div className='flex-row-reverse flex absolute right-[16px] h-[150.2px] top-[0px] w-0'>
        <div className='absolute h-[1px] w-[1px] z-[1] top-[5px] right-[-15px] clip-element group-hover:[clip:unset] group-hover:w-[40px]'>
          <span>
             <div className='flex relative items-center justify-center flex-wrap right-2 h-[40px] w-[40px] rounded-full bg-[#3E4042] hover:bg-[#525455] text-[#B0B3B8]'>
      <svg className='block' viewBox="0 0 20 20" width="20" height="20" fill="currentColor" ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
      </div>
          </span>
       
        </div>
        </div>
        </div>
        <div className='ml-[0.55rem] mt-2 border-b-[0.05rem] border-[#3A3B3C] w-[21rem]' role='separator'></div>
      
    
        <div className='flex items-center cursor-default'>
      <div className='flex flex-wrap'>
      <span className=' mt-1 text-[#B0B3B8] font-semibold p-2 cursor-text '>
          
      Your Pages & profiles
       
        </span>
      </div>
      <div className='flex ml-auto'>
    
      <div className='ml-auto mr-2 rounded-full hover:bg-[#303031] p-2 mt-2 text-[#B0B3B8] cursor-pointer'>
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
      </div>
     
        </div>
        </div>
        <div className='flex flex-wrap ml-[0.1rem] hover:bg-[#303031] p-[0.35rem] rounded-lg '>

<img src="/jk.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


<span className='text-sm my-2 ml-3 text-white'>JK Developers</span>

</div>
        <div className='flex flex-wrap ml-[1rem] hover:bg-[#303031] p-[0.35rem] rounded-lg '>

        <i
                data-visualcompletion="css-img"
                style={{
                  backgroundImage: "url(/switch.png)",
                  filter: "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                  backgroundPosition: '0 0',
                  backgroundSize: 'auto',
                  width: '20px',
                  height: '20px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block',
                  marginTop: '5px'
                }}

              />


<span className='text-xs my-[0.4rem] ml-[0.6rem] text-[#B8BBBF]'>Switch into Page</span>

</div>
        <div className='flex flex-wrap py-1 ml-[1rem] hover:bg-[#303031] p-[0.35rem] rounded-lg '>

        <i
                data-visualcompletion="css-img"
                style={{
                  backgroundImage: "url(/switch.png)",
                  filter: "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                  backgroundPosition: '0 -126px',
                  backgroundSize: 'auto',
                  width: '20px',
                  height: '20px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block',
                  marginTop: '5px'
                }}

              />


<span className='text-xs my-[0.4rem]  ml-[0.6rem] text-[#B8BBBF]'>Create promotion</span>

</div>
   
       
      </div >
      <div className='ml-[1rem] mt-1 border-b-[0.05rem] border-[#3A3B3C] w-[21rem]' role='separator'></div>
      <div className='flex items-center'>
      <div className='flex flex-wrap'>
      <span className='ml-2 mt-1 text-[#B0B3B8] font-semibold p-2 cursor-text'>
          
          Birthdays 
       
        </span>
        
      </div>
      
   
        </div>
        <div className='w-full flex ml-[0.4rem] hover:bg-[#303031] p-[0.5rem] rounded-lg '>

        <i
                data-visualcompletion="css-img"
                style={{
                  backgroundImage: "url(/birthday.png)",
                  backgroundPosition: '0 0',
                  backgroundSize: 'auto',
                  width: '36px',
                  height: '36px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block',
                  marginRight: '2px'
      

               
                }}

              />


<span style={{fontSize:'0.8rem'}} className='p-2 text-[#E4E6EB] font-medium'><strong className='font-semibold'>Muhammad Ahsan Khan's</strong> birthday is today.</span>
</div>
      <div className={`sidebar flex flex-col text-white cursor-default`}>
      <div className='ml-[1rem] mt-1 border-b-[0.05rem] border-[#3A3B3C] w-[21rem]' role='separator'></div>
     
     <div className='flex items-center'>
      <div className='flex flex-wrap'>
      <span className='ml-2 mt-1 text-[#B0B3B8] font-semibold p-2 cursor-text'>
          
          Contacts 
       
        </span>
      </div>
      <div className='flex ml-auto '>
      <div className='ml-auto rounded-full hover:bg-[#303031] p-2 mt-[0.7rem] cursor-pointer'>
      <svg 
     
        className='ml-auto w-4 h-4 text-[#B0B3B8]' viewBox="0 0 16 16" width="16" height="16" fill="currentColor" ><g fillRule="evenodd" transform="translate(-448 -544)"><g fillRule="nonzero"><path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)"></path><path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z" transform="translate(448 544)"></path><path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z" transform="translate(448 544)"></path><path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)"></path></g></g></svg>
      </div>
      <div className='ml-auto mr-2 rounded-full hover:bg-[#303031] p-2 mt-2 text-[#B0B3B8] cursor-pointer'>
      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
      </div>
     
        </div>
        </div>
      
        <div className='group relative flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg cursor-pointer '>

          <img src="/muneeb.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


          <span className='text-sm my-2 ml-3 text-white'>Muneeb</span>
<div className='absolute inset-8 rounded-full bg-green-600 w-3 h-3 border-black border-[2px]'></div>
        </div>

        <div className='group relative flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg cursor-pointer '>

          <img src="/zeeshan.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


          <span className='text-sm my-2 ml-3 text-white'>Zeeshan Haider</span>
<div className='absolute inset-8 rounded-full bg-green-600 w-3 h-3 border-black border-[2px]'></div>
        </div>
        <div className='group relative flex flex-wrap ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg cursor-pointer '>

          <img src="/khurram.jpg" style={{ width: '36px', height: '36px', borderRadius: '50px' }} alt="" />


          <span className='text-sm my-2 ml-3 text-white'>Syed Khurram Abbas</span>
<div className='absolute inset-8 rounded-full bg-green-600 w-3 h-3 border-black border-[2px]'></div>
        </div>
        <div className='flex flex-wrap  ml-[0.5rem]  hover:bg-[#303031] p-[0.35rem] rounded-lg cursor-pointer'>

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
            className="flex flex-wrap ml-[0.5rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group cursor-pointer"
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
          className="flex flex-wrap ml-[0.5rem] p-[0.35rem] hover:bg-[#303031] rounded-lg group cursor-pointer"
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
        {Array.from({ length: 100 }, (_, index) => (
          <div key={index} className="content-item">Content Item {index + 1}</div>
        ))}
      </div>
      <div
        ref={scrollbarRef}
        className="custom-scrollbar"
        style={{ top: `${scrollbarPosition}px` }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}

export default CustomScrollbar;
