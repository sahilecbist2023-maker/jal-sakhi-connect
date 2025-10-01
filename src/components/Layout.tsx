import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Droplets, LogOut, Bell, Settings, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'user' | 'technician' | 'vwsc' | 'admin';
  onLogout: () => void;
}

export function Layout({ children, userRole, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const getRoleTitle = () => {
    switch (userRole) {
      case 'user': return language === 'hi' ? 'नागरिक' : 'Citizen';
      case 'technician': return language === 'hi' ? 'तकनीशियन' : 'Technician';
      case 'vwsc': return language === 'hi' ? 'VWSC सदस्य' : 'VWSC Member';
      case 'admin': return language === 'hi' ? 'प्रशासक' : 'Admin';
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'user': return 'safe';
      case 'technician': return 'warning';
      case 'vwsc': return 'primary';
      case 'admin': return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full hero-gradient">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                {t('login.title')}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {t('login.subtitle')}
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Role Badge */}
            <Badge 
              variant="outline"
              className={`bg-${getRoleColor()}/10 text-${getRoleColor()} border-${getRoleColor()}/20`}
            >
              {getRoleTitle()}
            </Badge>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  {t('common.hindi')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  {t('common.english')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-danger">
                3
              </Badge>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>

            {/* Logout */}
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t('layout.logout')}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline"
                className={`bg-${getRoleColor()}/10 text-${getRoleColor()} border-${getRoleColor()}/20`}
              >
                {getRoleTitle()}
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-4 px-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            <p>{t('layout.footerTitle')}</p>
          </div>
          <div className="text-xs">
            <p>{t('layout.footerCopyright')}</p>
            <p>{t('layout.footerSlogan')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}