import { useNavigate } from 'react-router-dom';
import '../../index.css';
import './Home.css';
import Button from '../../components/Button.jsx';

const Home = ({ flights }) => {
  const navigate = useNavigate();
  const totalFlights = flights ? flights.length : 0;

  return (
    <>
      <div className="banner">
        <h1 className="title">SKY BEACON</h1>
        <h3 className="slogan">Is it delayed? Probably.</h3>
      </div>
      <div className="bottom">
        <h4>Currently tracking {totalFlights} flights</h4>
        <Button
          text="VIEW FLIGHTS"
          onClick={() => navigate('/flights')}
        ></Button>
      </div>
    </>
  );
};

export default Home;
