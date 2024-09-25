import React, { useEffect, useRef, useState } from 'react';
import { data } from '../Assets/data';
import './style.css';

const ImageSlider = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    setCurrentIndex(prevIndex => {
      if (direction === 'prev') {
        return Math.max(prevIndex - 1, 0);
      } else {
        return Math.min(prevIndex + 1, data.length - 1);
      }
    });
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef}>
            {data.map(item => (
              <li key={item.id}>
                <img src={item.imgUrl} width={500} height={280} alt={item.description} />
              </li>
            ))}
          </ul>
        </div>
        <div className="dots-container">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
