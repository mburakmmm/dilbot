import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot } from 'lucide-react'

const App: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string }[]
  >([])
  const [inputText, setInputText] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: inputText }])
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputText)
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ])
      }, 500) // Simulate delay
      setInputText('')
    }
  }

  const getBotResponse = (userMessage: string): string => {
    // Placeholder for Deepseek API integration and exam-specific logic
    userMessage = userMessage.toLowerCase()

    if (userMessage.includes('yds')) {
      return 'YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı) is a language proficiency exam in Turkey.'
    } else if (userMessage.includes('yökdil')) {
      return 'YÖKDİL (Yükseköğretim Kurumları Yabancı Dil Sınavı) is another language exam for postgraduate studies in Turkey.'
    } else if (userMessage.includes('merhaba') || userMessage.includes('selam')) {
      return 'Merhaba! Size YDS ve YÖKDİL sınavları hakkında yardımcı olabilirim.'
    } else {
      return 'I am an AI assistant specialized in YDS and YÖKDİL exams. How can I help you today?'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center text-gray-800">
            <Bot className="mr-2 h-6 w-6 text-blue-500" />
            <span className="font-semibold text-xl">Dil Sınavı Botu</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4">
        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-[calc(100vh-160px)] mb-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-2/3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <input
            type="text"
            className="flex-1 border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mesajınızı yazın..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            onClick={sendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
