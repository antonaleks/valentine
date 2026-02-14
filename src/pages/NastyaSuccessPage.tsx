import { Link } from 'react-router'
import FloatingHearts from '../components/FloatingHearts'

export default function NastyaSuccessPage() {
  return (
    <div className="success-page">
      <FloatingHearts />
      <div className="content">
        <h1 className="title">Ура! 💕</h1>
        <p className="subtitle" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          Ты согласилась стать моей валентинкой!
        </p>
        <div className="heart-animation">❤️</div>
        
        <Link to="/nastya" className="btn btn-back">
          Вернуться назад
        </Link>
      </div>
    </div>
  )
}
