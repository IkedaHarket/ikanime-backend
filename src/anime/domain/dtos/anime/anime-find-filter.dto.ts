import { CustomError } from "../../../../core/models";


export class AnimeFindFilterDto {

    private constructor(
      public readonly logic: 'AND' | 'OR',
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
      public readonly categories: string[],
      public readonly types: string[],
      public readonly states: string[],
      public readonly years: string[],
      public readonly name: { contains?: string },
    ) {}
  
    static create( object: { [key: string]: any } ):  AnimeFindFilterDto {
        const { 
          name = "", 
          categories = [],
          types = [],
          states = [],
          years = [],
          orderBy = { createdAt: 'desc' }, 
          logic = 'AND' 
        } = object
        if( !['AND', 'OR'].includes(logic) ) throw CustomError.badRequest('logic must be AND or OR')
        if(!['desc', 'asc'].includes(orderBy.createdAt)) throw CustomError.badRequest('createdAt must be asc or desc')
        if(!Array.isArray(categories)) throw CustomError.badRequest('categories  must be array') 
        if(!Array.isArray(types) ) throw CustomError.badRequest('types must be array') 
        if(!Array.isArray(states) ) throw CustomError.badRequest('states must be array') 
        if(!Array.isArray(years)) throw CustomError.badRequest('years must be array') 

        return  new AnimeFindFilterDto(logic, orderBy, categories, types, states, years , name) ;
    }
  
  }