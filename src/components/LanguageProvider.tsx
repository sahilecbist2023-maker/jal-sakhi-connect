import { createContext, useContext, useState } from "react"

type Language = "en" | "hi"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const initialState: LanguageProviderState = {
  language: "hi",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

// Translation dictionary
const translations = {
  en: {
    // Home Page
    "home.title": "Jal Rakshak",
    "home.subtitle": "Water Supply Management System",
    "home.description": "Safe Water, Every Village",
    "home.about": "About the System",
    "home.aboutDesc": "Jal Rakshak is a comprehensive digital platform for monitoring and managing rural piped water supply systems across 6 divisions. Our system ensures safe water delivery, efficient pump operations, and community engagement.",
    "home.features": "Key Features",
    "home.feature1": "Real-time Water Quality Monitoring",
    "home.feature2": "Smart Pump Management System", 
    "home.feature3": "Community Complaint System",
    "home.feature4": "Predictive Maintenance Alerts",
    "home.getStarted": "Get Started",
    "home.loginNow": "Login Now",
    "home.startToday": "Start Today",
    "home.startTodayDesc": "Join us in improving your village water supply system",
    
    // Login Page
    "login.title": "Login to Jal Rakshak",
    "login.selectCategory": "Select Category",
    "login.users": "Users",
    "login.officials": "Officials",
    "login.usersDesc": "Village residents and community members",
    "login.officialsDesc": "Government officials and technicians",
    "login.enableLocation": "Enable Location",
    "login.locationDesc": "Confirm GPS for your location",
    "login.registeredEmail": "Enter your registered Email ID",
    "login.emailDesc": "This data is set by central government",
    "login.pumpOperator": "Pump Operator",
    "login.vwsc": "VWSC",
    "login.sarpanchOffice": "Sarpanch Office",
    "login.username": "Username",
    "login.password": "Password",
    "login.email": "Email ID",
    "login.loginButton": "Login",
    "login.back": "Back",
    "login.backToHome": "Back to Home",
    
    // Layout
    "layout.notifications": "Notifications",
    "layout.settings": "Settings",
    "layout.logout": "Logout",
    "layout.footerTitle": "Village Panchayat Water Supply Management System",
    "layout.footerCopyright": "© 2025 Jal Rakshak",
    "layout.footerSlogan": "Safe Water, Every Village",
    
    // User Dashboard
    "user.dashboard": "User Dashboard",
    "user.waterQuality": "Water Quality Index",
    "user.safeWater": "Safe Water",
    "user.healthAlerts": "Health Alerts",
    "user.complaints": "My Complaints",
    "user.community": "Community",
    "user.submitComplaint": "Submit New Complaint",
    "user.viewComplaints": "View My Complaints",
    "user.joinCommunity": "Join Community Discussion",
    
    // Technician Dashboard
    "technician.dashboard": "Technician Dashboard",
    "technician.pumpControl": "Pump Control",
    "technician.sensorData": "Live Sensor Data",
    "technician.divisions": "Division Monitoring",
    
    // Admin Dashboard
    "admin.dashboard": "Admin Dashboard",
    "admin.overview": "System Overview",
    "admin.reports": "Generate Reports",
    "admin.manageComplaints": "Manage Complaints",
    
    // Common
    "common.darkMode": "Dark Mode",
    "common.lightMode": "Light Mode",
    "common.language": "Language",
    "common.english": "English",
    "common.hindi": "हिंदी",
  },
  hi: {
    // Home Page
    "home.title": "जल रक्षक",
    "home.subtitle": "जल आपूर्ति प्रबंधन प्रणाली",
    "home.description": "सुरक्षित पानी, हर गांव तक",
    "home.about": "सिस्टम के बारे में",
    "home.aboutDesc": "जल रक्षक 6 डिवीजनों में ग्रामीण पाइप जल आपूर्ति प्रणालियों की निगरानी और प्रबंधन के लिए एक व्यापक डिजिटल प्लेटफॉर्म है। हमारा सिस्टम सुरक्षित पानी वितरण, कुशल पंप संचालन और सामुदायिक भागीदारी सुनिश्चित करता है।",
    "home.features": "मुख्य विशेषताएं",
    "home.feature1": "रियल-टाइम पानी गुणवत्ता निगरानी",
    "home.feature2": "स्मार्ट पंप प्रबंधन सिस्टम",
    "home.feature3": "सामुदायिक शिकायत प्रणाली",
    "home.feature4": "प्रेडिक्टिव मेंटेनेंस अलर्ट",
    "home.getStarted": "शुरू करें",
    "home.loginNow": "अभी लॉगिन करें",
    "home.startToday": "आज ही शुरू करें",
    "home.startTodayDesc": "अपने गांव के पानी की आपूर्ति को बेहतर बनाने में शामिल हों",
    
    // Login Page
    "login.title": "जल रक्षक में लॉगिन करें",
    "login.selectCategory": "श्रेणी चुनें",
    "login.users": "उपयोगकर्ता",
    "login.officials": "अधिकारी",
    "login.usersDesc": "गांव निवासी और समुदायिक सदस्य",
    "login.officialsDesc": "सरकारी अधिकारी और तकनीशियन",
    "login.enableLocation": "स्थान सक्षम करें",
    "login.locationDesc": "अपने स्थान के लिए GPS की पुष्टि करें",
    "login.registeredEmail": "अपना पंजीकृत ईमेल आईडी दर्ज करें",
    "login.emailDesc": "यह डेटा केंद्र सरकार द्वारा सेट किया गया है",
    "login.pumpOperator": "पंप ऑपरेटर",
    "login.vwsc": "VWSC",
    "login.sarpanchOffice": "सरपंच कार्यालय",
    "login.username": "उपयोगकर्ता नाम",
    "login.password": "पासवर्ड",
    "login.email": "ईमेल आईडी",
    "login.loginButton": "लॉगिन करें",
    "login.back": "वापस",
    "login.backToHome": "वापस होम पेज पर",
    
    // Layout
    "layout.notifications": "सूचनाएं",
    "layout.settings": "सेटिंग्स",
    "layout.logout": "लॉगआउट",
    "layout.footerTitle": "ग्राम पंचायत जल आपूर्ति प्रबंधन प्रणाली",
    "layout.footerCopyright": "© 2025 जल रक्षक",
    "layout.footerSlogan": "सुरक्षित पानी, हर गांव तक",
    
    // User Dashboard
    "user.dashboard": "उपयोगकर्ता डैशबोर्ड",
    "user.waterQuality": "पानी की गुणवत्ता सूचकांक",
    "user.safeWater": "सुरक्षित पानी",
    "user.healthAlerts": "स्वास्थ्य चेतावनी",
    "user.complaints": "मेरी शिकायतें",
    "user.community": "समुदाय",
    "user.submitComplaint": "नई शिकायत दर्ज करें",
    "user.viewComplaints": "मेरी शिकायतें देखें",
    "user.joinCommunity": "सामुदायिक चर्चा में शामिल हों",
    
    // Technician Dashboard
    "technician.dashboard": "तकनीशियन डैशबोर्ड",
    "technician.pumpControl": "पंप नियंत्रण",
    "technician.sensorData": "लाइव सेंसर डेटा",
    "technician.divisions": "डिवीजन निगरानी",
    
    // Admin Dashboard
    "admin.dashboard": "प्रशासक डैशबोर्ड",
    "admin.overview": "सिस्टम अवलोकन",
    "admin.reports": "रिपोर्ट तैयार करें",
    "admin.manageComplaints": "शिकायतों का प्रबंधन",
    
    // Common
    "common.darkMode": "डार्क मोड",
    "common.lightMode": "लाइट मोड",
    "common.language": "भाषा",
    "common.english": "English",
    "common.hindi": "हिंदी",
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = "hi",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("jal-rakshak-language") as Language) || defaultLanguage
  )

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  const value = {
    language,
    setLanguage: (lang: Language) => {
      localStorage.setItem("jal-rakshak-language", lang)
      setLanguage(lang)
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}