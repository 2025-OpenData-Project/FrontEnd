import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>
      <button onClick={() => navigate('/login')}>Click Me</button>
    </div>
  );
};

export default Home;
