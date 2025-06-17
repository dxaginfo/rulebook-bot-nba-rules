const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">About RuleBook Bot</h1>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is RuleBook Bot?</h2>
        <p className="mb-4">
          RuleBook Bot is an AI-powered chatbot designed to help basketball fans, players, coaches, and officials better understand the complex rules of the NBA. By providing clear, accurate explanations based on the official NBA rulebook, we aim to make basketball rules more accessible to everyone.
        </p>
        <p className="mb-4">
          Whether you're confused about traveling violations, want to understand the intricacies of goaltending, or need clarification on the bonus rule, RuleBook Bot can provide simple, easy-to-understand explanations with references to the official rules.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</div>
            <div>
              <h3 className="font-medium text-lg">Ask a Question</h3>
              <p className="text-gray-600">Type your question about any NBA rule in natural, conversational language.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</div>
            <div>
              <h3 className="font-medium text-lg">AI Analysis</h3>
              <p className="text-gray-600">Our AI searches through the official NBA rulebook to find relevant sections.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</div>
            <div>
              <h3 className="font-medium text-lg">Clear Explanation</h3>
              <p className="text-gray-600">Receive a simplified explanation with the exact rule reference and citation.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
        <p className="text-gray-700">
          RuleBook Bot is designed as an educational tool to help understand NBA rules. While we strive for accuracy, the official NBA rulebook and the interpretation by NBA officials remain the definitive sources for rule enforcement. This tool is not affiliated with or endorsed by the NBA.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;