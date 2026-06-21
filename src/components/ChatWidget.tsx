import { useEffect, useRef, useState } from "react";
import { 
  X, 
  Send, 
  Loader2, 
  Sparkles, 
  Bot, 
  User, 
  ChevronLeft, 
  MoreVertical, 
  Home, 
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import yogeshPhoto from "../assets/yogesh.jpg";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  { label: "🛠️ Tech Stack", text: "What is Yogesh's core tech stack?" },
  { label: "🚀 Projects", text: "What projects has Yogesh built?" },
  { label: "💼 Internships", text: "Tell me about Yogesh's internship experience." },
  { label: "📞 Contact Info", text: "How can I contact Yogesh?" }
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"home" | "chat">("home");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);

  // Lead capture state
  const [email, setEmail] = useState("");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [tempMessage, setTempMessage] = useState("");

  // Interactive states
  const [showMenu, setShowMenu] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, showLeadCapture]);

  useEffect(() => {
    if (open && tab === "chat") {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, tab]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Check if user has introduced themselves yet
    if (!email) {
      setTempMessage(text);
      setShowLeadCapture(true);
      return;
    }

    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            parts: [{ type: "text", text: m.content }],
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to initialize stream reader");
      }

      const decoder = new TextDecoder();
      let done = false;
      let assistantText = "";
      const assistantMessageId = Math.random().toString(36).substring(7);

      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const token = JSON.parse(line.substring(2));
                assistantText += token;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId ? { ...m, content: assistantText } : m
                  )
                );
              } catch (e) {
                // Ignore chunk parse errors
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Chat client error:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch response"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      sendMessage(text);
    }
  };

  const handleLeadCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome! Message sending...");
    setShowLeadCapture(false);
    const msgToSend = tempMessage;
    setTempMessage("");
    if (msgToSend) {
      sendMessage(msgToSend);
    }
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  const handleOpenChat = () => {
    setOpen(true);
    setTab("home");
    setShowMenu(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowMenu(false);
    toast.success("Conversation cleared.");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("yogeshpawar.pict@gmail.com");
    setShowMenu(false);
    toast.success("Email copied to clipboard!");
  };

  const handleMinimizeChat = () => {
    setShowMenu(false);
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 animate-fade-in">
          {showTooltip && (
            <div className="relative hidden rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-card md:block animate-in fade-in duration-300">
              <button 
                onClick={() => setShowTooltip(false)}
                className="absolute -top-1 -left-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-border bg-card text-[9px] hover:bg-secondary cursor-pointer"
              >
                ×
              </button>
              Ask my AI Assistant!
            </div>
          )}
          <button
            onClick={handleOpenChat}
            aria-label="Open chat"
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-105 cursor-pointer"
            style={{ 
              backgroundColor: "oklch(0.62 0.16 160)", 
              color: "oklch(0.98 0.005 160)", 
              boxShadow: "0 0 60px -10px oklch(0.62 0.16 160 / 0.35)" 
            }}
          >
            <span 
              className="absolute inset-0 rounded-full opacity-30 animate-pulse-ring" 
              style={{ backgroundColor: "oklch(0.62 0.16 160)" }}
            />
            <MessageSquare className="relative h-6 w-6 fill-current" />
          </button>
        </div>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex w-[20rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border shadow-card bg-card transition-all animate-in fade-in slide-in-from-bottom-5 duration-300 h-auto max-h-[29.5rem] sm:max-h-[31.5rem]">
          
          {/* THREE DOT MENU DROPDOWN PANEL */}
          {showMenu && (
            <div className="absolute top-12 right-4 z-50 w-40 rounded-xl border border-border bg-card p-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
              <button
                onClick={handleClearChat}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-[11px] font-semibold hover:bg-secondary text-foreground cursor-pointer transition-colors"
              >
                Clear Conversation
              </button>
              <button
                onClick={handleCopyEmail}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-[11px] font-semibold hover:bg-secondary text-foreground cursor-pointer transition-colors"
              >
                Copy Email Address
              </button>
              <button
                onClick={handleMinimizeChat}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-[11px] font-semibold hover:bg-secondary text-destructive cursor-pointer transition-colors"
              >
                Minimize Assistant
              </button>
            </div>
          )}


          {/* HOME TAB VIEW (Compact Dynamic Height) */}
          {tab === "home" && (
            <div className="flex flex-col bg-background animate-in fade-in duration-200">
              {/* Home Header */}
              <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-4 pb-8 rounded-b-xl relative shadow-md">
                <div className="flex justify-between items-center">
                  <img
                    src={yogeshPhoto}
                    alt="Yogesh Pawar"
                    className="h-8 w-8 rounded-full object-cover border border-primary-foreground/25 shadow-sm"
                  />
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer p-1 rounded-lg hover:bg-primary-foreground/10"
                  >
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>
                </div>
                
                <h2 className="mt-3 text-lg font-extrabold tracking-tight text-primary-foreground leading-none">
                  Hi there 👋
                </h2>
                <p className="mt-1 text-xs text-primary-foreground/90 leading-snug">
                  Welcome to our website. Ask us anything 🎉
                </p>
              </div>
              
              {/* Home Content Card (Overlapping) */}
              <div className="px-3 -mt-4 z-10 relative mb-3">
                <button
                  onClick={() => setTab("chat")}
                  className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-left shadow-md hover:border-primary/50 hover:bg-secondary/40 transition-all group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-foreground text-xs leading-none">Chat with us</p>
                    <p className="text-[10px] text-muted-foreground">We reply immediately</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105 group-hover:bg-primary/20">
                    <Send className="h-3 w-3" />
                  </span>
                </button>
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-border/60 bg-card/50 backdrop-blur-md py-2 px-6 flex justify-around items-center">
                <button 
                  onClick={() => { setTab("home"); setShowMenu(false); }}
                  className="flex flex-col items-center gap-0.5 text-primary cursor-pointer"
                >
                  <Home className="h-4.5 w-4.5" />
                  <span className="text-[9px] font-bold">Home</span>
                </button>
                <button 
                  onClick={() => { setTab("chat"); setShowMenu(false); }}
                  className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span className="text-[9px] font-medium">Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* CHAT TAB VIEW (Spacious scroll container) */}
          {tab === "chat" && (
            <div className="flex flex-col h-[27rem] sm:h-[29rem] bg-background animate-in fade-in duration-200">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border/80 bg-card px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => { setTab("home"); setShowMenu(false); }}
                    className="rounded-lg p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <img
                    src={yogeshPhoto}
                    alt="Yogesh Pawar"
                    className="h-7 w-7 rounded-full object-cover border border-border"
                  />
                  <div>
                    <p className="text-xs font-bold leading-none">Hi there 👋</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded-lg hover:bg-secondary"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded-lg hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
                {messages.length === 0 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2 flex-row">
                      <img
                        src={yogeshPhoto}
                        alt="Yogesh Pawar"
                        className="h-6 w-6 rounded-full object-cover border border-border mt-0.5"
                      />
                      <div className="max-w-[85%] whitespace-pre-wrap rounded-xl px-2.5 py-1.5 text-xs leading-relaxed bg-secondary/60 text-foreground rounded-tl-none border border-border/40 shadow-sm">
                        Hi there 👋 If you need any assistance, I'm always here. Click an option or type your query:
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5 pl-8">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => handleSuggestionClick(s.text)}
                          className="rounded-lg border border-border/60 bg-background/40 px-2 py-1.5 text-left text-[10px] font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01]"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div key={m.id} className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} animate-in fade-in duration-200`}>
                      {!isUser && (
                        <img
                          src={yogeshPhoto}
                          alt="Yogesh Pawar"
                          className="h-6 w-6 rounded-full object-cover border border-border mt-0.5"
                        />
                      )}
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-2.5 py-1.5 text-xs leading-relaxed ${
                          isUser
                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm font-medium"
                            : "bg-secondary/60 text-foreground rounded-tl-none border border-border/40 shadow-sm"
                        }`}
                      >
                        {m.content || (isUser ? "" : "…")}
                      </div>
                    </div>
                  );
                })}
                
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-center gap-1.5 px-8 text-[10px] text-muted-foreground animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin text-primary" /> AI is thinking…
                  </div>
                )}
                
                {error && (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-2.5 text-[10px] text-destructive animate-in fade-in duration-200">
                    Connection issue. Please email Yogesh directly at <a href="mailto:yogeshpawar.pict@gmail.com" className="underline font-semibold">yogeshpawar.pict@gmail.com</a>.
                  </div>
                )}
              </div>

              {/* Chat Input Form */}
              <div className="border-t border-border/80 bg-background/85 px-2.5 py-1.5">
                <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your message..."
                    className="flex-1 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                    aria-label="Send"
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* LEAD CAPTURE POPUP MODAL OVERLAY */}
          {showLeadCapture && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-3 animate-in fade-in duration-200">
              <div className="w-full max-w-[240px] rounded-xl bg-card p-4 border border-border shadow-card animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start">
                  <img
                    src={yogeshPhoto}
                    alt="Yogesh Pawar"
                    className="h-9 w-9 rounded-full object-cover border border-border"
                  />
                  <button 
                    onClick={() => setShowLeadCapture(false)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded hover:bg-secondary"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                
                <h3 className="mt-3 text-xs font-bold text-foreground">
                  Please introduce yourself:
                </h3>
                
                <form onSubmit={handleLeadCaptureSubmit} className="mt-2.5 space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                  />
                  
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary py-1.5 text-xs font-bold text-primary-foreground hover:opacity-95 shadow-glow cursor-pointer transition-all active:scale-[0.98]"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
