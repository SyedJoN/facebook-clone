import React, { useRef, useState } from "react"

function MobileMenu() {

  const containerRef = useRef(null);
  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);

  const clickHandler = () => {
    setSeeMore((prev) => !prev);
  };
  const clickHandler2 = () => {
    setSeeMore2((prev) => !prev);
  };


  return (
    
  <div
    ref={containerRef}
    className={`flex flex-col full_sidebar relative bg-[#18191A] text-white w-full h-full cursor-pointer  ${
      seeMore
        ? ""
        : "overflow-hidden"
    }`}
  >
    <div className="full_sidebar_2 relative flex flex-col min-h-[inherit]">
    <div className="flex-col">
      <div className="flex flex-col min-h-full">
   <div className={`flex flex-col flex-grow sidebar cursor-pointer px-[9px] py-[7px]`}>
    <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
      <div className="img-wrapper w-9 h-9 rounded-full">
        <img
          className="object-cover w-full h-full rounded-full"
          src="/me.jpg"
          alt=""
        />
      </div>
      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB] ">
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
      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
        Friends
      </span>
      <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
    </div>
    <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
      <img src="/adsManager.png" alt="" />

      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
      <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
        Groups
      </span>
      <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
    </div>

    {!seeMore && (
      <div
        onClick={() => clickHandler()}
        className="relative flex flex-wrap ml-[0.1rem] pl-[0.3rem] py-[0.5rem] rounded-lg"
      >
        <div className="relative left-[1px] rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 ">
          <svg
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="#E4E6EB"
          >
            <g fillRule="evenodd" transform="translate(-448 -544)">
              <path
                fillRule="nonzero"
                d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
              ></path>
            </g>
          </svg>

          
        </div>
        <span className="text-sm ml-[0.77rem] mt-[0.4rem] text-[#E4E6EB] font-[500]">
          See more
        </span>
        <div className="ml-[-3px] mr-[-2px] my-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
      </div>
    )}
    {seeMore && (
      <div className="w-[inherit]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Blood Donations
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/climate.png" alt="" />
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Events
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/feeds.png" alt="" />

          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Fundraisers
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/gaming.png" alt="" />

          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Messenger
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/mkids.png" alt="" />

          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Messenger Kids
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/orders.png" alt="" />

          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Play games
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
        <div className="relative flex flex-wrap p-[5px] m-[0.1rem] rounded-lg items-center">
          <img src="/activity.png" alt="" />

          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
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
          <span className="ba_1 text-sm ml-[0.77rem] font-[500] text-[#E4E6EB]">
            Video
          </span>
          <div className="mx-[-3px] my-[-2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </div>
    )}

    {seeMore && (
      <div
        onClick={() => clickHandler()}
        className="relative flex flex-wrap pl-[0.45rem] py-[0.5rem] rounded-lg"
      >
        <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
          <svg
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="#E4E6EB"
          >
            <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
          </svg>
         
        </div>
        <span className="text-[#E4E6EB] text-sm ml-[0.74rem] mt-[0.45rem] font-[500]">
          See less
        </span>
        <div className="ml-[-3px] mr-[-2px] my-[2px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
      </div>
    )}
  </div>
  <div
    className="relative top-[-9px] ml-4 mt-2 border-b-[1px] border-b-[#3E4042]"
    role="separator"
  ></div>
  <div
    className={`sidebar text-white cursor-pointer w-full px-[9px] min-h-[inherit]`}
  >
    <h3 className=" mt-[0.2rem] text-[#B0B3B8] font-semibold px-[7px] cursor-text">
      Your shortcuts
    </h3>
    <ul className="mt-[0.15rem] pt-[5px] px-[1px]">
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg ">
        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
          <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
          <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>
     
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
        <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
          <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
               <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
      <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li> 
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
               <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
      <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>
    </ul>
    {!seeMore2 && (
      <div
        onClick={() => clickHandler2()}
        className="relative flex flex-wrap pl-[0.45rem] py-[0.4rem] rounded-lg"
      >
        <div className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-2 relative">
          <svg
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="#E4E6EB"
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
        <span className="text-[#E4E6EB] text-sm ml-[0.74rem] mt-[0.45rem] font-[500]">
          See more
        </span>
        <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
      </div>
    )}

    {seeMore2 && (
      <div>
      <ul className="px-[1px]">
      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
               <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
      <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>

      <li>
        <div className="relative flex flex-wrap items-center px-[0.4rem] rounded-lg">
               <div className="flex flex-col mb-[6px] mt-[6px] mr-[11.5px] self-start relative">
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
      <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
        </div>
      </li>
      </ul>
      </div>
    )}
    {seeMore2 && (
      <div
        onClick={() => clickHandler2()}
        className="relative flex flex-wrap pl-[0.45rem] py-[0.4rem] rounded-lg group"
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
        <span className="text-[#E4E6EB] text-sm ml-[0.74rem] mt-[0.45rem] font-[500]">
          See less
        </span>
        <div className="ml-[-2px] mr-[-3px] absolute opacity-0 hover:opacity-100 inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-[8px]"></div>
      </div>
    )}
  </div>
  <div>
    
  </div>
  </div>
  </div>
  </div>
  </div>
  )
}

export default MobileMenu