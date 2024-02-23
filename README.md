# Project New Citizen

Project New Citizen is a web application created for the Center for Employment Training Immigration and Citizenship Program (CET-ICP) in collaboration with Code for San Jose.

CET-ICP regularly holds workshops to help immigrants on their paths to become U.S. Citizens, but when they could no longer hold their in-person workshops due to COVID-19 they reached out to Code for San Jose to help move the workshop online.

The purpose of the project is to have users watch an informational video and answer a series of questions so that immigration attourneys and DOJ accredited representatives can help them become U.S. Citizens.

## Run Locally

### Clone the project

```bash
  git clone https://github.com/noelsner/e-immigrate.git
```

Go to the project directory

```bash
  cd e-immigrate
```

**Installing CORRECT version of Node**
Engines is defined in package.json and is `14.21.3`

Install dependencies

```bash
  npm install
```

### Run MongoDB Locally

In order to run mongoDB locally, you will need to have mongoDB installed in your device.

```bash
which mongo
```

Checks if you have mongoDB installed on your device. It should return a directory path like `/usr/local/bin/mongo`. If it doesn't, you will need to install mongoDB on your device.

**Installing MongoDB**

In order to install mongoDB on you device, go to [mongoDB manual](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions.

**Running MongoDB**
Need to run the mongodb service for server to be listening: `brew services start mongodb-community`

**Connecting to MongoDB**

After installing mongoDB, navigate to the `backend` folder and create a `.env` file

```bash
cd backend

touch .env
```

In the `.env` file add the following:

```bash
MONGO_URI = mongodb://127.0.0.1/test
JWT_KEY = <secret key>
```

_Note:_ The `secret key` can be a "string, buffer, or object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA".
For more information on jwt, visit [JWT Documentation](https://www.npmjs.com/package/jsonwebtoken).

_Note:_ `test` in the line above is the name of the database that you want your application to connect to. You can choose your own name for the database.

Now, still in the `backend` folder, run the following command in the terminal:

```bash
node index.js
```

or

```bash
nodemon index.js
```

You should see a response as shown below, if mongoDB is connected to your application.

```bash
listening on port 5000
MongoDB database connection established successfully
```

### Start the Frontend

From the main project directory

```bash
  npm run start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Update Excel Files

Drag and drop the updated `Questionnaire for Upload.xlsx` and/or `Website Content.xlsx` file(s) into the `backend` folder

In the terminal, from the `backend` folder, run the following command(s):

```bash
node uploadQuestionnaireFromExcel.js
node uploadTranslatedContentFromExcel.js
```
