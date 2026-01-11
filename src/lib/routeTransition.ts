import gsap from "gsap";

/**
 * Route Transition Animation Types
 */
export type TransitionType =
  | "flip3D" // 3D flip rotation effect
  | "slideWipe" // Horizontal slide/wipe effect
  | "rotateScale" // Rotation with scale effect
  | "accordion" // Vertical accordion collapse/expand
  | "swirl" // Swirling rotation with perspective
  | "cubeRotate" // 3D cube rotation effect
  | "doorSwing" // Door swing open/close effect
  | "ripple" // Ripple distortion effect
  | "elastic" // Elastic bounce effect
  | "kaleidoscope" // Multi-axis rotation effect
  | "overlay"; // Animated overlay effect

// Default transition type
let currentTransitionType: TransitionType = "rotateScale";

// Store the transition type for the current transition
let activeTransitionType: TransitionType | null = null;

/**
 * Set the transition type for route animations (global default)
 */
export function setTransitionType(type: TransitionType) {
  currentTransitionType = type;
}

/**
 * Get the current transition type (global default)
 */
export function getTransitionType(): TransitionType {
  return currentTransitionType;
}

/**
 * Set the active transition type for the current transition
 * This is used to pass the type from TransitionLink to PageTransitionHandler
 */
export function setActiveTransitionType(type: TransitionType | null) {
  activeTransitionType = type;
}

/**
 * Get the active transition type for the current transition
 */
export function getActiveTransitionType(): TransitionType | null {
  return activeTransitionType;
}

/**
 * Create and animate transition overlay with block/pixel effect
 */
export function createTransitionOverlay(): Promise<void> {
  return new Promise((resolve) => {
    // Create overlay container
    let overlay = document.getElementById("page-transition-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "page-transition-overlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(20, 1fr);
        gap: 0;
      `;

      // Create grid of blocks
      const colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe"];
      for (let i = 0; i < 400; i++) {
        const block = document.createElement("div");
        block.className = "overlay-block";
        block.style.cssText = `
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          width: 100%;
          height: 100%;
        `;
        overlay.appendChild(block);
      }

      // Add loading text overlay
      const textOverlay = document.createElement("div");
      textOverlay.className = "overlay-text";
      textOverlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        z-index: 10000;
        text-shadow: 0 0 20px rgba(0,0,0,0.5);
      `;
      textOverlay.textContent = "Loading";

      document.body.appendChild(overlay);
      document.body.appendChild(textOverlay);
    }

    const blocks = overlay.querySelectorAll(".overlay-block");
    const textOverlay = document.querySelector(".overlay-text");

    // Animate blocks in with stagger
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    // Set initial state for all blocks
    gsap.set(blocks, {
      scaleY: 0,
      transformOrigin: "top",
    });

    gsap.set(textOverlay, {
      opacity: 0,
      scale: 0.5,
    });

    gsap.set(overlay, {
      display: "grid",
    });

    // Animate blocks appearing in random order
    tl.to(blocks, {
      scaleY: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        amount: 0.6,
        from: "random",
      },
    })
      .to(
        textOverlay,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .to(textOverlay, {
        scale: 1.1,
        duration: 0.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });
  });
}

/**
 * Hide transition overlay with block animation
 */
export function hideTransitionOverlay(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.getElementById("page-transition-overlay");
    const textOverlay = document.querySelector(".overlay-text");

    if (!overlay) {
      resolve();
      return;
    }

    const blocks = overlay.querySelectorAll(".overlay-block");
    const tl = gsap.timeline();

    // Animate text out first
    tl.to(textOverlay, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "power2.in",
    })
      // Then animate blocks out
      .to(blocks, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.8,
        ease: "power2.in",
        stagger: {
          amount: 0.6,
          from: "random",
        },
        onComplete: () => {
          if (overlay) {
            overlay.style.display = "none";
          }
          if (textOverlay) {
            (textOverlay as HTMLElement).style.display = "none";
          }
          resolve();
        },
      });
  });
}

/**
 * Get the exit animation end state for a transition type
 * Used to ensure content stays hidden after exit animation
 */
export function getExitState(type: TransitionType) {
  switch (type) {
    case "flip3D":
      return {
        opacity: 0,
        rotationY: 90,
        scale: 0.8,
        z: -300,
        filter: "blur(8px)",
      };
    case "slideWipe":
      return { opacity: 0, x: "-100%", scale: 0.95, filter: "blur(10px)" };
    case "rotateScale":
      return {
        opacity: 0,
        rotation: 15,
        scale: 0.7,
        y: -100,
        filter: "blur(10px)",
      };
    case "accordion":
      return { scaleY: 0, y: -200, transformOrigin: "top center" };
    case "swirl":
      return {
        rotation: 180,
        rotationX: 90,
        scale: 0.3,
        z: -500,
        filter: "blur(15px)",
      };
    case "cubeRotate":
      return {
        rotationY: -90,
        x: "-50%",
        z: -400,
        transformOrigin: "left center",
      };
    case "doorSwing":
      return { rotationY: -90, transformOrigin: "left center", z: -200 };
    case "ripple":
      return {
        scale: 1.5,
        rotation: 360,
        filter: "blur(20px)",
        transformOrigin: "center center",
      };
    case "elastic":
      return { scaleX: 0, scaleY: 1.2, x: "-100%", rotation: -45 };
    case "kaleidoscope":
      return {
        rotation: 180,
        rotationX: 180,
        rotationY: 180,
        scale: 0.2,
        filter: "blur(20px) hue-rotate(360deg)",
      };
    case "overlay":
      return { opacity: 1 };
    default:
      return {
        opacity: 0,
        y: -120,
        scale: 0.92,
        filter: "blur(12px) brightness(0.8)",
      };
  }
}

/**
 * Get the enter animation initial state for a transition type
 * Used to pre-set the state before navigation for smooth transitions
 */
export function getEnterInitialState(type: TransitionType) {
  switch (type) {
    case "flip3D":
      return {
        opacity: 0,
        rotationY: -90,
        scale: 0.8,
        z: -300,
        filter: "blur(8px)",
      };
    case "slideWipe":
      return { opacity: 0, x: "100%", scale: 0.95, filter: "blur(10px)" };
    case "rotateScale":
      return {
        opacity: 0,
        rotation: -15,
        scale: 0.7,
        y: 100,
        filter: "blur(10px)",
      };
    case "accordion":
      return { scaleY: 0, y: 200, transformOrigin: "top center" };
    case "swirl":
      return {
        rotation: -180,
        rotationX: -90,
        scale: 0.3,
        z: -500,
        filter: "blur(15px)",
      };
    case "cubeRotate":
      return {
        rotationY: 90,
        x: "50%",
        z: -400,
        transformOrigin: "right center",
      };
    case "doorSwing":
      return { rotationY: 90, transformOrigin: "right center", z: -200 };
    case "ripple":
      return {
        scale: 0.2,
        rotation: -360,
        filter: "blur(20px)",
        transformOrigin: "center center",
      };
    case "elastic":
      return { scaleX: 0, scaleY: 1.2, x: "100%", rotation: 45 };
    case "kaleidoscope":
      return {
        rotation: -180,
        rotationX: -180,
        rotationY: -180,
        scale: 0.2,
        filter: "blur(20px) hue-rotate(-360deg)",
      };
    case "overlay":
      return { opacity: 1 };
    default:
      return {
        opacity: 0,
        y: 120,
        scale: 0.92,
        filter: "blur(12px) brightness(0.8)",
      };
  }
}

/**
 * Play exit animation for page transition
 * Returns a promise that resolves when animation completes
 */
export function playExitAnimation(type?: TransitionType): Promise<void> {
  return new Promise((resolve) => {
    const content = document.getElementById("smooth-content");
    if (!content) {
      resolve();
      return;
    }

    const transitionType = type || currentTransitionType;

    // Handle overlay transition separately
    if (transitionType === "overlay") {
      createTransitionOverlay().then(() => {
        resolve();
      });
      return;
    }

    const tl = gsap.timeline({ onComplete: resolve });

    switch (transitionType) {
      case "flip3D":
        // 3D flip rotation effect
        tl.to(content, {
          opacity: 0,
          rotationY: 90,
          scale: 0.8,
          z: -300,
          filter: "blur(8px)",
          duration: 0.9,
          ease: "power3.in",
        });
        break;
      case "slideWipe":
        // Horizontal slide/wipe effect
        tl.to(content, {
          opacity: 0,
          x: "-100%",
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power4.in",
        });
        break;
      case "rotateScale":
        // Rotation with scale effect
        tl.to(content, {
          opacity: 0,
          rotation: 15,
          scale: 0.7,
          y: -100,
          filter: "blur(10px)",
          duration: 0.85,
          ease: "back.in(1.5)",
        });
        break;
      case "accordion":
        // Vertical accordion collapse
        tl.to(content, {
          scaleY: 0,
          y: -200,
          transformOrigin: "top center",
          duration: 0.7,
          ease: "power2.in",
        });
        break;
      case "swirl":
        // Swirling rotation with perspective
        tl.to(content, {
          rotation: 180,
          rotationX: 90,
          scale: 0.3,
          z: -500,
          filter: "blur(15px)",
          duration: 1.0,
          ease: "power2.in",
        });
        break;
      case "cubeRotate":
        // 3D cube rotation
        tl.to(content, {
          rotationY: -90,
          x: "-50%",
          z: -400,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.in",
        });
        break;
      case "doorSwing":
        // Door swing effect
        tl.to(content, {
          rotationY: -90,
          transformOrigin: "left center",
          z: -200,
          duration: 0.8,
          ease: "power2.in",
        });
        break;
      case "ripple":
        // Ripple distortion
        tl.to(content, {
          scale: 1.5,
          rotation: 360,
          filter: "blur(20px)",
          transformOrigin: "center center",
          duration: 0.9,
          ease: "power3.in",
        });
        break;
      case "elastic":
        // Elastic bounce compression
        tl.to(content, {
          scaleX: 0,
          scaleY: 1.2,
          x: "-100%",
          rotation: -45,
          duration: 0.85,
          ease: "back.in(2)",
        });
        break;
      case "kaleidoscope":
        // Multi-axis rotation kaleidoscope
        tl.to(content, {
          rotation: 180,
          rotationX: 180,
          rotationY: 180,
          scale: 0.2,
          filter: "blur(20px) hue-rotate(360deg)",
          duration: 1.1,
          ease: "power2.in",
        });
        break;
      default:
        // Fallback to fadeBlur
        tl.to(content, {
          opacity: 0,
          y: -120,
          scale: 0.92,
          filter: "blur(12px) brightness(0.8)",
          duration: 0.85,
          ease: "power3.in",
        });
    }
  });
}

/**
 * Play enter animation for page transition
 *
 * @param type - Transition type to use
 * @param skipInitialState - If true, skip setting initial state (assumes it's already set)
 */
export function playEnterAnimation(
  type?: TransitionType,
  skipInitialState: boolean = false
) {
  const content = document.getElementById("smooth-content");
  if (!content) return;

  const transitionType = type || currentTransitionType;

  // Handle overlay transition separately
  if (transitionType === "overlay") {
    hideTransitionOverlay();
    return;
  }

  const tl = gsap.timeline();

  switch (transitionType) {
    case "flip3D":
      // 3D flip rotation effect
      if (!skipInitialState) {
        gsap.set(content, {
          opacity: 0,
          rotationY: -90,
          scale: 0.8,
          z: -300,
          filter: "blur(8px)",
        });
      }
      tl.to(content, {
        opacity: 1,
        rotationY: 0,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      });
      break;
    case "slideWipe":
      // Horizontal slide/wipe effect
      if (!skipInitialState) {
        gsap.set(content, {
          opacity: 0,
          x: "100%",
          scale: 0.95,
          filter: "blur(10px)",
        });
      }
      tl.to(content, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power4.out",
      });
      break;
    case "rotateScale":
      // Rotation with scale effect
      if (!skipInitialState) {
        gsap.set(content, {
          opacity: 0,
          rotation: -15,
          scale: 0.7,
          y: 100,
          filter: "blur(10px)",
        });
      }
      tl.to(content, {
        opacity: 1,
        rotation: 0,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(1.2)",
      });
      break;
    case "accordion":
      // Vertical accordion expand
      if (!skipInitialState) {
        gsap.set(content, {
          scaleY: 0,
          y: 200,
          transformOrigin: "top center",
        });
      }
      tl.to(content, {
        scaleY: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      });
      break;
    case "swirl":
      // Swirling rotation with perspective
      if (!skipInitialState) {
        gsap.set(content, {
          rotation: -180,
          rotationX: -90,
          scale: 0.3,
          z: -500,
          filter: "blur(15px)",
        });
      }
      tl.to(content, {
        rotation: 0,
        rotationX: 0,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power2.out",
      });
      break;
    case "cubeRotate":
      // 3D cube rotation
      if (!skipInitialState) {
        gsap.set(content, {
          rotationY: 90,
          x: "50%",
          z: -400,
          transformOrigin: "right center",
        });
      }
      tl.to(content, {
        rotationY: 0,
        x: 0,
        z: 0,
        duration: 1.1,
        ease: "power3.out",
      });
      break;
    case "doorSwing":
      // Door swing effect
      if (!skipInitialState) {
        gsap.set(content, {
          rotationY: 90,
          transformOrigin: "right center",
          z: -200,
        });
      }
      tl.to(content, {
        rotationY: 0,
        z: 0,
        duration: 1.0,
        ease: "power2.out",
      });
      break;
    case "ripple":
      // Ripple distortion
      if (!skipInitialState) {
        gsap.set(content, {
          scale: 0.2,
          rotation: -360,
          filter: "blur(20px)",
          transformOrigin: "center center",
        });
      }
      tl.to(content, {
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
      break;
    case "elastic":
      // Elastic bounce expansion
      if (!skipInitialState) {
        gsap.set(content, {
          scaleX: 0,
          scaleY: 1.2,
          x: "100%",
          rotation: 45,
        });
      }
      tl.to(content, {
        scaleX: 1,
        scaleY: 1,
        x: 0,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      });
      break;
    case "kaleidoscope":
      // Multi-axis rotation kaleidoscope
      if (!skipInitialState) {
        gsap.set(content, {
          rotation: -180,
          rotationX: -180,
          rotationY: -180,
          scale: 0.2,
          filter: "blur(20px) hue-rotate(-360deg)",
        });
      }
      tl.to(content, {
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        filter: "blur(0px) hue-rotate(0deg)",
        duration: 1.4,
        ease: "power2.out",
      });
      break;
    default:
      // Fallback to fadeBlur
      if (!skipInitialState) {
        gsap.set(content, {
          opacity: 0,
          y: 120,
          scale: 0.92,
          filter: "blur(12px) brightness(0.8)",
        });
      }
      tl.to(content, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        duration: 1.2,
        ease: "power3.out",
      });
  }
}
