import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Shield, Users, Wrench } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import heroImage from "@/assets/hero-image.jpg";

interface LoginPageProps {
  onLogin: (role: 'user' | 'technician' | 'admin', credentials: { username: string; password: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'user' | 'technician' | 'admin' | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();

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
      title: t('login.user'),
      description: language === 'hi' ? 'जल गुणवत्ता देखें और शिकायत दर्ज करें' : 'Monitor water quality & submit complaints',
      icon: Users,
      color: 'safe'
    },
    {
      id: 'technician' as const,
      title: t('login.technician'), 
      description: language === 'hi' ? 'पंप संचालन और सेंसर मॉनिटरिंग' : 'Pump operation & sensor monitoring',
      icon: Wrench,
      color: 'warning'
    },
    {
      id: 'admin' as const,
      title: t('login.admin'),
      description: language === 'hi' ? 'पूर्ण सिस्टम प्रबंधन और रिपोर्ट' : 'Complete system management & reports',
      icon: Shield,
      color: 'primary'
    }
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/85 to-safe/30 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full hero-gradient shadow-water">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                {t('login.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground font-medium">
              {t('login.description')}
            </p>
            <p className="text-lg text-foreground/80">
              {t('login.subtitle')}
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
                      {t('login.loginButton')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>{t('layout.footerTitle')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-safe/20 backdrop-blur-sm" />
      </div>
      
      <Card className="relative z-10 w-full max-w-md bg-card/95 backdrop-blur-sm shadow-water border-primary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-full hero-gradient shadow-water">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          </div>
          <CardDescription>
            {roles.find(r => r.id === selectedRole)?.title} {language === 'hi' ? 'के रूप में लॉगिन करें' : 'Login'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('login.username')}</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('login.password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedRole(null)}
            >
              {language === 'hi' ? 'वापस' : 'Back'}
            </Button>
            <Button
              className="w-full water-gradient hover:opacity-90 text-white shadow-water"
              onClick={handleLogin}
              disabled={!credentials.username || !credentials.password || isLoading}
            >
              {isLoading ? (language === 'hi' ? 'लॉगिन हो रहा है...' : 'Logging in...') : t('login.loginButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}