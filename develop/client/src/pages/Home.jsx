import { useState } from 'react';
import '../App.css';
import './Home.css';
import Signup from '../components/SignUp';
import Login from '../components/Login';
import logo from '../assets/images/plantplanner-square-0.5x.png';
import landingBG from '../assets/images/plant-planner-landingBG.png';


function Home() {
  const [count, setCount] = useState(0)

  const landingContainerStyle = {
    backgroundImage: `url(${landingBG})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
  }
  
  const authContainerStyle = {
    // position: 'fixed',
    // top: '20px',
    // right: '20px', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    gap: '10px',
  };

  const authStyle = {
    width: 'auto', 
  };

  return (
    <>
  <main style={landingContainerStyle} className="w3-container">

    <div className="larger w3-col l9 m12 w3-row w3-padding test">

        <div className="headline-container w3-col l12 w3-left-align w3-padding test">
          <h1 className="headline">The secret to a happy and healthy garden?<span className="pop">Remembering&nbsp;to&nbsp;take&nbsp;care&nbsp;of&nbsp;your&nbsp;plants!</span></h1>
        </div>
  
      <div className="w3-container test"> 

        <div className="promo-blurb w3-left-align w3-col l4 m12 w3-padding test">
          <h2>Turn your <b>black thumb</b> <span className="pop">green</span> with Forget-Me-Not Plant Planner</h2> 
          <p>Keep all the information for your indoor and outdoor plants in one place:</p>
          <ul className="w3-ul">
            <li>Plant names and photos</li>
            <li>Watering schedules</li>
            <li>Single and recurring care tasks</li>
            <li>And more!</li>
          </ul>
        </div>

        <div className="landing-logo w3-col l8 m6 test">
          <div className="w3-center"> 
            <img src={logo} alt="Forget-Me-Not Plant Planner" />
          </div>
        </div>

      </div>

    </div>

    <div className="smaller w3-quarter w3-display-container w3-padding-16 test">

{/*       <div className="watering w3-col l12">
        <img src={watering} alt="watering can" />
      </div> */}

      <div style={authContainerStyle}>
          <div style={authStyle}>
            <Signup />
          </div>

          <div style={authStyle}>
              <Login />
          </div>
      </div>

    </div>

  </main>
    </>
  )
}

export default Home;