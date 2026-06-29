import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const replies: Record<string, string> = {
  "Why am I eligible for DOST?": "Based on your BS Computer Science course and a GWA of 1.28, you matched DOST priority criteria (STEM + academic excellence).",
  "What is the Academic Scholarship?": "BiPSU's Academic Scholarship rewards students with GWA 1.00–1.50 and no grade above 2.5. University Scholars (1.00–1.29) get full tuition.",
  "How do I apply for TDP?": "Go to 'Apply → TDP Scholarship', fill out the form, then upload your COR/COE and Certificate of Indigency.",
  "Renewal requirements?": "Submit your latest Certificate of Grades, COE, and Good Moral certificate before the renewal deadline.",
};
const suggestions = Object.keys(replies);

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! I'm your BiPSU Scholarship Assistant. Ask me anything about scholarships, eligibility, or applications." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = replies[text] || "Great question! Based on your profile, I recommend checking your matched scholarships in the Recommendations page for tailored guidance.";
      setMsgs(m => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 900);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground card-elev hover:scale-105 transition">
        <MessageCircle className="h-5 w-5" /> <span className="text-sm font-medium">Ask AI</span>
      </button>
    );
  }
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] flex flex-col rounded-2xl border bg-card card-elev overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <div>
            <p className="text-sm font-semibold leading-tight">Scholarship Assistant</p>
            <p className="text-[10px] opacity-80">Online · Powered by BiPSU AI</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/30">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
            }`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 px-3 py-2 w-fit rounded-2xl bg-card border">
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:300ms]" />
          </div>
        )}
      </div>
      <div className="px-3 pt-2 flex flex-wrap gap-1.5">
        {suggestions.slice(0, 2).map(s => (
          <button key={s} onClick={() => send(s)} className="text-[11px] px-2 py-1 rounded-full bg-primary-soft text-primary hover:bg-primary/10">
            {s}
          </button>
        ))}
      </div>
      <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2 p-3 border-t">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question…" />
        <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}
