import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { usePwdToggler } from '../custom-hooks/pwdToggle';
import { signupService } from '../services/auth/signupService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {toast} from "react-hot-toast"
import "./authStyles.css"
function Signup() {
  const [formVal, setFormVal] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const [pwdToggle, pwdToggler] = usePwdToggler();
	const signUpHandler = async (e, email, password, firstName, lastName) => {
		e.preventDefault();

		try {
			const res = await signupService(email, password, firstName, lastName);
			if (res.status === 201) {
        console.log("201");
				localStorage.setItem("tokenVL", res.data.encodedToken);
				localStorage.setItem("sVL", true);
				setAuth({ tokenVL: res.data.encodedToken, isAuthVL: true });
				navigate("/explore");
			}
		} catch (err) {
      toast.error("error signing you up")
			console.log("err", err);
		}
	};
  return (
    <div className='auth-container'>
    
  <div class="signup-card-wrapper">
<div class="login-card">
  <h2 class="login-heading">Signup</h2>
  <div class="login-inputs">
<form  onSubmit={(e) =>
				signUpHandler(
					e,
					formVal.email,
					formVal.password,
					formVal.firstName,
					formVal.lastName
				)
			}>
  <div class="login-input-element">
      <label class="login-label">First Name</label>
      <input type="text"  class="login-input-field"
      name="firstname"
      value={formVal.firstName}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, firstName: e.target.value }))
							}
      
      />            
      </div>
      <div class="login-input-element">
      <label class="login-label">Last Name</label>
      <input type="text"  class="login-input-field"
      	value={formVal.lastName}
        required
        onChange={(e) =>
          setFormVal((prev) => ({ ...prev, lastName: e.target.value }))
        }
      />            
      </div>
      <div class="login-input-element">
      <label class="login-label">Email</label>
      <input type="email" placeholder="anyone@example.com" class="login-input-field"
      name="email"
      required
      value={formVal.email}
      onChange={(e) =>
        setFormVal((prev) => ({ ...prev, email: e.target.value }))
      }
      />
      
      </div>
{/* Password */}
      <div class="login-input-element">
      <label class="login-label">Password</label>
      <div className=" login-input-field">
      <input className='login-input-pwd'
       	type={`${pwdToggle.type}`}
         id="email-password"
         pattern="^.{8,}$"
         required
         placeholder="Enter Password"
         value={formVal.password}
         onChange={(e) =>
           setFormVal((prev) => ({ ...prev, password: e.target.value }))
         }
     
        />
    {
            pwdToggle.type==="text" && <VisibilityIcon
            className='eye-icon'
            onClick={() => pwdToggler()}
    />}
      {pwdToggle.type==="password" && <VisibilityOffIcon
            className='eye-icon'
      onClick={() =>
       pwdToggler()
      }
    />}

    </div>
      
     
      </div>

      {/* Confirm Pwd */}
      
     
  <div class="btn-flex">
       <NavLink  className="login-link"
      
      to="/explore"

      type='submit'
      onClick={(e)=>{	signUpHandler(
        e,
        formVal.email,
        formVal.password,
        formVal.firstName,
        formVal.lastName
      )}}
      >
      Continue
  </NavLink>
</div>
</form>
  </div>
  </div>
  </div>
  </div>
  )
}

export default Signup