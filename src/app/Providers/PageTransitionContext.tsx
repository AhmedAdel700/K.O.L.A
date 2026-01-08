"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface PageTransitionContextType {
  isTransitioning: boolean;
  transitionDone: boolean;
  startTransition: () => void;
  endTransition: () => void;
  resetTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDone, setTransitionDone] = useState(true);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setTransitionDone(false);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitionDone(true);
  }, []);

  const resetTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitionDone(false);
  }, []);

  // Ensure transitionDone is set to true on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTransitioning) {
        setTransitionDone(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        transitionDone,
        startTransition,
        endTransition,
        resetTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used inside PageTransitionProvider"
    );
  }
  return ctx;
}
