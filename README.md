# Google Books Search Application

## Description

The **Google Books Search Application** is a full-stack web application that allows users to search for books, save their favorite titles, and manage their personalized list. Built with a modern tech stack, it integrates a GraphQL API for efficient data management and uses JWT for secure user authentication.

The project was refactored from starter code provided by the **University of Denver Coding Bootcamp** to include GraphQL functionality and follows the MIT license.

---

## Table of Contents

- [Description](#description)
- [Criteria and Features](#criteria-and-features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Contributors](#contributors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Criteria and Features

### User Features
- **Search for Books**: Users can search for books using the Google Books API.
- **Save Books**: Logged-in users can save books to their profile.
- **Manage Saved Books**: Users can view and delete books from their saved list.

### Refactor Features
- Integrated **Apollo Server** for GraphQL API.
- Replaced RESTful API endpoints with GraphQL queries and mutations.
- Secured API with JWT-based authentication.
- Modularized code structure for better scalability and maintainability.

---

## Technologies Used

### Frontend:
- **React**: For building dynamic and reusable UI components.
- **Apollo Client**: For querying and mutating data through GraphQL.
- **Vite**: For faster development and build processes.
- **Bootstrap**: For responsive and clean UI design.

### Backend:
- **Node.js**: Runtime environment for the server.
- **Express.js**: Web framework for handling requests and middleware.
- **Apollo Server**: GraphQL API implementation.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JSON Web Tokens (JWT)**: For secure user authentication.

---

## Installation Instructions

### Prerequisites
- **Node.js** (v18 or later)
- **npm** (v8 or later)
- MongoDB database (local or cloud)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd googlebooks-app
2.npm install --prefix server
npm install --prefix client

3.MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret Key>
PORT=5000  
4.npm run build
npm run start


## Usage  
Enter a book title or author in the search bar and view the results.  
Create an account or log in to save books to your profile.  
View your saved books list and remove books you no longer need.  
Query or mutate data using the GraphQL Playground.  


## Deployment  
Live URL: Google Books Search App on Render  

## Contributors  
Shane: Full-stack developer, responsible for refactoring and integrating GraphQL.  
University of Denver Coding Bootcamp: Provided the starter code and inspiration.  


## License  
This project is licensed under the MIT License.  


## Acknowledgments  
University of Denver Coding Bootcamp for the starter code.

