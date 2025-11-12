# sdet-frontend-test

A PokéDex application built with React and TypeScript, featuring a search interface for Pokémon data with comprehensive test coverage using Cypress and Playwright. The application consists of a TypeScript React frontend and a TypeScript Express backend API.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)
- [API Documentation](#api-documentation)
- [Development Scripts](#development-scripts)
- [TypeScript](#typescript)

## Prerequisites

- Node.js version 16.18.0 or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Install dependencies:
   ```bash
   npm run pre-install
   ```

3. Install Playwright browsers (required for Playwright tests):
   ```bash
   npx playwright install
   ```

## Running the Application

### Start Both Client and Server

Start both the client and server simultaneously:
```bash
npm start
```

This will start:
- **Client**: React application on `http://localhost:3000`
- **Server**: Express API server on `http://localhost:3001` (automatically builds TypeScript before starting)

### Development Mode

For development with hot-reload on the server:
```bash
# Terminal 1: Start client
cd client
npm start

# Terminal 2: Start server in dev mode
cd server
npm run dev
```

The server dev mode uses `tsx` for direct TypeScript execution without compilation.

### Build for Production

Build the server TypeScript code:
```bash
cd server
npm run build
```

The compiled JavaScript will be output to `server/dist/`.

The application uses npm workspaces to manage the client and server as separate packages.

## Running Tests

### Cypress Tests

Open Cypress Test Runner:
```bash
npm run test:cypress:ui
```

Or run Cypress tests headlessly:
```bash
npx cypress run
```

### Playwright Tests

Run Playwright tests:
```bash
npm run test:playwright
```

Run Playwright tests in UI mode (interactive):
```bash
npm run test:playwright:ui
```

Run Playwright tests in headed mode (visible browser):
```bash
npm run test:playwright:headed
```

Run Playwright tests in debug mode:
```bash
npm run test:playwright:debug
```

**Note**: Make sure both the client and server are running before executing tests. Playwright tests will automatically start the application if not already running.

## Project Structure

```
sdet-frontend-test/
├── client/                    # React frontend application (TypeScript)
│   ├── src/
│   │   ├── api/               # API client functions (.ts)
│   │   ├── *.tsx              # React components
│   │   └── types.ts           # TypeScript type definitions
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json
├── server/                     # Express backend API (TypeScript)
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── pokeapi.ts         # GraphQL client wrapper
│   │   ├── queries.ts         # API route handlers
│   │   └── types.ts           # TypeScript type definitions
│   ├── dist/                  # Compiled JavaScript (generated)
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json
├── cypress/                    # Cypress E2E tests
│   └── e2e/                   # Cypress test specifications
├── playwright/                 # Playwright E2E tests
│   ├── e2e/
│   │   ├── config/            # Environment configurations
│   │   ├── specs/             # Playwright test specifications
│   │   └── support/           # Test support files
│   │       ├── fixtures/      # Test data and constants
│   │       ├── page-objects/ # Page Object Model classes
│   │       └── utils/          # Utility functions
│   ├── tsconfig.json          # TypeScript configuration for Playwright
│   └── README.md              # Playwright test documentation
├── cypress.config.js          # Cypress configuration
├── playwright.config.ts       # Playwright configuration
├── openapi.yaml               # OpenAPI 3.0 specification
└── package.json               # Root workspace configuration
```

## Acceptance Criteria

The product owner provided the following specifications for the application:

### Homepage
- The homepage should have a title matching `PokéDex!`
- The search text box will only accept alphabetical characters
  - An error message will be shown reading `Invalid search term` otherwise

### Search Functionality
- If a search yields no results, an error message should be shown with `Pokémon not found`
- If a search returns successful results, a list of valid results should be displayed

### Details Page
After selecting a result, the user is taken to a details page with:
- The Pokémon's name
- A picture of the Pokémon
- A description of the Pokémon
- A table of the following stats:
  - Pokédex number
  - Height
  - Weight
  - Type
  - Held Items (this field will be hidden if empty)
- The evolution chain of the Pokémon, including the one selected

## Technologies

- **Frontend**: 
  - React 17 with TypeScript
  - React Router v6
  - React Scripts (Webpack)
  - TypeScript 4.9.5
- **Backend**: 
  - Express.js with TypeScript
  - Node.js (ES Modules)
  - TypeScript 4.5.2
  - GraphQL client (PokeAPI)
- **Testing**: 
  - Cypress 15.6.0
  - Playwright 1.40.0
- **API Documentation**: OpenAPI 3.0.3 (see `openapi.yaml`)

## API Documentation

The API is documented using OpenAPI 3.0.3 specification. See `openapi.yaml` for complete API documentation including:
- Endpoint descriptions
- Request/response schemas
- Example requests and responses
- Error response formats

The API provides two main endpoints:
- `GET /api/search?query={name}&langId={id}` - Search for Pokémon by name
- `GET /api/lookup/{name}` - Get detailed Pokémon information

## Development Scripts

### Root Scripts
- `npm start` - Start both client and server simultaneously
- `npm run pre-install` - Install dependencies (ignoring engine requirements)

### Server Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Build and run the server (production mode)
- `npm run dev` - Run server in development mode with hot-reload
- `npm run watch` - Watch TypeScript files and recompile on changes

### Client Scripts
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (one-way operation)

### Test Scripts
- `npm run test:cypress:ui` - Open Cypress Test Runner
- `npm run test:playwright` - Run Playwright tests
- `npm run test:playwright:ui` - Run Playwright tests in UI mode (interactive)
- `npm run test:playwright:headed` - Run Playwright tests with visible browser
- `npm run test:playwright:debug` - Run Playwright tests in debug mode

## Testing Objectives

The developers created a front-end application pointing to an established API as a first iteration, with a test framework already implemented. The website runs as a localhost application on port 3000.

**The objective is to:**
- Ensure there is sufficient test coverage of an appropriate level
- Fix any flaky tests
- Report any bugs you might come across

## TypeScript

Both the client and server are written in TypeScript for improved type safety and developer experience. Type definitions are shared where applicable, and the codebase follows strict TypeScript configuration for maximum type safety.
