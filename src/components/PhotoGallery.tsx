import { useState, useEffect } from 'react'

const BASE_URL = import.meta.env.BASE_URL || '/'

const PHOTOS = [
  'FullSizeRender.JPG',
  'IMG_2745.JPG',
  'IMG_3063.JPG',
  'IMG_3461.JPG',
  'IMG_3480.JPG',
  'IMG_3834.JPG',
  'IMG_4090.JPG',
  'IMG_4950.JPG',
  'IMG_5232.JPG',
  'IMG_7855.JPG',
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)
  }

  return (
    <div className={`photo-gallery ${isLoaded ? 'loaded' : ''}`}>
      <div className="gallery-container">
        <button className="gallery-nav gallery-prev" onClick={prevPhoto}>
          ‹
        </button>
        
        <div className="gallery-image-wrapper">
          <img
            src={`${BASE_URL}photos/${PHOTOS[currentIndex]}`}
            alt={`Наше фото ${currentIndex + 1}`}
            className="gallery-image"
            loading="lazy"
          />
          <div className="gallery-counter">
            {currentIndex + 1} / {PHOTOS.length}
          </div>
        </div>
        
        <button className="gallery-nav gallery-next" onClick={nextPhoto}>
          ›
        </button>
      </div>
      
      <div className="gallery-dots">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
