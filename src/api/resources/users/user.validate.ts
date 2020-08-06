import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const blueprintUsuario  = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    role: Joi.string().required()
});

const blueprintLogin = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(10)
})

export const userValidate = ( req: Request, res: Response, next: NextFunction ) => {
    const { error } = blueprintUsuario.validate(req.body);

    if( error === undefined ) {
        next();
    }else{
        return res.status(422).send('Información del usuario incompleta, favor de revisar que no falte ningun campo por rellenar.');
    }
}

export const loginValidate = ( req: Request, res: Response, next: NextFunction ) => {
    const { error } = blueprintLogin.validate( req.body );

    if( error === undefined ) {
        next();
    } else {
        return res.status(422).send('Información para inciar sesión incompleta, favor de revisar los campos.');
    }
};
