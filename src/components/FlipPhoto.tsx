import { useState } from 'react'

interface FlipPhotoProps {
  src: string
  alt: string
  description: string
}

export default function FlipPhoto({ src, alt, description }: FlipPhotoProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`flip-photo ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-photo-inner">
        <div className="flip-photo-front">
          <img src={src} alt={alt} className="flip-photo-image" />
          <div className="flip-hint">Нажми, чтобы узнать историю</div>
        </div>
        <div className="flip-photo-back">
          <div className="flip-photo-description">
            <h3>История фото</h3>
            <p>{description}</p>
            <span className="flip-back-hint">Нажми, чтобы вернуться</span>
          </div>
        </div>
      </div>
    </div>
  )
}
