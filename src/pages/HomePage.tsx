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
        <div className="title-container">
          <span className="subtitle-greeting">Лерочка,</span>
          <h1 className="title">
            моя любимая принцесса
          </h1>
          <span className="subtitle-question">ты будешь моей валентинкой?</span>
        </div>
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
