import { useState, useEffect } from 'react'

const PHOTOS = [
  'FullSizeRender 2.JPG',
  'IMG_2745 2.JPG',
  'IMG_2994.JPG',
  'IMG_3284.JPG',
  'IMG_3436.JPG',
  'IMG_3461 2.JPG',
  'IMG_3480 2.JPG',
  'IMG_3834 2.JPG',
  'IMG_4090 2.JPG',
  'IMG_4950 2.JPG',
  'IMG_5232 2.JPG',
  'IMG_6262.JPG',
  'IMG_7271.JPG',
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
            src={`/photos/${PHOTOS[currentIndex]}`}
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
