import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface ChatMessage {
  id: number;
  author: "you" | "other";
  text: string;
}

export function CommunityChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, author: "other", text: language === "hi" ? "आज शाम 5 से 7 बजे पानी की सप्लाई होगी।" : "Water supply today is 5-7 PM." },
    { id: 2, author: "other", text: language === "hi" ? "क्या किसी और के नल में दबाव कम है?" : "Anyone else getting low pressure?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), author: "you", text: input.trim() }]);
    setInput("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {t("user.communityChat")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ScrollArea className="h-56 border rounded-md p-3 bg-card">
          <div className="space-y-2">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.author === "you" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-md max-w-[75%] text-sm ${m.author === "you" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chatbot.typeMessage")}
            className="flex-1"
          />
          <Button onClick={sendMessage} className="water-gradient text-white" aria-label={t("chatbot.send")}> 
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
