export class AnimeFindFilterDto {

    private constructor(
      public readonly logic: 'AND' | 'OR',
    ) {}
  
    static create( object: { [key: string]: any } ): [string?, AnimeFindFilterDto?] {
        const { logic = 'AND' } = object
        if( !['AND', 'OR'].includes(logic) ) return ['logic must be AND or OR']
        return [ undefined, new AnimeFindFilterDto(logic) ];
    }
  
  }