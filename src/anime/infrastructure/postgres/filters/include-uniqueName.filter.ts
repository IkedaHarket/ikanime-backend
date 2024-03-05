import { Criteria } from "../../../../core/models";


export class ContainUniqueName implements Criteria<{ uniqueName: { contains: string, mode: string } }>{

    constructor(
        private readonly uniqueName: string
    ){}

    applyFilter() {
        return{ uniqueName: { contains: this.uniqueName , mode: 'insensitive' } };
    }
    
}