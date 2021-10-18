# Get a pet

A web based platform for pet adoption centers.
Users that look to adopt a pet, can get information on pets in the center as well as follow pets for adoption and make the right decision in their own time an pace.
Managers of the platform can add and remove pets, change data of pets and view statistics on pets in the center.

## Tech stack

**Front end**: React.js with TypeScript.

**Back end**: Node.js with JavaScript, Express.js, MongoDB with Mongoose, Passport.js for authentication.

## How to deploy

- Create a MongoDB server and run from localhost on default port (127.0.0.1:27017).
- **NOTES:**
	- If there is no data base called 'get-a-pet' in the server, Mongoose will automatically create it with the collections 'users' and  'pets'.
	- If there are no admin users in the 'users' collection, a new admin user will be created with the credentials:
	**email**: admin@admin.com
	**password**: admin
- Run 'yarn install' from the client folder.
- Run 'yarn build' from the client folder.
- Run 'npm install' from the server folder.
- Run 'node server.js' from the server folder.
- Go to http://localhost:3001/ to test the app.
