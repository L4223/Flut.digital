"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, CornerDownLeft, Loader, MessageSquare, Send, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  const [isLoading, setIsLoading] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      aiChatbotInitialPrompt({}).then(response => {
        setMessages([{ id: 1, role: "bot", text: response.greeting }])
        setIsLoading(false);
      });
    }
  }, [isOpen]);

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
    if (input.trim() === "") return
    
    const userMessage: Message = { id: Date.now(), role: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await aiChatbotAnswerQuestions({ question: input });
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className="fixed bottom-6 right-6 z-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
              <Button
                size="icon"
                className="rounded-full w-14 h-14 brand-gradient shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <MessageSquare className="w-6 h-6" />
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
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-secondary rounded-xl border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Flut AI Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-6">
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
                        <span className="text-sm text-muted-foreground">denkt nach...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Stellen Sie eine Frage..."
                  className="pr-12 h-12"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 -translate-y-1/2 right-2 w-9 h-9 brand-gradient"
                  onClick={handleSend}
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
