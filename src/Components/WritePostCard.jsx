import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContent, setShowPost } from "../store/showMenuSlice";

function WritePostCard() {
  const dispatch = useDispatch();
  const writePost = useSelector((state) => state.showMenu.writePost);
  const content = useSelector((state) => state.showMenu.postContent);
  const defaultText = "What's on your mind, Syed?";
const [keyPressed, setKeyPressed] = useState(false);
  const [postFont, setPostFont] = useState("24px");
  const editableDivRef = useRef(null);
  const [showColorIcon, setShowColorIcon] = useState(true);
  const brCountRef = useRef(1)
  const [showScroll, setShowScroll] = useState(false);

  const [postWidth, setPostWidth] = useState(500);
  const [postHeight, setPostHeight] = useState(428);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const trackRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const prevYref = useRef(null);
  const clientXref = useRef(null);
  const scaleRef = useRef(null);
  const translateZRef = useRef(null);

  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(40);

  const scrollRef = useRef(false);
  const mouseMoveRef = useRef(false);
  const mouseUpRef = useRef(false);
  const leaveHandlerFnRef = useRef(false);

  useEffect(() => {
    const updateScrollbar = () => {
      const containerHeight = containerRef.current?.clientHeight;
      const contentHeight = contentRef.current?.scrollHeight;

      const scaleValue = contentHeight / containerHeight;
      scaleRef.current = scaleValue;

      const translateZValue = scaleValue - 1;
      translateZRef.current = translateZValue;

      if (!containerRef.current || !scrollThumbRef.current) return;

      console.log("containerHeight", containerHeight);
      console.log("contentHeight", contentHeight);

      const newThumbHeight =
        (containerHeight / contentHeight) * containerHeight;

        if (
          containerHeight !== contentHeight
        ) {
          setThumbHeight(newThumbHeight);
          setScrollOpacity(1);
        }
      else {
          setScrollOpacity(0);
          setThumbHeight(0);
        }
    };

    const handleResize = () => updateScrollbar();

    // Update scrollbar on initial render and window resize
    updateScrollbar();
    window.addEventListener("resize", handleResize);

    // Attach scroll listener

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startScroll = (direction) => {
    const scrollAmount = 1; // Amount to scroll each frame
    const scrollSpeed = 5; // Speed of scrolling in pixels per frame
    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();


    const scroll = () => {
      if (!containerRef.current) return;

      const maxScrollHeight =
        contentRef.current.scrollHeight - containerRef.current.clientHeight;

      if (
        direction === "up" &&
        containerRef.current.scrollTop > 0 &&
        clientXref.current > trackRect.left &&
        trackRect.right > clientXref.current
      ) {
        containerRef.current.scrollTop -= scrollAmount * scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      } else if (
        direction === "down" &&
        containerRef.current.scrollTop < maxScrollHeight &&
        clientXref.current > trackRect.left &&
        trackRect.right > clientXref.current
      ) {
        containerRef.current.scrollTop += scrollAmount * scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      } else {
        console.log("hogiya return");
        return;
      }
    };
    scrollIntervalRef.current = requestAnimationFrame(scroll);
    scrollRef.current = true;

    return () => {
      stopScroll();
    };
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const trackElement = trackRef.current;

    // Define event handlers
    const onMouseDown = (e) => {
      clientXref.current = e.clientX;

      console.log("onMouseDown");

      e.preventDefault(); // Prevent text selection while dragging
      const clickY = e.clientY;
      const startScrollOffset = containerRef.current.scrollTop;
      const thumb = scrollThumbRef.current;
      const thumbRect = thumb.getBoundingClientRect();

      if (clickY < thumbRect.top) {
        startScroll("up");
      } else if (clickY > thumbRect.bottom) {
        startScroll("down");
      }

      const onMouseMove = (e) => {
        stopScroll();
        const clientY = e.clientY;
        clientXref.current = e.clientX;

        const maxScrollHeight =
          contentRef.current.scrollHeight - containerRef.current.clientHeight;

        if (
          (containerRef.current.scrollTop === 0 &&
            clientY < prevYref.current) ||
          (containerRef.current.scrollTop === maxScrollHeight &&
            clientY > prevYref.current)
        ) {
          prevYref.current = clientY;
          return;
        }

        if (thumbRect.top <= clickY && clickY <= thumbRect.bottom) {
          const deltaY = e.clientY - clickY;
          const scrollY =
            startScrollOffset +
            deltaY *
              (contentRef.current.scrollHeight /
                containerRef.current.clientHeight);

          containerRef.current.scrollTop = scrollY;
          setScrollOpacity(1);
          prevYref.current = clientY;
        } else {
          if (clickY < thumbRect.top) {
            startScroll("up");
            return;
          } else if (clickY > thumbRect.bottom) {
            startScroll("down");
            return;
          }

          prevYref.current = clientY;
          return;
        }

        mouseMoveRef.current = true;
        scrollRef.current = false;

        return;
      };

      setScrollOpacity(1);
      mouseMoveRef.current = false;

      const onMouseUp = (e) => {
        clientXref.current = null;
        prevYref.current = null;
        stopScroll();
        console.log("onMouseUp");
        e.preventDefault();
        mouseUpRef.current = true;
        setTimeout(() => {
          if (
            mouseUpRef.current &&
            mouseMoveRef.current &&
            leaveHandlerFnRef.current
          ) {
            setScrollOpacity(0);
          }
        }, 1000);

        // Cleanup event listeners
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      // Attach event listeners
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    // Attach mousedown event listener to trackElement
    if (trackElement) {
      trackElement.addEventListener("mousedown", onMouseDown);
    }

    // Cleanup function
    return () => {
      if (trackElement) {
        trackElement.removeEventListener("mousedown", onMouseDown);
      }
      stopScroll();
    };
  }, []);

  const enterHandler = () => {
    leaveHandlerFnRef.current = false;
    if (thumbHeight !== contentRef.current.scrollHeight) setScrollOpacity(1);
  };

  const LeaveHandler = () => {
    leaveHandlerFnRef.current = true;
    !scrollRef.current && setScrollOpacity(0);
  };








useEffect(() => {
  const handleResize = () => {
if (window.innerWidth <= 583) {
  setPostWidth(413.781);
} else if (window.innerHeight <= 428) {
  setPostWidth(517);
  setPostHeight(0.8 * window.innerHeight);

} else {
  setPostWidth(500);
  setPostHeight(428);
}
  }
  handleResize();


  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  }
}, [])



  const countBrTags = (htmlString) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.getElementsByTagName("br").length;
  };

  const updateBrCount = () => {
    const brTags = countBrTags(editableDivRef.current.innerHTML);
    brCountRef.current = brTags;
    setShowColorIcon(brTags <= 3);
    setShowScroll(brTags > 10)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setKeyPressed(true)
    }
    if (e.key === "Enter" || e.key === "Backspace") {
      setTimeout(updateBrCount, 0);
     
    }
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Create a new text node with a newline character
      const newLineNode = document.createElement("br");
      range.deleteContents();
      range.insertNode(newLineNode);

      // Move the cursor after the newline
      range.setStartAfter(newLineNode);
      range.setEndAfter(newLineNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }

  };

  const handleClosePost = () => {
    dispatch(setShowPost(false));
  };
  useEffect(() => {
    if (writePost) {
      const editableDiv = editableDivRef.current;
      if (editableDiv) {
        if (content) {
          editableDiv.innerText = content;
        }
        else {
          editableDiv.innerHTML = "<br/>";
        }
 
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editableDiv);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

      }
    }
  }, [writePost, content]);

  const handleContentChange = (e) => {
    
    const inputContent = e.target.innerText;
    if(content.length <= 2 && e.target.innerText != " ") setKeyPressed(false);
    inputContent.length <= 1
      ? dispatch(setContent(inputContent.trim()))
      : dispatch(setContent(inputContent));
    if (inputContent.length >= 84) {
      setPostFont("15px");
    } else {
      setPostFont("24px");
    }
  };

  return (
    <div 
    style={{width: postWidth + 'px', minHeight: postHeight + 'px'}}

    className="relative ">
      <div
      style={{transform:"translateX(0%) translateZ(1px)"}}
      >
    <div 
    className="postCardContent max-h-[90vh] min-h-[428px] flex mainScroll">
      <div className="relative flex flex-col w-[500px] min-h-[428px] pointer-events-auto">
          <div>
            <div className="flex justify-center items-center h-[60px] border-[rgba(255,255,255,0.05)] border-b-[1px]">
              <span className="pb-[2px] text-xl text-[#E4E6EB] font-bold">
                Create post
              </span>
             
            </div>
            <div className="flex absolute top-[12px] right-[16px]">
              <a 
                  onClick={() => handleClosePost()}
              className="outline-zero shrink-0 relative flex items-center justify-center w-[36px] h-[36px] min-h-0 rounded-full bg-[#3A3B3C] cursor-pointer">
       
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
                      display: "block",
                      verticalAlign: "-0.25em"
                    }}
                  />
                  <div className="absolute inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-full"></div>
           
              </a>
              </div>
            <div className="flex justify-center items-center pt-[16px] pb-[15px] mx-[16px]">
              <div className="">
                <div className="relative img-wrapper w-10 h-10 rounded-full cursor-pointer select-none mr-[11px]">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src="/me.jpg"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-[rgba(255,255,255,0.1)] opacity-0 rounded-full hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
              <div className="flex flex-wrap flex-col w-full">
                <div className="flex cursor-text">
                  <div className="shrink-0">
                    <span className="before_a block text-sm text-[#E4E6EB] font-semibold max-w-full min-w-0">
                      Syed Muhammad Jon
                    </span>
                  </div>
                </div>
                <div className="mt-[6px] ">
                  <div className="inline-flex bg-[#3A3B3C] rounded-md px-[8px] py-[3px] cursor-pointer select-none">
                    <div className="flex justify-center items-center">
                      <div className="flex mr-[4px] ">
                        <img
                          src="/friendsicon.png"
                          alt=""
                          style={{
                            filter: "invert(89%) sepia(6%) hue-rotate(185deg) ",
                            width: "12px",
                            height: "12px",
                            display: "inline-block",
                          }}
                        />
                      </div>
                      <span className="text-[1.07rem] text-[#E4E6EB] font-semibold text-xs mr-[4px] ">
                        Friends except...
                      </span>
                      <i
                        data-visualcompletion="css-img"
                        style={{
                          backgroundImage: "url(/downarrow.png)",
                          filter: "invert(89%) sepia(6%) hue-rotate(185deg) ",
                          backgroundPosition: "0 -949px",
                          backgroundSize: "auto",
                          width: "12px",
                          height: "12px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
          onMouseEnter={enterHandler}
          onMouseLeave={LeaveHandler}
          ref={containerRef}
          style={{
            willChange: "transform, scroll-position",
            perspective: "1px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "top right",
            overflowAnchor: "none",
          }}
            className={` writePostContent-container flex flex-col overscroll-y-contain overflow-x-hidden overflow-y-auto flex-grow`}
          >
            <div
          ref={contentRef}
   
              className={`relative flex flex-col flex-grow pb-[40px]`}
            >
              <div
                className={`pl-4 ${content.length >= 131 ? "pr-8" : "pr-4"}`}
              >
                <div className="flex cursor-text flex-col">
                  <div
                    ref={editableDivRef}
                    aria-label="What's on your mind, Syed?"
                    className="text-[#E4E6EB] relative w-full h-full writePostContent "
                    contentEditable
                    role="textbox"
                    tabIndex="0"
                    style={{
                      outline: "none",
                      userSelect: "text",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontWeight: "400",
                      fontSize: postFont,
                    }}
                    data-lexical-editor="true"
                    onInput={(e) => handleContentChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  ></div>
                </div>
{showColorIcon && (
   <div className='pl-3 pr-2 absolute left-0 right-[36px] top-[114px] ${
    '>
  <div className="flex">
    <div className="flex items-stretch">
      <div
        aria-label="Show Background Options"
        className={`bg-transparent ${
          content.length >= 84 ? "hidden" : "block"
        }`}
        role="button"
        tabIndex="0"
      >
        <span className="-mt-3">
          <img
            height="38"
            width="38"
            alt=""
            className="object-fill"
            src="/colorPick.png"
          />
        </span>
      </div>
    </div>
  </div>
</div>
)}
             
                <div className="cursor-pointer absolute flex flex-nowrap items-center bottom-0 right-[16px] ">
                  <div className="relative flex flex-col max-w-full shrink-0 w-full min-w-0">
                    <span>
                      <i
                        data-visualcompletion="css-img"
                        style={{
                          backgroundImage: "url(/emoji.png)",
                          backgroundPosition: "0 -87px",
                          backgroundSize: "auto",
                          width: "24px",
                          height: "24px",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {!content.length && !keyPressed && (
                <p className="text-[24px] pl-4 break-words whitespace-pre-wrap text-[#B0B3B8] text-ellipsis absolute select-none pointer-events-none">
                  {defaultText}
                </p>
              )}
            </div>
            <div
            className={`bg-[#3E4042] w-4 absolute top-0 ease-linear duration-500 h-full opacity-0
            ${contentRef ? "hover:opacity-30" : "pointer-events-none"}`}
            data-visualcompletion="ignore"
            data-thumb="1"
            ref={trackRef}
            style={{
              display: "block",
              height: `${contentRef.current?.scrollHeight}px`,
              right: "0px",
              transitionProperty: "opacity",
            }}
          ></div>
          <div
            className="absolute top-0 w-4 origin-top-right ease-linear duration-300 px-1 py-0 m-0 pointer-events-none"
            data-visualcompletion="ignore"
            data-thumb="1"
            ref={scrollThumbRef}
            style={{
              display: "block",
              opacity: `${scrollOpacity}`,
              height: `${thumbHeight}px`,
              right: "0px",
              transitionProperty: "opacity",
              transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(${
                scaleRef.current
              }) translateZ(${-translateZRef.current}px) translateZ(-2px)`,
            }}
          >
            <div className="w-full h-full rounded-[4px] pointer-events-none bg-[rgba(255,255,255,0.3)]"></div>
    </div>
          </div>

          <div className="py-4">
            <div className="flex flex-col">
              <div className="flex border-[0.5px] mx-4 rounded-lg border-[#3A3B3C]">
                <div className="flex justify-between items-center w-full px-[0.5rem] py-[0.46rem]">
                  <span className="text-[#E4E6EB] font-semibold text-sm pb-[1px]">
                    Add to your post
                  </span>
                  <div className="flex">
                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <img
                          className="object-cover"
                          width="24px"
                          height="24px"
                          src="addPostIcons/insert_img.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>

                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <img
                          width="24px"
                          height="24px"
                          src="addPostIcons/tag.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>

                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <img
                          width="24px"
                          height="24px"
                          src="addPostIcons/postemoji.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>
                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <img
                          width="24px"
                          height="24px"
                          src="addPostIcons/location.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>
                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <img
                          width="24px"
                          height="24px"
                          src="addPostIcons/gif.png"
                          alt=""
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>
                    <div className="relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]">
                      <div className="flex w-full h-full items-center justify-center">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            backgroundImage: "url(/addPostIcons/more.png)",
                            backgroundPosition: "0 -37px",
                            backgroundSize: "auto",
                            width: "24px",
                            height: "24px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col pt-4 mx-4 justify-center ">
                  <button
                    className={`font-semibold cursor-pointer ${
                      content.length > 0 || keyPressed
                        ? "bg-[#0866FF] text-white"
                        : "bg-[#505151] text-[rgba(255,255,255,0.3)] cursor-no-drop"
                    }  px-2 py-[0.5rem] rounded-md text-sm`}
                  >
                    Post
                  </button>
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

export default WritePostCard;
