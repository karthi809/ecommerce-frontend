import React, { useState } from 'react'
import './Login.css';
import { useNavigate,Link} from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate();

  
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  // const[log,setLog]=useState(false);
  const[loading,setLoading]=useState(false);



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

    setLoading(true);
    setLoading(true);

    try{
      const response=await fetch("https://fullstack-project-1h1g.onrender.com/api/users/store",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            email:email,
            password:pass,
          })
        }
      );//response ends here

      const message=await response.text();

      if(response.ok){
        setName("");
        setConPass("");
        setEmail("");
        setPass("");
        setNum("");
        alert("Registered successfully");
        navigate("/dashboard");
      }
      else{
        alert(message);
      }
    }//try ends here
    catch(error){
      alert("cannot connect to the server,make sure the backend is running.")
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  }

  // if(log){
  //   return(
  //     navigate("/dashboard")
  //   )
  // }

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
            
            <button className='f4' type="submit" onClick={save} disabled={loading}>{loading?"Logging...":"Login"}</button><br></br>
    
            <Link className='l1' to={"/"} >Don't have an Account,Register here</Link>
          </form>

        </div>

  )
}

export default Login