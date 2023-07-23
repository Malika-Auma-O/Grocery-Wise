# Grocery-Wise - README

Grocery-Wise helps you save time and money on grocery shopping by comparing prices across stores.

## How it works

Grocery-Wise is designed for comparing grocery prices. Users can search for items they want to purchase and view and compare prices across various stores.
Once users find the store with the best price for an item, they can add it to their digital grocery list, and share the list via email or SMS.
Users will still have to visit the stores they choose to make their actual grocery purchases either online or physically.

## Introduction

This web application is built using the MERN stack (MongoDB, Express, React, Node.js) along with several additional dependencies. Below, you will find all the necessary information to get started with the project, including usage instructions, and dependencies.

## Getting started with the Grocery Wise:

### Clone the repository from GitHub:

git clone https://github.com/Malika-Auma-O/Grocery-Wise
cd Grocery-Wise

### Install the dependencies for both the backend and frontend:

      -cd backend
      -npm install
      -cd ../frontend
      -npm install

### Set up environment variables:

Create a .env file in the backend and frontend directories.Add the following variables and replace them with your own values:

#### backend .env

PORT=3636

- MONGODB_URI="your_mongodb_connection"
- JWT_KEY="your_jwt_secret_key"
- SALT_ROUNDS=8
- CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
- CLOUDINARY_API_KEY="your_cloudinary_api_key"
- CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

#### frontend .env

REACT_APP_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"

### Start the development servers:

      -cd backend
      -npm start
      -cd frontend
      -npm start

Open your browser and access the application at http://localhost:3000/.

## Dependencies

The Grocery Wise project relies on the following dependencies:

### Backend:

- bcrypt: For encrypting and decrypting user passwords.
- multer: For handling file uploads.
- cloudinary: For storing and managing images.
- dotenv: For managing environment variables.
- express: For building the backend server.
- jsonwebtoken: For user authentication using JSON Web Tokens.
- mongoose: For interacting with the MongoDB database.
- nodemailer: For sending emails for password reset functionality.
- Twilio: for sms
- nodemon: For automatically restarting the Node.js app

### Frontend:

- axios: For making HTTP requests to the backend API.
- @material-ui/core: For styling and UI components.
- @material-ui/icons: For accessing Material-UI icons.
- react: For building the frontend user interface.
- react-dom: For rendering React components.
- react-router-dom: For managing client-side routing.

## Functionality

The Grocery Wise web application provides the following functionalities:

- User registration and login
- Admin section to manage products and users
- Search for groceries by category or barcode reader
- Compare prices across multiple stores
- Create and manage shopping lists by temporary needs or weekly needs
- Add items to lists directly from search results
- Store locator with maps and directions
- Share lists via email and/or SMS
- Favorites and reminders
- Personalized recommendations based on search history
- Recipe and nutrition recommendations

## Contributing

We welcome contributions! Please open an issue or pull request with your ideas.

## License

## Contact

<!-- For any questions or support, please email support@grocerywise.com -->
