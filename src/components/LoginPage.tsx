import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Shield, Users, Wrench } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: 'user' | 'technician' | 'admin', credentials: { username: string; password: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'user' | 'technician' | 'admin' | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!selectedRole || !credentials.username || !credentials.password) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(selectedRole, credentials);
      setIsLoading(false);
    }, 1000);
  };

  const roles = [
    {
      id: 'user' as const,
      title: 'नागरिक / User',
      description: 'जल गुणवत्ता देखें और शिकायत दर्ज करें',
      icon: Users,
      color: 'safe'
    },
    {
      id: 'technician' as const,
      title: 'तकनीशियन / Technician', 
      description: 'पंप संचालन और सेंसर मॉनिटरिंग',
      icon: Wrench,
      color: 'warning'
    },
    {
      id: 'admin' as const,
      title: 'प्रशासक / Admin',
      description: 'पूर्ण सिस्टम प्रबंधन और रिपोर्ट',
      icon: Shield,
      color: 'primary'
    }
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/20 via-background to-safe-light/20 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full hero-gradient">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                जल रक्षक
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              सुरक्षित पानी, हर गांव तक
            </p>
            <p className="text-lg text-foreground/80">
              Rural Water Supply Management System
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto p-4 rounded-full mb-4 ${
                      role.color === 'safe' ? 'bg-safe/10' :
                      role.color === 'warning' ? 'bg-warning/10' :
                      'bg-primary/10'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        role.color === 'safe' ? 'text-safe' :
                        role.color === 'warning' ? 'text-warning' :
                        'text-primary'
                      }`} />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full"
                      variant={role.color === 'safe' ? 'outline' : role.color === 'warning' ? 'secondary' : 'default'}
                    >
                      लॉगिन करें / Login
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>ग्राम पंचायत जल आपूर्ति प्रबंधन प्रणाली</p>
            <p>Village Panchayat Water Supply Management System</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 via-background to-safe-light/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-full hero-gradient">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">जल रक्षक</CardTitle>
          </div>
          <CardDescription>
            {roles.find(r => r.id === selectedRole)?.title} के रूप में लॉगिन करें
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">उपयोगकर्ता नाम / Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">पासवर्ड / Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedRole(null)}
            >
              वापस / Back
            </Button>
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={!credentials.username || !credentials.password || isLoading}
            >
              {isLoading ? 'लॉगिन हो रहा है...' : 'लॉगिन / Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}