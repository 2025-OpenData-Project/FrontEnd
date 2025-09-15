import { useState, useRef, useEffect } from "react";
import MyModal from "./MyModal";

const HomeUserCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        My
      </button>
      {isOpen && (
        <div className="absolute -left-11 -translate-x-1/2 mt-2 z-50">
          <MyModal setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default HomeUserCard;
