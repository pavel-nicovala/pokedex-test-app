# sdet-frontend-test

A PokéDex application built with React, featuring a search interface for Pokémon data with comprehensive test coverage using Cypress.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)

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

## Running the Application

Start both the client and server:
```bash
npm start
```

This will start:
- **Client**: React application on `http://localhost:3000`
- **Server**: Express API server on `http://localhost:3001`

The application uses npm workspaces to manage the client and server as separate packages.

## Running Tests

Open Cypress Test Runner:
```bash
npm run start:test
```

Or run Cypress tests headlessly:
```bash
npx cypress run
```

**Note**: Make sure both the client and server are running before executing tests.

## Project Structure

```
sdet-frontend-test/
├── client/          # React frontend application
├── server/          # Express backend API
├── cypress/         # E2E tests
│   └── e2e/        # Test specifications
└── cypress.config.js # Cypress configuration
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

- **Frontend**: React 17, React Router v6, React Scripts
- **Backend**: Express.js, Node.js
- **Testing**: Cypress 15.6.0
- **Build Tools**: Webpack (via react-scripts)

## Testing Objectives

The developers created a front-end application pointing to an established API as a first iteration, with a test framework already implemented. The website runs as a localhost application on port 3000.

**The objective is to:**
- Ensure there is sufficient test coverage of an appropriate level
- Fix any flaky tests
- Report any bugs you might come across
