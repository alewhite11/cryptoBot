import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [prevValue, setPrevValue] = useState(value);
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(prevValue); // Start from the previous value
      setTimeout(() => {
        motionValue.set(value); // Animate to the new value
        setPrevValue(value); // Update the previous value
      }, delay * 1000);
    }
  }, [value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        );
      }
    });
  }, [springValue]);

  // Ensure initial render correctly sets the value
  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.textContent = Intl.NumberFormat("en-US").format(
        value
      );
    }
  }, [isInView, value]);

  return <span ref={ref} className={className} />;
}
