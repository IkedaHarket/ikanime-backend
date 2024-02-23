import { Criteria } from "../../../../core/models";


export class ContainName implements Criteria<{ name: { contains: string, mode: string } }>{

    constructor(
        private readonly name: string
    ){}

    applyFilter() {
        return{ name: { contains: this.name , mode: 'insensitive' } };
    }
    
}