import { useState } from 'react';
import '../App.css';
import './Home.css';
import Plant from '../components/Plant';
import Garden from '../components/Garden';
import Navbar from '../components/Navbar';
import footerGround from '../assets/images/footerGround.png';
// import the tasklist component
// import TaskList from '../components/TaskList';

function Dashboard() {
  const [count, setCount] = useState(0)

  return (
<>
    <header className="w3-container w3-sand">
      <Navbar />
    </header>

    <main className="w3-row w3-row-padding">

      <div id="garden" className="w3-container w3-col s4 m6 l8">
        <Garden />
     </div>

      <div className="w3-container w3-col s8 m6 l4"> 

        <div id="my-tasks" className="w3-brown myTasksStyle">
          {/* Replace with myTasks component */}
          <h2>My Tasks Go Here</h2>
          <p>Test</p>
        </div>

      </div>

    </main>

    <footer className="w3-container w3-pale-green">
      <img src="{footerGround}" alt="footer ground" className="footerStyle"/>
      <p className="footerTextStyle">Brought to you by Project 3 Superstars</p>
    </footer>
    </>
  );
}