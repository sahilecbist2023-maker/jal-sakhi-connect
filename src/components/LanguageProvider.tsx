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
    "login.title": "Jal Rakshak",
    "login.subtitle": "Village Panchayat Water Supply Management",
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
    "user.dashboard": "Citizen Dashboard",
    "user.liveStatus": "Live Status",
    "user.suggestions": "View Suggestions",
    "user.divisionWaterQuality": "Division Water Quality",
    "user.divisionDesc": "Your area's live water quality index",
    "user.myComplaints": "My Complaints",
    "user.registerComplaint": "Register New Complaint",
    "user.communityHealth": "Community Health",
    "user.diseaseArea": "Diseases spreading in the area",
    "user.purificationTips": "Water Purification Tips",
    "user.communityChat": "Community Chat",
    "user.supplyStatus": "Supply Status",
    "user.active": "Active",
    "user.maintenance": "Maintenance",
    "user.wqiScore": "WQI Score",
    "user.resolved": "Resolved",
    "user.pending": "Pending",
    "user.inProgress": "In Progress",
    "user.cases": "cases",
    
    // Technician Dashboard
    "technician.dashboard": "Technician Dashboard",
    "technician.systemControl": "System Control",
    "technician.pumpControl": "Pump Control System",
    "technician.pumpControlDesc": "Manual and Auto mode control",
    "technician.mode": "Mode",
    "technician.auto": "Auto",
    "technician.manual": "Manual",
    "technician.status": "Status",
    "technician.runtime": "Runtime Today",
    "technician.running": "running",
    "technician.stopped": "stopped",
    "technician.stopPump": "Stop Pump",
    "technician.startPump": "Start Pump",
    "technician.autoSchedule": "Auto Schedule: 6:00-9:00, 18:00-21:00",
    "technician.setSchedule": "Set Schedule",
    "technician.viewReports": "View Reports",
    "technician.emergencyStop": "Emergency Stop",
    "technician.priority": "priority",
    "technician.liveSensorData": "Live Sensor Data",
    "technician.normalRange": "Normal",
    "technician.good": "Good",
    "technician.target": "Target",
    
    // VWSC Dashboard
    "vwsc.dashboard": "VWSC Dashboard",
    "vwsc.committee": "Village Water & Sanitation Committee",
    "vwsc.population": "Population",
    "vwsc.households": "households",
    "vwsc.goodQuality": "Good Quality",
    "vwsc.todaySupply": "Today's Supply",
    "vwsc.monthlyCollection": "Monthly Collection",
    "vwsc.pendingComplaints": "Pending Complaints",
    "vwsc.totalComplaints": "Total",
    "vwsc.complaints": "complaints",
    "vwsc.waterSchedule": "Water Supply Schedule",
    "vwsc.scheduleDesc": "Water supply timing for the village",
    "vwsc.morning": "Morning",
    "vwsc.evening": "Evening",
    "vwsc.complaintsTitle": "Complaints",
    "vwsc.viewAll": "View All Complaints",
    "vwsc.financialSummary": "Financial Summary",
    "vwsc.monthlyExpense": "Monthly Expense",
    "vwsc.totalBalance": "Total Balance",
    "vwsc.pendingPayments": "pending payments",
    "vwsc.viewReport": "View Financial Report",
    "vwsc.committeeMembers": "Committee Members",
    "vwsc.president": "President",
    "vwsc.secretary": "Secretary",
    "vwsc.treasurer": "Treasurer",
    "vwsc.member": "Member",
    "vwsc.upcomingMeetings": "Upcoming Meetings",
    "vwsc.membersInvited": "members invited",
    "vwsc.scheduleMeeting": "Schedule New Meeting",
    "vwsc.fromLastMonth": "from last month",
    
    // Admin Dashboard
    "admin.dashboard": "Admin Dashboard",
    "admin.subtitle": "Admin Dashboard - Gram Panchayat / VWSC",
    "admin.systemOverview": "System Overview",
    "admin.totalPopulation": "Total Population",
    "admin.acrossDivisions": "Across 6 divisions",
    "admin.averageWQI": "Average WQI",
    "admin.systemWide": "System-wide average",
    "admin.activePumps": "Active Pumps",
    "admin.pumpsOperational": "Pumps operational",
    "admin.openComplaints": "Open Complaints",
    "admin.pendingResolution": "Pending resolution",
    "admin.overview": "Overview",
    "admin.divisions": "Divisions",
    "admin.complaints": "Complaints",
    "admin.reports": "Reports",
    "admin.criticalAlerts": "Critical Alerts",
    "admin.systemPerformance": "System Performance",
    "admin.overallEfficiency": "Overall Efficiency",
    "admin.waterQualityCompliance": "Water Quality Compliance",
    "admin.pumpUptime": "Pump Uptime",
    "admin.quickStats": "Quick Stats",
    "admin.averagePressure": "Average Pressure",
    "admin.totalLeakages": "Total Leakages",
    "admin.energyEfficiency": "Energy Efficiency",
    "admin.complaintResolution": "Complaint Resolution Rate",
    "admin.recentComplaints": "Recent Complaints",
    "admin.complaintManagement": "Complaint management and tracking",
    "admin.viewDetails": "View Details",
    "admin.leakageDetected": "leakage(s) detected",
    "admin.sendReport": "Send Report to Technician",
    "admin.selectTechnician": "Select Technician",
    "admin.reportMessage": "Report Message",
    "admin.priority": "Priority",
    "admin.high": "High",
    "admin.medium": "Medium",
    "admin.low": "Low",
    "admin.sendButton": "Send Report",
    
    // Chatbot
    "chatbot.title": "Water Information Assistant",
    "chatbot.subtitle": "Ask me anything about water supply",
    "chatbot.selectLanguage": "Select Language",
    "chatbot.hindi": "Hindi",
    "chatbot.english": "English",
    "chatbot.typeMessage": "Type your question...",
    "chatbot.send": "Send",
    "chatbot.commonQuestions": "Common Questions",
    
    // Common
    "common.darkMode": "Dark Mode",
    "common.lightMode": "Light Mode",
    "common.language": "Language",
    "common.english": "English",
    "common.hindi": "हिंदी",
    "common.phLevel": "pH Level",
    "common.turbidity": "Turbidity",
    "common.dissolvedOxygen": "Dissolved O₂",
    "common.nitrate": "Nitrate",
    "common.pressure": "Pressure",
    "common.flowRate": "Flow Rate",
    "common.wqi": "WQI",
    "common.pump": "Pump",
    "common.runtime": "Runtime",
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
    "login.title": "जल रक्षक",
    "login.subtitle": "ग्राम पंचायत जल आपूर्ति प्रबंधन",
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
    "user.dashboard": "नागरिक डैशबोर्ड",
    "user.liveStatus": "लाइव स्थिति",
    "user.suggestions": "सुझाव देखें",
    "user.divisionWaterQuality": "क्षेत्रीय पानी की गुणवत्ता",
    "user.divisionDesc": "आपके क्षेत्र की live water quality index",
    "user.myComplaints": "मेरी शिकायतें",
    "user.registerComplaint": "नई शिकायत दर्ज करें",
    "user.communityHealth": "समुदायिक स्वास्थ्य",
    "user.diseaseArea": "क्षेत्र में फैल रही बीमारियां",
    "user.purificationTips": "पानी शुद्धिकरण टिप्स",
    "user.communityChat": "समुदायिक चैट",
    "user.supplyStatus": "आपूर्ति स्थिति",
    "user.active": "सक्रिय",
    "user.maintenance": "रखरखाव",
    "user.wqiScore": "WQI स्कोर",
    "user.resolved": "हल हुआ",
    "user.pending": "लंबित",
    "user.inProgress": "प्रगति में",
    "user.cases": "मामले",
    
    // Technician Dashboard
    "technician.dashboard": "तकनीशियन डैशबोर्ड",
    "technician.systemControl": "सिस्टम नियंत्रण",
    "technician.pumpControl": "पंप नियंत्रण सिस्टम",
    "technician.pumpControlDesc": "मैन्युअल और ऑटो मोड कंट्रोल",
    "technician.mode": "मोड",
    "technician.auto": "ऑटो",
    "technician.manual": "मैन्युअल",
    "technician.status": "स्थिति",
    "technician.runtime": "आज का रनटाइम",
    "technician.running": "चल रहा है",
    "technician.stopped": "बंद",
    "technician.stopPump": "पंप बंद करें",
    "technician.startPump": "पंप शुरू करें",
    "technician.autoSchedule": "ऑटो शेड्यूल: 6:00-9:00, 18:00-21:00",
    "technician.setSchedule": "शेड्यूल सेट करें",
    "technician.viewReports": "रिपोर्ट देखें",
    "technician.emergencyStop": "आपातकालीन बंद",
    "technician.priority": "प्राथमिकता",
    "technician.liveSensorData": "लाइव सेंसर डेटा",
    "technician.normalRange": "सामान्य",
    "technician.good": "अच्छा",
    "technician.target": "लक्ष्य",
    
    // VWSC Dashboard
    "vwsc.dashboard": "VWSC डैशबोर्ड",
    "vwsc.committee": "ग्राम जल एवं स्वच्छता समिति",
    "vwsc.population": "जनसंख्या",
    "vwsc.households": "परिवार",
    "vwsc.goodQuality": "अच्छी गुणवत्ता",
    "vwsc.todaySupply": "आज की आपूर्ति",
    "vwsc.monthlyCollection": "मासिक संग्रह",
    "vwsc.pendingComplaints": "लंबित शिकायतें",
    "vwsc.totalComplaints": "कुल",
    "vwsc.complaints": "शिकायतें",
    "vwsc.waterSchedule": "पानी आपूर्ति समय सारणी",
    "vwsc.scheduleDesc": "गाँव के लिए पानी आपूर्ति का समय",
    "vwsc.morning": "सुबह",
    "vwsc.evening": "शाम",
    "vwsc.complaintsTitle": "शिकायतें",
    "vwsc.viewAll": "सभी शिकायतें देखें",
    "vwsc.financialSummary": "वित्तीय सारांश",
    "vwsc.monthlyExpense": "मासिक खर्च",
    "vwsc.totalBalance": "कुल शेष राशि",
    "vwsc.pendingPayments": "परिवारों का भुगतान लंबित है",
    "vwsc.viewReport": "वित्तीय रिपोर्ट देखें",
    "vwsc.committeeMembers": "समिति सदस्य",
    "vwsc.president": "अध्यक्ष",
    "vwsc.secretary": "सचिव",
    "vwsc.treasurer": "कोषाध्यक्ष",
    "vwsc.member": "सदस्य",
    "vwsc.upcomingMeetings": "आगामी बैठकें",
    "vwsc.membersInvited": "सदस्य आमंत्रित",
    "vwsc.scheduleMeeting": "नई बैठक शेड्यूल करें",
    "vwsc.fromLastMonth": "पिछले महीने से",
    
    // Admin Dashboard
    "admin.dashboard": "प्रशासक डैशबोर्ड",
    "admin.subtitle": "प्रशासक डैशबोर्ड - ग्राम पंचायत / VWSC",
    "admin.systemOverview": "सिस्टम अवलोकन",
    "admin.totalPopulation": "कुल जनसंख्या",
    "admin.acrossDivisions": "6 डिवीजनों में",
    "admin.averageWQI": "औसत WQI",
    "admin.systemWide": "सिस्टम-वाइड औसत",
    "admin.activePumps": "सक्रिय पंप",
    "admin.pumpsOperational": "पंप चालू",
    "admin.openComplaints": "खुली शिकायतें",
    "admin.pendingResolution": "समाधान लंबित",
    "admin.overview": "अवलोकन",
    "admin.divisions": "डिवीजन",
    "admin.complaints": "शिकायतें",
    "admin.reports": "रिपोर्ट",
    "admin.criticalAlerts": "महत्वपूर्ण चेतावनी",
    "admin.systemPerformance": "सिस्टम प्रदर्शन",
    "admin.overallEfficiency": "समग्र दक्षता",
    "admin.waterQualityCompliance": "पानी की गुणवत्ता अनुपालन",
    "admin.pumpUptime": "पंप अपटाइम",
    "admin.quickStats": "त्वरित आंकड़े",
    "admin.averagePressure": "औसत दबाव",
    "admin.totalLeakages": "कुल रिसाव",
    "admin.energyEfficiency": "ऊर्जा दक्षता",
    "admin.complaintResolution": "शिकायत समाधान दर",
    "admin.recentComplaints": "हाल की शिकायतें",
    "admin.complaintManagement": "शिकायत प्रबंधन और ट्रैकिंग",
    "admin.viewDetails": "विवरण देखें",
    "admin.leakageDetected": "रिसाव का पता चला",
    "admin.sendReport": "तकनीशियन को रिपोर्ट भेजें",
    "admin.selectTechnician": "तकनीशियन चुनें",
    "admin.reportMessage": "रिपोर्ट संदेश",
    "admin.priority": "प्राथमिकता",
    "admin.high": "उच्च",
    "admin.medium": "मध्यम",
    "admin.low": "कम",
    "admin.sendButton": "रिपोर्ट भेजें",
    
    // Chatbot
    "chatbot.title": "जल सूचना सहायक",
    "chatbot.subtitle": "पानी की आपूर्ति के बारे में कुछ भी पूछें",
    "chatbot.selectLanguage": "भाषा चुनें",
    "chatbot.hindi": "हिंदी",
    "chatbot.english": "English",
    "chatbot.typeMessage": "अपना सवाल लिखें...",
    "chatbot.send": "भेजें",
    "chatbot.commonQuestions": "सामान्य प्रश्न",
    
    // Common
    "common.darkMode": "डार्क मोड",
    "common.lightMode": "लाइट मोड",
    "common.language": "भाषा",
    "common.english": "English",
    "common.hindi": "हिंदी",
    "common.phLevel": "pH स्तर",
    "common.turbidity": "टर्बिडिटी",
    "common.dissolvedOxygen": "घुलित O₂",
    "common.nitrate": "नाइट्रेट",
    "common.pressure": "दबाव",
    "common.flowRate": "प्रवाह दर",
    "common.wqi": "WQI",
    "common.pump": "पंप",
    "common.runtime": "रनटाइम",
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