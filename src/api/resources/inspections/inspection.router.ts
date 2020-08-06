import express, { Router, Request, Response } from 'express';
import { IInspection } from './inspection.model';
import { getAllInspections, getInspectionById } from './inspection.controller';

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

export default inspectionRouter;