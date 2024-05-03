import { useState } from 'react'
import '../App.css'
import './Home.css'
import Signup from '../components/SignUp';
import Login from '../components/Login';

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className='auth-container'>
        <div className="auth">
          <Signup />
        </div>
        <div className="auth">
          <Login />
        </div>
      </div>
    </>
  )
}

export default Home;
