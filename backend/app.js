// app.js
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from './routes/user.route.js';
import companyRouter from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import errorHandler from './middlewares/errorHandler.js';
import swaggerOptions from "./swaggerOptions.js";
import 'dotenv/config';

const app = express();

// Swagger only in development
if (process.env.NODE_ENV === 'development') {
    const specs = swaggerJsdoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

app.use(cors({
    origin: process.env.HOST,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error Handler
app.use(errorHandler);

export default app;
