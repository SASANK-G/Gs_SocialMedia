import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../Redux/Actions/AuthAction";

const Auth = () => {
  const [isSignup, setIsSignup]= useState(true)
  const dispatch= useDispatch()
  const [data, setData]=useState({
    firstname:"",
    lastname:"",
    password:"",
    confirmpass:"",
    username:""
  })
  const [confirmPass, setConfirmPass] = useState(true)



  const handleChange=(e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
      data.password === data.confirmpass ?dispatch(signUp(data)):
        setConfirmPass(false)
      }
      else{
        dispatch(logIn(data))
      }
    }
  }

  const resetForm=()=>{
    setConfirmPass(true)
    setData({
    firstname:"",
    lastname:"",
    password:"",
    confirmpass:"",
    username:""
  })
  }


  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>GS Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* <LogIn/> */}
      {/* right side */}
       <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>

        <h3>{isSignup ? "Sign up" :"Log In"}</h3>

        {isSignup &&
          <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
        </div>
        }

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange={handleChange}
            value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
          {isSignup && 
            <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={data.confirmpass}
          />
          }
        </div>
<span style={{display:confirmPass?"none":"block", color:"red", fontSize: '12px', alignSelf:"flex-end",marginRight:"5px"}}>
  *Confirm password is not same
</span>
        <div>
            <span style={{fontSize: '12px', cursor:"pointer"}} onClick={()=>{setIsSignup((prev)=>!prev); resetForm()}}>
              {isSignup? "Already have an account? Login!" : "Dont have an Account? SignUp"}</span>
        </div>
        <button className="button infoButton" type="submit">{isSignup?"Signup" : "Log In "}</button>
      </form>
    </div>
    </div>
  );
};
// function LogIn() {
//     return (
//       <div className="a-right">
//         <form className="infoForm authForm">
//           <h3>Log In</h3>
  
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               className="infoInput"
//               name="username"
//             />
//           </div>
  
//           <div>
//             <input
//               type="password"
//               className="infoInput"
//               placeholder="Password"
//               name="password"
//             />
//           </div>
  
//           <div>
//               <span style={{ fontSize: "12px" }}>
//                 Don't have an account? Sign up
//               </span>
//             <button className="button infoButton">Login</button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// function SignUp() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Sign up</h3>

//         <div>
//           <input
//             type="text"
//             placeholder="First Name"
//             className="infoInput"
//             name="firstname"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="infoInput"
//             name="lastname"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="username"
//             placeholder="Usernames"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="password"
//             placeholder="Password"
//           />
//           <input
//             type="text"
//             className="infoInput"
//             name="confirmpass"
//             placeholder="Confirm Password"
//           />
//         </div>

//         <div>
//             <span style={{fontSize: '12px'}}>Already have an account? Login!</span>
//         </div>
//         <button className="button infoButton" type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }

export default Auth;