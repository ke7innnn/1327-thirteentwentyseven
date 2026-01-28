/**
 * Global Motion System
 * Consistent easing, timing, and animation variants for editorial feel
 */

import { Variants, Transition } from "framer-motion";

// ============================================================================
// EASING & TIMING
// ============================================================================

/**
 * Primary easing curve - smooth, editorial ease-out
 * Use for all entrance animations and transitions
 */
export const EASING = [0.16, 1, 0.3, 1] as const;

/**
 * Standard animation durations
 */
export const DURATION = {
    fast: 0.4,
    normal: 0.6,
    slow: 0.8,
    slower: 1.0,
} as const;

/**
 * Standard delays for staggered animations
 */
export const STAGGER = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
} as const;

// ============================================================================
// BASE TRANSITION
// ============================================================================

/**
 * Default transition configuration
 */
export const baseTransition: Transition = {
    duration: DURATION.normal,
    ease: EASING,
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Fade in with upward motion (primary entrance pattern)
 */
export const fadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: baseTransition,
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { ...baseTransition, duration: DURATION.fast },
    },
};

/**
 * Fade in only (no translation)
 */
export const fadeIn: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: baseTransition,
    },
    exit: {
        opacity: 0,
        transition: { ...baseTransition, duration: DURATION.fast },
    },
};

/**
 * Stagger container for child animations
 */
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: STAGGER.normal,
        },
    },
};

/**
 * Stagger item (use with staggerContainer)
 */
export const staggerItem: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: baseTransition,
    },
};

// ============================================================================
// VIEWPORT CONFIGURATION
// ============================================================================

/**
 * Standard viewport configuration for scroll-triggered animations
 */
export const viewportConfig = {
    once: true,
    margin: "-10% 0px -10% 0px",
} as const;

/**
 * Viewport configuration for elements that should animate earlier
 */
export const viewportEarly = {
    once: true,
    margin: "0px 0px -20% 0px",
} as const;

// ============================================================================
// HOVER EFFECTS
// ============================================================================

/**
 * Gentle hover lift for cards and interactive elements
 */
export const hoverLift = {
    y: -4,
    transition: {
        duration: 0.3,
        ease: EASING,
    },
};

/**
 * Subtle hover lift for smaller elements
 */
export const hoverLiftSubtle = {
    y: -3,
    transition: {
        duration: 0.3,
        ease: EASING,
    },
};

/**
 * Gentle scale for hover interactions
 */
export const hoverScale = {
    scale: 1.02,
    transition: {
        duration: 0.3,
        ease: EASING,
    },
};

/**
 * Subtle scale for smaller elements
 */
export const hoverScaleSubtle = {
    scale: 1.01,
    transition: {
        duration: 0.3,
        ease: EASING,
    },
};
