import { useState, useEffect } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { login } from '../AuthService';
import '../App.css'

/* Form platform for user login */
export default function LoginForm({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  /* Check email and passowrd validity upon user input  */
  useEffect(() => {
    const valid = email && password
      setIsValid(valid);
    }, [email, password]);

  /* Submit login attempt to be if cradentials are valid  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) {
      onLogin();
    } else {
      setError(res.detail || 'Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
      <FloatLabel className="mt-5">
        <InputText id="email" value={email} className="card" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="email">Email</label>
      </FloatLabel>
      <FloatLabel className="mt-5">
        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
        <label htmlFor="password">Password</label>
      </FloatLabel>
      {error && <small className="p-error mt-2">{error}</small>}
      </div>
      <Button label="Login" type="submit" disabled={!isValid} severity="info" className="mt-4" />
      
      <div className="mt-3 flex justify-content-center ">
        <span className="mr-2">Don't have an account?</span>
        <span onClick={switchToRegister} style={{ cursor: 'pointer', color: '#007ad9', textDecoration: 'underline' }}>Register</span>
      </div>
    </form>
  );
}
