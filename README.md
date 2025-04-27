# FreshSaver

FreshSaver is an application that helps you track what's in your fridge and generate recipes based on your available ingredients using OpenAI integration. You can mark your favorite recipes with checkboxes for easy reference.

## Features

- Add and remove items from your virtual fridge
- Generate recipe ideas using AI based on ingredients you have
- Mark your favorite recipes with checkboxes
- Get suggestions for missing ingredients you might need to buy

## Prerequisites

Before running this application, you need:

1. Node.js and npm installed
2. OpenAI API key

## Setup Instructions

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the Application

Start the frontend application:
```
npm start
```
The application will open in your browser at http://localhost:3000.

## Usage

1. Add ingredients to your fridge on the "My Fridge" page
2. Click "Generate Recipes" to get AI-powered recipe suggestions
3. Check the recipes you like to mark them as saved
4. The checked recipes are stored in React state during your session

## Technologies Used

- React.js for the frontend
- OpenAI API for recipe generation

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
