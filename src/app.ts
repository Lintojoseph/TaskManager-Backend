
import express from 'express'
import bodyParser from 'body-parser';
import routes from "./routes"
const helmet = require('helmet');
import "express-async-errors";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../out/swagger.json");
import CustomErrorHandler from './errors/customErrorHandler';
const cors = require("cors");

const app=express()
app.use(cors());
app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
    })
  );
 

  app.use(bodyParser.json()); // Handles JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)

app.use("/taskmanager",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});


app.use(CustomErrorHandler);


export default app