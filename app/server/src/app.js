const express = require('express');

const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const graphqlRoutes = require('./routes/graphql-routes/graphql-routes');

// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// Here our API Routes

app.use('/api/graphql', graphqlRoutes);

// done! we export it so we can start the site in start.js
module.exports = app;
