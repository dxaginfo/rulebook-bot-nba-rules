# Deployment Guide

This document outlines the steps to deploy the RuleBook Bot application in various environments.

## Local Development Deployment

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- OpenAI API key
- Pinecone API key (optional for vector search)

### Steps

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/rulebook-bot-nba-rules.git
cd rulebook-bot-nba-rules
```

2. Set up environment variables
```bash
# In the server directory
cd server
cp .env.example .env
# Edit the .env file with your API keys
```

3. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

4. Start the development servers
```bash
# Start the backend server (from the server directory)
npm run dev

# In a separate terminal, start the frontend (from the client directory)
npm run dev
```

5. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Docker Deployment

### Prerequisites
- Docker and Docker Compose
- OpenAI API key
- Pinecone API key (optional for vector search)

### Steps

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/rulebook-bot-nba-rules.git
cd rulebook-bot-nba-rules
```

2. Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index
```

3. Build and start the containers
```bash
docker-compose up -d --build
```

4. Access the application at http://localhost

## Production Deployment (Railway)

### Prerequisites
- Railway account
- GitHub repository

### Steps

1. Fork the repository to your GitHub account

2. Create a new project in Railway and link it to your GitHub repository

3. Configure environment variables in Railway:
   - OPENAI_API_KEY
   - PINECONE_API_KEY (if using vector search)
   - PINECONE_ENVIRONMENT (if using vector search)
   - PINECONE_INDEX (if using vector search)
   - NODE_ENV=production

4. Deploy the application
   - Railway will automatically detect the Dockerfiles and deploy both services

## Production Deployment (Vercel & Render)

### Frontend Deployment (Vercel)

1. Create a new project in Vercel and link it to your GitHub repository

2. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

3. Configure environment variables:
   - VITE_API_URL=your_backend_url

4. Deploy the frontend

### Backend Deployment (Render)

1. Create a new Web Service in Render

2. Link to your GitHub repository

3. Configure the build settings:
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && node dist/server.js`

4. Configure environment variables:
   - OPENAI_API_KEY
   - PINECONE_API_KEY (if using vector search)
   - PINECONE_ENVIRONMENT (if using vector search)
   - PINECONE_INDEX (if using vector search)
   - NODE_ENV=production
   - CORS_ORIGIN=your_frontend_url

5. Deploy the backend

## Continuous Integration

For CI/CD, you can set up GitHub Actions by creating a `.github/workflows/main.yml` file with the following content:

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install client dependencies
      run: |
        cd client
        npm ci
        
    - name: Build client
      run: |
        cd client
        npm run build
        
    - name: Install server dependencies
      run: |
        cd server
        npm ci
        
    - name: Build server
      run: |
        cd server
        npm run build
```

This workflow will automatically build both the client and server whenever changes are pushed to the main branch or a pull request is opened.