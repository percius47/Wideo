import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { usePwdToggler } from '../custom-hooks/pwdToggle';
import { loginService } from '../services/auth/loginService';
import "./authStyles.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Login() {
    const [formVal, setFormVal] = useState({ email: "", password: "" });
	const [pwdToggle, pwdToggler] = usePwdToggler();
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from.pathname || "/";

	const loginHandler = async (e, email, password) => {
		setFormVal({ email, password });
    console.log("inside handler");
		e.preventDefault();
		try {
			const res = await loginService(email, password);
			if (res.status === 200) {
				localStorage.setItem("tokenVL", res.data.encodedToken);
				localStorage.setItem("isAuthVL", true);

				setAuth({ tokenVL: res.data.encodedToken, isAuthVL: true });

				navigate(from, { replace: true });
			}
		} catch (err) {
			console.log("err", err);
		}
	};
  return (
    <div className='auth-container'>
    
 
  
     <div class="login-card-wrapper">
 <div class="login-card">
     <h2 class="login-heading">Login</h2>
     <div class="login-inputs">
<form
				action=""
				class="form-container"
				onSubmit={(e) => loginHandler(e, formVal.email, formVal.password)}
			>
         <div class="login-input-element">
         <label class="login-label">Email</label>
         <input  placeholder="anyone@example.com" class="login-input-field"
           type="email"
       
           name="email"
           value={formVal.email}
           required
           onChange={(e) =>
               setFormVal((prev) => ({ ...prev, email: e.target.value }))
           }
         />
       
         </div>

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
               onClick={() => pwdToggler()}
       />}

       </div>
         </div>
         </form>
        
        </div>
       
          
         <div class="btn-flex">
             <button className="login-link" 
             onClick={(e)=>loginHandler(e, formVal.email, formVal.password)}
             >
         Login
     </button>
         </div>

         <div class="btn-flex">
             <NavLink className="signup-link" to="/signup">
        Create New Account <span className=" link-col-cta">&gt;</span>
     </NavLink>
         </div>
  
     </div>
    </div>
    </div>
  )
}

export default Login