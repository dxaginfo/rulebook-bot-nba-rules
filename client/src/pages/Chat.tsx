import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real implementation, this would be a call to your backend API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const sampleResponses = [
          "According to the NBA rulebook (Rule 5, Section II, a), a player cannot remain in the restricted area under the basket for more than three seconds while their team is in possession of the ball in the frontcourt. This is known as the 'three-second violation' or 'three in the key.' The purpose of this rule is to prevent offensive players from camping near the basket.",
          "The backcourt violation (Rule 8, Section II) occurs when a team in possession of the ball in their frontcourt causes the ball to go into the backcourt, and they are the first to touch the ball in the backcourt. Once the ball has been established in the frontcourt, a team has 8 seconds to advance the ball across the half-court line.",
          "According to the NBA rulebook (Rule 12, Section I, b), a 'clear path to the basket' foul is a personal foul against any offensive player during their team's transition scoring opportunity. For this to be called, the ball and offensive player must be positioned between the tip-off circle in the backcourt and the basket in the frontcourt, with no defender between the offensive player with the ball and the basket."
        ];
        const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        const assistantMessage: Message = { role: 'assistant', content: randomResponse };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    toast({
      title: 'Chat Reset',
      description: 'All messages have been cleared.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-nba-blue text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">RuleBook Bot</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-6">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" onClick={handleReset} disabled={messages.length === 0}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Chat
          </Button>
        </div>

        <div className="flex-grow border rounded-lg mb-4 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-2">NBA Rules Q&A</h2>
              <p className="text-center max-w-md mb-6">
                Ask any question about NBA rules and get clear, accurate answers based on the official rulebook.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-lg">
                <Button variant="outline" className="justify-start" onClick={() => setInput("What is a clear path foul?")}>
                  What is a clear path foul?
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setInput("Explain the 3-second rule")}>
                  Explain the 3-second rule
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setInput("What's the backcourt violation?")}>
                  What's the backcourt violation?
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setInput("How does goaltending work?")}>
                  How does goaltending work?
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-3/4 rounded-lg p-4 ${message.role === 'user' ? 'bg-nba-blue text-white' : 'bg-white border'}`}
                  >
                    {message.role === 'assistant' ? (
                      <ReactMarkdown className="prose">
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3/4 rounded-lg p-4 bg-white border">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-gray-500">Searching the rulebook...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Ask about any NBA rule..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow resize-none"
            rows={2}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
          </Button>
        </form>
      </main>

      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">RuleBook Bot</h2>
              <p className="text-gray-400">NBA Rules Made Simple</p>
            </div>
            <div>
              <p className="text-gray-400">© {new Date().getFullYear()} RuleBook Bot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}