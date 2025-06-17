import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function About() {
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

      <main className="flex-grow">
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-3xl">
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6">About RuleBook Bot</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                RuleBook Bot is an AI-powered chatbot designed to make the complex NBA rulebook accessible to everyone. 
                Whether you're a casual fan trying to understand a call you saw during a game, a coach looking to clarify 
                a rule for your team, or an aspiring referee studying the rulebook, RuleBook Bot is here to help.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Basketball rules can be complex and filled with technical language. Our mission is to break down these 
                rules into simple, understandable explanations that anyone can grasp, while still maintaining accuracy 
                and providing proper citations to the official NBA rulebook.
              </p>
              
              <h2>How It Works</h2>
              <p>
                RuleBook Bot uses advanced AI technology trained specifically on the NBA rulebook. When you ask a question, 
                the system searches through the rulebook to find the most relevant sections, then generates a clear, 
                concise answer that cites the specific rule and explains it in plain language.
              </p>
              
              <h2>Accuracy and Limitations</h2>
              <p>
                While we strive for 100% accuracy, RuleBook Bot is an AI assistant and may occasionally misinterpret 
                questions or provide incomplete information. Always refer to the official NBA rulebook for the definitive 
                word on basketball rules, especially in professional or officiating contexts.
              </p>
              
              <h2>Feedback and Improvements</h2>
              <p>
                We're constantly working to improve RuleBook Bot's accuracy and helpfulness. If you notice any errors 
                or have suggestions for how we can make the tool better, please let us know by opening an issue on our 
                GitHub repository.
              </p>
              
              <h2>Contact</h2>
              <p>
                For questions, feedback, or inquiries, please visit our GitHub repository and open an issue.
              </p>
            </div>
          </div>
        </section>
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