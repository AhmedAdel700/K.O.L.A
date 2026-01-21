"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { usePageTransition } from "@/app/Providers/PageTransitionContext";
import {
  playEnterAnimation,
  getActiveTransitionType,
  getTransitionType,
  setActiveTransitionType,
  getEnterInitialState,
} from "@/lib/routeTransition";
import gsap from "gsap";

/**
 * PageTransitionHandler handles page transitions in two scenarios:
 *
 * 1. WITH TransitionLink (route transition animation):
 *    - TransitionLink calls startTransition() → isTransitioning = true, transitionDone = false
 *    - Exit animation plays, then navigation happens
 *    - This handler detects pathname change when isTransitioning = true
 *    - Plays enter animation and calls endTransition() → transitionDone = true
 *    - TextEffect components can now animate (they wait for transitionDone = true)
 *
 * 2. WITHOUT TransitionLink (regular Link):
 *    - No startTransition() is called → isTransitioning = false, transitionDone = true (initial state)
 *    - Navigation happens immediately (no exit/enter animations)
 *    - This handler detects pathname change but isTransitioning = false, so no enter animation
 *    - TextEffect components work immediately because transitionDone = true
 *    - Page appears normally without transition animations
 */
export default function PageTransitionHandler() {
  const pathname = usePathname();
  const { isTransitioning, endTransition } = usePageTransition();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only handle enter animation if we're in a transition (TransitionLink was used)
    if (isTransitioning && pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      const transitionType = getActiveTransitionType() || getTransitionType();

      const startEnterAnimation = () => {
      const content = document.getElementById("smooth-content");
        if (!content) return false;

        // Set enter initial state immediately to prevent black screen
        const initialState = getEnterInitialState(transitionType);
        gsap.set(content, initialState);

        // Start enter animation (skip initial state since we already set it)
        playEnterAnimation(transitionType, true);
        setActiveTransitionType(null);
        endTransition();
        return true;
      };

      // Try to start immediately
      if (!startEnterAnimation()) {
        // Wait for content to mount (check every 5ms for fast response)
        const checkContent = setInterval(() => {
          if (startEnterAnimation()) {
            clearInterval(checkContent);
          }
        }, 5);
        
        // Safety timeout
        setTimeout(() => {
          clearInterval(checkContent);
          setActiveTransitionType(null);
          endTransition();
        }, 5); // 50
      }
    } else if (pathname !== previousPathname.current) {
      // Regular navigation (no TransitionLink) - just update pathname ref
      previousPathname.current = pathname;
    }
  }, [pathname, isTransitioning, endTransition]);

  return null;
}
