import { useState, useEffect } from 'react';
import RegisterForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { getUser } from './AuthService';
import './app.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


function App() {
  const [view, setView] = useState("login"); // responsible for user routing, default is login page

/* If token exists in local storage - user is logged in, show user dashboard */
  useEffect(() => {
    const user = getUser();
    if (user) setView("dashboard");
  }, []);

  /* Show user dashboard upon successful login */
  const handleLoginSuccess = () => {
    setView("dashboard");
  };

  /* Show login page upon logging out */
  const handleLogout = () => {
    setView("login");
  };

  return (
    <div className="app-container">
      {view === "register" && <RegisterForm switchToLogin={() => setView("login")} />}
      {view === "login" && <LoginForm onLogin={handleLoginSuccess} switchToRegister={() => setView("register")} />}
      {view === "dashboard" && <Dashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;