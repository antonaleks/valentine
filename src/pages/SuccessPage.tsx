import { Link } from 'react-router'
import FloatingHearts from '../components/FloatingHearts'

export default function SuccessPage() {
  return (
    <div className="success-page">
      <FloatingHearts />
      <div className="content">
        <h1 className="title">Ура! ❤️</h1>
        <p className="subtitle">Ты согласилась быть моей валентинкой!</p>
        <div className="heart-animation">💕</div>
        <div className="photo-placeholder">
          <p>Здесь будут наши фото 📸</p>
          <p className="hint">Добавь фото в папку public/photos/</p>
        </div>
        <Link to="/" className="btn btn-back">
          Вернуться назад
        </Link>
      </div>
    </div>
  )
}
