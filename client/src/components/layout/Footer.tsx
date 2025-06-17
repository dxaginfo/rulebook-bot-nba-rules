const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} RuleBook Bot. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/dxaginfo/rulebook-bot-nba-rules" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://official.nba.com/rulebook/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              NBA Rulebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;