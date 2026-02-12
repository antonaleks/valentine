import { Link } from 'react-router'
import FloatingHearts from '../components/FloatingHearts'
import PhotoGallery from '../components/PhotoGallery'

export default function SuccessPage() {
  return (
    <div className="success-page">
      <FloatingHearts />
      <div className="content">
        <h1 className="title">Ура! 💕</h1>
        <p className="subtitle">Ты согласилась быть моей валентинкой!</p>
        <div className="heart-animation">❤️</div>
        
        <div className="gallery-section">
          <h2 className="gallery-title">Наши моменты вместе</h2>
          <PhotoGallery />
        </div>
        
        <Link to="/" className="btn btn-back">
          Вернуться назад
        </Link>
      </div>
    </div>
  )
}
