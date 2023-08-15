const express = require('express');
const routes = require('./routes');
// Import sequelize connection
const sequelize = require('./config/connection'); 


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { // Set force to true if you want to recreate tables
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
