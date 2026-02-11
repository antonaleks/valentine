import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/success');
  };

  return (
    <div className="home-page">
      <h1>Будешь моей валентинкой?</h1>
      <div className="buttons">
        <button onClick={handleYes}>Да</button>
        <button>Нет</button>
      </div>
    </div>
  );
}
