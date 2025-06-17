# RuleBook Bot: NBA Rulebook

## Overview

RuleBook Bot is an AI-powered chatbot that makes understanding the complex NBA rulebook easy and accessible. This web application allows fans, journalists, and aspiring referees to ask questions about NBA rules in plain English and receive accurate, easy-to-understand answers based on the official NBA rulebook.

### Key Features

- **Natural Language Query Interface**: Ask questions about NBA rules in plain conversational English
- **Rule Citation**: Provides the exact rule section/number for reference
- **Simplified Explanations**: Breaks down complex rules into simple, understandable language
- **Example Scenarios**: Illustrates rules with practical game situations
- **Mobile-Friendly Design**: Access rule clarifications anywhere, anytime

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Framer Motion for animations

### Backend
- Node.js with Express
- OpenAI API integration
- Vector database for semantic search (Pinecone)

### Deployment
- Vercel for frontend hosting
- Railway for backend services

## Architecture

The application follows a client-server architecture:

1. **Data Preparation**:
   - The official NBA rulebook is parsed and chunked into sections
   - Each chunk is embedded using OpenAI's embedding model
   - Embeddings are stored in a vector database for semantic retrieval

2. **Query Processing**:
   - User submits a question through the web interface
   - The question is embedded and used to search the vector database
   - Most relevant rule sections are retrieved

3. **Response Generation**:
   - Retrieved rule sections are sent to the LLM along with the user question
   - The LLM generates a clear, concise response with rule citations
   - The response is formatted and returned to the user

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- OpenAI API key
- Pinecone API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/rulebook-bot-nba-rules.git
cd rulebook-bot-nba-rules
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create a `.env` file in the server directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index
```

4. Run the development servers:

```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm run dev
```

5. Open your browser and navigate to http://localhost:5173

## Roadmap

- [x] Initial project setup
- [x] Frontend UI development
- [x] Backend API setup
- [x] NBA rulebook parsing and embedding
- [x] Basic query-response functionality
- [ ] Advanced context awareness for follow-up questions
- [ ] Rule visualization with diagrams
- [ ] Video examples integration
- [ ] User accounts for saving favorite rules/explanations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NBA for providing the official rulebook
- OpenAI for their powerful language models
- The basketball community for their continuous support

## Contact

For questions or feedback, please open an issue on this repository.