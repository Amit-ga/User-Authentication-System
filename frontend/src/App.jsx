import React, { useState, useEffect } from 'react';
import RegisterForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { getUser } from './AuthService';
import './app.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


function App() {
  const [view, setView] = useState("login");

  useEffect(() => {
    const user = getUser();
    if (user) setView("dashboard");
  }, []);

  const handleLoginSuccess = () => {
    setView("dashboard");
  };

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