import { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string; // URL of the image
}

const Hero: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      image: "https://images.t2u.io/upload/a/0-934-AWSS3ea0a0cb7-eb24-4c2c-920a-2d705efdee8e-1RGJ_M.jpg",
    },
    {
      id: 2,
      image: "https://images.t2u.io/upload/a/0-917-AWSS370d89704-b1c9-4544-a510-250843909bc9-aBSf_M.jpg",
    },
    {
      id: 3,
      image: "https://images.t2u.io/upload/a/0-929-AWSS3dab26b3a-b57f-48a2-8985-ea59aedb1680-4QDD_M.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0"
          ></div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-[#D6AD61]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
