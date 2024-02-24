import { Criteria } from "../../../../core/models";

export class InTypeId implements Criteria<{ typeId:{ in: string[]} }>{

    constructor(
        private readonly typesId: string[]
    ){}

    applyFilter() {
        return{ typeId:{ in: this.typesId} };
    }
    
}