"use client"

import { useState, useRef, useEffect, useId } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Loader, MessageSquare, Send, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { aiChatbotInitialPrompt } from "@/ai/flows/ai-chatbot-initial-prompt"
import { aiChatbotAnswerQuestions } from "@/ai/flows/ai-chatbot-answer-questions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type Message = {
  id: number
  role: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const dialogId = useId()
  const titleId = useId()

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      aiChatbotInitialPrompt({})
        .then(response => setMessages([{ id: 1, role: "bot", text: response.greeting }]))
        .catch(() => setMessages([{ id: 1, role: "bot", text: "Hallo! Wie kann ich Ihnen zu unseren Leistungen weiterhelfen?" }]))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, messages.length]);

  // Move focus into the chat when it opens; Escape closes and returns focus.
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isLoading) inputRef.current?.focus();
  }, [isLoading, isOpen]);

  const closeChat = () => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A hack to access the underlying viewport
        const viewport = scrollAreaRef.current.children[0] as HTMLDivElement;
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages])

  const handleSend = async () => {
    const question = input.trim()
    if (question === "" || isLoading) return

    const userMessage: Message = { id: Date.now(), role: "user", text: question }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await aiChatbotAnswerQuestions({ question });
      const botMessage: Message = { id: Date.now() + 1, role: "bot", text: response.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling AI:", error);
      const errorMessage: Message = { id: Date.now() + 1, role: "bot", text: "Entschuldigung, es ist ein Fehler aufgetreten." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className={cn("fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50", isOpen && "hidden")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
              <Button
                ref={launcherRef}
                size="icon"
                className="rounded-full w-14 h-14 brand-gradient shadow-lg"
                onClick={() => setIsOpen(true)}
                aria-label="KI-Chat öffnen"
                aria-expanded={isOpen}
                aria-controls={dialogId}
              >
                <MessageSquare className="w-6 h-6" aria-hidden="true" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Fragen? Chatten Sie mit unserer KI.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            id={dialogId}
            role="dialog"
            aria-labelledby={titleId}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm h-[75dvh] max-h-[600px] bg-secondary rounded-xl border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 id={titleId} className="font-semibold text-lg">Flut KI-Assistent</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeChat} aria-label="Chat schließen">
                <X className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-6" role="log" aria-live="polite" aria-relevant="additions">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-2",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "bot" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl px-4 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      {message.text}
                    </div>
                     {message.role === "user" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback><User size={20}/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                     <Avatar className="w-8 h-8">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                      </Avatar>
                    <div className="max-w-[80%] rounded-xl px-4 py-3 bg-background flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin"/>
                        <span className="text-sm text-muted-foreground">denkt nach …</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Stellen Sie eine Frage …"
                  aria-label="Ihre Frage an den KI-Assistenten"
                  className="pr-12 h-12"
                  maxLength={500}
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 -translate-y-1/2 right-1.5 w-10 h-10 brand-gradient"
                  onClick={handleSend}
                  disabled={isLoading || input.trim() === ""}
                  aria-label="Frage senden"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Antworten erzeugt ein KI-Modell über Groq. Bitte keine persönlichen Daten eingeben.{" "}
                <Link href="/recht/datenschutz" className="underline underline-offset-2 hover:text-primary">Datenschutz</Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
