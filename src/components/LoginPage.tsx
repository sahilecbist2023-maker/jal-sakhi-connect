import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Shield, Users, Wrench, MapPin, Mail, Languages, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import heroImage from "@/assets/hero-image.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LoginPageProps {
  onLogin: (role: 'user' | 'technician' | 'admin', credentials: { username: string; password: string }) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'users' | 'officials' | null>(null);
  const [selectedRole, setSelectedRole] = useState<'user' | 'pumpOperator' | 'vwsc' | 'sarpanch' | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleLogin = async () => {
    if (!selectedRole) return;
    
    // Check validation based on category
    if (selectedCategory === 'users') {
      if (!credentials.username || !credentials.password) return;
    } else if (selectedCategory === 'officials') {
      if (!credentials.email || !credentials.password) return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const role =
        selectedRole === 'user' ? 'user' :
        selectedRole === 'pumpOperator' ? 'technician' :
        selectedRole === 'vwsc' ? 'technician' :
        'admin';
      onLogin(role, credentials);
      setIsLoading(false);
    }, 1000);
  };

  const enableLocation = () => {

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location enabled:', position.coords);
          setLocationEnabled(true);
        },
        (error) => {
          console.warn('Location error:', error);
          setLocationEnabled(false);
        }
      );
    } else {
      console.warn('Geolocation not supported');
    }
  };

  // Category Selection
  if (!selectedCategory) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/95 to-safe/15" />
        
        {/* Header with Language & Theme */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('hi')}>
                🇮🇳 हिंदी
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="relative z-10 w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full hero-gradient shadow-water">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                {t('login.title')}
              </h1>
            </div>
            <Button 
              onClick={onBack}
              variant="outline"
              className="mb-4 border-primary/40 hover:bg-primary/10"
            >
              ← {t('login.backToHome')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-water hover:scale-105 border-2 border-border hover:border-primary/50 bg-card/90 backdrop-blur-md"
              onClick={() => setSelectedCategory('users')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-safe/10 mb-4">
                  <Users className="h-8 w-8 text-safe" />
                </div>
                <CardTitle className="text-xl">{t('login.users')}</CardTitle>
                <CardDescription className="text-sm">
                  {t('login.usersDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-water hover:scale-105 border-2 border-border hover:border-primary/50 bg-card/90 backdrop-blur-md"
              onClick={() => setSelectedCategory('officials')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{t('login.officials')}</CardTitle>
                <CardDescription className="text-sm">
                  {t('login.officialsDesc')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Role Selection for Officials
  if (selectedCategory === 'officials' && !selectedRole) {
    const officialRoles = [
      {
        id: 'pumpOperator' as const,
        title: t('login.pumpOperator'),
        description: language === 'hi' ? 'पंप संचालन और मॉनिटरिंग' : 'Pump operation & monitoring',
        icon: Wrench,
        color: 'warning'
      },
      {
        id: 'vwsc' as const,
        title: t('login.vwsc'),
        description: language === 'hi' ? 'गाँव स्तर - एक गाँव के लिए' : 'Village Level - For one village',
        icon: Shield,
        color: 'primary'
      },
      {
        id: 'sarpanch' as const,
        title: t('login.sarpanchOffice'),
        description: language === 'hi' ? 'ग्राम पंचायत स्तर - 3-6 गाँवों के लिए' : 'Gram Panchayat Level - Covers 3-6 villages',
        icon: Shield,
        color: 'primary'
      }
    ];

    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/95 to-safe/15" />
        
        <div className="relative z-10 w-full max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{t('login.officials')}</h2>
            <Button 
              onClick={() => setSelectedCategory(null)}
              variant="outline"
              className="border-primary/40 hover:bg-primary/10"
            >
              ← {t('login.back')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officialRoles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-water hover:scale-105 border-2 border-border hover:border-primary/50 bg-card/90 backdrop-blur-md"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto p-4 rounded-full mb-4 ${
                      role.color === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        role.color === 'warning' ? 'text-warning' : 'text-primary'
                      }`} />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Users direct to login (no role selection needed)
  if (selectedCategory === 'users' && !selectedRole) {
    setSelectedRole('user');
  }

  // Login Form
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/95 to-safe/15" />
      
      <Card className="relative z-10 w-full max-w-md bg-card/95 backdrop-blur-md shadow-water border-primary/30">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-full hero-gradient shadow-water">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          </div>
          <CardDescription>
            {selectedCategory === 'users' ? t('login.users') : 
             selectedRole === 'pumpOperator' ? t('login.pumpOperator') :
             selectedRole === 'vwsc' ? t('login.vwsc') : t('login.sarpanchOffice')} 
            {language === 'hi' ? ' लॉगिन' : ' Login'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedCategory === 'users' ? (
            <>
              {/* Location Enable for Users */}
              <div className="space-y-2">
                <Button
                  onClick={enableLocation}
                  disabled={locationEnabled}
                  className={`w-full ${locationEnabled ? 'bg-safe text-white' : ''}`}
                  variant={locationEnabled ? 'default' : 'outline'}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {locationEnabled 
                    ? (language === 'hi' ? 'स्थान सक्षम है ✓' : 'Location Enabled ✓')
                    : t('login.enableLocation')
                  }
                </Button>
                <p className="text-xs text-muted-foreground">
                  {t('login.locationDesc')}
                </p>
              </div>
              
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
            </>
          ) : (
            <>
              {/* Email for Officials */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.registeredEmail')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter registered email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="border-primary/20 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  {t('login.emailDesc')}
                </p>
              </div>
            </>
          )}
          
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
              onClick={() => {
                if (selectedCategory === 'users') {
                  setSelectedCategory(null);
                  setSelectedRole(null);
                } else {
                  setSelectedRole(null);
                }
              }}
            >
              {t('login.back')}
            </Button>
            <Button
              className="w-full water-gradient hover:opacity-90 text-white shadow-water"
              onClick={handleLogin}
              disabled={isLoading || (selectedCategory === 'users' && (!credentials.username || !credentials.password || !locationEnabled)) ||
                       (selectedCategory === 'officials' && (!credentials.email || !credentials.password))}
            >
              {isLoading ? (language === 'hi' ? 'लॉगिन हो रहा है...' : 'Logging in...') : t('login.loginButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}