import { useState, useEffect } from 'react';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: '/image2.png',
      text: '',
    },
    {
      src: '/image1.png',
      text: '',
    },
    {
      src: '/1.jpeg',
      text: '',
    },
    {
      src: '/image3.png',
      text: '',
    },
    {
      src: '/image4.png',
      text: '',
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className="text">{image.text}</div>
        </div>
      ))}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <style jsx>{`
        .slider {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          margin-top: 80px;
        }
        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 0.5s ease;
          opacity: 0;
        }
        .slide.active {
          opacity: 1;
        }
        .text {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          font-size: 24px;
        }
        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 100;
        }
        .prev {
          left: 0;
        }
        .next {
          right: 0;
        }
      `}</style>
    </div>
  );
};

export default Slider;
