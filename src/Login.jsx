import React, { useState } from 'react'
import './Login.css';
import { useNavigate,Link} from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate();

  
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[log,setLog]=useState(false);



  const submit=(e)=>{
    e.preventDefault();
  }

  const save=()=>{

    // EMAIL

    if(email.trim() === ""){
        alert("Email is required");
        return;
    }

    if(!email.includes("@")){
        alert("Enter valid email");
        return;
    }

    // PASSWORD

    if(pass.trim() === ""){
        alert("Password is required");
        return;
    }

    if(pass.length < 6){
        alert("Password must contain at least 6 characters");
        return;
    }

    setLog(true);
  }

  if(log){
    return(
      navigate("/dashboard")
    )
  }

  return (

    <div className='login'>
          <title>register</title>
          <p className='title'>Login Page</p>

          <form onSubmit={submit}>
            
            <div className='f2'>
              <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            
            <div className='f3'>
              <input type="password" placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)}></input>
            </div>
            
            <button className='f4' type="submit" onClick={save} >Login</button><br></br>
    
            <Link className='l1' to={"/"} >Don't have an Account,Register here</Link>
          </form>

        </div>

  )
}

export default Login