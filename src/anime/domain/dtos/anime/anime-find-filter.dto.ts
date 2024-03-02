import { CustomError } from "../../../../core/models";


export class AnimeFindFilterDto {

    private constructor(
      public readonly categories: { mode: 'every' | 'some' | 'none', in: string[] },
      public readonly logic: 'AND' | 'OR',
      public readonly name: { contains?: string },
      public readonly orderBy: { createdAt: 'desc' | 'asc' },
      public readonly states: string[],
      public readonly types: string[],
    ) {}
  
    static create( object: { [key: string]: any } ):  AnimeFindFilterDto {
        const { 
          name = "", 
          categories = { mode:'every', in:[] },
          types = [],
          states = [],
          orderBy = { createdAt: 'desc' }, 
          logic = 'AND' 
        } = object
        if( !['AND', 'OR'].includes(logic) ) throw CustomError.badRequest('logic must be AND or OR')
        if(!['desc', 'asc'].includes(orderBy.createdAt)) throw CustomError.badRequest('createdAt must be asc or desc')
        if(!Array.isArray(types) ) throw CustomError.badRequest('types must be array') 
        if(!Array.isArray(states) ) throw CustomError.badRequest('states must be array')
        if (typeof categories !== 'object' || categories === null) throw CustomError.badRequest('categories must be an object')
        const validModes = ['every', 'some', 'none'];
        if (!categories.mode || !validModes.includes(categories.mode)) {
          throw CustomError.badRequest(`categories.mode must be one of: ${validModes.join(', ')}`);
        }
        if (!Array.isArray(categories.in)) {
          throw CustomError.badRequest('categories.in must be an array');
        }

        return new AnimeFindFilterDto(categories, logic, name, orderBy, states, types) ;
    }
  
  }