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
    // Login Page
    "login.title": "Jal Rakshak",
    "login.subtitle": "Water Supply Management System",
    "login.description": "Safe Water, Every Village",
    "login.selectRole": "Select Your Role",
    "login.user": "Citizen / User",
    "login.technician": "Technician",
    "login.admin": "Admin / Sarpanch",
    "login.username": "Username",
    "login.password": "Password",
    "login.loginButton": "Login",
    
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
    // Login Page
    "login.title": "जल रक्षक",
    "login.subtitle": "जल आपूर्ति प्रबंधन प्रणाली",
    "login.description": "सुरक्षित पानी, हर गांव तक",
    "login.selectRole": "अपनी भूमिका चुनें",
    "login.user": "नागरिक / उपयोगकर्ता",
    "login.technician": "तकनीशियन",
    "login.admin": "प्रशासक / सरपंच",
    "login.username": "उपयोगकर्ता नाम",
    "login.password": "पासवर्ड",
    "login.loginButton": "लॉगिन करें",
    
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