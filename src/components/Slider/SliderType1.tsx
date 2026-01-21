'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const data = [
  {
    place: 'Switzerland Alps',
    title: 'SAINT',
    title2: 'ANTONIEN',
    description: 'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
    image: 'https://assets.codepen.io/3685267/timed-cards-1.jpg'
  },
  {
    place: 'Japan Alps',
    title: 'NANGANO',
    title2: 'PREFECTURE',
    description: 'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
    image: 'https://assets.codepen.io/3685267/timed-cards-2.jpg'
  },
  {
    place: 'Sahara Desert - Morocco',
    title: 'MARRAKECH',
    title2: 'MEROUGA',
    description: 'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
    image: 'https://assets.codepen.io/3685267/timed-cards-3.jpg'
  },
  {
    place: 'Sierra Nevada - USA',
    title: 'YOSEMITE',
    title2: 'NATIONAL PARK',
    description: 'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
    image: 'https://assets.codepen.io/3685267/timed-cards-4.jpg'
  },
  {
    place: 'Tarifa - Spain',
    title: 'LOS LANCES',
    title2: 'BEACH',
    description: 'Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach\'s long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.',
    image: 'https://assets.codepen.io/3685267/timed-cards-5.jpg'
  },
  {
    place: 'Cappadocia - Turkey',
    title: 'Göreme',
    title2: 'Valley',
    description: 'Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.',
    image: 'https://assets.codepen.io/3685267/timed-cards-6.jpg'
  }
];

export default function SliderType1() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  // Separate indices to handle cross-fade without content flash
  const [textIndices, setTextIndices] = useState({ even: 0, odd: 1 });
  
  const orderRef = useRef([0, 1, 2, 3, 4, 5]);
  const detailsEvenStateRef = useRef(true);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef(true);
  const actionQueueRef = useRef<('next' | 'prev')[]>([]);

  const offsetTopRef = useRef(200);
  const offsetLeftRef = useRef(700);
  const cardWidth = 200;
  const cardHeight = 300;
  const gap = 40;
  const numberSize = 50;
  const ease = "sine.inOut";

  useEffect(() => {
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
      init();
    };
    loadImages();
    
    // Auto-loop logic
    const loop = async () => {
        if (!autoPlayRef.current) return;
        
        // Use a longer duration tween for the indicator as a timer
        await gsap.to(indicatorRef.current, { x: 0, duration: 3, ease: 'linear' });
        
        if (autoPlayRef.current) {
             // Animate out indicator
            await gsap.to(indicatorRef.current, { x: window.innerWidth, duration: 0.8, ease });
            gsap.set(indicatorRef.current, { x: -window.innerWidth });
            
            // Trigger step if still auto-playing
            handleNextStep(true);
        } else {
             gsap.set(indicatorRef.current, { x: -window.innerWidth });
        }
    };
    
  }, []);

  const init = () => {
    const { innerHeight: height, innerWidth: width } = window;
    offsetTopRef.current = height - 430;
    offsetLeftRef.current = width - 830;

    const active = orderRef.current[0];
    const rest = orderRef.current.slice(1);
    const detailsActive = detailsEvenStateRef.current ? detailsEvenRef.current : detailsOddRef.current;
    const detailsInactive = detailsEvenStateRef.current ? detailsOddRef.current : detailsEvenRef.current;

    // Initial Text Data Setup
    setTextIndices({ even: active, odd: rest[0] });

    gsap.set(paginationRef.current, {
      top: offsetTopRef.current + 330,
      left: offsetLeftRef.current,
      y: 200,
      opacity: 0,
      zIndex: 60
    });
    gsap.set(navRef.current, { y: -200, opacity: 0 });
    gsap.set(cardsRef.current[active], {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    });
    gsap.set(cardContentsRef.current[active], { x: 0, y: 0, opacity: 0 });
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`#${detailsEvenStateRef.current ? 'details-odd' : 'details-even'} .text`, { y: 100 });
    gsap.set(`#${detailsEvenStateRef.current ? 'details-odd' : 'details-even'} .title-1`, { y: 100 });
    gsap.set(`#${detailsEvenStateRef.current ? 'details-odd' : 'details-even'} .title-2`, { y: 100 });
    gsap.set(`#${detailsEvenStateRef.current ? 'details-odd' : 'details-even'} .desc`, { y: 50 });
    gsap.set(`#${detailsEvenStateRef.current ? 'details-odd' : 'details-even'} .cta`, { y: 60 });

    gsap.set(progressRef.current, {
      width: 500 * (1 / orderRef.current.length) * (active + 1)
    });

    rest.forEach((i, index) => {
      gsap.set(cardsRef.current[i], {
        x: offsetLeftRef.current + 400 + index * (cardWidth + gap),
        y: offsetTopRef.current,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10
      });
      gsap.set(cardContentsRef.current[i], {
        x: offsetLeftRef.current + 400 + index * (cardWidth + gap),
        zIndex: 40,
        y: offsetTopRef.current + cardHeight - 100
      });
      gsap.set(slideItemsRef.current[i], { x: (index + 1) * numberSize });
    });

    gsap.set(indicatorRef.current, { x: -window.innerWidth });

    const startDelay = 0.6;

    gsap.to(coverRef.current, {
      x: width + 400,
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
        x: offsetLeftRef.current + index * (cardWidth + gap),
        zIndex: 30,
        delay: startDelay + 0.05 * index,
        ease
      });
      gsap.to(cardContentsRef.current[i], {
        x: offsetLeftRef.current + index * (cardWidth + gap),
        zIndex: 40,
        delay: startDelay + 0.05 * index,
        ease
      });
    });

    gsap.to(paginationRef.current, { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(navRef.current, { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
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
      
      if (action === 'next') {
          await stepForward();
      } else if (action === 'prev') {
          await stepBack();
      }
      
      isAnimatingRef.current = false;
      processQueue();
  };

  const handleNextStep = (isAuto = false) => {
      if (!isAuto) {
          autoPlayRef.current = false;
          // Kill indicator tween if active
          gsap.killTweensOf(indicatorRef.current);
          gsap.set(indicatorRef.current, { x: -window.innerWidth });
      }
      actionQueueRef.current.push('next');
      processQueue();
  };

  const handlePrevStep = () => {
      autoPlayRef.current = false;
      gsap.killTweensOf(indicatorRef.current);
      gsap.set(indicatorRef.current, { x: -window.innerWidth });
      
      actionQueueRef.current.push('prev');
      processQueue();
  };
  
  const handleCardClick = (indexInOrder: number) => {
      if (indexInOrder === 0) return; // Active
      autoPlayRef.current = false;
      gsap.killTweensOf(indicatorRef.current);
      gsap.set(indicatorRef.current, { x: -window.innerWidth });

      // Queue multiple next steps
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
      
      // Update Refs
      orderRef.current = newOrder;
      detailsEvenStateRef.current = newDetailsEven;

      // Sync State for React Render
      setOrder(newOrder);
      setDetailsEven(newDetailsEven);
      
      // Update Text Indices BEFORE animation
      setTextIndices(prev => ({
          ...prev,
          even: newDetailsEven ? newOrder[0] : prev.even,
          odd: !newDetailsEven ? newOrder[0] : prev.odd
      }));

      const detailsActive = newDetailsEven ? detailsEvenRef.current : detailsOddRef.current;
      const detailsInactive = newDetailsEven ? detailsOddRef.current : detailsEvenRef.current;
      const detailsActiveId = newDetailsEven ? 'details-even' : 'details-odd';
      const detailsInactiveId = newDetailsEven ? 'details-odd' : 'details-even';

      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
      gsap.to(`#${detailsActiveId} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
      gsap.to(`#${detailsActiveId} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
      
      // Resolve promise after CTA animates (rough end of sequence)
      gsap.to(`#${detailsActiveId} .cta`, {
        y: 0,
        delay: 0.35,
        duration: 0.4,
        ease,
        onComplete: () => {
            // Check for restart autoLoop if needed, otherwise just resolve
            if (autoPlayRef.current && actionQueueRef.current.length === 0) {
                 startAutoLoop();
            }
            resolve(); // IMPORTANT: Resolve here so queue can continue
        }
      });
      gsap.set(detailsInactive, { zIndex: 12 });

      const active = newOrder[0];
      const rest = newOrder.slice(1);
      const prv = rest[rest.length - 1]; // This is the item that WAS at 0, now at end

      gsap.set(cardsRef.current[prv], { zIndex: 10 });
      gsap.set(cardsRef.current[active], { zIndex: 20 });
      gsap.to(cardsRef.current[prv], { scale: 1.5, ease });

      gsap.to(cardContentsRef.current[active], {
        y: offsetTopRef.current + cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease
      });
      gsap.to(slideItemsRef.current[active], { x: 0, ease });
      gsap.to(slideItemsRef.current[prv], { x: -numberSize, ease });
      gsap.to(progressRef.current, {
        width: 500 * (1 / newOrder.length) * (active + 1),
        ease
      });

      gsap.to(cardsRef.current[active], {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = offsetLeftRef.current + (rest.length - 1) * (cardWidth + gap);
          gsap.set(cardsRef.current[prv], {
            x: xNew,
            y: offsetTopRef.current,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1
          });

          gsap.set(cardContentsRef.current[prv], {
            x: xNew,
            y: offsetTopRef.current + cardHeight - 100,
            opacity: 1,
            zIndex: 40
          });
          gsap.set(slideItemsRef.current[prv], { x: rest.length * numberSize });

          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`#${detailsInactiveId} .text`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .title-1`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .title-2`, { y: 100 });
          gsap.set(`#${detailsInactiveId} .desc`, { y: 50 });
          gsap.set(`#${detailsInactiveId} .cta`, { y: 60 });
        }
      });

      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeftRef.current + index * (cardWidth + gap);
          gsap.set(cardsRef.current[i], { zIndex: 30 });
          gsap.to(cardsRef.current[i], {
            x: xNew,
            y: offsetTopRef.current,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1)
          });

          gsap.to(cardContentsRef.current[i], {
            x: xNew,
            y: offsetTopRef.current + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1)
          });
          gsap.to(slideItemsRef.current[i], { x: (index + 1) * numberSize, ease });
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
        
        // Update Refs
        orderRef.current = newOrder;
        detailsEvenStateRef.current = newDetailsEven;
        
        // Update State
        setOrder(newOrder);
        setDetailsEven(newDetailsEven);
        
        // Update Indices
        setTextIndices(prev => ({
          ...prev,
          even: newDetailsEven ? newOrder[0] : prev.even,
          odd: !newDetailsEven ? newOrder[0] : prev.odd
        }));
        

        const detailsActive = newDetailsEven ? detailsEvenRef.current : detailsOddRef.current;
        const detailsInactive = newDetailsEven ? detailsOddRef.current : detailsEvenRef.current;
        const detailsActiveId = newDetailsEven ? 'details-even' : 'details-odd';
        const detailsInactiveId = newDetailsEven ? 'details-odd' : 'details-even';

        // 1. Animate Details (Text) - Same entry animation
        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`#${detailsActiveId} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`#${detailsActiveId} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`#${detailsActiveId} .cta`, {
            y: 0,
            delay: 0.35,
            duration: 0.4,
            ease,
            onComplete: () => {
                if (autoPlayRef.current && actionQueueRef.current.length === 0) {
                     startAutoLoop();
                }
                resolve();
            }
        });
        gsap.set(detailsInactive, { zIndex: 12 });

        // 2. Animate Cards
        const active = newOrder[0]; // The one becoming active (was last)
        const oldActive = order[0]; // The one leaving active (moves to pos 0)
        const rest = newOrder.slice(1);
        
        // oldActive moves from FullScreen(0,0) to cards stack Pos 0
        gsap.set(cardsRef.current[oldActive], { zIndex: 30 }); // reset z-index
        gsap.to(cardsRef.current[oldActive], {
            x: offsetLeftRef.current, // Pos 0
            y: offsetTopRef.current,
            width: cardWidth,
            height: cardHeight,
            borderRadius: 10,
            ease
        });
        // Content reappear
        gsap.to(cardContentsRef.current[oldActive], {
            x: offsetLeftRef.current,
            y: offsetTopRef.current + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease
        });
        
        // newActive moves from Tail to FullScreen
        // Since it was at tail, we animate it to 0,0
        gsap.set(cardsRef.current[active], { zIndex: 20 });
        gsap.to(cardsRef.current[active], {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            ease
        });
         gsap.to(cardContentsRef.current[active], {
            y: offsetTopRef.current + cardHeight - 10,
            opacity: 0,
            duration: 0.3,
            ease
        });
        
        // Progress Bar Update
        gsap.to(progressRef.current, {
            width: 500 * (1 / newOrder.length) * (active + 1),
            ease
        });

        // Slide Items (Numbers)
        // newActive number: snap to -50, animate to 0.
        // oldActive number: animate to 50.
        // others: animate to +50?
        
        // Reset newActive number to start from left (-50)
        gsap.set(slideItemsRef.current[active], { x: -numberSize });
        gsap.to(slideItemsRef.current[active], { x: 0, ease });
        
        // Shift all others
        rest.forEach((i, index) => {
             // rest[0] is oldActive. index=0. to 50.
             // rest[1] is old rest[0]. index=1. to 100.
             gsap.to(slideItemsRef.current[i], { x: (index + 1) * numberSize, ease });
             
             // Move cards in stack right
             if (i !== oldActive) {
                 const xNew = offsetLeftRef.current + index * (cardWidth + gap);
                 gsap.to(cardsRef.current[i], {
                    x: xNew,
                    y: offsetTopRef.current,
                    width: cardWidth,
                    height: cardHeight,
                    ease
                 });
                 gsap.to(cardContentsRef.current[i], {
                    x: xNew,
                    y: offsetTopRef.current + cardHeight - 100,
                    opacity: 1,
                    zIndex: 40,
                    ease
                 });
             }
        });
        
        // Cleanup Inactive Details
         gsap.set(detailsInactive, { opacity: 0 });
         gsap.set(`#${detailsInactiveId} .text`, { y: 100 });
         gsap.set(`#${detailsInactiveId} .title-1`, { y: 100 });
         gsap.set(`#${detailsInactiveId} .title-2`, { y: 100 });
         gsap.set(`#${detailsInactiveId} .desc`, { y: 50 });
         gsap.set(`#${detailsInactiveId} .cta`, { y: 60 });
    });
  };

  return (
    <div className="relative w-screen h-screen bg-[#1a1a1a] text-[#FFFFFFDD] overflow-hidden font-['Inter']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap');
      `}</style>

      <div ref={indicatorRef} className="fixed left-0 right-0 top-0 h-[5px] z-[60] bg-[#ecad29]" />

      <nav ref={navRef} className="fixed left-0 top-0 right-0 z-50 flex items-center justify-between px-9 py-5 font-medium">
        <div className="inline-flex items-center gap-2.5 uppercase text-sm">
          <div className="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <div>Globe Express</div>
        </div>
        <div className="inline-flex items-center gap-6 uppercase text-sm">
          <div className="relative">
            Home
            <div className="absolute bottom-[-8px] left-0 right-0 h-[3px] rounded-full bg-[#ecad29]" />
          </div>
          <div>Holidays</div>
          <div>Destinations</div>
          <div>Flights</div>
          <div>Offers</div>
          <div>Contact</div>
          <div className="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div className="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Cards Render */}
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div
            ref={el => cardsRef.current[index] = el}
            onClick={() => handleCardClick(order.indexOf(index))}
            className="absolute left-0 top-0 bg-center bg-cover shadow-[6px_6px_10px_2px_rgba(0,0,0,0.6)] cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div
            ref={el => cardContentsRef.current[index] = el}
            className="absolute left-0 top-0 text-[#FFFFFFDD] pl-4 pointer-events-none"
          >
            <div className="w-[30px] h-[5px] rounded-full bg-[#FFFFFFDD]" />
            <div className="mt-1.5 text-[13px] font-medium">{item.place}</div>
            <div className="font-semibold text-[20px] font-['Oswald']">{item.title}</div>
            <div className="font-semibold text-[20px] font-['Oswald']">{item.title2}</div>
          </div>
        </React.Fragment>
      ))}

      {/* Details Even */}
      <div ref={detailsEvenRef} id="details-even" className="z-[22] absolute top-[240px] left-[60px]">
        <div className="h-[46px] overflow-hidden">
          <div className="text pt-4 text-[20px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-1 before:rounded-full before:bg-white">
            {data[textIndices.even].place}
          </div>
        </div>
        <div className="mt-0.5 h-[100px] overflow-hidden">
          <div className="title-1 font-semibold text-[72px] font-['Oswald']">{data[textIndices.even].title}</div>
        </div>
        <div className="mt-0.5 h-[100px] overflow-hidden">
          <div className="title-2 font-semibold text-[72px] font-['Oswald']">{data[textIndices.even].title2}</div>
        </div>
        <div className="desc mt-4 w-[500px]">{data[textIndices.even].description}</div>
        <div className="cta w-[500px] mt-6 flex items-center">
            {/* CTA Buttons... */}
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
      <div ref={detailsOddRef} id="details-odd" className="z-[22] absolute top-[240px] left-[60px]">
        <div className="h-[46px] overflow-hidden">
          <div className="text pt-4 text-[20px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-1 before:rounded-full before:bg-white">
            {data[textIndices.odd].place}
          </div>
        </div>
        <div className="mt-0.5 h-[100px] overflow-hidden">
          <div className="title-1 font-semibold text-[72px] font-['Oswald']">{data[textIndices.odd].title}</div>
        </div>
        <div className="mt-0.5 h-[100px] overflow-hidden">
          <div className="title-2 font-semibold text-[72px] font-['Oswald']">{data[textIndices.odd].title2}</div>
        </div>
        <div className="desc mt-4 w-[500px]">{data[textIndices.odd].description}</div>
        <div className="cta w-[500px] mt-6 flex items-center">
           {/* CTA Buttons... */}
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

      <div ref={paginationRef} className="absolute left-0 top-0 inline-flex">
        <div 
            onClick={handlePrevStep}
            className="arrow-left z-[60] w-[50px] h-[50px] rounded-full border-2 border-[#ffffff55] grid place-items-center cursor-pointer hover:bg-[#ffffff22] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-[2] text-[#ffffff99]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div 
            onClick={() => handleNextStep(false)}
            className="arrow-right ml-5 z-[60] w-[50px] h-[50px] rounded-full border-2 border-[#ffffff55] grid place-items-center cursor-pointer hover:bg-[#ffffff22] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-[2] text-[#ffffff99]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="ml-6 z-[60] w-[500px] h-[50px] flex items-center">
          <div className="w-[500px] h-[3px] bg-[#ffffff33]">
            <div ref={progressRef} className="h-[3px] bg-[#ecad29]" />
          </div>
        </div>
        <div className="w-[50px] h-[50px] overflow-hidden z-[60] relative">
          {data.map((_, index) => (
            <div
              key={index}
              ref={el => slideItemsRef.current[index] = el}
              className="w-[50px] h-[50px] absolute text-white top-0 left-0 grid place-items-center text-[32px] font-bold"
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