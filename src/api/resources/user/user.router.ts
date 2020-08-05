import express, { Router, Request, Response } from 'express';
import { IUser } from './user.model'
import { getAllUsers, createUser, duplicatedUser, getUserByEmail } from './user.controller';
import { userValidate, loginValidate } from './user.validate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const jwtAuthenticate = passport.authenticate('jwt', { session: false }) 

const userRouter: Router = express.Router();

userRouter.get('/', jwtAuthenticate, async ( req: Request, res: Response ) => {
    try {
        const users: IUser[] | undefined =  await getAllUsers();
        return res.json(users);
    }catch(error) {
        console.log(error);
    }
    
})

userRouter.post('/', [userValidate], async ( req: Request, res: Response) => {
    const user: IUser = req.body;
    
    duplicatedUser( user.email )
        .then( duplicated => {
            if ( duplicated ) {
                return res.status(500).send('Este correo electronico ya esta en uso.');
            } else {
                bcrypt.hash( user.password, 10 )
                .then( hashedPassword => {
                    createUser( user, hashedPassword )
                        .then( newUser => {
                            res.json(newUser);
                        })
                        .catch( err => {
                            console.log( err )
                        });
                    
                })
                .catch( err => {
                    console.log(err);
                    return res.status(400).send('Error al encriptar la contraseña, intenta de nuevo mas tarde!')
                });
            } 
        })
        .catch( err => {
            console.log(err);
            return res.status(500).send('Error en el servidor intentar mas tarde.');
        });
})

userRouter.post('/login', [loginValidate], ( req: Request, res: Response ) => {
    const userUnauthenticated: IUser = req.body;

    getUserByEmail( userUnauthenticated.email )
        .then( userRegistered => {
            if ( !userRegistered ) {
                return res.status(400).send('El correo electronico no esta registrado');
            }

            bcrypt.compare( userUnauthenticated.password, userRegistered.password )
                .then( passwordCorrect => {
                    if ( passwordCorrect ) {
                        const token = jwt.sign( {
                            user: userRegistered,
                        }, 'secretTemp', {
                            expiresIn: '24h'
                        })

                        return res.status(200).json({ token })
                    } else {
                        return res.status(401).send('Error al iniciar sesión, intente de nuevo más tarde!');
                    }
                })
                .catch( err => {
                    console.log(err)
                })

        })
        .catch( err => {
            console.log(err)
        })
})

export default userRouter;