import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { UserDashboard } from "@/components/UserDashboard";
import { TechnicianDashboard } from "@/components/TechnicianDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Layout } from "@/components/Layout";

type UserRole = 'user' | 'technician' | 'admin';

interface User {
  role: UserRole;
  username: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole, credentials: { username: string; password: string }) => {
    // In a real app, you would validate credentials with your backend
    setUser({ role, username: credentials.username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'user':
        return <UserDashboard />;
      case 'technician':
        return <TechnicianDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout userRole={user.role} onLogout={handleLogout}>
      {renderDashboard()}
    </Layout>
  );
};

export default Index;
