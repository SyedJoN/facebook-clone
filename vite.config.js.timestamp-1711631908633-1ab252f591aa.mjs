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
    if (!seeMore) {
      // Scroll to the top when seeMore is false
      containerRef.current.scrollTop = -1;
      setScrollbarPosition(0);

    }
  }, [seeMore])



  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = contentRef?.current?.scrollTop / (contentRef?.current?.scrollHeight - contentRef?.current?.clientHeight);
      const scrollbarPosit