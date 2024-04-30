import React, { useEffect, useState, useRef } from 'react'

function Posts() {

  const [writePost, setWritePost] = useState(false);
  const [defaultText, setDefaultText] = useState("What's on your mind, Syed?")
  const [content, setContent] = useState('');
  const [postFont, setPostFont] = useState('24px')
  const editableDivRef = useRef(null)

  const handlePostContainer = () => {
    setWritePost(true)
    editableDivRef.current?.click();

  }

  const handleContentChange = (e) => {
    const inputContent = e.target.innerText;
    setContent(inputContent);
    if (inputContent.trim().length >= 84) {
      setPostFont('15px')
    } else {
      setPostFont('24px')
    }

  };

  useEffect(() => {

    var htmlElement = document.querySelector('html');

    if (writePost) {
      editableDivRef.current.innerText = content;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editableDivRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      htmlElement.id = 'scrollView'
    }
    return () => {

      htmlElement.removeAttribute('id');
    };
  }, [writePost]);

  return (
    <>

      {writePost && (

        <div className="z-50 border-[#3A3B3C] border-[0.1px] overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-grow postContainer md:w-[500px] w-[420px] h-fit bg-[#242526] rounded-lg">
          <div className='w-full h-full flex flex-col'>
            <div className="flex flex-col w-full max-h-[90vh] min-h-[428px]">



              <div>
                <div className="flex flex-col">
                  <div className='flex w-full justify-center items-center h-[60px] border-b-[0.5px] border-[#3A3B3C]'>
                    <span className='text-xl text-white font-semibold'>Create post</span>
                    <div className='flex absolute right-0'>


                      <span onClick={() => setWritePost(false)} className='relative m-3 p-2 cursor-pointer bg-[#3A3B3C] rounded-full'>
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/cross.png)",
                            backgroundPosition: '0 -494px',
                            width: '20px',
                            height: '20px',
                            backgroundRepeat: 'no-repeat',
                            display: 'block',
                          }}

                        />
                        <div className='absolute inset-0 hover:bg-[rgba(255,255,255,0.1)] rounded-full'></div>
                      </span>
                    </div>
                  </div>



                  <div className="flex justify-center items-center pt-[15px] pb-[15px] mx-[16px]">
                    <div className=''>
                      <div className="relative img-wrapper w-10 h-10 rounded-full cursor-pointer select-none mr-[11px]">
                        <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
                        <div className='absolute inset-0 bg-[rgba(255,255,255,0.1)] opacity-0 rounded-full hover:opacity-100 transition-opacity duration-200'></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap flex-col w-full">


                      <div className='flex cursor-text'>
                        <div className='shrink-0'>
                          <span className='x3x7a5m block text-sm text-[#E4E6EB] font-semibold max-w-full min-w-0'>
                            Syed Muhammad Jon

                          </span>
                        </div>
                      </div>
                      <div className='mt-[6px] '>
                        <div className='inline-flex bg-[#3A3B3C] rounded-md px-[8px] py-[3px] cursor-pointer select-none'>
                          <div className='flex justify-center items-center'>

                            <div className='flex mr-[4px] '>
                              <img src="/friendsicon.png" alt=""
                                style={{
                                  filter: "invert(89%) sepia(6%) hue-rotate(185deg) ",
                                  width: '12px',
                                  height: '12px',
                                  display: 'inline-block',
                                }} />


                            </div>
                            <span className='text-[1.07rem] text-[#E4E6EB] font-semibold text-xs  mr-[4px] '>Friends except...</span>
                            <i
                              data-visualcompletion="css-img"
                              style={{
                                backgroundImage: "url(/downarrow.png)",
                                filter: "invert(89%) sepia(6%) hue-rotate(185deg) ",
                                backgroundPosition: '0 -949px',
                                backgroundSize: 'auto',
                                width: '12px',
                                height: '12px',
                                backgroundRepeat: 'no-repeat',
                                display: 'inline-block',

                              }}

                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <div className={` flex flex-col h-fit overflow-x-hidden
 overscroll-contain flex-grow`}>
                <div className={`relative flex flex-col flex-grow pb-[40px]`}>
                  <div className={` pl-4  ${content.length >= 131 ? 'pr-8' : 'pr-4'}`}>
                    <div className="flex cursor-text flex-col">
                      <div
                        ref={editableDivRef}
                        autoFocus
                        aria-label="What's on your mind, Syed?"
                        className="text-[#E4E6EB] relative "
                        contentEditable
                        role="textbox"
                        tabIndex="0"
                        style={{
                          outline: 'none',
                          userSelect: 'text',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          fontWeight: '400',
                          fontSize: postFont
                        }}
                        data-lexical-editor="true"
                        onInput={(e) => handleContentChange(e)}
                      >
                      </div>
                    </div>



                    <div className="pl-4 pr-3 absolute left-0 right-[36px] top-[114px]">
                      <div className='flex'>
                        <div className='flex items-stretch'>
                          <div aria-label="Show Background Options" className={`bg-transparent ${content.length >= 84 ? 'hidden' : 'block'}`} role="button" tabIndex="0">
                            <span className="-mt-3">
                              <img height="38" width='38' alt="" className="object-fill" src="/colorPick.png" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='cursor-pointer absolute flex flex-nowrap items-center bottom-0 right-[16px] '>
                      <div className='relative flex flex-col max-w-full shrink-0 w-full min-w-0'>
                        <span>
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              backgroundImage: "url(/emoji.png)",

                              backgroundPosition: '0 -87px',
                              backgroundSize: 'auto',
                              width: '24px',
                              height: '24px',
                              backgroundRepeat: 'no-repeat',
                              display: 'inline-block',

                            }}

                          />
                        </span>
                      </div>
                    </div>
                  </div>






                  {content.length === 0 && (
                    <div className=' text-[24px] pl-4 break-words whitespace-pre-wrap text-[#B0B3B8] text-ellipsis absolute select-none pointer-events-none'>
                      {defaultText}
                    </div>
                  )}





                </div>

              </div>


              <div className='py-4'>
                <div className='flex flex-col'>
                  <div className="flex border-[0.5px] mx-4 rounded-lg border-[#3A3B3C]">
                    <div className="flex justify-between items-center w-full px-[1rem] py-[0.6rem]">
                      <span className='text-[#E4E6EB] font-semibold text-sm'>Add to your post</span>
                      <div className="flex">
                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>
                          <div className='flex w-full h-full items-center justify-center'>
                            <img className="object-cover" width="24px" height="24px" src="addPostIcons/insert_img.png" alt="" />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>



                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>

                          <div className='flex w-full h-full items-center justify-center'>
                            <img width="24px" height="24px" src="addPostIcons/tag.png" alt="" />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>

                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>
                          <div className='flex w-full h-full items-center justify-center'>
                            <img width="24px" height="24px" src="addPostIcons/postemoji.png" alt="" />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>
                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>
                          <div className='flex w-full h-full items-center justify-center'>
                            <img width="24px" height="24px" src="addPostIcons/location.png" alt="" />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>
                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>
                          <div className='flex w-full h-full items-center justify-center'>
                            <img width="24px" height="24px" src="addPostIcons/gif.png" alt="" />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>
                        <div className='relative w-[36px] h-[36px] rounded-full cursor-pointer m-[2px]'>
                          <div className='flex w-full h-full items-center justify-center'>
                            <i
                              data-visualcompletion="css-img"
                              style={{
                                backgroundImage: "url(/addPostIcons/more.png)",
                                backgroundPosition: '0 -37px',
                                backgroundSize: 'auto',
                                width: '24px',
                                height: '24px',
                                backgroundRepeat: 'no-repeat',
                                display: 'inline-block',
                              }}

                            />

                          </div>
                          <div className='absolute inset-0 opacity-0 w-[36px] h-[36px] bg-[rgba(255,255,255,0.1)] hover:opacity-[0.5] rounded-full'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col pt-4 mx-4 justify-center ">
                      <button disabled className={`font-semibold cursor-pointer ${content.length > 0 ? 'bg-[#0866FF] text-white' : 'bg-[#505151] text-[rgba(255,255,255,0.3)]'}  px-2 py-[0.5rem] rounded-md text-sm`}>Post</button>
                    </div>
                  </div>


                </div>

              </div>

            </div>
          </div>
        </div>







      )}
      <div onClick={() => setWritePost(false)} className={` ${writePost ? 'block' : 'hidden'} fixed overflow-auto bg-[#070707]  w-full h-full top-0 left-0 z-40 opacity-[0.8]`}></div>
      <div className=" flex flex-col bg-[#242526] lg:w-full rounded-lg px-[16px] pt-[12px] pb-[13px] justify-center items-center ">
        <div className="flex flex-wrap justify-start w-full">
          <div className="flex img-wrapper justify-start w-10 h-10 rounded-full cursor-pointer  ">
            <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
          </div>
          <div className="ml-2 flex-grow">
            <div onClick={handlePostContainer} className='flex items-center h-[40px] bg-[#3A3B3C] hover:bg-[#4E4F50] px-[11px] rounded-full cursor-pointer '>
              <span className={`text-lg md:text-[1.07rem] ${!writePost && content.length > 0 ? 'text-white' : 'text-[#B0B3B8]'} `}>{writePost ? defaultText : content.length === 0 ? defaultText : content.length > 50 ? content.substring(0, 60) + '...' : content}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full border-t-[1px] border-[#3A3B3C] mt-[12px] h-[46px] pt-[8px] justify-around ">


          <div className='flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow hover:bg-[#3A3B3C] rounded-lg cursor-pointer '>
            <div className='flex  items-center'>
              <span className='inline-flex mt-[2px]'>
                <img width={'24px'} height={'24px'} src="/video.png" alt="" />
              </span>
              <span className='w-[8px]'></span>
              <span className='text-[#B8BBBF] text-sm font-semibold '>Live video</span>
            </div>
          </div>


          <div className='flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow hover:bg-[#3A3B3C] rounded-lg cursor-pointer '>
            <div className='flex items-center '>
              <span className='inline-flex mt-[2px]'>
                <img width={'24px'} height={'24px'} src="/photo.png" alt="" />
              </span>
              <span className='w-[8px]'></span>

              <span className='text-[#B8BBBF] text-sm font-semibold '>Photo/video</span>
            </div>
          </div>


          <div className='flex pb-[8px] w-full pl-[8px] pr-[8px] pt-[8px] justify-center shrink-1 flex-grow hover:bg-[#3A3B3C] rounded-lg cursor-pointer '>
            <div className='flex items-center'>
              <span className='inline-flex mt-[2px]'>
                <img width={'24px'} height={'24px'} src="/feeling.png" alt="" />
              </span>
              <span className='w-[8px]'></span>

              <span className='text-[#B8BBBF] text-sm font-semibold '>Feeling/activity</span>
            </div>
          </div>

        </div>
      </div>




      <div className="flex flex-col bg-[#242526] w-full overflow-hidden rounded-lg px-[16px] pt-[12px] pb-[18px] justify-center items-center mt-2">
        <div className="flex justify-start w-full">
          <div className="flex img-wrapper justify-start w-10 h-10  rounded-full cursor-pointer ">
            <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
          </div>

          <div className="ml-2 flex-grow">
            <div className=''>
              <span className='relative bottom-[5px] text-xs sm:text-sm text-[#E4E6EB] font-semibold cursor-pointer '>Syed Muhammad Jon</span>
            </div>
            <div className='flex flex-wrap relative bottom-[4px]'>
              <span className='text-[1.07rem] text-[#B8BBBF] text-xs cursor-pointer '>39m</span>
              <span className='text-[1.07rem] text-[#B8BBBF] text-xs mx-[2px]'>.</span>

              <span className='relative top-[2px] left-[1px] cursor-pointer '> <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className='text-[#B8BBBF]' title="Shared with Public" ><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg></span>
            </div>

          </div>

          <div className="inline-flex items-center">
            <div className='flex hover:bg-[#3A3B3C] rounded-full p-2 cursor-pointer  '>
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className='text-[#96979D]' ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
            </div>
            <div className='flex hover:bg-[#3A3B3C] rounded-full p-2 relative cursor-pointer '>
              <i
                data-visualcompletion="css-img"
                style={{
                  filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                  backgroundImage: "url(/cross.png)",
                  backgroundPosition: '0 -494px',

                  width: '20px',
                  height: '20px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block',
                }}

              />
            </div>
          </div>

        </div>
        <div className='flex w-full'>
          <span className='block text-[1.07rem] text-[#E4E6EB] text-sm py-[9px]  '>Nawaz Fateh Ali Khan 👍</span>
        </div>







        <div className='flex w-full overflow-hidden rounded-xl ' style={{ border: '1px solid #3E4042' }}>
          <div className='flex flex-col w-full h-full rounded-xl  '>
            <img className='object-cover w-full h-full cursor-pointer ' src="/post.jpg " alt="" />






            <div className="flex flex-wrap w-full p-4">
              <div className="flex img-wrapper justify-start w-8 h-8 rounded-full">
                <img className='object-cover w-full h-full rounded-full cursor-pointer ' src="/me.jpg" alt="" />
              </div>
              <div className="ml-2 ">
                <div className=''>
                  <span className='relative bottom-[10px] text-[1.07rem] text-white text-xs font-semibold cursor-pointer '>Syed Muhammad Jon</span>
                </div>
                <div className='flex flex-wrap relative bottom-[10px]'>
                  <span className='text-[1.07rem] text-[#B8BBBF] text-xs cursor-pointer '>39m</span>
                  <span className='text-[1.07rem] text-[#B8BBBF] text-xs mx-[2px]'>.</span>
                  <span className='relative top-[2px] left-[1px]'> <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className='text-[#B8BBBF] cursor-pointer ' title="Shared with Public" ><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg></span>
                </div>
              </div>
              <div className='flex w-full'>
                <span className='block text-[0.8rem] text-[#E4E6EB] '>Nawaz Fateh Ali Khan 👍</span>
              </div>
            </div>

          </div>

        </div>
        <div className="relative flex w-full my-[5px] h-[30px] justify-around items-center ">


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -760px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2'>Like</span>
            </div>
          </div>


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -571px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2 '>Comment</span>
            </div>
          </div>


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex  items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -907px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2 '>Share</span>
            </div>
          </div>
        </div>
        <div className="block w-full border-b-[1px] border-[#3E4042]"></div>
        <div className="flex justify-start w-full">
          <div className="img-wrapper justify-start w-8 h-8 rounded-full mt-[10px] cursor-pointer ">
            <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
          </div>
          <div className="block w-full h-[35px] ml-1 mt-2">
            <div className='bg-[#3A3B3C] rounded-full px-[2px] py-[2px] cursor-text '>
              <div className="flex ">
                <div className="flex ml-2 items-center">
                  <span className='text-xs sm:text-[1rem] text-[#B0B3B8]'>Comment as Syed Muhammad Jon</span>

                </div>



                <ul className='flex ml-auto'>
                  <li>
                    <span className=''>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1118px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1203px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1152px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1237px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1356px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>

                </ul>


              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col bg-[#242526] w-full overflow-hidden rounded-lg px-[16px] pt-[12px] pb-[18px] justify-center items-center mt-2">
        <div className="flex justify-start w-full">
          <div className="flex img-wrapper justify-start w-10 h-10  rounded-full cursor-pointer ">
            <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
          </div>

          <div className="ml-2 flex-grow">
            <div className=''>
              <span className='relative bottom-[5px] text-xs sm:text-sm text-[#E4E6EB] font-semibold cursor-pointer '>Syed Muhammad Jon</span>
            </div>
            <div className='flex flex-wrap relative bottom-[4px]'>
              <span className='text-[1.07rem] text-[#B8BBBF] text-xs cursor-pointer '>39m</span>
              <span className='text-[1.07rem] text-[#B8BBBF] text-xs mx-[2px]'>.</span>

              <span className='relative top-[2px] left-[1px] cursor-pointer '> <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className='text-[#B8BBBF]' title="Shared with Public" ><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg></span>
            </div>

          </div>

          <div className="inline-flex items-center">
            <div className='flex hover:bg-[#3A3B3C] rounded-full p-2 cursor-pointer  '>
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className='text-[#96979D]' ><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
            </div>
            <div className='flex hover:bg-[#3A3B3C] rounded-full p-2 relative cursor-pointer '>
              <i
                data-visualcompletion="css-img"
                style={{
                  filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                  backgroundImage: "url(/cross.png)",
                  backgroundPosition: '0 -494px',

                  width: '20px',
                  height: '20px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block',
                }}

              />
            </div>
          </div>

        </div>
        <div className='flex w-full'>
          <span className='block text-[1.07rem] text-[#E4E6EB] text-sm py-[9px]  '>Nawaz Fateh Ali Khan 👍</span>
        </div>







        <div className='flex w-full overflow-hidden rounded-xl ' style={{ border: '1px solid #3E4042' }}>
          <div className='flex flex-col w-full h-full rounded-xl  '>
            <img className='object-cover w-full h-full cursor-pointer ' src="/post.jpg " alt="" />






            <div className="flex flex-wrap w-full p-4">
              <div className="flex img-wrapper justify-start w-8 h-8 rounded-full">
                <img className='object-cover w-full h-full rounded-full cursor-pointer ' src="/me.jpg" alt="" />
              </div>
              <div className="ml-2 ">
                <div className=''>
                  <span className='relative bottom-[10px] text-[1.07rem] text-white text-xs font-semibold cursor-pointer '>Syed Muhammad Jon</span>
                </div>
                <div className='flex flex-wrap relative bottom-[10px]'>
                  <span className='text-[1.07rem] text-[#B8BBBF] text-xs cursor-pointer '>39m</span>
                  <span className='text-[1.07rem] text-[#B8BBBF] text-xs mx-[2px]'>.</span>
                  <span className='relative top-[2px] left-[1px]'> <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className='text-[#B8BBBF] cursor-pointer ' title="Shared with Public" ><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg></span>
                </div>
              </div>
              <div className='flex w-full'>
                <span className='block text-[0.8rem] text-[#E4E6EB] '>Nawaz Fateh Ali Khan 👍</span>
              </div>
            </div>

          </div>

        </div>
        <div className="relative flex w-full my-[5px] h-[30px] justify-around items-center ">


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -760px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2'>Like</span>
            </div>
          </div>


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -571px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2 '>Comment</span>
            </div>
          </div>


          <div className='flex justify-center flex-grow items-center hover:bg-[#3A3B3C] rounded-md cursor-pointer h-[32px]'>
            <div className='flex  items-center'>
              <span className='inline-flex'>
                <i
                  data-visualcompletion="css-img"
                  style={{
                    filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                    backgroundImage: "url(/lcs.png)",
                    backgroundPosition: '0 -907px',
                    backgroundSize: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundRepeat: 'no-repeat',
                    display: 'inline-block',
                  }}

                />
              </span>

              <span className='text-[#B0B3B8] text-sm font-semibold ml-2 '>Share</span>
            </div>
          </div>
        </div>
        <div className="block w-full border-b-[1px] border-[#3E4042]"></div>
        <div className="flex justify-start w-full">
          <div className="img-wrapper justify-start w-8 h-8 rounded-full mt-[10px] cursor-pointer ">
            <img className='object-cover w-full h-full rounded-full' src="/me.jpg" alt="" />
          </div>
          <div className="block w-full h-[35px] ml-1 mt-2">
            <div className='bg-[#3A3B3C] rounded-full px-[2px] py-[2px] cursor-text '>
              <div className="flex ">
                <div className="flex ml-2 items-center">
                  <span className='text-xs sm:text-[1rem] text-[#B0B3B8]'>Comment as Syed Muhammad Jon</span>

                </div>



                <ul className='flex ml-auto'>
                  <li>
                    <span className=''>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">
                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1118px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1203px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1152px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1237px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>
                  <li>
                    <span>
                      <div className="inline-flex hover:bg-[#525454] rounded-full p-[0.4rem] cursor-pointer ">


                        <i
                          data-visualcompletion="css-img"
                          style={{
                            filter: 'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                            backgroundImage: "url(/lcs.png)",
                            backgroundPosition: '0 -1356px',
                            backgroundSize: 'auto',
                            width: '16px',
                            height: '16px',
                            backgroundRepeat: 'no-repeat',
                            display: 'inline-block',
                          }}

                        />
                      </div>
                    </span>
                  </li>

                </ul>


              </div>
            </div>
          </div>

        </div>
      </div>




    </>


  )
}

export default Posts