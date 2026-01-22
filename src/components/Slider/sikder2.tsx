'use client';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

interface SlideData {
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
}

interface SliderType2Props {
  data: SlideData[];
}

const SliderType2: React.FC<SliderType2Props> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const navsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const autoplayTimerRef = useRef<number | null>(null);
  const AUTOPLAY_DELAY = 3000;

  const clearAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const startAutoplayTimer = () => {
    clearAutoplayTimer();
    if (!isPlaying) return;

    autoplayTimerRef.current = window.setTimeout(() => {
      const index = currentIndexRef.current;
      const nextIndex = index >= data.length - 1 ? 0 : index + 1;
      scrollToSection(nextIndex);
    }, AUTOPLAY_DELAY);
  };

  const scrollToSection = (index: number, duration = 1.2) => {
    if (index < 0 || index >= data.length) return;

    isAnimatingRef.current = true;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    clearAutoplayTimer();

    gsap.to(sectionsRef.current, {
      xPercent: -100 * index,
      duration,
      ease: 'power2.inOut',
      onUpdate: updateNavPositions,
      onComplete: () => {
        isAnimatingRef.current = false;
        startAutoplayTimer();
      },
    });
  };

  const toggleAutoplay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) startAutoplayTimer();
      else clearAutoplayTimer();
      return next;
    });
  };

  const updateNavPositions = () => {
    const navWidth = 56; // match w-14
    navsRef.current.forEach((nav, index) => {
      if (!nav || !sectionsRef.current[index]) return;
      const sectionLeft =
        sectionsRef.current[index].getBoundingClientRect().left;

      nav.style.left = `${Math.min(
        Math.max(sectionLeft, navWidth * index),
        window.innerWidth - navWidth * (data.length - index)
      )}px`;
    });
  };

  useGSAP(
    () => {
      startAutoplayTimer();

      const observer = Observer.create({
        type: 'touch,pointer',
        tolerance: 10,
        preventDefault: true,
        onLeft: () => {
          if (!isAnimatingRef.current && currentIndexRef.current < data.length - 1) {
            scrollToSection(currentIndexRef.current + 1);
          }
        },
        onRight: () => {
          if (!isAnimatingRef.current && currentIndexRef.current > 0) {
            scrollToSection(currentIndexRef.current - 1);
          }
        },
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

        if (['ArrowRight', 'PageDown', ' '].includes(e.key) && currentIndexRef.current < data.length - 1) {
          scrollToSection(currentIndexRef.current + 1);
        }
        if (['ArrowLeft', 'PageUp'].includes(e.key) && currentIndexRef.current > 0) {
          scrollToSection(currentIndexRef.current - 1);
        }
        if (e.key === 'Home') scrollToSection(0);
        if (e.key === 'End') scrollToSection(data.length - 1);
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        observer.kill();
        window.removeEventListener('keydown', handleKeyDown);
        clearAutoplayTimer();
      };
    },
    { dependencies: [isPlaying], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen relative flex overflow-hidden bg-[#f2f2f2] text-[#1c1c1c] select-none"
      style={{ fontFamily: '"Libre Baskerville", serif' }}
    >
      {/* Slides */}
      {data.map((item, index) => (
        <div
          key={index}
          ref={(el) => el && (sectionsRef.current[index] = el)}
          className="flex w-full h-full flex-shrink-0 z-0"
        >
          <div
            className="w-full h-full flex justify-center items-center flex-col gap-4 p-4 bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.image})`,
              transition: 'transform 0.6s ease-out',
            }}
          >
            <h2 className="text-4xl font-bold uppercase">{item.title}</h2>
            <h3 className="text-2xl font-semibold uppercase">{item.title2}</h3>
            <p className="max-w-md text-center">{item.description}</p>
            <span className="italic mt-2">{item.place}</span>
          </div>
        </div>
      ))}

      {/* Navigation */}
      {data.map((item, index) => {
        const isFirstNavHidden = index === 0 && currentIndex === 0;
        const navWidth = 56; // match w-14

        return (
          <div
            key={index}
            ref={(el) => { if (el) navsRef.current[index] = el; }}
            onClick={() => scrollToSection(index)}
            className="h-full w-14 flex flex-col justify-between items-center absolute cursor-pointer z-20 overflow-hidden"
            style={{
              right: `${index === 0 ? 0 : navWidth * (data.length - index)}px`, // flush first nav
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: isFirstNavHidden ? 0 : 1,
              pointerEvents: isFirstNavHidden ? 'none' : 'auto',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            <span
              className="absolute left-1/2 top-1/2 whitespace-nowrap uppercase font-bold text-white text-xs"
              style={{
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
              }}
            >
              {item.title}
            </span>
            <div className="text-sm font-bold text-white">{`0${index + 1}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SliderType2;
