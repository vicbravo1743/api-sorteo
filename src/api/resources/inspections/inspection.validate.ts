import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const blueprintInspection = Joi.object().keys({
    area: Joi.string().required(),
    inspector: Joi.string().required(),
    company: Joi.string().required(),
    project: Joi.string().required(),
    revisions: Joi.array().required() 
})

export const inspectionValidate = ( req: Request, res: Response, next: NextFunction ) => {

    const { error } = blueprintInspection.validate( req.body );

    if ( error === undefined ) {
        next();
    } else {
        return res.status(401).send('Revisar que los campos esten rellenos correctamente.');
    }
}