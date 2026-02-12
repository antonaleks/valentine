import { useNavigate } from 'react-router'
import RunawayButton from '../components/RunawayButton'
import FloatingHearts from '../components/FloatingHearts'

export default function HomePage() {
  const navigate = useNavigate()

  const handleYes = () => {
    navigate('/success')
  }

  return (
    <div className="home-page">
      <FloatingHearts />
      <div className="content">
        <h1 className="title">Будешь моей валентинкой?</h1>
        <div className="buttons-container">
          <button className="btn btn-yes" onClick={handleYes}>
            Да ❤️
          </button>
          <RunawayButton />
        </div>
      </div>
    </div>
  )
}
