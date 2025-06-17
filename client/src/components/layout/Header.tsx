import { Link } from 'react-router-dom';
import { Basketball } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary py-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Basketball size={28} />
          <span>RuleBook Bot</span>
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-gray-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200 transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;