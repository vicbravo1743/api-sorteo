import express, { Router, Request, Response } from 'express';
import { IInspection } from './inspection.model';
import { getAllInspections, getInspectionById, createInspection } from './inspection.controller';
import passport from 'passport';
const jwtAuthenticate = passport.authenticate('jwt', { session: false }) 

const inspectionRouter: Router = express.Router();

inspectionRouter.get('/', async ( req: Request, res: Response ) => {
    try {
        const inspections: IInspection[] = await getAllInspections();
        return res.status(200).json(inspections);
    }catch( err ) {
        return res.status(500).send(`Error al traer el listado de inspecciónes: ${ err }`);
    }
});

inspectionRouter.get('/:id', async ( req: Request, res: Response ) => {
    const id: string = req.params.id;
    
    try {
        const inspection: IInspection | null = await getInspectionById( id );
        return res.json(inspection); 
    }catch(err) {
        return res.status(500).send(`Error al encontrar la inspeccion, error: ${ err }`);
    } 
});

inspectionRouter.post('/', jwtAuthenticate, async ( req: Request, res: Response ) => {
    const inspection: IInspection = req.body;
    const { revisions } = inspection;

    try {
        const newInspection = await createInspection(inspection, revisions);
        return res.json(newInspection);
    }catch( err ) {
        return res.status(500).send(`Error al crearla inspección: ${ err }`);
    }
});

export default inspectionRouter;