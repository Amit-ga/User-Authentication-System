import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getUser, logout } from '../AuthService';

function Dashboard({ onLogout }) {
  const userEmail = getUser();

  return (
    <div>
      <Card title={`Welcome${userEmail ? ", " + userEmail : "!"}`}>
        <p className="m-0">You have successfully logged in. This is your user dashboard.</p>
        <Button label="Logout" className="mt-4" severity="info" onClick={() => {
          logout();
          onLogout();
        }} />
      </Card>
    </div>
  );
}

export default Dashboard;