import { useNavigate } from 'react-router'
import RunawayButton from '../components/RunawayButton'
import FloatingHearts from '../components/FloatingHearts'

export default function NastyaPage() {
  const navigate = useNavigate()

  const handleYes = () => {
    navigate('/nastya/success')
  }

  return (
    <div className="home-page">
      <FloatingHearts />
      <div className="content">
        <div className="title-container">
          <span className="subtitle-greeting">Настенька,</span>
          <h1 className="title">
            будешь моей валентинкой?
          </h1>
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
