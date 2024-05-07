import { useState } from 'react'
import '../App.css'
import './Home.css'
import Signup from '../components/SignUp';
import Login from '../components/Login';
import PlantForm from '../components/PlantForm'
function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
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