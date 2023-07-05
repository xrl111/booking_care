import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require('dotenv').config();

let app = express();
app.use(cors({
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("NODEJS is listening on port: " + port);
});

