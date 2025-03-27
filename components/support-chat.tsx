"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Need help tracking your Cinghialino? I'm here to help!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBoarNoises = () => {
    const noises = [
      "Oink! Oink! Your Cinghialino is on its way!",
      "GRUNT! We're working hard to deliver your package!",
      "SNORT! SNORT! Tracking is active!",
      "Oink oink! Your Cinghialino is being handled with care!",
      "GRUNT! GRUNT! We appreciate your patience!",
    ]
    return noises[Math.floor(Math.random() * noises.length)]
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInputValue("")

    // Show bot typing indicator
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: generateBoarNoises(),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐗</span>
              <h3 className="font-medium">Cinghialino Support</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted mr-auto",
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-muted max-w-[80%] rounded-lg p-3 mr-auto">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={toggleChat} className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center">
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 text-lg">🐗</span>
          </div>
        </Button>
      )}
    </div>
  )
}

