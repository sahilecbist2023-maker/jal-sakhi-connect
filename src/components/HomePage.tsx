import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Monitor, Wrench, AlertTriangle, Users, Languages, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import heroImage from "@/assets/hero-image.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const features = [
    {
      icon: Monitor,
      title: t('home.feature1'),
      description: language === 'hi' ? 'pH, टर्बिडिटी, नाइट्रेट्स की लाइव निगरानी' : 'Live monitoring of pH, turbidity, nitrates'
    },
    {
      icon: Wrench,
      title: t('home.feature2'),
      description: language === 'hi' ? 'ऑटो/मैन्युअल पंप नियंत्रण और शेड्यूलिंग' : 'Auto/Manual pump control & scheduling'
    },
    {
      icon: Users,
      title: t('home.feature3'),
      description: language === 'hi' ? 'समुदायिक शिकायत ट्रैकिंग और समाधान' : 'Community complaint tracking & resolution'
    },
    {
      icon: AlertTriangle,
      title: t('home.feature4'),
      description: language === 'hi' ? 'एआई-पावर्ड मेंटेनेंस पूर्वानुमान' : 'AI-powered maintenance predictions'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/10 to-safe/5" />

      {/* Header with Language & Theme */}
      <header className="relative z-10 flex justify-between items-center p-4 bg-card/50 border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full hero-gradient shadow-water">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
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

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-2xl font-semibold text-foreground">
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              {t('home.description')}
            </p>
          </div>
          
          <Button 
            onClick={onGetStarted}
            className="water-gradient hover:opacity-90 text-white shadow-water px-8 py-6 text-lg"
          >
            {t('home.getStarted')}
          </Button>
        </div>

        {/* About Section */}
        <Card className="bg-card/70 border-primary/30 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('home.about')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center leading-relaxed">
              {t('home.aboutDesc')}
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            {t('home.features')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="bg-card/70 border-primary/30 hover:shadow-water transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-4 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.startToday')}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('home.startTodayDesc')}
          </p>
          <Button 
            onClick={onGetStarted}
            variant="outline"
            className="px-6 py-3"
          >
            {t('home.loginNow')}
          </Button>
        </div>
      </main>
    </div>
  );
}