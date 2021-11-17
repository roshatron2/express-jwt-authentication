# JWT Authentication in Express

## About

This project was made with the help of [Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw).I used [this](https://www.youtube.com/watch?v=mbsmsi7l3r4) video as Reference. Use this code in Production at your own risk

The Auth Server is used only for authentication and maintaining the users who are currently logged in. All other requests are handled by the content server (server.js).

I have a Postman collection of all the requests used in this project in the postman folder

## How to run this project?

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/)
2. Install [MongoDB](https://www.mongodb.com/cloud/atlas)

### Getting started

```
git clone git@github.com:roshatron2/express-jwt-authentication.git
```

Install dependancies

```
npm i
```

Install Developer dependancies

```
npm i -D concurrently
npm i -D nodemon
```

Create a .env file in api folder

```
MONGOURI=<Paste your MongoDB Atlas URL>
ACCESS_TOKEN_SECRET=<Secure Access Token Secret>
REFRESH_TOKEN_SECRET=<Secure Refresh Token Secret>
JWT_EXPIRE=<The durationf or which your Token will be valid>
CONTENT_SERVER_PORT=<Any free port>
AUTH_SERVER_PORT=<Any free port>
```

Start the Backend application

```
concurrently "node server.js" "node authServer.js"
```

## Routes for Authorization Server

| Route   | HTTP verb | Description                           |
| ------- | --------- | ------------------------------------- |
| /login  | POST      | Returns Acess Token and Refresh Token |
| /token  | POST      | Returns new Acess Token               |
| /logout | DELETE    | Logs the user out of the Auth server  |

## Routes for Content Server

| Route                  | HTTP verb | Description                                  |
| ---------------------- | --------- | -------------------------------------------- |
| /auth/signup           | POST      | Creates a user                               |
| /auth/me               | GET       | Returns Informationa about the user          |
| /file/upload           | POST      | Uploads file to the server                   |
| /file/show             | GET       | Shows all the files uploaded by the user     |
| /file/download/:fileId | GET       | Downloads the file with the corresponding ID |
