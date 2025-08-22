import React, { useState } from 'react'
import './CSS/LoginSignup.css'


const LoginSignup = () => {
  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const login = async () => {
    console.log("Login Function", formData);
    let responseData;
    await fetch('https://drapify-backend.onrender.com/login',{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }
  const signup = async () => {
    let responseData;
    await fetch('https://drapify-backend.onrender.com/signup',{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="text" placeholder='Email address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button disabled={
          state === "Sign Up"
            ? !(formData.username && formData.email && formData.password)
            : !(formData.email && formData.password)
        } onClick={() => {
          state === 'Login' ? login() : signup();
        }}>Continue</button>
        {
          state === 'Sign Up' ?
            <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login</span> </p> :
            <p className="loginsignup-login">Create an account <span onClick={() => { setState("Sign Up") }}>Sign Up</span> </p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
