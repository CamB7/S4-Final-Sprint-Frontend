import '../../index.css';
import './Home.css';

const Home = ({ flights }) => {
  const totalFlights = flights ? flights.length : 0;

  return (
    <>
      <div className="banner">
        <h1 className="title">SKY BEACON</h1>
        <h3 className="slogan">Is it delayed? Probably.</h3>
      </div>
      <div className="bottom">
        <h4>Currently tracking {totalFlights} flights</h4>
        <button className="flight-button">VIEW FLIGHTS</button>
      </div>
    </>
  );
};

export default Home;
