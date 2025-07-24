import { useState, useEffect } from "react";

export const useSlideshow = (itemCount: number, interval = 4000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % itemCount);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval]);

  return { currentSlide, setCurrentSlide };
};
