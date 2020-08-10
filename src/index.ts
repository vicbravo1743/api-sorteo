import express, { Application } from 'express';
import logger from './utils/logger';
import './database/connection';
import passport from 'passport';
import authJWT from './api/libs/auth';

// Routes
import userRouter from './api/resources/users/user.router';
import inspectionRouter from './api/resources/inspections/inspection.router';

const app: Application = express();

passport.use(authJWT);
app.use(express.json());

// Router
app.use('/api/users', userRouter);
app.use('/api/inspection', inspectionRouter);


app.use( passport.initialize() );

app.listen(3002, () => {
    logger.info('Server is running in port 3002!');
})

