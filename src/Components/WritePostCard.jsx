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
    <div className="md:w-[500px] w-[420px] h-fit rounded-lg relative outline-none">
      <div className="w-full max-h-[90vh] min-h-[428px] flex overflow-visible">
        <div className="relative inset-0 pointer-events-auto flex flex-col w-[500px] min-h-[428px]">
          <div>
            <div className="flex justify-center items-center h-[60px] border-[rgba(255,255,255,0.05)] border-b-[1px]">
              <span className="pb-[2px] text-xl text-[#E4E6EB] font-bold">
                Create post
              </span>
              <div className="flex absolute top-[0.01rem] right-[4px]">
                <span
                  onClick={() => handleClosePost()}
                  className="relative m-3 p-2 cursor-pointer bg-[#3A3B3C] rounded-full"
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
                      display: "block",
                    }}
                  />
                  <div className="absolute inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-full"></div>
                </span>
              </div>
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
                    <span className="x3x7a5m block text-sm text-[#E4E6EB] font-semibold max-w-full min-w-0">
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
            className={`writePostContent-container flex flex-col h-fit overscroll-contain overflox-x-hidden overflow-y-auto flex-grow ${showScroll ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
          >
            <div
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
   <div className='pl-4 pr-3 absolute left-0 right-[36px] top-[114px] ${
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
          </div>

          <div className="py-4">
            <div className="flex flex-col">
              <div className="flex border-[0.5px] mx-4 rounded-lg border-[#3A3B3C]">
                <div className="flex justify-between items-center w-full px-[1rem] py-[0.6rem]">
                  <span className="text-[#E4E6EB] font-semibold text-sm">
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
                    disabled
                    className={`font-semibold cursor-pointer ${
                      content.length > 0 || keyPressed
                        ? "bg-[#0866FF] text-white"
                        : "bg-[#505151] text-[rgba(255,255,255,0.3)]"
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
  );
}

export default WritePostCard;
