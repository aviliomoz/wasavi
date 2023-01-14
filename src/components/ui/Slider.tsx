import { useState, useEffect } from "react";

const images = ["/test2.jpg", "/test2.jpg", "/test2.jpg", "/test2.jpg"];

export const Slider = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const nextSlide = setTimeout(() => {
      if (slide === images.length - 1) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }, 4000);

    return () => {
      clearTimeout(nextSlide);
    };
  }, [slide]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[90%] flex bg-gray-50 rounded-md relative overflow-hidden">
        <img
          alt={`Slider image: ${images[slide]}`}
          src={`${images[slide]}`}
          width="100%"
          height="100%"
        />
      </div>
      <div className="w-full h-[10%] flex justify-center items-center space-x-4">
        {images.map((image, index) => {
          return (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`w-6 h-[3px] rounded-sm bg-emerald-500 ${
                index !== slide && "opacity-20"
              }`}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
