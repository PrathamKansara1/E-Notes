import { React,useState } from 'react'
import '../styles/login.css'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const history = useHistory();

  const [userData, setuserData] = useState({email:"", password:""});

  const handleData = (e)=>{
    setuserData({...userData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const res = await axios.post('http://localhost:5000/login',userData);
    console.log(res);
    if(res.status === 200){
      localStorage.setItem("Token",res.data.jwtToken);
      history.push('/Notes');
    }
    else{
      alert('Something went wrong...')
    }
  }

  return (
    <div className="container loginForm">
        <div className="logincontainer">
            <form className='loginform' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" onChange={handleData} name="email" id="emailLogin" placeholder='Enter Email'/>
                <input type="password" onChange={handleData} name="password" id="paswdLogin" placeholder='Password'/>
                <button type='submit'>Login</button>
                <span><Link to="/Signup">Don't have account? Register</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Login