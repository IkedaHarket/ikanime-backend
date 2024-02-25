import { Criteria } from "../../../../core/models";

interface InAnimeCategoryIdCriteria { animeCategories:{
    some:{
        animeCategoryId:{
            in: string[]
        }
    }
}}

export class InAnimeCategoryId implements Criteria<InAnimeCategoryIdCriteria>{

    constructor(
        private readonly categoriesId: string[]
    ){}

    applyFilter() {
        return{ animeCategories: { some: { animeCategoryId: { in: this.categoriesId } } } };
    }
    
}