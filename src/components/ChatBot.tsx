import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { sendChatMessage } from "../services/chatService"; // your API service

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "bot",
      text: "Hi! I'm the PiedPiper AI assistant. Ask me anything about our compression platform, our team, or how to get started.",
    },
  ]);

  const [lastMessageId, setLastMessageId] = useState(0); // for scroll tracking

  // Scroll to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, lastMessageId]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const inputEl = document.getElementById("chat-input");
        inputEl?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage(text);
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response || "I don't have an answer right now.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setLastMessageId(botMessage.id);
    } catch (err) {
      console.log(err)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, sender: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend(e);
  };

  return (
    <>
      {/* CHAT WINDOW */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{ height: "480px" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-border bg-secondary px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold">
              PP
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Piper Chat
              </p>
              <p className="text-xs text-muted-foreground">Always online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          id="chat-messages"
          className="flex-1 overflow-y-auto px-4 py-4 bg-[#101317]"
        >
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-400 italic">
                Assistant is typing...
              </div>
            )}
          </div>
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSend}
          className="border-t border-border bg-secondary px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about PiedPiper..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiSend className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 ${
          isOpen ? "scale-90" : "scale-100"
        }`}
      >
        {isOpen ? (
          <IoClose className="h-6 w-6" />
        ) : (
          <FiMessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default ChatBot;
