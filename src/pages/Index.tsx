import { useState } from "react";
import { HomePage } from "@/components/HomePage";
import { LoginPage } from "@/components/LoginPage";
import { UserDashboard } from "@/components/UserDashboard";
import { TechnicianDashboard } from "@/components/TechnicianDashboard";
import { VWSCDashboard } from "@/components/VWSCDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Layout } from "@/components/Layout";

type UserRole = 'user' | 'technician' | 'vwsc' | 'admin';

interface User {
  role: UserRole;
  username: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'dashboard'>('home');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole, credentials: { username: string; password: string }) => {
    // In a real app, you would validate credentials with your backend
    setUser({ role, username: credentials.username });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return <HomePage onGetStarted={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login' || !user) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onBack={() => setCurrentPage('home')} 
      />
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'user':
        return <UserDashboard />;
      case 'technician':
        return <TechnicianDashboard />;
      case 'vwsc':
        return <VWSCDashboard />;
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
