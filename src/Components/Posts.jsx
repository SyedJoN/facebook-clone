import React, { useEffect, useState, useRef } from "react";
import { setShowPost } from "../store/showMenuSlice";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
  const dispatch = useDispatch();
  const writePost = useSelector((state) => state.showMenu.writePost);

  const [defaultText, setDefaultText] = useState("What's on your mind, Syed?");
  const content = useSelector((state) => state.showMenu.postContent);
  const [rightClick, setrightClick] = useState(false);

  const handleRightClickStatic = (e) => {
    if (e.button === 0) {
      setrightClick(false);
    } else if (e.button === 2) {
      setrightClick(true);
    }
  };
  const handleRightClick = (e) => {
    if (e.button === 0) {
      setrightClick(false);
      e.currentTarget.classList.add("iconScale");
    } else if (e.button === 2) {
      e.currentTarget.classList.remove("iconScale");

      setrightClick(true);
    }
  };

  const handleMouseEnter = (e, menu) => {
    if (!rightClick) {
      e.currentTarget.classList.add("iconScale");
    } else {
      e.currentTarget.classList.remove("iconScale");
    }
  };
  const handleMouseLeave = (e, menu) => {
    e.currentTarget.classList.remove("iconScale");
  };

  const handlePostContainer = () => {
    dispatch(setShowPost(true));
  };

  return (
    <>
      <div className="relative flex justify-center">
        <div className="main-section relative w-[500px] overflow-hidden max-w-full">
          <div className="flex flex-wrap flex-col bg-[#242526] lg:w-full rounded-lg px-[16px] pt-[12px] pb-[13px] justify-center">
            <div className="flex justify-start w-full">
              <a
                role="link"
                className="group relative no-underline select-none cursor-pointer"
                href="https://www.facebook.com/muhammad.jon.12"
              >
                <div
                  onMouseDown={(e) => handleRightClickStatic(e)}
                  className="relative cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    className="align-bottom"
                    data-visualcompletion="ignore-dynamic"
                    role="none"
                    style={{ height: "40px", width: "40px" }}
                  >
                    <mask id=":PostProfile:">
                      <circle cx="20" cy="20" fill="white" r="20"></circle>
                    </mask>

                    <g mask="url(#:PostProfile:)">
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

                  <div
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                      !rightClick
                        ? "group-active:bg-[rgba(255,255,255,0.2)]"
                        : ""
                    } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                  ></div>
                </div>
                <div className="absolute inset-0 rounded-full opacity-0 fade duration-100 cursor-pointer group-hover:bg-[rgba(255,255,255,0.1)] group-hover:opacity-100 pointer-events-none"></div>
              </a>
              <div className="flex flex-grow justify-start items-center ml-2">
                <div
                  onClick={handlePostContainer}
                  className={`hyphens-auto h-auto min-h-[40px] textProps flex items-center bg-[#3A3B3C] hover:bg-[#4E4F50] px-[12px] rounded-full cursor-pointer w-full ${
                    content.length >= 80 ? "py-2 rounded-[20px]" : ""
                  }`}
                >
                  <div className="flex-grow">
                    <span
                      className={`text-[1.0625rem] relative textClass_1 leading-[1.35] overflow-hidden flex select-none ${
                        !writePost && content.length > 0
                          ? "text-[#E4E6EB]"
                          : "text-[#B0B3B8]"
                      } `}
                    >
                      {writePost
                        ? defaultText
                        : content.length === 0
                        ? defaultText
                        : content}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              onMouseDown={(e) => handleRightClickStatic(e)}
              className="flex w-full border-t-[1px] border-[#3A3B3C] mt-[12px] h-[46px] pt-[9px] justify-around "
            >
              <div className="group relative flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow rounded-lg cursor-pointer ">
                <div className="flex items-center">
                  <span className="inline-flex mt-[2px] select-none">
                    <img
                      width={"24px"}
                      height={"24px"}
                      src="/video.png"
                      alt=""
                    />
                  </span>
                  <span className="w-[8px]"></span>
                  <span className="text-[#B8B3B8] text-sm font-semibold select-none">
                    Live video
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div className="group relative flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow rounded-lg cursor-pointer ">
                <div className="flex items-center select-none">
                  <span className="inline-flex mt-[2px] select-none">
                    <img
                      width={"24px"}
                      height={"24px"}
                      src="/photo.png"
                      alt=""
                    />
                  </span>
                  <span className="w-[8px]"></span>

                  <span className="text-[#B8B3B8] text-sm font-semibold select-none">
                    Photo/video
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div className="group relative flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow rounded-lg cursor-pointer ">
                <div className="flex items-center">
                  <span className="inline-flex mt-[2px] select-none">
                    <img
                      width={"24px"}
                      height={"24px"}
                      src="/feeling.png"
                      alt=""
                    />
                  </span>
                  <span className="w-[8px]"></span>

                  <span className="text-[#B8B3B8] text-sm font-semibold select-none">
                    Feeling/activity
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-[#242526] w-full overflow-hidden rounded-lg px-[16px] pt-[12px] justify-center items-center mt-4">
            <div className="flex justify-start w-full">
              <span className="inline">
                <a className="relative inline cursor-pointer">
                  <div className="relative h-10 w-10">
                    <object type="nested/pressable">
                      <a
                        role="link"
                        className=" relative inline-block outline-zero no-underline select-none cursor-pointer"
                        href="https://www.facebook.com/muhammad.jon.12"
                      >
                        <div
                          onMouseDown={(e) => handleRightClick(e)}
                          onMouseEnter={(e) => handleMouseEnter(e)}
                          onMouseLeave={(e) => handleMouseLeave(e)}
                          className="group relative inline-block cursor-pointer align-bottom select-none"
                        >
                          <svg
                            aria-hidden="true"
                            className="align-bottom"
                            data-visualcompletion="ignore-dynamic"
                            role="none"
                            style={{ height: "40px", width: "40px" }}
                          >
                            <mask id=":PostUser:">
                              <circle
                                cx="20"
                                cy="20"
                                fill="white"
                                r="20"
                              ></circle>
                            </mask>

                            <g mask="url(#:PostUser:)">
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

                          <div
                            className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                              !rightClick
                                ? "group-active:bg-[rgba(68,73,80,0.35)]"
                                : ""
                            } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                          ></div>
                        </div>
                      </a>
                    </object>
                  </div>
                </a>
              </span>
              <div className="ml-2 flex-grow">
                <a
                  role="link"
                  className="relative underline-offset-[-4px] hover:underline text-[#E4E6EB]"
                  href="https://www.facebook.com/muhammad.jon.12"
                >
                  <span className="child relative bottom-[5px] text-xs sm:text-sm font-semibold">
                    Syed Muhammad Jon
                  </span>
                </a>

                <div className="flex flex-wrap relative bottom-[4px]">
                  <span className="text-[1.07rem] text-[#B8B3B8] text-xs cursor-pointer ">
                    39m
                  </span>
                  <span className="text-[1.07rem] text-[#B8B3B8] text-xs mx-[2px]">
                    .
                  </span>

                  <span className="relative top-[2px] left-[1px] cursor-pointer ">
                    {" "}
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="text-[#B8B3B8]"
                      title="Shared with Public"
                    >
                      <title>Shared with Public</title>
                      <g fillRule="evenodd" transform="translate(-448 -544)">
                        <g>
                          <path
                            d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                            transform="translate(354 143.5)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="relative bottom-[2px] inline-flex items-center gap-[1rem]">
                <div
                  onMouseDown={(e) => handleRightClick(e)}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className="group relative flex rounded-full cursor-pointer align-bottom"
                >
                  <svg
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-[#B0B3B8]"
                  >
                    <g fillRule="evenodd" transform="translate(-446 -350)">
                      <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                    </g>
                  </svg>
                  <div
                    className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                      !rightClick
                        ? "group-active:bg-[rgba(255,255,255,0.2)]"
                        : ""
                    } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                  ></div>
                </div>
                <div
                  onMouseDown={(e) => handleRightClick(e)}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className="group relative flex cursor-pointer align-bottom select-none"
                >
                  <i
                    data-visualcompletion="css-img"
                    style={{
                      filter:
                        "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                      backgroundImage: "url(/cross.png)",
                      backgroundPosition: "0 -494px",

                      width: "20px",
                      height: "20px",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                    }}
                  />
                  <div
                    className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                      !rightClick ? "group-active:bg-[rgba(68,73,80,0.15)]" : ""
                    } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <span className="block text-[1.07rem] text-[#E4E6EB] text-sm py-[9px]  ">
                Nawaz Fateh Ali Khan 👍
              </span>
            </div>

            <div
              className="flex w-full overflow-hidden rounded-xl "
              style={{ border: "1px solid #3E4042" }}
            >
              <div className="flex flex-col w-full h-full rounded-xl ">
                <img
                  className="object-cover w-full h-full cursor-pointer select-none"
                  src="/post.jpg "
                  alt=""
                />

                <div className="flex flex-wrap w-full p-4">
                  <div className="flex img-wrapper justify-start w-8 h-8 rounded-full">
                    <img
                      className="object-cover w-full h-full rounded-full cursor-pointer "
                      src="/me.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-2 ">
                    <div className="">
                      <span className="relative bottom-[10px] text-[1.07rem] text-white text-xs font-semibold cursor-pointer ">
                        Syed Muhammad Jon
                      </span>
                    </div>
                    <div className="flex flex-wrap relative bottom-[10px]">
                      <span className="text-[1.07rem] text-[#B8B3B8] text-xs cursor-pointer ">
                        39m
                      </span>
                      <span className="text-[1.07rem] text-[#B8B3B8] text-xs mx-[2px]">
                        .
                      </span>
                      <span className="relative top-[2px] left-[1px]">
                        {" "}
                        <svg
                          viewBox="0 0 16 16"
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="text-[#B8B3B8] cursor-pointer "
                          title="Shared with Public"
                        >
                          <title>Shared with Public</title>
                          <g
                            fillRule="evenodd"
                            transform="translate(-448 -544)"
                          >
                            <g>
                              <path
                                d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                fillRule="nonzero"
                                d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                transform="translate(354 143.5)"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <span className="block text-[0.8rem] text-[#E4E6EB] ">
                      Nawaz Fateh Ali Khan 👍
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex w-full my-[5px] h-[30px] justify-around items-center">
              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -760px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none">
                    Like
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -571px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none ">
                    Comment
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -907px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none ">
                    Share
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>
            <div className="block w-full border-b-[1px] border-[#3E4042]"></div>
            <div className="flex flex-col my-2 w-full">
              <div className="flex outline-zero w-full">
                <div className="group flex justify-center items-center mr-1.5 mt-[2px]">
                  <div
                    onMouseDown={(e) => handleRightClickStatic(e)}
                    className="relative cursor-pointer"
                  >
                    <svg
                      aria-hidden="true"
                      className="align-bottom"
                      data-visualcompletion="ignore-dynamic"
                      role="none"
                      style={{ height: "32px", width: "32px" }}
                    >
                      <mask id=":CommentProfile:">
                        <circle cx="16" cy="16" fill="white" r="16">
                          {" "}
                        </circle>
                        <circle
                          cx="27"
                          cy="27"
                          data-visualcompletion="ignore"
                          fill="black"
                          r="6"
                        ></circle>
                      </mask>

                      <g mask="url(#:CommentProfile:)">
                        <image
                          x="0"
                          y="0"
                          height="100%"
                          preserveAspectRatio="xMidYMid slice"
                          width="100%"
                          xlinkHref="me.jpg"
                          style={{ height: "32px", width: "32px" }}
                        ></image>
                        <circle
                          className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                          cx="16"
                          cy="16"
                          r="16"
                        ></circle>
                      </g>
                    </svg>

                    <div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                        !rightClick
                          ? "group-active:bg-[rgba(255,255,255,0.2)]"
                          : ""
                      } duration-0
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
                            <g
                              fillRule="evenodd"
                              transform="translate(-448 -544)"
                            >
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
                <div className="flex-grow basis-0">
                  <div className="bg-[#3A3B3C] rounded-full cursor-text">
                    <div className="flex">
                      <div className="flex items-center flex-grow px-3 py-2">
                        <span className="text-xs sm:text-[1rem] text-[#B0B3B8] select-none">
                          Comment as Syed Muhammad Jon
                        </span>
                      </div>

                      <ul className="flex ml-auto items-center h-[36px]">
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1118px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : "" } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1203px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""} duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1152px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""} duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1237px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "-1px -1356px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-[#242526] w-full overflow-hidden rounded-lg px-[16px] pt-[12px] pb-[18px] justify-center items-center mt-2">
            <div className="flex justify-start w-full">
              <span className="inline">
                <a className="relative inline cursor-pointer">
                  <div className="relative h-10 w-10">
                    <object type="nested/pressable">
                      <a
                        role="link"
                        className="relative inline-block outline-zero no-underline select-none cursor-pointer"
                        href="https://www.facebook.com/muhammad.jon.12"
                      >
                        <div
                          onMouseDown={(e) => handleRightClick(e)}
                          onMouseEnter={(e) => handleMouseEnter(e)}
                          onMouseLeave={(e) => handleMouseLeave(e)}
                          className="group relative inline-block cursor-pointer align-bottom select-none"
                        >
                          <svg
                            aria-hidden="true"
                            className="align-bottom"
                            data-visualcompletion="ignore-dynamic"
                            role="none"
                            style={{ height: "40px", width: "40px" }}
                          >
                            <mask id=":PostUser:">
                              <circle
                                cx="20"
                                cy="20"
                                fill="white"
                                r="20"
                              ></circle>
                            </mask>

                            <g mask="url(#:PostUser:)">
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

                          <div
                            className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                              !rightClick
                                ? "group-active:bg-[rgba(68,73,80,0.35)]"
                                : ""
                            } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                          ></div>
                        </div>
                      </a>
                    </object>
                  </div>
                </a>
              </span>
              <div className="ml-2 flex-grow">
                <a
                  role="link"
                  className="relative underline-offset-[-4px] hover:underline text-[#E4E6EB]"
                  href="https://www.facebook.com/muhammad.jon.12"
                >
                  <span className="child relative bottom-[5px] text-xs sm:text-sm font-semibold">
                    Syed Muhammad Jon
                  </span>
                </a>

                <div className="flex flex-wrap relative bottom-[4px]">
                  <span className="text-[1.07rem] text-[#B8B3B8] text-xs cursor-pointer ">
                    39m
                  </span>
                  <span className="text-[1.07rem] text-[#B8B3B8] text-xs mx-[2px]">
                    .
                  </span>

                  <span className="relative top-[2px] left-[1px] cursor-pointer ">
                    {" "}
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="text-[#B8B3B8]"
                      title="Shared with Public"
                    >
                      <title>Shared with Public</title>
                      <g fillRule="evenodd" transform="translate(-448 -544)">
                        <g>
                          <path
                            d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                            transform="translate(354 143.5)"
                          ></path>
                          <path
                            fillRule="nonzero"
                            d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                            transform="translate(354 143.5)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="relative bottom-[2px] inline-flex items-center gap-[1rem]">
                <div
                  onMouseDown={(e) => handleRightClick(e)}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className="group relative flex rounded-full cursor-pointer align-bottom"
                >
                  <svg
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-[#B0B3B8]"
                  >
                    <g fillRule="evenodd" transform="translate(-446 -350)">
                      <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                    </g>
                  </svg>
                  <div
                    className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                      !rightClick
                        ? "group-active:bg-[rgba(255,255,255,0.2)]"
                        : ""
                    } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                  ></div>
                </div>
                <div
                  onMouseDown={(e) => handleRightClick(e)}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className="group relative flex cursor-pointer align-bottom select-none"
                >
                  <i
                    data-visualcompletion="css-img"
                    style={{
                      filter:
                        "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                      backgroundImage: "url(/cross.png)",
                      backgroundPosition: "0 -494px",

                      width: "20px",
                      height: "20px",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                    }}
                  />
                  <div
                    className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${ !rightClick ? "group-active:bg-[rgba(68,73,80,0.15)]" : ""
                    } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <span className="block text-[1.07rem] text-[#E4E6EB] text-sm py-[9px]  ">
                Nawaz Fateh Ali Khan 👍
              </span>
            </div>

            <div
              className="flex w-full overflow-hidden rounded-xl "
              style={{ border: "1px solid #3E4042" }}
            >
              <div className="flex flex-col w-full h-full rounded-xl  ">
                <img
                  className="object-cover w-full h-full cursor-pointer select-none"
                  src="/post.jpg "
                  alt=""
                />

                <div className="flex flex-wrap w-full p-4">
                  <div className="flex img-wrapper justify-start w-8 h-8 rounded-full">
                    <img
                      className="object-cover w-full h-full rounded-full cursor-pointer "
                      src="/me.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-2 ">
                    <div className="">
                      <span className="relative bottom-[10px] text-[1.07rem] text-white text-xs font-semibold cursor-pointer ">
                        Syed Muhammad Jon
                      </span>
                    </div>
                    <div className="flex flex-wrap relative bottom-[10px]">
                      <span className="text-[1.07rem] text-[#B8B3B8] text-xs cursor-pointer ">
                        39m
                      </span>
                      <span className="text-[1.07rem] text-[#B8B3B8] text-xs mx-[2px]">
                        .
                      </span>
                      <span className="relative top-[2px] left-[1px]">
                        {" "}
                        <svg
                          viewBox="0 0 16 16"
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="text-[#B8B3B8] cursor-pointer "
                          title="Shared with Public"
                        >
                          <title>Shared with Public</title>
                          <g
                            fillRule="evenodd"
                            transform="translate(-448 -544)"
                          >
                            <g>
                              <path
                                d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                fillRule="nonzero"
                                d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                transform="translate(354 143.5)"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <span className="block text-[0.8rem] text-[#E4E6EB] ">
                      Nawaz Fateh Ali Khan 👍
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex w-full my-[5px] h-[30px] justify-around items-center">
              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -760px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none">
                    Like
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -571px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none ">
                    Comment
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>

              <div
                onMouseDown={(e) => handleRightClickStatic(e)}
                className="group relative flex justify-center flex-grow items-center rounded-md cursor-pointer h-[32px]"
              >
                <div className="flex items-center">
                  <span className="inline-flex">
                    <i
                      data-visualcompletion="css-img"
                      style={{
                        filter:
                          "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                        backgroundImage: "url(/lcs.png)",
                        backgroundPosition: "0 -907px",
                        backgroundSize: "auto",
                        width: "20px",
                        height: "20px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="text-[#B0B3B8] text-sm font-semibold ml-2 select-none ">
                    Share
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                    !rightClick ? "group-active:bg-[rgba(255,255,255,0.2)]" : ""
                  } duration-0
                  group-hover:opacity-100 fade pointer-events-none`}
                ></div>
              </div>
            </div>
            <div className="block w-full border-b-[1px] border-[#3E4042]"></div>
            <div className="flex flex-col my-2 w-full">
              <div className="flex outline-zero w-full">
                <div className="group flex justify-center items-center mr-1.5 mt-[2px]">
                  <div
                    onMouseDown={(e) => handleRightClickStatic(e)}
                    className="relative cursor-pointer"
                  >
                    <svg
                      aria-hidden="true"
                      className="align-bottom"
                      data-visualcompletion="ignore-dynamic"
                      role="none"
                      style={{ height: "32px", width: "32px" }}
                    >
                      <mask id=":CommentProfile_2:">
                        <circle cx="16" cy="16" fill="white" r="16">
                          {" "}
                        </circle>
                        <circle
                          cx="27"
                          cy="27"
                          data-visualcompletion="ignore"
                          fill="black"
                          r="6"
                        ></circle>
                      </mask>

                      <g mask="url(#:CommentProfile_2:)">
                        <image
                          x="0"
                          y="0"
                          height="100%"
                          preserveAspectRatio="xMidYMid slice"
                          width="100%"
                          xlinkHref="me.jpg"
                          style={{ height: "32px", width: "32px" }}
                        ></image>
                        <circle
                          className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                          cx="16"
                          cy="16"
                          r="16"
                        ></circle>
                      </g>
                    </svg>

                    <div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                        !rightClick
                          ? "group-active:bg-[rgba(255,255,255,0.2)]"
                          : ""
                      } duration-0
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
                            <g
                              fillRule="evenodd"
                              transform="translate(-448 -544)"
                            >
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
                <div className="flex-grow basis-0">
                  <div className="bg-[#3A3B3C] rounded-full cursor-text">
                    <div className="flex">
                      <div className="flex items-center flex-grow px-3 py-2">
                        <span className="text-xs sm:text-[1rem] text-[#B0B3B8] select-none">
                          Comment as Syed Muhammad Jon
                        </span>
                      </div>

                      <ul className="flex ml-auto items-center h-[36px]">
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1118px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1203px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1152px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "0 -1237px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                        <li className="mx-1.5">
                          <span className="inheritStyles">
                            <div
                              onMouseDown={(e) => handleRightClick(e)}
                              onMouseEnter={(e) => handleMouseEnter(e)}
                              onMouseLeave={(e) => handleMouseLeave(e)}
                              className="group relative flex rounded-full cursor-pointer select-none"
                            >
                              <i
                                data-visualcompletion="css-img"
                                style={{
                                  filter:
                                    "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                                  backgroundImage: "url(/lcs.png)",
                                  backgroundPosition: "-1px -1356px",
                                  backgroundSize: "auto",
                                  width: "16px",
                                  height: "16px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              />
                              <div
                                className={`absolute -inset-2 rounded-full opacity-0 group-hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${
                                  !rightClick
                                    ? "group-active:bg-[rgba(255,255,255,0.2)]"
                                    : ""
                                } duration-0 group-hover:opacity-100 fade pointer-events-none`}
                              ></div>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
