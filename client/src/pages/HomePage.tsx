import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you understand NBA rules. What would you like to know?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    const botMessagePlaceholder: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      sender: 'bot',
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, botMessagePlaceholder]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: input }),
      // });
      // const data = await response.json();

      // Simulate API call for now
      const simulatedResponse = await new Promise<string>((resolve) => {
        setTimeout(() => {
          if (input.toLowerCase().includes('travel')) {
            resolve(
              'According to the NBA Rulebook, Section XIII, a traveling violation occurs when a player holding the ball moves one or both feet illegally. A player who receives the ball while standing still may pivot, using either foot as the pivot foot. Once the pivot foot is established, it cannot be changed. If a player wishes to dribble after receiving the ball, the ball must be released from their hand before the pivot foot is lifted off the floor.'
            );
          } else if (input.toLowerCase().includes('foul')) {
            resolve(
              'Personal fouls are covered in Rule 12 of the NBA Rulebook. A personal foul is illegal physical contact which impedes the progress of an opponent. Contact that is not directly related to normal defensive or offensive positions and movement is considered illegal. If the contact is deemed unnecessary or excessive, it may be classified as a flagrant foul, which carries additional penalties.'
            );
          } else {
            resolve(
              'I don\'t have specific information about that rule in my database. Please try asking about another NBA rule or specify your question further.'
            );
          }
        }, 1500);
      });

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessagePlaceholder.id
            ? {
                ...msg,
                text: simulatedResponse,
                isLoading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessagePlaceholder.id
            ? {
                ...msg,
                text: 'Sorry, there was an error processing your request. Please try again.',
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">NBA RuleBook Bot</h1>
        <p className="text-center text-gray-600">
          Ask questions about NBA rules in plain English and get clear explanations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.isLoading ? (
                  <div className="flex space-x-2 justify-center items-center h-6">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any NBA rule..."
              className="flex-grow rounded-l-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary text-white rounded-r-lg px-4 py-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Powered by official NBA rulebook data</p>
      </div>
    </div>
  );
};

export default HomePage;