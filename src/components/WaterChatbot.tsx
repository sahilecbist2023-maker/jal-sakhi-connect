import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  type: 'user' | 'bot';
  text: string;
}

export function WaterChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'en' | null>(null);

  const questions = {
    hi: [
      { q: "पानी कब आएगा?", a: "आपके क्षेत्र में पानी की आपूर्ति सुबह 6:00 से 8:00 बजे और शाम 5:00 से 7:00 बजे होती है। विशेष परिस्थितियों में समय बदल सकता है।" },
      { q: "कितना नाइट्रेट सही होता है?", a: "पीने के पानी में नाइट्रेट का सुरक्षित स्तर 45 mg/L से कम होना चाहिए। 45 mg/L से ऊपर का स्तर स्वास्थ्य के लिए हानिकारक हो सकता है।" },
      { q: "हमारा पानी साफ है या नहीं?", a: "आप अपने क्षेत्र की WQI (Water Quality Index) जांच सकते हैं। 80+ स्कोर अच्छा है, 60-80 ठीक है, और 60 से कम खतरनाक है। वर्तमान जानकारी के लिए डैशबोर्ड देखें।" },
      { q: "पानी कैसे शुद्ध करें?", a: "पानी को उबालें कम से कम 10 मिनट, या WHO अनुमोदित फिल्टर का उपयोग करें। क्लोरीन टैबलेट का भी उपयोग कर सकते हैं।" },
      { q: "शिकायत कैसे करें?", a: "आप डैशबोर्ड पर 'नई शिकायत दर्ज करें' बटन से शिकायत दर्ज कर सकते हैं। 24 घंटे में जवाब मिलेगा।" }
    ],
    en: [
      { q: "When will water come?", a: "Water supply in your area is from 6:00 AM to 8:00 AM and 5:00 PM to 7:00 PM. Timings may vary in special circumstances." },
      { q: "What is the safe nitrate level?", a: "Safe nitrate level in drinking water should be below 45 mg/L. Levels above 45 mg/L can be harmful to health." },
      { q: "Is our water clean?", a: "You can check your area's WQI (Water Quality Index). A score of 80+ is good, 60-80 is moderate, and below 60 is unsafe. Check the dashboard for current information." },
      { q: "How to purify water?", a: "Boil water for at least 10 minutes, or use WHO-approved filters. You can also use chlorine tablets." },
      { q: "How to file a complaint?", a: "You can register a complaint using the 'Register New Complaint' button on your dashboard. You'll get a response within 24 hours." }
    ]
  };

  const handleLanguageSelect = (lang: 'hi' | 'en') => {
    setSelectedLanguage(lang);
    setMessages([{
      type: 'bot',
      text: lang === 'hi' 
        ? 'नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। कृपया एक प्रश्न चुनें:' 
        : 'Hello! I am here to help you. Please select a question:'
    }]);
  };

  const handleQuestionClick = (question: string, answer: string) => {
    setMessages([...messages, 
      { type: 'user', text: question },
      { type: 'bot', text: answer }
    ]);
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedLanguage(null);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg water-gradient hover:opacity-90 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="water-gradient text-white pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            जल सहायक / Water Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        {!selectedLanguage ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Languages className="h-12 w-12 text-primary" />
            <p className="text-center text-muted-foreground">
              भाषा चुनें / Select Language
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => handleLanguageSelect('hi')}
                className="water-gradient text-white hover:opacity-90"
              >
                हिंदी
              </Button>
              <Button
                onClick={() => handleLanguageSelect('en')}
                variant="outline"
              >
                English
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-2 border-t pt-3">
              <p className="text-xs text-muted-foreground mb-2">
                {selectedLanguage === 'hi' ? 'सामान्य प्रश्न:' : 'Common Questions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {questions[selectedLanguage].map((item, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                    onClick={() => handleQuestionClick(item.q, item.a)}
                  >
                    {item.q}
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="w-full mt-2"
              >
                {selectedLanguage === 'hi' ? 'भाषा बदलें' : 'Change Language'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
