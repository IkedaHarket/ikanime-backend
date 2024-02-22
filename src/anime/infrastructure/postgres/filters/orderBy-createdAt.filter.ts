import { Criteria } from "../../../../core/models";


export class OrderByCreatedAt implements Criteria<{ createdAt: 'desc' | 'asc' }>{

    constructor(
        private readonly orderBy: 'desc' | 'asc'
    ){}

    applyFilter() {
        return{ createdAt: this.orderBy };
    }
    
}