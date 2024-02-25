import { Criteria } from "../../../../core/models";

export class InStateId implements Criteria<{ stateId:{ in: string[]} }>{

    constructor(
        private readonly statesId: string[]
    ){}

    applyFilter() {
        return{ stateId:{ in: this.statesId} };
    }
    
}