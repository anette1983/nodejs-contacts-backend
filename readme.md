## A Node.js REST API application with Express framework and MongoDB

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Installation](#installation)
- [Supported routes](#supported-routes)

## Introduction

This is a Node.js REST API application developed using various technologies and packages, including Node.js, the Express framework, Joi, Mongoose, Morgan, Docker, nodemon, Cors, Cross-env, Dotenv, Sendgrid, Gravatar, Bcrypt, Jsonwebtoken, Multer, and Jest. It's a fully functioning API server that runs on Node.js and is connected to an active MongoDB database.

The server manages collections of contacts and users, providing authentication/authorization, email verification, and the ability to work with images. Each user can access and manage only their own contacts. Additionally, the application offers pagination for the contacts collection (GET /contacts?page=1&limit=20), allows contact filtering by the 'favorite' field (GET /contacts?favorite=true), and includes Jest unit tests for the authentication controllers (login/register).

## Usage

This project is available at https://db-contacts-backend-owx0.onrender.com
To test the CRUD operations, please use "Postman" application or similar.


## Installation

To use this project locally, please follow these steps:

**Step 1: Clone the Repository**

```
git clone https://github.com/anette1983/nodejs-contacts-backend.git
```

**Step 2: Navigate to the project's directory**

```
cd nodejs-contacts-backend
```

**Step 3. Install the project dependencies using npm:**

```
npm install
```

**Step 4: Using the cloned Application**

To use the cloned project, follow these steps:

1. Customize the project's configuration according to your requirements. You may need to modify configuration files or environment variables.

2. Start the Node.js server:
   npm start

3. Access the application by navigating to `http://localhost:3000` in your web browser.

## Supported routes:

**AUTH routes**

- `POST /api/users/register` Recieves a request body in JSON format with fields {email, password} (all fields are required). If any required fields are missing in the request body, returns JSON {"message": "missing required fieldname field"} with a status code of 400. If the email is already in use, it returns {"message": "Email already in use"} with status 409. If everything is fine with request body, it saves the user in the database. Returns JSON {"user": {"email":"email,"subscription": "starter"}} with a status code of 201 and sends the verification email to the provided email address.
- `GET /api/users/verify/:verficationToken` Recieves the verification token parameter. Returns JSON {"message": "Email verified successfully"}. If there is no user associated with the verification token, it returns {"message": "User not found"} with status code of 404.
- `POST /api/users/verify` Resends a verification email. Recieves body in {"email":"email"} JSON format. Returns JSON {"message": "Verification email sent"} with status 200. If there is no such email, returns {"message": "Email not found"} with status 404. If the email is already verified, returns {"message": "Verification has already been passed"} with status 400.
- `POST /api/users/login` Recieves body containing email and password in JSON format. Returns JSON {"token": "token", "user": {"email": "email", "subscription": "starter"}} with status 200. If there is no such user or the password is wrong returns JSON {"message": "Email or password is wrong"} with status 401. If user is not verified returns "Unathorized" message with status 401.
- `GET /api/users/current` Recieves Bearer Token in headers. After it's successful validation, returns JSON with current user's email and subscription. Else returns "Unathorized" message with status 401.
- `POST /api/users/logout` Recieves token. Returns "Unathorized" message with status 401 or answer with status 204 without content.
- `PATCH /api/users/:id/subscription` Recieves Bearer token, user id as parameter and body in JSON format with the update of the subscription field. The subscription must have one of the following values ['starter', 'pro', 'business']. After successful authorisation check returns "User subscription updated successfully" message and userdata in {id, email, subscription} format. if there is no such id, returns JSON "message": "id is not valid id" with status 400.
- `PATCH /api/users/avatars` Updates the automatically generated avatar for the current user. It receives a request body in multipart/form-data format with the field name "avatar" for uploading the avatar image file. Additionally, it expects a Bearer token for authentication. Returns JSON with avatarURL and status 200. Or "Unathorized" message with 401 status.

**CONTACTS routes**

- `GET /api/contacts` Returns an array of all contacts in JSON format with status 200. Can recieve additional paramaters:
- page (optional): Specifies the page number for pagination. 
- limit (optional): Specifies the number of contacts per page. 
Example: `GET api/contacts?page=1&limit=20` 
- favorite (optional): Filters contacts by their favorite status. Set to true to retrieve only favorite contacts. 
Example: `GET /contacts?favorite=true`
- `GET /api/contacts/:id` If there is such an id, returns the contact object in JSON format with status 200. If there is no such id, returns json {"message": "Contact with id = ${id} not found"} and 400 status.
- `POST /api/contacts` Gets body in {name, email, phone, favorite} format (all fields are required, except the last one). If there are no required fields in body, returns JSON {"message": "missing required field name field"} with status 400. If everything is fine with body, saves the contact in the database. Returns an object {id, name, email, phone, favorite} with status 201.
- `DELETE /api/contacts/:id` If there is such an id, it returns JSON of the format {"message": "contact deleted"} with status 200. If there is no such id, returns JSON {"message": "Contact with id = ${id} not found"} with status 400.
- `PUT /api/contacts/:id` Gets the id parameter. Gets body in JSON format, updating any name, email, phone or favorite fields. If there is no body, returns JSON {"message": "missing required fields"} with status 400. If everything is fine with body, updates the contact in the database. It returns an updated contact object with a status of 200. Otherwise, returns JSON { "message": "Contact with id = ${id} not found"} and 400 status.
- `PATCH /api/contacts/:contactId/favorite` Gets the contactId parameter. Gets body in JSON format with the update of the favorite field. If there is no body, returns JSON {"message": "missing field favorite"} with status 400. If everything is fine with body, updates the contact in the database, and returns an updated contact object with a status of 200. Otherwise, returns JSON {"message": "Contact with id = ${id} not found"} with 400 status or {"message": "Not found"} with 404 status.



Thank you for your interest in this project! If you have any questions or need further assistance, please feel free to contact me:

- <a href="https://www.linkedin.com/in/hanna-konchakovska/"><img align="left" src="https://raw.githubusercontent.com/yushi1007/yushi1007/main/images/linkedin.svg" alt="Hanna | LinkedIn" width="21px"/></a>
