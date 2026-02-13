import { useState } from 'react'

const BASE_URL = import.meta.env.BASE_URL || '/'

const PHOTOS = [
  { file: 'FullSizeRender.JPG', desc: 'Наш мини марафон в Дубае' },
  { file: 'IMG_2745.JPG', desc: 'Под пещеркой на Бали' },
  { file: 'IMG_2994.JPG', desc: 'День приезда на Бали оказался мокреньким)' },
  { file: 'IMG_3063.JPG', desc: 'Наша яхта в Дубае!' },
  { file: 'IMG_3284.JPG', desc: 'Балийские закаты' },
  { file: 'IMG_3436.JPG', desc: 'Нуса Пенида во всей красе' },
  { file: 'IMG_3461.JPG', desc: 'Модники в дубайском молле' },
  { file: 'IMG_3480.JPG', desc: 'Чилим на кроватке' },
  { file: 'IMG_3834.JPG', desc: 'Покоряем самые красивые пляжи' },
  { file: 'IMG_4090.JPG', desc: 'Кормим слоников' },
  { file: 'IMG_4950.JPG', desc: 'Снова в Дубае в лучшем районе блувотерс' },
  { file: 'IMG_5232.JPG', desc: 'В бассике с лучшими видами' },
  { file: 'IMG_5781.JPG', desc: 'Милота в лесной чаще' },
  { file: 'IMG_6262.JPG', desc: 'В лифте в лучшее будущее' },
  { file: 'IMG_7271.JPG', desc: 'Место силы - горы)' },
  { file: 'IMG_7855.JPG', desc: 'Семья - начало!' },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDescription, setShowDescription] = useState(false)

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length)
    setShowDescription(false)
  }

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)
    setShowDescription(false)
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  const currentPhoto = PHOTOS[currentIndex]

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <button className="gallery-nav gallery-prev" onClick={prevPhoto}>‹</button>
        
        <div className="gallery-image-wrapper" onClick={toggleDescription}>
          {showDescription ? (
            <div className="photo-description-card">
              <p>{currentPhoto.desc}</p>
              <span className="click-hint">Нажми для фото</span>
            </div>
          ) : (
            <>
              <img 
                src={`${BASE_URL}photos/${currentPhoto.file}`}
                alt={`Фото ${currentIndex + 1}`}
                className="gallery-image"
              />
              <div className="click-hint-overlay">Нажми для истории</div>
            </>
          )}
          <div className="gallery-counter">{currentIndex + 1} / {PHOTOS.length}</div>
        </div>
        
        <button className="gallery-nav gallery-next" onClick={nextPhoto}>›</button>
      </div>
      
      <div className="gallery-dots">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => { setCurrentIndex(index); setShowDescription(false) }}
          />
        ))}
      </div>
    </div>
  )
}
