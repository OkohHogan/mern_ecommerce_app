const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');


app.use(bodyParser.json({ limit: '10mb', parameterLimit: 100000 }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 100000 }));

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const dbo = require("./db/conn");
 
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});