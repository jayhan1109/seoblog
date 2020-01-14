import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotEnv from "dotenv";
import mongoose from "mongoose";

// Bring routes
import {router as blogRouter} from './routes/blog';
import {router as authRouter} from './routes/auth';

dotEnv.config();

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`DB connected`));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api',blogRouter);
app.use('/api',authRouter);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
