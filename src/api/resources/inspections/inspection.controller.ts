import Inspection, { IInspection } from './inspection.model';

export function getAllInspections() {
    return Inspection.find({ });
}

export function getInspectionById( id: string ) {
    return Inspection.findById( id );
}

export function createInspection( inspection: IInspection, revisions: any) {
    return new Inspection({
        ...inspection,
        revisions
    }).save()
}

