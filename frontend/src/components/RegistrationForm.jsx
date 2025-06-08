import { useState, useEffect, useRef } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { register } from '../AuthService'
import '../App.css'

/* Form platform for user registration */
export default function RegisterForm({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const successToast = useRef(null);
  const [isValid, setIsValid] = useState(false);

  /* Check email and passowrd validity upon user input  */
    useEffect(() => {
      const valid = validateEmail(email) ==="" && validatePassword(password) === "" && validateConfirmPassword(confirmPassword) === ""
      setIsValid(valid);
    }, [email, password, confirmPassword]);

  /* Check email validity */
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || value==="") return "Email is required \n";
    if (!regex.test(value)) return "Invalid email format \n";
    return "";
  };

  /* Check password validity */
  const validatePassword = (value) => {
    if (!value || value === "") return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(value)) return "Must include uppercase letter";
    if (!/[0-9]/.test(value)) return "Must include a number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Must include special character"
    return "";
  };

  /* Check passwords mathcing status  */
  const validateConfirmPassword = (value) => {
    if (value !== password) return "Passwords do not match";
    return "";
  };
  
  /* Show pop up of registration status upon submiting  */
  const showSuccessMessage = (ref, severity, header, detail) => {
    ref.current.show({ severity: severity, summary: header, detail: detail, life: 3000 });
  };

  /* Submit registration request to backend if cradentials are valid  */
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the browser from reloading the page when the form is submitted.
    const res = await register(email, password, confirmPassword);
    if (res.message) {
      showSuccessMessage(successToast, 'success', 'Success!', res.message)
    }
    else if (res.error) {
      showSuccessMessage(successToast, 'error', 'Fail!', res.error)
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2>Hello, Gust!</h2>
      <h3>Please Register:</h3>
      <div>
      <FloatLabel className="mt-5">
        <InputText id="email" value={email} className="card" onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(validateEmail(e.target.value));
          }} />
        <label htmlFor="email">Email</label>
      </FloatLabel>
      <div>
        {emailError && <small className="p-error">{emailError}</small>}
      </div>
      <FloatLabel className="mt-4">
        <Password id="password" value={password} onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(validatePassword(e.target.value));
        }} toggleMask feedback={false} />
        <label htmlFor="password">Password</label>
      </FloatLabel>
      <div>
        {passwordError && <small className="p-error">{passwordError}</small>}
      </div>
      <FloatLabel className="mt-4">
        <Password id="confirm-password" value={confirmPassword} onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmError(validateConfirmPassword(e.target.value));
        }} toggleMask feedback={false} />
        <label htmlFor="confirm-password">Confirm Password</label>
      </FloatLabel>
      <div>
        {confirmError && <small className="p-error">{confirmError}</small>}
      </div>
      </div>
      
      <Toast ref={successToast} position="top-center" />

      <Button label="Register" disabled={!isValid} type="submit" severity="info" className="mt-4" />

      <div className="mt-3 flex justify-content-center ">
        <span className="mr-2">Already have an account?</span>
        <span onClick={switchToLogin} style={{ cursor: 'pointer', color: '#007ad9', textDecoration: 'underline' }}>Log in</span>
      </div>
    </form>
  );
}