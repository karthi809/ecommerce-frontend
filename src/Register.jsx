import React, { useState } from 'react'
import './Register.css';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {

  const navigate=useNavigate();

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[num,setNum]=useState("");
  const[pass,setPass]=useState("");
  const[conPass,setConPass]=useState("");
  // const[log,setLog]=useState(false);
  const[loading,setLoading]=useState(false);


  const submit=(e)=>{
    e.preventDefault();
  }

  const save=async()=>{
    if(name.trim() === ""){
        alert("Name is required");
        return;
    }

    if(name.length < 4){
        alert("Name must contain at least 4 characters");
        return;
    }

    // EMAIL

    if(email.trim() === ""){
        alert("Email is required");
        return;
    }

    if(!email.includes("@")){
        alert("Enter valid email");
        return;
    }

    // PHONE NUMBER

    if(num.trim() === ""){
        alert("Phone number is required");
        return;
    }

    if(num.length !== 10){
        alert("Phone number must be 10 digits");
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

    // CONFIRM PASSWORD

    if(conPass.trim() === ""){
        alert("Confirm your password");
        return;
    }

    if(pass !== conPass){
        alert("Passwords do not match");
        return;
    }

    //BACKEND
    setLoading(true);

    try{
      const response=await fetch("https://fullstack-project-1h1g.onrender.com/api/users/store",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            name:name,
            email:email,
            contactNumber:Number(num),
            password:pass,
            confirmPassword:conPass
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

  // if(log){
  //   return(
  //     navigate("/dashboard")
  //   )
  // }

  return (
    <div className='register'>
      <title>register</title>
      <p className='title'>Register Page</p>
      <form onSubmit={submit} autoComplete="off">
        <div className='f1'>
          <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} ></input>
        </div>
        <div className='f2'>
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value) } autoComplete="new-email"></input>
        </div>
        <div className='f3'>
          <input type="number" placeholder='Contact Number' value={num} onChange={(e)=>setNum(e.target.value)}></input>
        </div>
        <div className='f7'>
          <input type="password" placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} autoComplete="new-password"></input>
        </div>

        <div className='f5'>
          <input type='Password' placeholder='Confirm Password' value={conPass} onChange={(e)=>setConPass(e.target.value)}></input>
        </div>
        
        <button className='f6' type="submit" onClick={save} disabled={loading}> {loading ? "Registering..." : "Register"}</button><br></br>

        <Link className='l1' to={"/login"} >Already Registered,Login</Link>
      </form>
    </div>
  )
}


export default Register;