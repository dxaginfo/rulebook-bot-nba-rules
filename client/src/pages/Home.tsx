import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
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
        <section className="pt-20 pb-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6">NBA Rules Made Simple</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Ask questions about NBA rules in plain English and get clear, accurate answers based on the official NBA rulebook.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/chat">
                <Button variant="nba" size="lg" className="text-base group">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <a href="https://official.nba.com/rulebook/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-base">
                  Official Rulebook
                  <BookOpen className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-nba-blue rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Ask a Question</h3>
                <p className="text-gray-600">Type your NBA rules question in plain English, just like you would ask a referee.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-nba-blue rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Get the Rule</h3>
                <p className="text-gray-600">Receive the exact rule citation from the official NBA rulebook that addresses your question.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-nba-blue rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Understand Easily</h3>
                <p className="text-gray-600">Get a simplified explanation and practical examples to help you understand the rule.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Become an NBA Rules Expert?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Whether you're a fan, coach, or aspiring referee, understanding the rules will enhance your basketball experience.
            </p>
            <Link to="/chat">
              <Button variant="nba" size="lg" className="text-base">
                Start Asking Questions
              </Button>
            </Link>
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