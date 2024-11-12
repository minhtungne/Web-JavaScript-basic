
# Web-JavaScript-basic

Basic Fullstack web design running on JavaScript.




## Installation and Deployment

Install Node.js

git clone https://github.com/minhtungne/Web-JavaScript-basic.git

```bash
  cd ./Web-JavaScript-basic/backend 
  npm install
  node server.js
  
  cd ./Web-JavaScript-basic/frontend
  npm install
  npm start
```
    
## Backend

Change database

```bash
  Use sqlite database integrated with Node.js
  Go to database.js on config folder.
  Comment line 187 if not importing data from excel file (.xlsx).
  Delete the database.db file if you want to re-import new data before running.
```

API Endpoint and database operations

```bash
  models => controllers => routes
  models: Perform basic CRUD operations with the database.
  controllers: Perform navigation operations from server to database.
  routes: Create API Endpoints for frontend.
```

## Frontend

Go to src folder.

Using API Endpoint

```bash
  Go to app.js on services folder.
  Change the path to the backend server here if needed.
  Use axios library to use API Endpoints from routes folder on backend.
```

Interfaces

```bash
  Go to pages folder.
  Create more interfaces here, each interface should be in a separate file.
  Add all interfaces to index.js file to export all and then use in App.js file (main file to run frontend).
```

Navigation menu

```bash
  Go to components folder then to Navbar folder.
  Change the content in the NavMenu tag to add or delete navigation bars to other interfaces.
```

Change the content of the App.js file in the src folder to using all the interfaces you want to use.
