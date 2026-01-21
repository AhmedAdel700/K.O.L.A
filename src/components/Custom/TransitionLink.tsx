"use client";

import { usePageTransition } from "@/app/Providers/PageTransitionContext";
import { playExitAnimation, type TransitionType, setActiveTransitionType, getTransitionType, getExitState, getEnterInitialState } from "@/lib/routeTransition";
import { Link, useRouter } from "@/i18n/navigation";
import { ReactNode, MouseEvent, ComponentProps } from "react";
import gsap from "gsap";

interface TransitionLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  className?: string;
  transitionType?: TransitionType; // Optional: specify transition type for this link
}

export default function TransitionLink({
  href,
  children,
  className,
  transitionType,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const typeToUse = transitionType || getTransitionType();
    setActiveTransitionType(typeToUse);
    startTransition();
    
    const content = document.getElementById("smooth-content");
    
    // Play exit animation
    await playExitAnimation(typeToUse);
    
    // Lock content in exit state to prevent flicker
    if (content) {
      const exitState = getExitState(typeToUse);
      gsap.set(content, exitState);
    }
    
    // Pre-set enter animation initial state before navigation
    // This ensures new page content is ready for animation immediately
    if (content) {
      const enterInitialState = getEnterInitialState(typeToUse);
      gsap.set(content, enterInitialState);
    }
    
    // Ensure exit animation state is locked before navigation
    await new Promise((resolve) => requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    }));
    
    // Navigate - PageTransitionHandler will detect pathname change and play enter animation
    const targetPathname = typeof href === "string" ? href : href.pathname || "/";
    router.push(targetPathname);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
