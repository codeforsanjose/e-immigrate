This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm start:dev`

Runs *npm start* starts up the server using nodemon

<br />
<br />
<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Running MongoDB Locally

In order to run mongoDB locally, you will need to have mongoDB installed in your device.

### `which mongo`

Checks if you have mongoDB installed on your device. It should return a directory path like `/usr/local/bin/mongo`. If it doesn't, you will need to install mongoDB on your device. 

### Installing MongoDB

In order to install mongoDB on you device, go to [mongoDB manual](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions. 

### Connecting to MongoDB

After installing mongoDB, create a file with filename `.env` inside the backend folder. Add the following code in the file. 

`MONGO_URI = mongodb://localhost/test`

Now, navigate to the `backend` folder in your terminal, and run the command `node index.js`. You should see a response as shown below, if mongoDB is connected to your application. 

`listening on port 5000`<br>
`MongoDB database connection established successfully`

Note: `test` in the above code is the name of the database that you want your application to connect to. You can choose your own name for the database. 

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn mongoDB, check out the [mongoDB documentation](https://docs.mongodb.com/manual/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
