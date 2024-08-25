import React, { useState } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Stories() {
  return (
    <div className="stories-carousel relative min-h-[200px] block py-2 z-0">
      <OwlCarousel
        items={1}
        nav={true}
        margin={8}
        dots={false}
        mouseDrag={false}
        navText={[
          '<svg viewBox="0 0 24 24" width="24" height="24" fill="#ababab" className=""><path d="M14.791 5.207 8 12l6.793 6.793a1 1 0 1 1-1.415 1.414l-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5a1 1 0 1 1 1.415 1.414z"></path></svg>',

          '<svg viewBox="0 0 24 24" width="24" height="24" fill="#ababab" className=""><path d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z"></path></svg>',
        ]}
        responsive={{
          // Define responsive breakpoints
          0: { items: 1 }, // Show 1 item on screens less than 576px (mobile)
          576: { items: 2 }, // Show 2 items on screens from 576px to 768px (tablet)
          768: { items: 3 }, // Show 3 items on screens greater than or equal to 768px (desktop)
        }}
      >
        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="carousel-wrapper flex flex-col h-full group overflow-hidden">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="object-cover w-full h-full"
                    src="/me.jpg"
                    alt=""
                  />
                </div>

                <div className="absolute inset-0 [background-image:linear-gradient(0deg,rgba(0,0,0,0.4),transparent)]"></div>

                <div className="relative flex justify-center items-center px-4 pt-[20px] pb-[12px] bg-[#242526]">
                  <div className="absolute flex justify-center items-center rounded-full bg-[#242526] top-[-20px] w-[40px] h-[40px] z-50">
                    <div className="absolute flex justify-center items-center rounded-full bg-[#0866FF] w-[32px] h-[32px]">
                      <svg
                        style={{
                          transitionProperty: "color,fill,stroke",
                          forcedColorAdjust: "auto",
                        }}
                        className="block"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="white"
                      >
                        <g fillRule="evenodd" transform="translate(-446 -350)">
                          <g fillRule="nonzero">
                            <path
                              d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                              transform="translate(354.5 159.5)"
                            ></path>
                            <path
                              d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                              transform="translate(354.5 159.5)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <span className="ba flex min-w-0 max-w-full text-[#E4E6EB] bg-[#242526] font-[600] text-[.75rem] leading-[1.2308] justify-center items-end h-full ml-[0.04rem]">
                    Create story
                  </span>

                  {/* <div className="fixed inset-0 rounded-b-xl bg-black/90 opacity-0 hover:opacity-[0.15] z-50"></div> */}
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story2.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story2_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  Shahveer Jaffery
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story3.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story3_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  Sheikh Haasin Ahmed
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="relative overflow-hidden  bg-[#242526] rounded-lg z-10 cursor-pointer w-full">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story4.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story4_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  UsaMa Saif
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story5.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story5_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  Husain Khokar
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story2.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story2_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  Shahveer Jaffery
                </div>
              </div>
            </div>
          </div>
        </a>

        <a className="hover:brightness-90 relative z-0 overflow-hidden bg-[#242526] w-full h-full rounded-[10px] cursor-pointer touch-manipulation customShadow-3 no-underline">
          <div
            style={{ paddingTop: "calc(100% * (16/9))" }}
            className="relative w-full h-0 rounded-[10px] m-0 p-0 overflow-hidden"
          >
            <div className="absolute inset-0 m-0 p-0 cursor-pointer">
              <div className="group">
                <div
                  style={{ transitionProperty: "transform" }}
                  className="image-wrapper w-full flex-grow origin-center ease-linear overflow-hidden duration-150 group-hover:scale-[1.02]"
                >
                  <img
                    className="img object-cover w-full h-full"
                    src="/story2.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-30 transition-opacity duration-200 group-hover:opacity-35"></div>
                </div>
                <div className="absolute inset-2 w-[40px] h-[40px]">
                  <img
                    className="img rounded-full border-[#075CE6] border-4"
                    src="/story2_author.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[9px] absolute bottom-0 left-1 text-xs font-semibold text-[#ffffff] pointer-events-none">
                  Shahveer Jaffery
                </div>
              </div>
            </div>
          </div>
        </a>
      </OwlCarousel>
    </div>
  );
}

export default Stories;
