import express, { Application } from 'express';
import './database/connection';
import passport from 'passport';
import authJWT from './api/libs/auth';

// Routes
import userRouter from './api/resources/user/user.router';

const app: Application = express();

passport.use(authJWT);
app.use(express.json());

// Router
app.use('/api/users', userRouter);


app.use( passport.initialize() );

app.listen(3002, () => {
    console.log('application running on port 3002');
})

