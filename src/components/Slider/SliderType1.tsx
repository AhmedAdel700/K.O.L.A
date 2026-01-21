'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface SliderItem {
    place: string;
    title: string;
    title2: string;
    description: string;
    image: string;
}

interface SliderType1Props {
    data: SliderItem[];
}

export default function SliderType1({ data }: SliderType1Props) {
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  const [textIndices, setTextIndices] = useState({ even: 0, odd: 1 });
  
  // Responsive State flags for class switching if needed
  const [layoutMode, setLayoutMode] = useState<'desktop' | 'tablet' | 'mobile' | 'landscape'>('desktop');

  const orderRef = useRef([0, 1, 2, 3, 4, 5]);
  const detailsEvenStateRef = useRef(true);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const actionQueueRef = useRef<('next' | 'prev')[]>([]);

  // Layout Refs (Mutable based on resize)
  const offsetTopRef = useRef(200);
  const offsetLeftRef = useRef(700);
  const cardWidthRef = useRef(200);
  const cardHeightRef = useRef(300);
  const gapRef = useRef(40);
  const numberSizeRef = useRef(50);
  const ease = "sine.inOut";

  // Initialize Layout based on Screen Size
  const updateLayout = () => {
      if (typeof window === 'undefined') return;
      const { innerWidth, innerHeight } = window;
      
      // Determine Mode
      let mode: 'desktop' | 'tablet' | 'mobile' | 'landscape' = 'desktop';
      
      if (innerWidth < 768) {
          if (innerHeight < 500) mode = 'landscape';
          else mode = 'mobile';
      } else if (innerWidth < 1024) {
          mode = 'tablet';
      }

      setLayoutMode(mode);

      // Configuration per mode
      if (mode === 'mobile') {
        cardWidthRef.current = 140;
        cardHeightRef.current = 180;
        gapRef.current = 20;
        numberSizeRef.current = 30;
        
        // Stack at bottom right
        offsetTopRef.current = innerHeight - 210; 
        offsetLeftRef.current = innerWidth - 160; 
      } 
      else if (mode === 'landscape') {
        // Mobile Landscape (short height)
        cardWidthRef.current = 100;
        cardHeightRef.current = 150;
        gapRef.current = 15;
        numberSizeRef.current = 25;
        
        // Stack at bottom right
        offsetTopRef.current = innerHeight - 170;
        offsetLeftRef.current = innerWidth - 120;
      }
      else if (mode === 'tablet') {
        cardWidthRef.current = 160;
        cardHeightRef.current = 240;
        gapRef.current = 30;
        numberSizeRef.current = 40;
        
        offsetTopRef.current = innerHeight - 350;
        offsetLeftRef.current = innerWidth - 600; // Adjusted for tablet
      } 
      else {
        // Desktop
        if (innerWidth < 1536) {
          // LG & XL (1024px - 1535px)
          cardWidthRef.current = 160;
          cardHeightRef.current = 240;
          gapRef.current = 30;
          numberSizeRef.current = 40;
          
          offsetTopRef.current = innerHeight - 380;
          offsetLeftRef.current = innerWidth - 680;
        } else {
          // 2XL (1536px+)
          cardWidthRef.current = 200;
          cardHeightRef.current = 300;
          gapRef.current = 40;
          numberSizeRef.current = 50;
          
          offsetTopRef.current = innerHeight - 430;
          offsetLeftRef.current = innerWidth - 830;
        }
      }
  };

  useEffect(() => {
    updateLayout();
    
    // Resize Listener
    const handleResize = () => {
        updateLayout();
        // Force re-init layout positions without full reload animation if possible
        // But for consistency let's re-run init logic to snap to new positions
        // We only want to snap the stack, not restart the big intro animation.
        // However, `init` does an intro animation.
        // Let's create a `snapLayout` function or just re-run init which is acceptable for resize.
        init(false); // Pass false to skip intro delays
    };

    window.addEventListener('resize', handleResize);

    const loadImages = async () => {
      const promises = data.map(({ image }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = image;
        });
      });
      await Promise.all(promises);
      init(true); // True for intro
    };
    loadImages();
    
    // Auto-loop logic
    const loop = async () => {
        if (!autoPlayRef.current) return;
        await gsap.to(indicatorRef.current, { x: 0, duration: 3, ease: 'linear' });
        
        if (autoPlayRef.current) {
            await gsap.to(indicatorRef.current, { x: window.innerWidth, duration: 0.8, ease });
            gsap.set(indicatorRef.current, { x: -window.innerWidth });
            handleNextStep(true);
        } else {
             gsap.set(indicatorRef.current, { x: -window.innerWidth });
        }
    };
    
    return () => {
        window.removeEventListener('resize', handleResize);
        if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, []);

  const restartAutoLoop = () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      gsap.killTweensOf(indicatorRef.current);
      gsap.set(indicatorRef.current, { x: -window.innerWidth });

      autoPlayTimerRef.current = setTimeout(() => {
          autoPlayRef.current = true;
          startAutoLoop();
      }, 4000); 
  };

  const init = (isIntro = false) => {
    if (typeof window === 'undefined') return;
    updateLayout(); 

    const active = orderRef.current[0];
    const rest = orderRef.current.slice(1);
    const detailsActive = detailsEvenStateRef.current ? detailsEvenRef.current : detailsOddRef.current;
    
    const cw = cardWidthRef.current;
    const ch = cardHeightRef.current;
    const gp = gapRef.current;
    const ns = numberSizeRef.current;
    const ot = offsetTopRef.current;
    const ol = offsetLeftRef.current;

    setTextIndices({ even: active, odd: rest[0] });

    // Pagination Position
    // For mobile/landscape we might change this
    const isSmall = layoutMode === 'mobile' || layoutMode === 'landscape';
    gsap.set(paginationRef.current, {
      top: isSmall ? 'unset' : ot + ch + 30, // Position below cards on desktop
      bottom: isSmall ? 20 : 'unset',
      left: isSmall ? 20 : ol,
      y: isIntro ? 200 : 0,
      opacity: isIntro ? 0 : 1,
      zIndex: 60
    });

    // Active Card Full Screen
    gsap.set(cardsRef.current[active], {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: 0
    });
    
    // NEW: Hide active card content initially to prevent double text
    gsap.set(cardContentsRef.current[active], { opacity: 0 });
    
    // Details
    // Ensure hidden ones are hidden
    gsap.set(detailsEvenStateRef.current ? detailsOddRef.current : detailsEvenRef.current, { opacity: 0, zIndex: 12 });
    // Active Detail
    gsap.set(detailsActive, { 
        opacity: isIntro ? 0 : 1, 
        zIndex: 22, 
        x: isIntro ? -200 : 0 
    });

    // Reset Elements internal positions
    if (isIntro) {
        gsap.set('#details-even .text', { y: 100 });
        gsap.set('#details-even .title-1', { y: 100 });
        gsap.set('#details-even .title-2', { y: 100 });
        gsap.set('#details-even .desc', { y: 50 });
        gsap.set('#details-even .cta', { y: 60 });
        
        gsap.set('#details-odd .text', { y: 100 });
        gsap.set('#details-odd .title-1', { y: 100 });
        gsap.set('#details-odd .title-2', { y: 100 });
        gsap.set('#details-odd .desc', { y: 50 });
        gsap.set('#details-odd .cta', { y: 60 });
    }

    const progressTotalWidth = (layoutMode === 'mobile' || layoutMode === 'landscape') ? 180 : (layoutMode === 'tablet' ? 220 : 500);
    gsap.set(progressRef.current, {
      width: progressTotalWidth * (1 / orderRef.current.length) * (active + 1)
    });

    // Stack Cards
    rest.forEach((i, index) => {
      // If intro, start offset and animate in. If not intro (resize), just set.
      const xTarget = ol + index * (cw + gp);
      
      gsap.set(cardsRef.current[i], {
        x: isIntro ? ol + 400 + index * (cw + gp) : xTarget,
        y: ot,
        width: cw,
        height: ch,
        zIndex: 30,
        borderRadius: 10
      });
      gsap.set(cardContentsRef.current[i], {
        x: isIntro ? ol + 400 + index * (cw + gp) : xTarget,
        zIndex: 40,
        y: ot + ch - (isSmall ? 60 : 100),
        opacity: isIntro ? 0 : 1
      });
      gsap.set(slideItemsRef.current[i], { x: (index + 1) * ns });
    });

    if (isIntro) {
        gsap.set(indicatorRef.current, { x: -window.innerWidth });
        const startDelay = 0.6;
    
        gsap.to(coverRef.current, {
          x: window.innerWidth + 400,
          delay: 0.5,
          ease,
          onComplete: () => {
            setTimeout(() => {
              startAutoLoop();
            }, 500);
          }
        });
    
        rest.forEach((i, index) => {
          gsap.to(cardsRef.current[i], {
            x: ol + index * (cw + gp),
            zIndex: 30,
            delay: startDelay + 0.05 * index,
            ease
          });
          gsap.to(cardContentsRef.current[i], {
            x: ol + index * (cw + gp),
            zIndex: 40,
            delay: startDelay + 0.05 * index,
            opacity: 1,
            ease
          });
        });
    
        gsap.to(paginationRef.current, { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
        
        // Animate text elements in for the first slide
        const detailsActiveId = detailsEvenStateRef.current ? 'details-even' : 'details-odd';
        gsap.to(`#${detailsActiveId} .text`, { y: 0, delay: startDelay + 0.1, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-1`, { y: 0, delay: startDelay + 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-2`, { y: 0, delay: startDelay + 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .desc`, { y: 0, delay: startDelay + 0.3, duration: 0.4, ease });
        gsap.to(`#${detailsActiveId} .cta`, { y: 0, delay: startDelay + 0.35, duration: 0.4, ease });
    }
  };

  const startAutoLoop = async () => {
      if (!autoPlayRef.current) return;
      await gsap.to(indicatorRef.current, { x: 0, duration: 3, ease: 'linear' });
      if (autoPlayRef.current) {
          await gsap.to(indicatorRef.current, { x: window.innerWidth, duration: 0.8, ease });
          gsap.set(indicatorRef.current, { x: -window.innerWidth });
          handleNextStep(true);
      } else {
          gsap.set(indicatorRef.current, { x: -window.innerWidth });
      }
  };

  const processQueue = async () => {
      if (isAnimatingRef.current) return;
      if (actionQueueRef.current.length === 0) return;

      const action = actionQueueRef.current.shift();
      if (!action) return;

      isAnimatingRef.current = true;
      if (action === 'next') await stepForward();
      else if (action === 'prev') await stepBack();
      
      isAnimatingRef.current = false;
      processQueue();
  };

  const handleNextStep = (isAuto = false) => {
      if (!isAuto) {
          autoPlayRef.current = false;
          restartAutoLoop();
      }
      actionQueueRef.current.push('next');
      processQueue();
  };

  const handlePrevStep = () => {
      autoPlayRef.current = false;
      restartAutoLoop();
      actionQueueRef.current.push('prev');
      processQueue();
  };
  
  const handleCardClick = (indexInOrder: number) => {
      if (indexInOrder === 0) return; // Active
      autoPlayRef.current = false;
      restartAutoLoop();
      for (let i = 0; i < indexInOrder; i++) {
        actionQueueRef.current.push('next');
      }
      processQueue();
  };

  const stepForward = () => {
    return new Promise<void>((resolve) => {
      const currentOrder = orderRef.current;
      const newOrder = [...currentOrder.slice(1), currentOrder[0]];
      const newDetailsEven = !detailsEvenStateRef.current;
      
      orderRef.current = newOrder;
      detailsEvenStateRef.current = newDetailsEven;
      setOrder(newOrder);
      setDetailsEven(newDetailsEven);
      
      setTextIndices(prev => ({
          ...prev,
          even: newDetailsEven ? newOrder[0] : prev.even,
          odd: !newDetailsEven ? newOrder[0] : prev.odd
      }));

      const detailsActive = newDetailsEven ? detailsEvenRef.current : detailsOddRef.current;
      const detailsInactive = newDetailsEven ? detailsOddRef.current : detailsEvenRef.current;
      const detailsActiveId = newDetailsEven ? 'details-even' : 'details-odd';
      
      const cw = cardWidthRef.current;
      const ch = cardHeightRef.current;
      const gp = gapRef.current;
      const ns = numberSizeRef.current;
      const ot = offsetTopRef.current;
      const ol = offsetLeftRef.current;

      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
      gsap.to(`#${detailsActiveId} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
      
      gsap.to(`#${detailsActiveId} .cta`, {
        y: 0, delay: 0.35, duration: 0.4, ease,
        onComplete: () => {
            if (autoPlayRef.current && actionQueueRef.current.length === 0) startAutoLoop();
            resolve();
        }
      });
      gsap.set(detailsInactive, { zIndex: 12 });

      const active = newOrder[0];
      const rest = newOrder.slice(1);
      const prv = rest[rest.length - 1]; 

      gsap.set(cardsRef.current[prv], { zIndex: 10 });
      gsap.set(cardsRef.current[active], { zIndex: 20 });
      gsap.to(cardsRef.current[prv], { scale: 1.5, ease });

      gsap.to(cardContentsRef.current[active], {
        y: ot + ch - 10, opacity: 0, duration: 0.3, ease
      });
      gsap.to(slideItemsRef.current[active], { x: 0, ease });
      gsap.to(slideItemsRef.current[prv], { x: -ns, ease });
      
      const isSmall = layoutMode === 'mobile' || layoutMode === 'landscape';
      const progressTotalWidth = isSmall ? 180 : (layoutMode === 'tablet' ? 220 : 500);
      gsap.to(progressRef.current, {
        width: progressTotalWidth * (1 / newOrder.length) * (active + 1), ease
      });

      gsap.to(cardsRef.current[active], {
        x: 0, y: 0, ease, width: window.innerWidth, height: window.innerHeight, borderRadius: 0,
        onComplete: () => {
          const xNew = ol + (rest.length - 1) * (cw + gp);
          gsap.set(cardsRef.current[prv], {
            x: xNew, y: ot, width: cw, height: ch, zIndex: 30, borderRadius: 10, scale: 1
          });
          gsap.set(cardContentsRef.current[prv], {
            x: xNew, y: ot + ch - (isSmall ? 60 : 100), opacity: 1, zIndex: 40
          });
          gsap.set(slideItemsRef.current[prv], { x: rest.length * ns });

          gsap.set(detailsInactive, { opacity: 0 });
          const detailsInactiveId = newDetailsEven ? 'details-odd' : 'details-even';
          
          gsap.set(`#${detailsInactiveId} .text`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .title-1`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .title-2`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .desc`, { y: 50 });
          gsap.set(`#${detailsInactiveId} .cta`, { y: 60 });
        }
      });

      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = ol + index * (cw + gp);
          gsap.set(cardsRef.current[i], { zIndex: 30 });
          gsap.to(cardsRef.current[i], {
            x: xNew, y: ot, width: cw, height: ch, ease, delay: 0.1 * (index + 1)
          });
          gsap.to(cardContentsRef.current[i], {
            x: xNew, y: ot + ch - (isSmall ? 60 : 100), opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1)
          });
          gsap.to(slideItemsRef.current[i], { x: (index + 1) * ns, ease });
        }
      });
    });
  };

  const stepBack = () => {
    return new Promise<void>((resolve) => {
        const currentOrder = orderRef.current;
        const last = currentOrder[currentOrder.length - 1];
        const newOrder = [last, ...currentOrder.slice(0, currentOrder.length - 1)];
        const newDetailsEven = !detailsEvenStateRef.current;
        
        orderRef.current = newOrder;
        detailsEvenStateRef.current = newDetailsEven;
        setOrder(newOrder);
        setDetailsEven(newDetailsEven);
        
        setTextIndices(prev => ({
          ...prev, even: newDetailsEven ? newOrder[0] : prev.even, odd: !newDetailsEven ? newOrder[0] : prev.odd
        }));
        
        const detailsActive = newDetailsEven ? detailsEvenRef.current : detailsOddRef.current;
        const detailsInactive = newDetailsEven ? detailsOddRef.current : detailsEvenRef.current;
        const detailsActiveId = newDetailsEven ? 'details-even' : 'details-odd';
        const detailsInactiveId = newDetailsEven ? 'details-odd' : 'details-even';
        
        const cw = cardWidthRef.current;
        const ch = cardHeightRef.current;
        const gp = gapRef.current;
        const ns = numberSizeRef.current;
        const ot = offsetTopRef.current;
        const ol = offsetLeftRef.current;
        const isSmall = layoutMode === 'mobile' || layoutMode === 'landscape';

        // 1. Animate Details
        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`#${detailsActiveId} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`#${detailsActiveId} .cta`, {
            y: 0, delay: 0.35, duration: 0.4, ease,
            onComplete: () => {
                if (autoPlayRef.current && actionQueueRef.current.length === 0) startAutoLoop();
                resolve();
            }
        });
        gsap.set(detailsInactive, { zIndex: 12 });

        // 2. Animate Cards
        const active = newOrder[0];
        const oldActive = order[0];
        const rest = newOrder.slice(1);
        
        gsap.set(cardsRef.current[oldActive], { zIndex: 30 });
        gsap.to(cardsRef.current[oldActive], {
            x: ol, y: ot, width: cw, height: ch, borderRadius: 10, ease
        });
        gsap.to(cardContentsRef.current[oldActive], {
            x: ol, y: ot + ch - (isSmall ? 60 : 100), opacity: 1, zIndex: 40, ease
        });
        
        gsap.set(cardsRef.current[active], { zIndex: 20 });
        gsap.to(cardsRef.current[active], {
            x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0, ease
        });
         gsap.to(cardContentsRef.current[active], {
            y: ot + ch - 10, opacity: 0, duration: 0.3, ease
        });
        
        const progressTotalWidth = (layoutMode === 'mobile' || layoutMode === 'landscape') ? 180 : (layoutMode === 'tablet' ? 220 : 500);
        gsap.to(progressRef.current, {
            width: progressTotalWidth * (1 / newOrder.length) * (active + 1), ease
        });

        gsap.set(slideItemsRef.current[active], { x: -ns });
        gsap.to(slideItemsRef.current[active], { x: 0, ease });
        
        rest.forEach((i, index) => {
             gsap.to(slideItemsRef.current[i], { x: (index + 1) * ns, ease });
             if (i !== oldActive) {
                 const xNew = ol + index * (cw + gp);
                 gsap.to(cardsRef.current[i], {
                    x: xNew, y: ot, width: cw, height: ch, ease
                 });
                 gsap.to(cardContentsRef.current[i], {
                    x: xNew, y: ot + ch - (isSmall ? 60 : 100), opacity: 1, zIndex: 40, ease
                 });
             }
        });
        
        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`#${detailsInactiveId} .text`, { y: 100 });
        gsap.set(`#${detailsInactiveId} .title-1`, { y: 100 });
        gsap.set(`#${detailsInactiveId} .title-2`, { y: 100 });
        gsap.set(`#${detailsInactiveId} .desc`, { y: 50 });
        gsap.set(`#${detailsInactiveId} .cta`, { y: 60 });
    });
  };

  // Safe checks for data availability
  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-screen h-screen bg-[#1a1a1a] text-[#FFFFFFDD] overflow-hidden font-['Inter']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap');
      `}</style>
      
      <div ref={indicatorRef} className="fixed left-0 right-0 top-0 h-[5px] z-[60] bg-[#ecad29]" />

      {/* Cards Render */}
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div
            ref={el => { cardsRef.current[index] = el }}
            onClick={() => handleCardClick(order.indexOf(index))}
            className="absolute left-0 top-0 bg-center bg-cover shadow-[6px_6px_10px_2px_rgba(0,0,0,0.6)] cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div
            ref={el => { cardContentsRef.current[index] = el }}
            className="absolute left-0 top-0 text-[#FFFFFFDD] ps-4 pointer-events-none"
          >
            <div className={`w-[30px] h-[5px] rounded-full bg-[#FFFFFFDD] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'hidden' : ''}`} />
            <div className={`mt-1.5 font-medium ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[8px]' : 'text-[13px]'}`}>{item.place}</div>
            <div className={`font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[11px]' : 'text-[20px]'}`}>{item.title}</div>
            <div className={`font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[11px]' : 'text-[20px]'}`}>{item.title2}</div>
          </div>
        </React.Fragment>
      ))}

      {/* Details Even */}
      <div 
        ref={detailsEvenRef} 
        id="details-even" 
        className={`z-[22] absolute ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'top-[80px] left-[20px]' : 'top-[240px] left-[60px]'}`}
      >
        <div className="h-[46px] overflow-hidden">
          <div className="text pt-4 text-[20px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-1 before:rounded-full before:bg-white">
            {data[textIndices.even].place}
          </div>
        </div>
        <div className={`mt-0.5 overflow-hidden ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'h-[45px]' : 'h-[100px]'}`}>
          <div className={`title-1 font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[32px]' : 'text-[72px]'}`}>{data[textIndices.even].title}</div>
        </div>
        <div className={`mt-0.5 overflow-hidden ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'h-[45px]' : 'h-[100px]'}`}>
          <div className={`title-2 font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[32px]' : 'text-[72px]'}`}>{data[textIndices.even].title2}</div>
        </div>
        <div className={`desc mt-4 ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[300px] text-xs' : 'w-[500px]'}`}>{data[textIndices.even].description}</div>
        <div className={`cta mt-6 flex items-center ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[300px]' : 'w-[500px]'}`}>
          <button className="bookmark border-none bg-[#ecad29] w-9 h-9 rounded-full text-white grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="discover border border-white bg-transparent h-9 rounded-full text-white px-6 text-xs ml-4 uppercase">
            Discover Location
          </button>
        </div>
      </div>

      {/* Details Odd */}
      <div 
        ref={detailsOddRef} 
        id="details-odd" 
        className={`z-[22] absolute ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'top-[80px] left-[20px]' : 'top-[240px] left-[60px]'}`}
      >
        <div className="h-[46px] overflow-hidden">
          <div className="text pt-4 text-[20px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-1 before:rounded-full before:bg-white">
            {data[textIndices.odd].place}
          </div>
        </div>
        <div className={`mt-0.5 overflow-hidden ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'h-[45px]' : 'h-[100px]'}`}>
          <div className={`title-1 font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[32px]' : 'text-[72px]'}`}>{data[textIndices.odd].title}</div>
        </div>
        <div className={`mt-0.5 overflow-hidden ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'h-[45px]' : 'h-[100px]'}`}>
          <div className={`title-2 font-semibold font-['Oswald'] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'text-[32px]' : 'text-[72px]'}`}>{data[textIndices.odd].title2}</div>
        </div>
        <div className={`desc mt-4 ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[300px] text-xs' : 'w-[500px]'}`}>{data[textIndices.odd].description}</div>
        <div className={`cta mt-6 flex items-center ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[300px]' : 'w-[500px]'}`}>
          <button className="bookmark border-none bg-[#ecad29] w-9 h-9 rounded-full text-white grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="discover border border-white bg-transparent h-9 rounded-full text-white px-6 text-xs ml-4 uppercase">
            Discover Location
          </button>
        </div>
      </div>

      <div ref={paginationRef} className={`absolute inline-flex items-center ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'hidden' : 'left-0 top-0'}`}>
        <div 
            onClick={handlePrevStep}
            className={`arrow-left z-[60] rounded-full border-2 border-[#ffffff55] grid place-items-center cursor-pointer hover:bg-[#ffffff22] transition-colors ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[35px] h-[35px]' : (layoutMode === 'tablet' ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`stroke-[2] text-[#ffffff99] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-4 h-4' : (layoutMode === 'tablet' ? 'w-5 h-5' : 'w-6 h-6')}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div 
            onClick={() => handleNextStep(false)}
            className={`arrow-right z-[60] rounded-full border-2 border-[#ffffff55] grid place-items-center cursor-pointer hover:bg-[#ffffff22] transition-colors ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[35px] h-[35px] ms-3' : (layoutMode === 'tablet' ? 'w-[40px] h-[40px] ms-4' : 'w-[50px] h-[50px] ms-5')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`stroke-[2] text-[#ffffff99] ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-4 h-4' : (layoutMode === 'tablet' ? 'w-5 h-5' : 'w-6 h-6')}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className={`z-[60] h-[50px] flex items-center ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[180px] ms-4' : (layoutMode === 'tablet' ? 'w-[220px] ms-5' : 'w-[500px] ms-6')}`}>
          <div className={`${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[180px]' : (layoutMode === 'tablet' ? 'w-[220px]' : 'w-[500px]')} h-[3px] bg-[#ffffff33]`}>
            <div ref={progressRef} className="h-[3px] bg-[#ecad29]" />
          </div>
        </div>
        <div className={`overflow-hidden z-[60] relative ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[35px] h-[35px] ms-2' : (layoutMode === 'tablet' ? 'w-[40px] h-[40px] ms-2' : 'w-[50px] h-[50px]')}`}> 
          {data.map((_, index) => (
            <div
              key={index}
              ref={el => { slideItemsRef.current[index] = el }}
              className={`absolute text-white top-0 left-0 grid place-items-center font-bold ${(layoutMode === 'mobile' || layoutMode === 'landscape') ? 'w-[35px] h-[35px] text-[20px] ms-[-3.5px]' : (layoutMode === 'tablet' ? 'w-[40px] h-[40px] text-[24px] ms-[-4px]' : 'w-[50px] h-[50px] text-[32px] ms-[-5px]')}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div ref={coverRef} className="absolute left-0 top-0 w-screen h-screen bg-white z-[100]" />
    </div>
  );
}