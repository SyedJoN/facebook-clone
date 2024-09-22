import React, { useState } from "react";

function MessagePanel() {
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
    setShowUnread(false);
  };
  const handleShowUnread = () => {
    setShowUnread(true);
    setShowAll(false);
  };
  return (
    <div
      className="msg-container messenger flex flex-col absolute right-0 customShadow-2"
      style={{ transform: "translate(-16px, 52px)" }}
    >
      <div className="flex messenger flex-col w-[360px] h-[478px] bg-[#242526] rounded-lg overflow-x-hidden">
        <div className="">
          <div className="flex relative justify-between items-center pt-[12px] pb-[4px] px-4 min-h-[32px]">
            <div className="flex">
              <span className="text-[#E4E6EB] text-2xl font-bold">Chats</span>
            </div>
            <div className="relative top-[1px] flex justify-between items-stretch -my-[6px] -mx-[4px]">
              <div className="flex flex-col justify-center items-center max-w-full min-w-0 text-[#B0B3B8] cursor-pointer bg-transparent px-[4px] py-[6px]">
                <span>
                  <div className="relative flex items-center justify-center min-h-0 w-[32px] h-[32px] rounded-full hover:bg-[#393939] select-none">
                    <i
                      className="align-[-0.25em] select-none"
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
                </span>
              </div>

              <div className="flex flex-col justify-center items-center max-w-full min-w-0 text-[#B0B3B8] cursor-pointer bg-transparent px-[4px] py-[6px]">
                <span>
                  <div className="relative flex items-center justify-center min-h-0 w-[32px] h-[32px] rounded-full hover:bg-[#393939] select-none">
                    <i
                      className="align-[-0.25em] select-none"
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
                </span>
              </div>
              <div className="flex flex-col justify-center items-center max-w-full min-w-0 text-[#B0B3B8] cursor-pointer bg-transparent px-[4px] py-[6px]">
                <span>
                  <div className="relative flex items-center justify-center min-h-0 w-[32px] h-[32px] rounded-full hover:bg-[#393939] select-none">
                    <i
                      className="align-[-0.25em] select-none"
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
                </span>
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
                      className="block text-[#B0B3B8] ease-linear duration-200"
                      style={{ transitionProperty: "all" }}
                    >
                      <g fillRule="evenodd" transform="translate(-448 -544)">
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
                    id="message-search"
                    name="message-search"
                    aria-label="Search Messenger"
                    className="flex justify-center text-left flex-grow pt-[6px] pb-[8px] items-center flex-shrink w-full xl:placeholder-[#B0B3B8] bg-[#3A3B3C] h-[36px] px-[0.38rem] rounded-full md:text-[.9375rem] placeholder-transparent outline-zero"
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
                className={`group relative h-[36px] flex flex-wrap ${
                  showAll ? "bg-[#1D85FC33]" : "bg-transparent"
                } rounded-[18px] justify-center items-center px-3 outline-zero w-full`}
                role="button"
                onMouseDown={() => handleShowAll()}
              >
                <span
                  className={`${showAll ? "text-[#75B6FF]" : "text-[#E4E6EB]"}`}
                >
                  <span className="text-[.875rem] font-medium leading-[2.3333] select-none">
                    Inbox
                  </span>
                </span>
                <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 group-hover:bg-opacity-10 bg-white bg-opacity-0 pointer-events-none"></div>
              </div>
            </div>

            <div>
              <div
                className={`group relative h-[36px] flex flex-wrap rounded-[18px] ${
                  showUnread ? "bg-[#1D85FC33]" : "bg-transparent"
                } justify-center items-center px-3 outline-zero w-full `}
                role="button"
                onClick={() => handleShowUnread()}
              >
                <span
                  className={`${
                    showUnread ? "text-[#75B6FF]" : "text-[#E4E6EB]"
                  }`}
                >
                  <span className="text-[.875rem] font-medium leading-[2.3333] select-none">
                    Communities
                  </span>
                </span>
                <div className="overlay absolute transition-opacity duration-100 rounded-[18px] inset-0 group-hover:bg-opacity-10 bg-white bg-opacity-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="chats flex-grow">
          <div className="group relative flex flex-col px-[8px]" role="row">
            <div
              data-visualcompletion="ignore-dynamic"
              role="none"
              className="parent-hover relative flex flex-col justify-center items-stretch"
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
                                  <circle cx="28" cy="28" r="28" fill="white" />
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
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
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
                                            <span aria-hidden="true"> · </span>
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
                          <div className="inline-flex p-1.5">
                            <span className="w-[12px] h-[12px] bg-[#0866FF] rounded-full"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"></div>
            </div>{" "}
            <div aria-label="Options for this notification" role="gridcell">
              <div
                className="flex absolute top-[50%] group-hover:[clip:unset] group-hover:right-[72px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
              >
                <div>
                  <div className="rounded-full customShadow">
                    <div
                      aria-label="Manage notification settings"
                      className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-zero list-none select-none"
                      role="button"
                      tabIndex="0"
                    >
                      <i
                        data-visualcompletion="css-img"
                        className="align-[-0.25em] text-[#B0B3B8]"
                        style={{
                          filter:
                            "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                          backgroundImage: "url(/3dots.png)",
                          backgroundPosition: "0px -494px",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      ></i>
                      <div
                        className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
                        role="none"
                        data-visualcompletion="ignore"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex flex-col px-[8px]" role="row">
            <div
              data-visualcompletion="ignore-dynamic"
              role="none"
              className="parent-hover relative flex flex-col justify-center items-stretch"
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
                                  <circle cx="28" cy="28" r="28" fill="white" />
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
                                          clipPath: "polygon(0 0,0 0,0 0,0 0)",
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
                                          Messages and calls are secured with
                                          end-to-end encryption.
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
                                            <span aria-hidden="true"> · </span>
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
                                <div aria-hidden="true">
                                  <div
                                    className="relative flex flex-wrap overflow-hidden rounded-full"
                                    role="row"
                                    data-visualcompletion="ignore-dynamic"
                                    style={{ height: "16px" }}
                                  >
                                    <div
                                      className="relative mb-[20px]"
                                      role="cell"
                                    >
                                      <svg
                                        aria-label="Muhammad Salar"
                                        className="align-bottom"
                                        data-visualcompletion="ignore-dynamic"
                                        role="img"
                                        style={{
                                          height: "16px",
                                          width: "16px",
                                        }}
                                      >
                                        <mask id=":message_2:">
                                          <circle
                                            cx="8"
                                            cy="8"
                                            fill="white"
                                            r="8"
                                          ></circle>
                                        </mask>
                                        <g mask="url(#:message_2:)">
                                          <image
                                            x="0"
                                            y="0"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid slice"
                                            width="100%"
                                            xlinkHref="salar.jpg"
                                            style={{
                                              height: "16px",
                                              width: "16px",
                                            }}
                                          ></image>
                                          <circle
                                            className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                            cx="8"
                                            cy="8"
                                            r="8"
                                          ></circle>
                                        </g>
                                      </svg>
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
                </a>
              </div>

              <div className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"></div>
            </div>
            <div aria-label="Options for this notification" role="gridcell">
              <div
                className="flex absolute top-[50%] group-hover:[clip:unset] group-hover:right-[72px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
              >
                <div>
                  <div className="rounded-full customShadow">
                    <div
                      aria-label="Manage notification settings"
                      className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-zero list-none select-none"
                      role="button"
                      tabIndex="0"
                    >
                      <i
                        data-visualcompletion="css-img"
                        className="align-[-0.25em] text-[#B0B3B8]"
                        style={{
                          filter:
                            "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                          backgroundImage: "url(/3dots.png)",
                          backgroundPosition: "0px -494px",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      ></i>
                      <div
                        className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
                        role="none"
                        data-visualcompletion="ignore"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex flex-col px-[8px]" role="row">
            <div
              data-visualcompletion="ignore-dynamic"
              role="none"
              className="parent-hover relative flex flex-col justify-center items-stretch"
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
                                  <circle cx="28" cy="28" r="28" fill="white" />
                                </mask>

                                {/* Apply the mask to the image */}
                                <g mask="url(#circleMask)">
                                  <image
                                    x="0"
                                    y="0"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    width="100%"
                                    xlinkHref="khurram.jpg"
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
                                          Messages and calls are secured with
                                          end-to-end encryption.
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
                                            <span aria-hidden="true"> · </span>
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
                                      className="relative mb-[20px]"
                                      role="cell"
                                    >
                                      <div className="relative inline-block">
                                        <img
                                          height="100%"
                                          width="100%"
                                          src="khurram.jpg"
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
                    </div>
                  </div>
                </a>
              </div>

              <div className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"></div>
            </div>{" "}
            <div aria-label="Options for this notification" role="gridcell">
              <div
                className="flex absolute top-[50%] group-hover:[clip:unset] group-hover:right-[72px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
              >
                <div>
                  <div className="rounded-full customShadow">
                    <div
                      aria-label="Manage notification settings"
                      className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-zero list-none select-none"
                      role="button"
                      tabIndex="0"
                    >
                      <i
                        data-visualcompletion="css-img"
                        className="align-[-0.25em] text-[#B0B3B8]"
                        style={{
                          filter:
                            "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                          backgroundImage: "url(/3dots.png)",
                          backgroundPosition: "0px -494px",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      ></i>
                      <div
                        className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
                        role="none"
                        data-visualcompletion="ignore"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex flex-col px-[8px]" role="row">
            <div
              data-visualcompletion="ignore-dynamic"
              role="none"
              className="parent-hover relative flex flex-col justify-center items-stretch"
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
                                  <circle cx="28" cy="28" r="28" fill="white" />
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
                                          Messages and calls are secured with
                                          end-to-end encryption.
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
                                            <span aria-hidden="true"> · </span>
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
                                aria-label="Seen by Sajid Hussain Khan"
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
                                      className="relative mb-[20px]"
                                      role="cell"
                                    >
                                      <svg
                                        aria-label="Muhammad Salar"
                                        className="align-bottom"
                                        data-visualcompletion="ignore-dynamic"
                                        role="img"
                                        style={{
                                          height: "16px",
                                          width: "16px",
                                        }}
                                      >
                                        <mask id=":message_2:">
                                          <circle
                                            cx="8"
                                            cy="8"
                                            fill="white"
                                            r="8"
                                          ></circle>
                                        </mask>
                                        <g mask="url(#:message_2:)">
                                          <image
                                            x="0"
                                            y="0"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid slice"
                                            width="100%"
                                            xlinkHref="/notifIcons/notif_image_2.jpg"
                                            style={{
                                              height: "16px",
                                              width: "16px",
                                            }}
                                          ></image>
                                          <circle
                                            className="fill-none stroke-2 stroke-[rgba(255,255,255,0.05)]"
                                            cx="8"
                                            cy="8"
                                            r="8"
                                          ></circle>
                                        </g>
                                      </svg>
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
                </a>
              </div>

              <div className="absolute opacity-0 inset-0 bg-[rgba(255,255,255,0.1)] rounded-[8px] fade overlay pointer-events-none"></div>
            </div>
            <div aria-label="Options for this notification" role="gridcell">
              <div
                className="flex absolute top-[50%] group-hover:[clip:unset] group-hover:right-[72px]
                        group-hover:overflow-visible
                       h-[1px] overflow-hidden w-[1px]"
              >
                <div>
                  <div className="rounded-full customShadow">
                    <div
                      aria-label="Manage notification settings"
                      className="h-[36px] w-[36px] rounded-full bg-[#3E4042] hover:bg-[#525455] flex justify-center items-center relative customShadow-2 -translate-y-1/2 outline-zero list-none select-none"
                      role="button"
                      tabIndex="0"
                    >
                      <i
                        data-visualcompletion="css-img"
                        className="align-[-0.25em] text-[#B0B3B8]"
                        style={{
                          filter:
                            "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)",
                          backgroundImage: "url(/3dots.png)",
                          backgroundPosition: "0px -494px",
                          backgroundSize: "auto",
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      ></i>
                      <div
                        className="inset-0 rounded-full opacity-100 absolute fade pointer-events-none"
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
  );
}

export default MessagePanel;
