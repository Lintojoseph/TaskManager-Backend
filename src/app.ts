
import express from 'express'
const bodyParser = require('body-parser');
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
  app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)

app.use("/taskmanager",swaggerUi.serve,swaggerUi.setup(swaggerDocument))



app.use(CustomErrorHandler);


export default app