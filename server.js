const express = require("express");
const winston = require("winston");

const app = express();
app.use(express.json());
require("./startup/config")();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
