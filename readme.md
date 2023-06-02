## A Node.js REST API application using Express framework and MongoDB to handle a collection of contacts

Base URL: https://db-contacts-backend-owx0.onrender.com

### Used packages:
Express, Joi, Mongoose, Morgan, Cors, Cross-env, Dotenv

### Supported routes:

- `GET /api/contacts` Returns an array of all contacts in JSON format with status 200.
- `GET /api/contacts/:id` If there is such an id, returns the contact object in JSON format with status 200. If there is no such id, returns json {"message": "id is not valid id"} and 400 status.
- `POST /api/contacts` Gets body in {name, email, phone, favorite} format (all fields are required, except the last one). If there are no required fields in body, returns JSON {"message": "missing required field name field"} with status 400. If everything is fine with body, saves the contact in the database. Returns an object {id, name, email, phone, favorite} with status 201.
- `DELETE /api/contacts/:id` If there is such an id, it returns JSON of the format {"message": "contact deleted"} with status 200. If there is no such id, returns JSON {"message": "Id is not valid id"} with status 400.
- `PUT /api/contacts/:id` Gets the id parameter. Gets body in JSON format, updating any name, email, phone or favorite fields. If there is no body, returns JSON {"message": "missing required fields"} with status 400. If everything is fine with body, updates the contact in the database. It returns an updated contact object with a status of 200. Otherwise, returns JSON { "message": "Id is not valid id"} and 400 status.
- `PATCH /api/contacts/:contactId/favorite` Gets the contactId parameter. Gets body in JSON format with the update of the favorite field. If there is no body, returns JSON {"message": "missing field favorite"} with status 400. If everything is fine with body, updates the contact in the database, and returns an updated contact object with a status of 200. Otherwise, returns JSON {"message": "Id is not valid id"} with 400 status or {"message": "Not found"} with 404 status.
