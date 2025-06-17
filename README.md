# RuleBook Bot: NBA Rulebook

An AI-powered chatbot that helps users understand NBA rules by providing simple explanations based on the official NBA rulebook.

## Features

- Ask questions about NBA rules in plain English
- Get clear, accurate explanations with official rule citations
- Simple, intuitive user interface
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- React Router for navigation
- Framer Motion for animations

### Backend
- Node.js with Express
- OpenAI API integration
- Vector database for semantic search (Pinecone)
- PDF parsing for rulebook ingestion

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- OpenAI API key
- Pinecone API key (optional for vector search)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/rulebook-bot-nba-rules.git
cd rulebook-bot-nba-rules
```

2. Install dependencies for client
```bash
cd client
npm install
```

3. Install dependencies for server
```bash
cd ../server
npm install
```

4. Set up environment variables
   - Create a `.env` file in the server directory based on `.env.example`
   - Add your OpenAI API key
   - Add Pinecone API keys if using vector search

5. Start the development server
```bash
# In the server directory
npm run dev

# In a separate terminal, in the client directory
npm run dev
```

6. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Docker Deployment

The application can also be deployed using Docker:

```bash
# Build and run using Docker Compose
docker-compose up -d --build
```

The application will be available at http://localhost:3000.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NBA for providing the official rulebook
- OpenAI for the API that powers the explanations
- All contributors to this project