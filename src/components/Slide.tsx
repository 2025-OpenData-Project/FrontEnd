import { memo } from "react";
import { touristSpots } from "../data/data.ts";
import { useSlideshow } from "../utils/slideShowLogic.ts";

const Slide = () => {
  const { currentSlide, setCurrentSlide } = useSlideshow(touristSpots.length);
  //const navigate = useNavigate();
  const data = touristSpots;

  return (
    <div className="relative mb-12 min-w-[70%] mt-10">
      <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
        {data.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.image || "/placeholder.svg"}
              alt={image.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">{image.name}</h2>
                <p className="text-lg opacity-90">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

const MemoSlide = memo(Slide);
export default MemoSlide;
